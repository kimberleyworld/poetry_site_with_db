import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side operations
);

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

    // Create unique filename with subfolder based on file type
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = originalName.split('.').pop()?.toLowerCase();
    const baseFilename = `${timestamp}_${Math.random().toString(36).substring(7)}.${extension}`;
    
    // Determine subfolder based on file type
    let subfolder = '';
    const mimeType = file.type.toLowerCase();
    
    if (mimeType.startsWith('image/')) {
      subfolder = 'images';
    } else if (mimeType.startsWith('audio/')) {
      subfolder = 'audio';
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }
    
    const filename = `${subfolder}/${baseFilename}`;

    console.log('Attempting upload:', {
      filename,
      fileSize: file.size,
      fileType: file.type,
      subfolder
    });

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('poem-assets')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json({ 
        error: 'Failed to upload to storage',
        details: uploadError.message,
        code: uploadError.name
      }, { status: 500 });
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('poem-assets')
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
