import { NextResponse } from "next/server";

import User from "@/models/User";

import connectDB from "@/lib/db/connect";

import { hashPassword } from "@/lib/auth/password";

export async function GET() {
  await connectDB();

  const existingUser =
    await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

  if (existingUser) {
    return NextResponse.json({
      message: "Already Exists",
    });
  }

  const hashedPassword =
    await hashPassword(
      process.env.ADMIN_PASSWORD!
    );

  await User.create({
    name: "admin",

    email: process.env.ADMIN_EMAIL,

    password: hashedPassword,

    role: "admin",
  });

  return NextResponse.json({
    success: true,
  });
}