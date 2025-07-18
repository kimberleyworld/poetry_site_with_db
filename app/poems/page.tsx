import { prisma } from '@/lib/db';
import { Poem } from '@/app/generated/prisma/client'

export default async function PoemsPage() {
  const poems = await prisma.poem.findMany();

  return (
    <div>
      {poems.map((poem: Poem) => (
        <div key={poem.id}>
          <h2>{poem.title}</h2>
          <p>By {poem.author}</p>
          <p>{poem.content}</p>
        </div>
      ))}
    </div>
  );
}