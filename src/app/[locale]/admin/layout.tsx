'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Newspaper,
  Handshake,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  User,
} from 'lucide-react';
import { getAuthToken, removeAuthToken, getAdminUser } from '@/lib/adminApi';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isLoginPage = pathname.includes('/admin/login');

  useEffect(() => {
    if (isLoginPage) {
      setIsReady(true);
      return;
    }

    const token = getAuthToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const user = getAdminUser();
    setAdminUser(user || { fullName: 'Administrator', username: 'admin' });
    setIsReady(true);
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    removeAuthToken();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#06080d] text-zinc-100">{children}</div>;
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-zinc-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent animate-spin" />
          <span className="text-xs uppercase tracking-wider font-mono">Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: 'Jamoa (Team)',
      href: '/admin/team',
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: 'Arizalar (Leads)',
      href: '/admin/leads',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      label: 'Yangiliklar (News)',
      href: '/admin/news',
      icon: <Newspaper className="w-4 h-4" />,
    },
    {
      label: 'Hamkorlar (Partners)',
      href: '/admin/partners',
      icon: <Handshake className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col md:flex-row">
      {/* MOBILE TOPBAR */}
      <header className="md:hidden h-16 bg-[#090c14] border-b border-zinc-800 px-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2.5">
          <Image src="/logo1-crop.png" alt="Logo" width={28} height={28} className="object-contain" />
          <span className="text-xs font-black tracking-widest uppercase text-white">
            AGZAMOV <span className="text-red-600">ADMIN</span>
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 border border-zinc-800 text-zinc-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-[#090c14] border-r border-zinc-800/90 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-5 border-b border-zinc-800 flex items-center gap-3">
            <Image src="/logo1-crop.png" alt="Logo" width={32} height={32} className="object-contain" />
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-wider text-white uppercase leading-tight">
                AGZAMOV
              </span>
              <span className="text-[9px] tracking-[0.2em] font-extrabold text-red-600 uppercase">
                ADMIN PANEL
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                    isActive
                      ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-950/40'
                      : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/80 hover:border-zinc-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User Info & Actions */}
        <div className="p-3 border-t border-zinc-800/80 space-y-2">
          <div className="px-3 py-2 bg-zinc-950/80 border border-zinc-800/80 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-none bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{adminUser?.fullName || 'Admin'}</p>
              <p className="text-[10px] text-zinc-500 font-mono truncate">@{adminUser?.username || 'admin'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-zinc-300 text-[11px] font-bold uppercase tracking-wider hover:text-white transition-colors"
              title="Vebsaytga o'tish"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Sayt</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 border border-red-900/40 hover:border-red-600 bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              title="Chiqish"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </aside>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-xs z-30"
        />
      )}

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
