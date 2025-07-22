import { prisma } from '@/lib/db';
import PoemCard from '@/components/PoemCard';

export default async function PoemsPage() {
  const poems = await prisma.poem.findMany();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {poems.map((poem) => (
        <PoemCard key={poem.id} poem={poem} />
      ))}
    </div>
  );
}