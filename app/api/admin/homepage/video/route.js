// POST/DELETE /api/admin/homepage/video
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/verifyAdminSession";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB
const ACCEPTED_MIME = ["video/mp4", "video/webm"];

export async function POST(request) {
  const session = await verifyAdminSession(request);
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("video");

    if (!file) return NextResponse.json({ error: "No video file received" }, { status: 400 });
    if (!ACCEPTED_MIME.includes(file.type)) {
      return NextResponse.json({ error: "Please upload an MP4 or WebM video" }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "File is too large — please keep it under 50MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // رفع على Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "dental/hero", overwrite: true, public_id: "hero-video" },
        (error, result) => { if (error) reject(error); else resolve(result); }
      ).end(buffer);
    });

    const publicUrl = uploadResult.secure_url;

    // حذف الفيديو القديم من Cloudinary لو موجود
    const settings = await prisma.clinicSettings.findUnique({ where: { id: 1 } });
    if (settings?.heroVideoPublicId && settings.heroVideoPublicId !== uploadResult.public_id) {
      await cloudinary.uploader.destroy(settings.heroVideoPublicId, { resource_type: "video" }).catch(() => {});
    }

    await prisma.clinicSettings.upsert({
      where: { id: 1 },
      update: { heroVideoUrl: publicUrl, heroVideoPublicId: uploadResult.public_id },
      create: { id: 1, heroVideoUrl: publicUrl, heroVideoPublicId: uploadResult.public_id },
    });

    return NextResponse.json({ success: true, heroVideoUrl: publicUrl });
  } catch (err) {
    console.error("hero video upload error:", err);
    return NextResponse.json({ error: "Upload failed — please try again." }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await verifyAdminSession(request);
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const settings = await prisma.clinicSettings.findUnique({ where: { id: 1 } });
    if (settings?.heroVideoPublicId) {
      await cloudinary.uploader.destroy(settings.heroVideoPublicId, { resource_type: "video" }).catch(() => {});
    }
    await prisma.clinicSettings.update({ where: { id: 1 }, data: { heroVideoUrl: null, heroVideoPublicId: null } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("hero video delete error:", err);
    return NextResponse.json({ error: "Could not remove video" }, { status: 500 });
  }
}
