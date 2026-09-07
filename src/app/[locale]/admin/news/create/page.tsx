'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  ArrowLeft,
  UploadCloud,
  Check,
  Loader2,
  AlertCircle,
  X,
  Clock,
  User,
} from 'lucide-react';
import { adminFetch, adminUploadFile, getFullImageUrl } from '@/lib/adminApi';

type TabLang = 'uz' | 'ru' | 'en';

export default function AdminNewsCreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabLang>('uz');

  const [formData, setFormData] = useState({
    title: { uz: '', ru: '', en: '' },
    category: { uz: '', ru: '', en: '' },
    excerpt: { uz: '', ru: '', en: '' },
    content: { uz: '', ru: '', en: '' },
    author: 'AGZAMOV LEGAL',
    readTime: 5,
    isActive: true,
    thumbnail: '',
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const data = await adminUploadFile(file, 'news');
      setFormData((prev) => ({ ...prev, thumbnail: data.url }));
    } catch (err: any) {
      setError(err.message || 'Muqova rasmini yuklashda xatolik yuz berdi');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.uz.trim()) {
      setError('Iltimos, o‘zbek tilidagi maqola sarlavhasini kiriting');
      setActiveTab('uz');
      return;
    }
    if (!formData.category.uz.trim()) {
      setError('Iltimos, maqola kategoriyasini kiriting');
      setActiveTab('uz');
      return;
    }
    if (!formData.excerpt.uz.trim()) {
      setError('Iltimos, maqola qisqa mazmunini kiriting');
      setActiveTab('uz');
      return;
    }
    if (!formData.thumbnail) {
      setError('Iltimos, maqola muqova rasmini yuklang');
      return;
    }

    const payload = {
      ...formData,
      title: {
        uz: formData.title.uz.trim(),
        ru: formData.title.ru.trim() || formData.title.uz.trim(),
        en: formData.title.en.trim() || formData.title.uz.trim(),
      },
      category: {
        uz: formData.category.uz.trim(),
        ru: formData.category.ru.trim() || formData.category.uz.trim(),
        en: formData.category.en.trim() || formData.category.uz.trim(),
      },
      excerpt: {
        uz: formData.excerpt.uz.trim(),
        ru: formData.excerpt.ru.trim() || formData.excerpt.uz.trim(),
        en: formData.excerpt.en.trim() || formData.excerpt.uz.trim(),
      },
      content: {
        uz: formData.content.uz.trim() || formData.excerpt.uz.trim(),
        ru: formData.content.ru.trim() || formData.content.uz.trim() || formData.excerpt.uz.trim(),
        en: formData.content.en.trim() || formData.content.uz.trim() || formData.excerpt.uz.trim(),
      },
      readTime: Number(formData.readTime) || 5,
    };

    setSubmitting(true);
    try {
      await adminFetch('/news', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      router.push('/admin/news');
    } catch (err: any) {
      setError(err.message || 'Maqolani saqlashda xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/news"
            className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Yangi Maqola Qo‘shish
            </h1>
            <p className="text-xs text-zinc-400">
              Huquqiy maqola yoki yangilikni 3 ta tilda nashr etish
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-800/80 text-red-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cover Upload */}
        <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <span>Muqova Rasmi (Cover Image)</span>
            <span className="text-red-500">*</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative w-48 h-32 bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
              {formData.thumbnail ? (
                <>
                  <Image
                    src={getFullImageUrl(formData.thumbnail)}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <div className="text-center p-3 text-zinc-600">
                  <UploadCloud className="w-8 h-8 mx-auto mb-1 stroke-1" />
                  <span className="text-[10px] uppercase font-mono block">Rasm yo‘q</span>
                </div>
              )}
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="border-2 border-dashed border-zinc-800 hover:border-red-600/50 bg-zinc-950/60 p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
                {uploading ? (
                  <div className="flex items-center gap-2 text-xs text-red-500 font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Yuklanmoqda...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-zinc-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Muqova rasmini yuklang
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Format: JPEG, PNG, WEBP (Maks 5MB, 16:9 tavsiya etiladi)
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* 3-Language Tabs */}
        <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Maqola Matnlari (3 Tilda)
              </h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Sarlavha, kategoriya, qisqa tavsif va to‘liq matn
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800">
              {(['uz', 'ru', 'en'] as TabLang[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveTab(lang)}
                  className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === lang
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {lang === 'uz' ? '🇺🇿 UZ' : lang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Maqola Sarlavhasi — [{activeTab.toUpperCase()}]{' '}
                {activeTab === 'uz' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={formData.title[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title, [activeTab]: e.target.value },
                  })
                }
                placeholder={
                  activeTab === 'uz'
                    ? '2026-yilda O‘zbekistonda soliq islohotlari va biznes uchun yangiliklar'
                    : 'Налоговые реформы в Узбекистане в 2026 году'
                }
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Kategoriya — [{activeTab.toUpperCase()}]{' '}
                {activeTab === 'uz' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={formData.category[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: { ...formData.category, [activeTab]: e.target.value },
                  })
                }
                placeholder="Soliq Huquqi / Sud Amaliyoti / Korporativ Huquq"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Qisqa Tavsif (Excerpt) — [{activeTab.toUpperCase()}]{' '}
                {activeTab === 'uz' && <span className="text-red-500">*</span>}
              </label>
              <textarea
                rows={3}
                value={formData.excerpt[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: { ...formData.excerpt, [activeTab]: e.target.value },
                  })
                }
                placeholder="Maqolaning asosiy mazmuni haqida qisqacha ma’lumot..."
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                To‘liq Matn (Content) — [{activeTab.toUpperCase()}]
              </label>
              <textarea
                rows={10}
                value={formData.content[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, [activeTab]: e.target.value },
                  })
                }
                placeholder="Maqola to‘liq matni..."
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-normal leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
            Qo‘shimcha Ma’lumotlar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <User className="w-3 h-3 text-red-500" />
                <span>Muallif</span>
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-red-600 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-red-500" />
                <span>O‘qish vaqti (daqiqa)</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-red-600 text-xs font-medium"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded-none text-red-600 bg-zinc-950 border-zinc-800 focus:ring-0"
              />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Saytda e’lon qilish (Faol)
              </span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/news"
            className="px-5 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Bekor qilish
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-7 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-red-950/40 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saqlanmoqda...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Maqolani Chop Etish</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
