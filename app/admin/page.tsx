import { prisma } from '@/lib/db';
import AdminApprovalClient from '@/app/admin/AdminApprovalClient';
import Navbar from '@/components/Navbar';

export default async function AdminPage() {
  const pendingPoems = await prisma.poem.findMany({
    where: { approved: false },
    orderBy: { createdAt: 'desc' },
  });

  const approvedPoems = await prisma.poem.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="admin-page">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin - Poem Approval</h1>
        <AdminApprovalClient 
          pendingPoems={pendingPoems} 
          approvedPoems={approvedPoems}
        />
      </div>
    </div>
  );
}
