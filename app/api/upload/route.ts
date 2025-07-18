import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 });
    }

    // Validate file size (max 200KB)
    if (file.size > 200 * 1024) {
      return NextResponse.json({ error: 'File too large. Max size is 200KB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const filename = `${timestamp}_${Math.random().toString(36).substring(7)}.${extension}`;

    // Save to public/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    try {
      await writeFile(filepath, buffer);
    } catch (error) {
      // Create uploads directory if it doesn't exist
      const { mkdir } = await import('fs/promises');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filepath, buffer);
    }

    // Return the public URL
    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
