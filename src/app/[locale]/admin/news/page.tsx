'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Loader2,
  Newspaper,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { adminFetch, getFullImageUrl } from '@/lib/adminApi';

interface NewsItem {
  _id: string;
  title: { uz: string; ru: string; en: string };
  category: { uz: string; ru: string; en: string };
  thumbnail: string;
  views: number;
  readTime?: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', String(limit));
      if (search.trim()) params.append('search', search.trim());

      const res = await adminFetch(`/news?${params.toString()}`);
      setNews(res.data || []);
      if (res.meta) {
        setTotal(res.meta.total || 0);
        setTotalPages(res.meta.totalPages || 1);
      }
    } catch (err) {
      console.error('News fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await adminFetch(`/news/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !current }),
      });
      setNews((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isActive: !current } : n))
      );
    } catch (err) {
      console.error('Toggle active error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ushbu maqolani o‘chirmoqchimisiz?')) return;
    try {
      await adminFetch(`/news/${id}`, { method: 'DELETE' });
      fetchNews();
    } catch (err) {
      console.error('Delete news error:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase">
            Yangiliklar va Maqolalar
          </h1>
          <p className="text-xs text-zinc-400">
            Huquqiy yangiliklar, tahliliy maqolalar va qonunchilik sharhlari ({total} ta)
          </p>
        </div>

        <Link
          href="/admin/news/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-red-950/40 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Maqola</span>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Maqola sarlavhasi bo‘yicha qidirish..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-800 bg-[#0a0c13] overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            <span className="text-xs uppercase tracking-widest font-mono">
              Maqolalar yuklanmoqda...
            </span>
          </div>
        ) : news.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Newspaper className="w-12 h-12 mx-auto text-zinc-700 stroke-1" />
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Maqolalar mavjud emas
            </p>
            <p className="text-xs text-zinc-600">
              Yangi maqola qo‘shish uchun yuqoridagi tugmani bosing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                  <th className="py-3 px-4 w-20">Muqova</th>
                  <th className="py-3 px-4">Sarlavha & Kategoriya</th>
                  <th className="py-3 px-4">Ko‘rishlar</th>
                  <th className="py-3 px-4">Sana</th>
                  <th className="py-3 px-4">Holat</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {news.map((item) => (
                  <tr key={item._id} className="hover:bg-zinc-900/30 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="relative w-16 h-12 bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                        {item.thumbnail ? (
                          <Image
                            src={getFullImageUrl(item.thumbnail)}
                            alt={item.title?.uz || 'News'}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <Newspaper className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-white max-w-md line-clamp-1">
                        {item.title?.uz || item.title?.ru || item.title?.en}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] font-medium text-red-400">
                          {item.category?.uz || item.category?.ru || 'Yangilik'}
                        </span>
                        {item.readTime && (
                          <span className="text-[10px] text-zinc-500">
                            {item.readTime} daqiqa mutolaa
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Views */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{item.views || 0}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-600" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(item._id, item.isActive)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                          item.isActive
                            ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-400'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                        }`}
                      >
                        {item.isActive ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Faol</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Yashirin</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/news/${item._id}/edit`}
                          className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="O‘chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 bg-zinc-950/40">
            <div>
              Sahifa <span className="text-white font-bold">{page}</span> /{' '}
              <span className="text-white font-bold">{totalPages}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 disabled:opacity-40 hover:text-white transition-colors cursor-pointer"
              >
                Oldingi
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 disabled:opacity-40 hover:text-white transition-colors cursor-pointer"
              >
                Keyingi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
