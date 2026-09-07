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
  Phone,
  Mail,
  Award,
} from 'lucide-react';
import { adminFetch, adminUploadFile, getFullImageUrl } from '@/lib/adminApi';

type TabLang = 'uz' | 'ru' | 'en';

export default function AdminTeamCreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabLang>('uz');

  // Form State
  const [formData, setFormData] = useState({
    fullName: { uz: '', ru: '', en: '' },
    position: { uz: '', ru: '', en: '' },
    quote: { uz: '', ru: '', en: '' },
    bio: { uz: '', ru: '', en: '' },
    phone: '',
    email: '',
    experienceYears: 10,
    order: 1,
    isActive: true,
    image: '',
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle image upload to backend static uploads endpoint
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const data = await adminUploadFile(file, 'team');
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err: any) {
      setError(err.message || 'Rasm yuklashda xatolik yuz berdi');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.fullName.uz.trim()) {
      setError('Iltimos, o‘zbek tilidagi ism-familiyani kiriting');
      setActiveTab('uz');
      return;
    }
    if (!formData.position.uz.trim()) {
      setError('Iltimos, o‘zbek tilidagi lavozimni kiriting');
      setActiveTab('uz');
      return;
    }
    if (!formData.image) {
      setError('Iltimos, advokat rasmini yuklang');
      return;
    }

    // Auto-fill ru and en from uz if empty to prevent validation errors
    const payload = {
      ...formData,
      fullName: {
        uz: formData.fullName.uz.trim(),
        ru: formData.fullName.ru.trim() || formData.fullName.uz.trim(),
        en: formData.fullName.en.trim() || formData.fullName.uz.trim(),
      },
      position: {
        uz: formData.position.uz.trim(),
        ru: formData.position.ru.trim() || formData.position.uz.trim(),
        en: formData.position.en.trim() || formData.position.uz.trim(),
      },
      bio: {
        uz: formData.bio.uz.trim() || formData.position.uz.trim(),
        ru: formData.bio.ru.trim() || formData.bio.uz.trim() || formData.position.uz.trim(),
        en: formData.bio.en.trim() || formData.bio.uz.trim() || formData.position.uz.trim(),
      },
      quote: {
        uz: formData.quote.uz.trim(),
        ru: formData.quote.ru.trim() || formData.quote.uz.trim(),
        en: formData.quote.en.trim() || formData.quote.uz.trim(),
      },
      phone: formData.phone.trim() || undefined,
      email: formData.email.trim() || undefined,
      experienceYears: Number(formData.experienceYears) || 0,
      order: Number(formData.order) || 1,
    };

    setSubmitting(true);
    try {
      await adminFetch('/team', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      router.push('/admin/team');
    } catch (err: any) {
      setError(err.message || 'Advokatni saqlashda xatolik yuz berdi');
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
            href="/admin/team"
            className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Yangi Advokat Qo‘shish
            </h1>
            <p className="text-xs text-zinc-400">
              Ism-familiya, lavozim, shior va kontakt ma’lumotlari 3 ta tilda
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-800/80 text-red-300 text-xs flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. PHOTO UPLOADER */}
        <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <span>Advokat Rasmi (Static Upload)</span>
            <span className="text-red-500">*</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Preview Box */}
            <div className="relative w-36 h-44 bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 overflow-hidden">
              {formData.image ? (
                <>
                  <Image
                    src={getFullImageUrl(formData.image)}
                    alt="Preview"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                    title="O‘chirish"
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

            {/* Upload Zone */}
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
                    <span>Serverga yuklanmoqda va .webp formatiga siqilmoqda...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-zinc-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Rasmni tanlang yoki bu yerga tashlang
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Avtomatik .webp ga konvertatsiya qilinadi (JPEG, PNG, WEBP, maks 5MB)
                    </span>
                  </>
                )}
              </label>

              {formData.image && (
                <p className="text-[11px] font-mono text-emerald-400 truncate">
                  Yuklangan manzil: {formData.image}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. THREE-LANGUAGE CONTENT TABS */}
        <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Matnli Ma’lumotlar (3 Tilda)
              </h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Har bir til uchun maydonlarni to‘ldiring
              </p>
            </div>

            {/* Language Tab Switcher */}
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

          {/* Dynamic Language Fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                F.I.SH (Ism, Familiya, Sharif) — [{activeTab.toUpperCase()}]{' '}
                {activeTab === 'uz' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={formData.fullName[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: { ...formData.fullName, [activeTab]: e.target.value },
                  })
                }
                placeholder={
                  activeTab === 'uz'
                    ? 'Agzamov Bobur Dilshodovich'
                    : activeTab === 'ru'
                    ? 'Агзамов Бобур Дильшодович'
                    : 'Bobur D. Agzamov'
                }
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Lavozim / Maqom — [{activeTab.toUpperCase()}]{' '}
                {activeTab === 'uz' && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={formData.position[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: { ...formData.position, [activeTab]: e.target.value },
                  })
                }
                placeholder={
                  activeTab === 'uz'
                    ? 'Boshqaruvchi Hamkor, Katta Advokat'
                    : activeTab === 'ru'
                    ? 'Управляющий Партнер, Старший Адвокат'
                    : 'Managing Partner, Senior Attorney'
                }
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Quote / Shior */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Shior / Iqtibos (Quote) — [{activeTab.toUpperCase()}]
              </label>
              <input
                type="text"
                value={formData.quote[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quote: { ...formData.quote, [activeTab]: e.target.value },
                  })
                }
                placeholder="«Qonun ustuvorligi — biznesingiz mustahkam qalqonidir»"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Bio / Description */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Biografiya / Batafsil ma’lumot (Bio) — [{activeTab.toUpperCase()}]
              </label>
              <textarea
                rows={3}
                value={formData.bio[activeTab]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: { ...formData.bio, [activeTab]: e.target.value },
                  })
                }
                placeholder="Toshkent Davlat Yuridik Universiteti bitiruvchisi. 300 dan ziyod sudda g‘olib chiqqan..."
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium resize-none"
              />
            </div>
          </div>
        </div>

        {/* 3. CONTACT & ORDER SETTINGS */}
        <div className="p-6 bg-[#0a0c13] border border-zinc-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
            Aloqa va Joylashuv Sozlamalari
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-red-500" />
                <span>Telefon Raqami (ixtiyoriy)</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 90 123 45 67"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-red-500" />
                <span>Email Manzili (ixtiyoriy)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="lawyer@agzamovlegal.uz"
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Experience Years */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-red-500" />
                <span>Tajriba Yili</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Tartib Raqami (Order)
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          {/* IsActive Switch */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded-none text-red-600 bg-zinc-950 border-zinc-800 focus:ring-0"
              />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Saytda ko‘rsatish (Faol)
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/team"
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
                <span>Advokatni Saqlash</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
