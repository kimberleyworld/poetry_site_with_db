import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface PoemPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PoemPage({ params }: PoemPageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams.id) {
    notFound();
  }
  
  const id = parseInt(resolvedParams.id);
  
  if (isNaN(id)) {
    notFound();
  }
  
  const poem = await prisma.poem.findUnique({
    where: {
      id: id,
    },
  });

  if (!poem) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/archive">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Archive
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{poem.title}</CardTitle>
          <p className="text-lg text-gray-600">By {poem.author}</p>
          <p className="text-sm text-gray-500">
            Published on {new Date(poem.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {poem.contentType === 'text' && (
              <p className="text-lg leading-relaxed whitespace-pre-line">{poem.content}</p>
            )}
            
            {poem.contentType === 'image' && (
              <div className="flex justify-center">
                <Image 
                  src={poem.content} 
                  alt={poem.title}
                  width={800}
                  height={600}
                  className="max-w-full h-auto rounded-lg shadow-md"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
            
            {poem.contentType === 'audio' && (
              <div className="flex justify-center">
                <audio 
                  controls 
                  className="w-full max-w-md"
                  preload="metadata"
                >
                  <source src={poem.content} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
          
          {/* Show description if it exists */}
          {poem.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{poem.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
