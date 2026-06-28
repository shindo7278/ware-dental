// GET /api/admin/bookings?date=YYYY-MM-DD
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/verifyAdminSession";

export async function GET(request) {
  const session = await verifyAdminSession(request);
  if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date query param is required" }, { status: 400 });

  try {
    // Fix UTC shift: parse YYYY-MM-DD as midnight UTC explicitly
    const [year, month, day] = date.split("-").map(Number);
    const dateFrom = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const dateTo   = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

    const bookings = await prisma.booking.findMany({
      where: { date: { gte: dateFrom, lte: dateTo } },
      orderBy: { startTime: "asc" },
      include: { service: { select: { name: true } } },
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("admin bookings list error:", err);
    return NextResponse.json({ error: "Could not load bookings" }, { status: 500 });
  }
}
