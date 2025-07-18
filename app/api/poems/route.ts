import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function GET() {
  const poems = await prisma.poem.findMany();
  return NextResponse.json(poems);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required and must be a non-empty string' },
        { status: 400 }
      );
    }
    
    if (!body.author || typeof body.author !== 'string' || body.author.trim() === '') {
      return NextResponse.json(
        { error: 'Author is required and must be a non-empty string' },
        { status: 400 }
      );
    }
    
    if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
      return NextResponse.json(
        { error: 'Content is required and must be a non-empty string' },
        { status: 400 }
      );
    }
    
    // Create poem with validated and trimmed data
    const poem = await prisma.poem.create({
      data: {
        title: body.title.trim(),
        author: body.author.trim(),
        content: body.content.trim(),
      }
    });
    
    return NextResponse.json(poem, { status: 201 });
  } catch (error) {
    console.error('Error creating poem:', error);
    return NextResponse.json(
      { error: 'Failed to create poem' },
      { status: 500 }
    );
  }
}