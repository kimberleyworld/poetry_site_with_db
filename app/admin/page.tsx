import { prisma } from '@/lib/db';
import AdminApprovalClient from '@/app/admin/AdminApprovalClient';
import Navbar from '@/components/Navbar';
import AdminLogout from './AdminLogout';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/jwt';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  // Verify JWT token on server side
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  
  if (!token) {
    redirect('/admin/login');
  }
  
  const payload = verifyAdminToken(token);
  if (!payload || !payload.isAdmin) {
    redirect('/admin/login');
  }

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin - Poem Approval</h1>
          <AdminLogout />
        </div>
        <AdminApprovalClient 
          pendingPoems={pendingPoems} 
          approvedPoems={approvedPoems}
        />
      </div>
    </div>
  );
}
