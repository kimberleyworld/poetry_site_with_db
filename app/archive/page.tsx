export const dynamic = "force-dynamic";
import { prisma } from '@/lib/db';
import PoemsClient from './PoemsClient';
import Navbar from '@/components/Navbar';
import WebGLBackground from '@/components/WebGLBackground';
import Footer from '@/components/Footer';

export default async function PoemsPage() {
  const poems = await prisma.poem.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="archive-page min-h-screen flex flex-col">
      <WebGLBackground />
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:pb-16">
        <h2 className="text-left text-2xl sm:text-3xl lg:text-4xl mb-6 text-neutral-800 font-[family-name:var(--font-ibm-plex-mono)] font-bold">
            SOFT ARCHIVE
          </h2>
        <PoemsClient initialPoems={poems} />
      </div>
      <Footer />
    </div>
  );
}
