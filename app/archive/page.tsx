import { prisma } from '@/lib/db';
import PoemsClient from './PoemsClient';
import Navbar from '@/components/Navbar';

export default async function PoemsPage() {
  const poems = await prisma.poem.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="archive-page">
      <Navbar />
      <PoemsClient initialPoems={poems} />
    </div>
  );
}
