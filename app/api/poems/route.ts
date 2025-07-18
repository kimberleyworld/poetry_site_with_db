import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const poems = await prisma.poem.findMany();
  return NextResponse.json(poems);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    
    const poem = await prisma.poem.create({
      data: {
        title: body.title,
        author: body.author,
        reader: body.reader,
        description: body.description,
        content: body.content,
        contentType: body.contentType || 'text',
        eventDate: new Date(body.eventDate),
      }
    });
    
    console.log('Created poem successfully:', poem);
    return NextResponse.json(poem, { status: 201 });
  } catch (error) {
    console.error('Error creating poem:', error);
    
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to create poem',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}