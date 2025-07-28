import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Poem } from '@prisma/client';
import Link from 'next/link';

interface PoemCardProps {
  poem: Poem;
}

export default function PoemCard({ poem }: PoemCardProps) {
  return (
    <Link href={`/poem/${poem.id}`}>
      <Card className="hover:shadow-lg backdrop-blur-lg bg-white/30 transition-shadow cursor-pointer h-full border-neutral-700 rounded-none">
        <CardHeader>
          <CardTitle className='font-[family-name:var(--font-ibm-plex-mono)] '>{poem.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic text-sm mb-2">By {poem.author}</p>
          <p className="italic text-sm mb-2">Shared by {poem.reader}</p>
          <p className="overflow-hidden text-ellipsis font-[family-name:var(--font-ibm-plex-mono)] " style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: 'vertical' 
          }}>
            {poem.description}
          </p>
          <p className="text-xs text-neutral-700 mt-2 font-[family-name:var(--font-ibm-plex-mono)] ">
            Click to read...
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
