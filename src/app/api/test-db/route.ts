import { NextResponse } from "next/server";

import User from "@/models/User";

import connectDB from "@/lib/db/connect";

export async function GET() {
  await connectDB();

  const count =
    await User.countDocuments();

  return NextResponse.json({
    users: count,
  });
}