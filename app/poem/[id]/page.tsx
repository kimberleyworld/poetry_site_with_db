import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PoemPageProps {
  params: {
    id: string;
  };
}

export default async function PoemPage({ params }: PoemPageProps) {
  const poem = await prisma.poem.findUnique({
    where: {
      id: parseInt(params.id),
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
            <p className="text-lg leading-relaxed whitespace-pre-line">{poem.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
