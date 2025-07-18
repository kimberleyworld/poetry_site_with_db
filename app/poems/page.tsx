import { prisma } from '@/lib/db';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function PoemsPage() {
  const poems = await prisma.poem.findMany();

  return (
    <div>
      {poems.map((poem) => (
        <Card key={poem.id}>
          <CardHeader>
            <CardTitle>{poem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>By {poem.author}</p>
            <p>{poem.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}