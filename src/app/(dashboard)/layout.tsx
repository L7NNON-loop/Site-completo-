'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/login');
  }, [router, token]);

  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
