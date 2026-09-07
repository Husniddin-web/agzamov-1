'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import {
  Users,
  MessageSquare,
  Newspaper,
  Phone,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  UserPlus,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { adminFetch } from '@/lib/adminApi';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    totalLeads: 0,
    newLeads: 0,
    teamCount: 0,
    newsCount: 0,
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      // Parallel fetch: dashboard stats, team count, news count
      const [leadsStatsRes, teamRes, newsRes] = await Promise.all([
        adminFetch('/leads/dashboard-stats').catch(() => ({ data: {} })),
        adminFetch('/team?limit=1').catch(() => ({ meta: { total: 0 } })),
        adminFetch('/news?limit=1').catch(() => ({ meta: { total: 0 } })),
      ]);

      setStats({
        totalLeads: leadsStatsRes.data?.totalLeads || 0,
        newLeads: leadsStatsRes.data?.newLeads || 0,
        teamCount: teamRes.meta?.total || 0,
        newsCount: newsRes.meta?.total || 0,
        recentLeads: leadsStatsRes.data?.recentLeads || [],
      });
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (leadId: string, nextStatus: string) => {
    try {
      await adminFetch(`/leads/${leadId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      loadData();
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Boshqaruv Paneli (Dashboard)
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Saytdan kelgan arizalar, jamoa a’zolari va umumiy statistika
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-3.5 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Yangilash</span>
          </button>

          <Link
            href="/admin/team/create"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-red-950/40 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Advokat qo‘shish</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: New Leads */}
        <div className="p-5 bg-[#0a0c13] border border-zinc-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Yangi Arizalar
            </span>
            <div className="w-8 h-8 bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">
              {stats.newLeads}
            </span>
            <span className="text-[11px] text-red-500 font-bold uppercase">
              ko‘rilmagan
            </span>
          </div>
          <div className="absolute top-0 inset-x-0 h-0.5 bg-red-600" />
        </div>

        {/* Metric 2: Total Leads */}
        <div className="p-5 bg-[#0a0c13] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Jami Arizalar
            </span>
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">
              {stats.totalLeads}
            </span>
            <span className="text-[11px] text-zinc-500 font-bold uppercase">
              tushgan
            </span>
          </div>
        </div>

        {/* Metric 3: Team Members */}
        <div className="p-5 bg-[#0a0c13] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Jamoa A’zolari
            </span>
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Users className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">
              {stats.teamCount}
            </span>
            <span className="text-[11px] text-zinc-500 font-bold uppercase">
              advokatlar
            </span>
          </div>
        </div>

        {/* Metric 4: News Articles */}
        <div className="p-5 bg-[#0a0c13] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Yangiliklar
            </span>
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <Newspaper className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">
              {stats.newsCount}
            </span>
            <span className="text-[11px] text-zinc-500 font-bold uppercase">
              maqolalar
            </span>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              So‘nggi Arizalar va Murojaatlar
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Saytdan yuborilgan oxirgi mijozlar so‘rovlari
            </p>
          </div>

          <Link
            href="/admin/leads"
            className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 flex items-center gap-1.5 transition-colors"
          >
            <span>Barchasini ko‘rish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-zinc-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            <span className="text-xs font-mono">Yuklanmoqda...</span>
          </div>
        ) : stats.recentLeads.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-xs font-mono border border-dashed border-zinc-800">
            Hozircha arizalar kelib tushmagan
          </div>
        ) : (
          <div className="overflow-x-auto border border-zinc-800/80">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono tracking-wider text-[11px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Mijoz F.I.SH</th>
                  <th className="py-3 px-4">Telefon</th>
                  <th className="py-3 px-4">Xabar / Izoh</th>
                  <th className="py-3 px-4">Holati</th>
                  <th className="py-3 px-4 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {stats.recentLeads.map((lead: any) => (
                  <tr key={lead._id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {lead.fullName}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-red-400 hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{lead.phone}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 max-w-xs truncate">
                      {lead.message || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                          lead.status === 'NEW'
                            ? 'bg-red-600/20 text-red-400 border border-red-600/40'
                            : lead.status === 'CONTACTED'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}
                      >
                        {lead.status === 'NEW'
                          ? 'Yangi'
                          : lead.status === 'CONTACTED'
                          ? 'Bog‘lanildi'
                          : 'Yopildi'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {lead.status === 'NEW' && (
                        <button
                          onClick={() => handleStatusChange(lead._id, 'CONTACTED')}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Bog‘landim
                        </button>
                      )}
                      {lead.status !== 'CLOSED' && (
                        <button
                          onClick={() => handleStatusChange(lead._id, 'CLOSED')}
                          className="px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-400 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Yopish
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
