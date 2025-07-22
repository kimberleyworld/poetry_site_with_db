import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { poemId, approved } = await request.json();

    if (typeof poemId !== 'number' || typeof approved !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    if (approved) {
      // Approve the poem
      const updatedPoem = await prisma.poem.update({
        where: { id: poemId },
        data: { approved: true },
      });

      return NextResponse.json({ 
        message: 'Poem approved successfully',
        poem: updatedPoem 
      });
    } else {
      // Reject (delete) the poem
      await prisma.poem.delete({
        where: { id: poemId },
      });

      return NextResponse.json({ 
        message: 'Poem rejected and deleted successfully' 
      });
    }
  } catch (error) {
    console.error('Error in approval API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
