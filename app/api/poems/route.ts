import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET() {
  const poems = await prisma.poem.findMany();
  return NextResponse.json(poems);
}

export async function POST(req: Request) {
  const body = await req.json();
  const poem = await prisma.poem.create({ data: body });
  return NextResponse.json(poem);
}