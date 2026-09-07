'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Loader2,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { adminFetch, getFullImageUrl } from '@/lib/adminApi';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({ total: 0, totalPages: 1 });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sortBy: 'order',
        sortOrder: 'asc',
      });
      if (search.trim()) {
        query.set('search', search.trim());
      }

      const res = await adminFetch(`/team?${query.toString()}`);
      setTeam(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1 });
    } catch (err) {
      console.error('Fetch team error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTeam();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchTeam]);

  // Toggle active status
  const handleToggleActive = async (member: any) => {
    try {
      await adminFetch(`/team/${member._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      setTeam((prev) =>
        prev.map((m) => (m._id === member._id ? { ...m, isActive: !m.isActive } : m)),
      );
    } catch (err) {
      console.error('Toggle active error:', err);
    }
  };

  // Delete team member
  const handleDelete = async (id: string) => {
    if (!confirm('Ushbu advokatni o‘chirishni tasdiqlaysizmi?')) return;
    setDeletingId(id);
    try {
      await adminFetch(`/team/${id}`, { method: 'DELETE' });
      fetchTeam();
    } catch (err) {
      alert('O‘chirishda xatolik yuz berdi');
    } finally {
      setDeletingId(null);
    }
  };

  // Move member order up or down
  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= team.length) return;

    const currentMember = team[index];
    const targetMember = team[targetIndex];

    const currentOrder = currentMember.order;
    const targetOrder = targetMember.order;

    try {
      await adminFetch('/team/reorder', {
        method: 'PATCH',
        body: JSON.stringify({
          items: [
            { id: currentMember._id, order: targetOrder },
            { id: targetMember._id, order: currentOrder },
          ],
        }),
      });
      fetchTeam();
    } catch (err) {
      console.error('Reorder error:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Jamoa A’zolari (Team)
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Barcha advokat va mutaxassislar ro‘yxati, tartiblash va tahrirlash
          </p>
        </div>

        <Link
          href="/admin/team/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-950/40 transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yangi Advokat Qo‘shish</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-[#0a0c13] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Ism, lavozim yoki telefon bo‘yicha qidiruv..."
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 text-xs font-medium"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="text-xs font-mono text-zinc-400">
          Jami: <span className="text-white font-bold">{meta.total}</span> ta mutaxassis
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a0c13] border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-zinc-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
            <span className="text-xs font-mono">Yuklanmoqda...</span>
          </div>
        ) : team.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 space-y-3">
            <p className="text-sm font-bold text-zinc-400">Hech qanday ma’lumot topilmadi</p>
            <Link
              href="/admin/team/create"
              className="inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:underline uppercase"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Birinchi advokatni qo‘shish</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono tracking-wider text-[11px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-3 w-16 text-center">Tartib</th>
                  <th className="py-3 px-4 w-16">Rasm</th>
                  <th className="py-3 px-4">F.I.SH (Ism-sharif)</th>
                  <th className="py-3 px-4">Lavozim</th>
                  <th className="py-3 px-4">Bog‘lanish</th>
                  <th className="py-3 px-4 text-center">Holati</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {team.map((member, idx) => (
                  <tr key={member._id} className="hover:bg-zinc-900/40 transition-colors">
                    {/* Order buttons */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1 font-mono font-bold text-zinc-400">
                        <button
                          disabled={idx === 0 && page === 1}
                          onClick={() => handleMoveOrder(idx, 'up')}
                          className="p-1 hover:text-red-500 disabled:opacity-20 cursor-pointer"
                          title="Yuqoriga"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <span>{member.order}</span>
                        <button
                          disabled={idx === team.length - 1}
                          onClick={() => handleMoveOrder(idx, 'down')}
                          className="p-1 hover:text-red-500 disabled:opacity-20 cursor-pointer"
                          title="Pastga"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Image */}
                    <td className="py-3 px-4">
                      <div className="relative w-10 h-12 bg-zinc-900 border border-zinc-800 overflow-hidden">
                        <Image
                          src={getFullImageUrl(member.image)}
                          alt={member.fullName?.uz || 'Lawyer'}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      </div>
                    </td>

                    {/* Full Name */}
                    <td className="py-3 px-4">
                      <p className="font-bold text-white text-sm">
                        {member.fullName?.uz || member.fullName?.ru || '—'}
                      </p>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        RU: {member.fullName?.ru || '—'} &bull; EN: {member.fullName?.en || '—'}
                      </p>
                    </td>

                    {/* Position */}
                    <td className="py-3 px-4 text-zinc-300 font-medium">
                      {member.position?.uz || member.position?.ru || '—'}
                    </td>

                    {/* Phone & Email */}
                    <td className="py-3 px-4 space-y-1">
                      {member.phone && (
                        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                          <Phone className="w-3 h-3 text-red-500" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-1.5 text-zinc-500 text-[11px]">
                          <Mail className="w-3 h-3 text-zinc-400" />
                          <span>{member.email}</span>
                        </div>
                      )}
                      {!member.phone && !member.email && <span className="text-zinc-600">—</span>}
                    </td>

                    {/* Status Active/Inactive Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                          member.isActive
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/60'
                            : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                        }`}
                      >
                        {member.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Faol</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Yashirilgan</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/team/${member._id}/edit`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors"
                        title="Tahrirlash"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Tahrir</span>
                      </Link>

                      <button
                        disabled={deletingId === member._id}
                        onClick={() => handleDelete(member._id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-950/30 hover:bg-red-950/60 border border-red-800/50 text-red-400 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                        title="O‘chirish"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {meta.totalPages > 1 && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-mono">
              Sahifa: <span className="text-white font-bold">{page}</span> / {meta.totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Oldingi</span>
              </button>

              <button
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold disabled:opacity-30 flex items-center gap-1 cursor-pointer"
              >
                <span>Keyingi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
