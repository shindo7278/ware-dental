// POST /api/admin/blog/upload-image
import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/verifyAdminSession";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ACCEPTED_MIME = ["image/jpeg", "image/png", "image/webp"];
const MAX_WIDTH = 1600;

export async function POST(request) {
  const session = await verifyAdminSession(request);
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) return NextResponse.json({ error: "No image file received" }, { status: 400 });
    if (!ACCEPTED_MIME.includes(file.type)) {
      return NextResponse.json({ error: "Please upload a JPG, PNG, or WebP image" }, { status: 400 });
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Image is too large — please keep it under 10MB" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    // Resize وتحويل لـ WebP باستخدام sharp
    const compressed = await sharp(bytes)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // رفع على Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "dental/blog", format: "webp" },
        (error, result) => { if (error) reject(error); else resolve(result); }
      ).end(compressed);
    });

    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (err) {
    console.error("blog image upload error:", err);
    return NextResponse.json({ error: "Upload failed — please try again." }, { status: 500 });
  }
}
