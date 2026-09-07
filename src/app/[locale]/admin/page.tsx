'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/adminApi';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="h-64 flex items-center justify-center text-zinc-500 font-mono text-xs">
      Yo‘naltirilmoqda...
    </div>
  );
}
