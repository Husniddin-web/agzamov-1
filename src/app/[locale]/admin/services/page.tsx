'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Scale,
  Building2,
  ShieldAlert,
  FileText,
  Coins,
  Briefcase,
  Landmark,
  Loader2,
  AlertCircle,
  X,
  Check,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { adminFetch } from '@/lib/adminApi';

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Building2,
  ShieldAlert,
  FileText,
  Coins,
  Briefcase,
  Landmark,
};

type TabLang = 'uz' | 'ru' | 'en';

interface ServiceItem {
  _id: string;
  slug: string;
  title: { uz: string; ru: string; en: string };
  shortDesc: { uz: string; ru: string; en: string };
  fullDesc: { uz: string; ru: string; en: string };
  features: { uz: string[]; ru: string[]; en: string[] };
  iconName?: string;
  casesCount?: number;
  order: number;
  isActive: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [activeTab, setActiveTab] = useState<TabLang>('uz');

  const [formData, setFormData] = useState({
    slug: '',
    title: { uz: '', ru: '', en: '' },
    shortDesc: { uz: '', ru: '', en: '' },
    fullDesc: { uz: '', ru: '', en: '' },
    featuresText: { uz: '', ru: '', en: '' },
    iconName: 'Scale',
    casesCount: 50,
    order: 1,
    isActive: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      params.append('limit', '50');

      const res = await adminFetch(`/services?${params.toString()}`);
      setServices(res.data || []);
      if (res.meta) setTotal(res.meta.total || 0);
    } catch (err) {
      console.error('Fetch services error:', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      slug: '',
      title: { uz: '', ru: '', en: '' },
      shortDesc: { uz: '', ru: '', en: '' },
      fullDesc: { uz: '', ru: '', en: '' },
      featuresText: { uz: '', ru: '', en: '' },
      iconName: 'Scale',
      casesCount: 50,
      order: services.length + 1,
      isActive: true,
    });
    setError(null);
    setActiveTab('uz');
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      slug: service.slug,
      title: {
        uz: service.title?.uz || '',
        ru: service.title?.ru || '',
        en: service.title?.en || '',
      },
      shortDesc: {
        uz: service.shortDesc?.uz || '',
        ru: service.shortDesc?.ru || '',
        en: service.shortDesc?.en || '',
      },
      fullDesc: {
        uz: service.fullDesc?.uz || '',
        ru: service.fullDesc?.ru || '',
        en: service.fullDesc?.en || '',
      },
      featuresText: {
        uz: (service.features?.uz || []).join('\n'),
        ru: (service.features?.ru || []).join('\n'),
        en: (service.features?.en || []).join('\n'),
      },
      iconName: service.iconName || 'Scale',
      casesCount: service.casesCount ?? 50,
      order: service.order ?? 1,
      isActive: service.isActive !== undefined ? service.isActive : true,
    });
    setError(null);
    setActiveTab('uz');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.uz.trim()) {
      setError('Iltimos, o‘zbek tilidagi xizmat nomini kiriting');
      setActiveTab('uz');
      return;
    }

    const genSlug =
      formData.slug.trim() ||
      formData.title.uz
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    const parseFeatures = (text: string) =>
      text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
      slug: genSlug,
      title: {
        uz: formData.title.uz.trim(),
        ru: formData.title.ru.trim() || formData.title.uz.trim(),
        en: formData.title.en.trim() || formData.title.uz.trim(),
      },
      shortDesc: {
        uz: formData.shortDesc.uz.trim(),
        ru: formData.shortDesc.ru.trim() || formData.shortDesc.uz.trim(),
        en: formData.shortDesc.en.trim() || formData.shortDesc.uz.trim(),
      },
      fullDesc: {
        uz: formData.fullDesc.uz.trim() || formData.shortDesc.uz.trim(),
        ru: formData.fullDesc.ru.trim() || formData.fullDesc.uz.trim() || formData.shortDesc.uz.trim(),
        en: formData.fullDesc.en.trim() || formData.fullDesc.uz.trim() || formData.shortDesc.uz.trim(),
      },
      features: {
        uz: parseFeatures(formData.featuresText.uz),
        ru: parseFeatures(formData.featuresText.ru).length
          ? parseFeatures(formData.featuresText.ru)
          : parseFeatures(formData.featuresText.uz),
        en: parseFeatures(formData.featuresText.en).length
          ? parseFeatures(formData.featuresText.en)
          : parseFeatures(formData.featuresText.uz),
      },
      iconName: formData.iconName,
      casesCount: Number(formData.casesCount) || 0,
      order: Number(formData.order) || 1,
      isActive: formData.isActive,
    };

    setSubmitting(true);
    setError(null);
    try {
      if (editingService) {
        await adminFetch(`/services/${editingService._id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch('/services', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err: any) {
      setError(err.message || 'Xizmatni saqlashda xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await adminFetch(`/services/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !current }),
      });
      setServices((prev) =>
        prev.map((s) => (s._id === id ? { ...s, isActive: !current } : s))
      );
    } catch (err) {
      console.error('Toggle service active error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham ushbu xizmatni o‘chirmoqchimisiz?')) return;
    try {
      await adminFetch(`/services/${id}`, { method: 'DELETE' });
      fetchServices();
    } catch (err) {
      console.error('Delete service error:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase">
            Yuridik Xizmatlar
          </h1>
          <p className="text-xs text-zinc-400">
            Kompaniya ko‘rsatadigan xizmatlar yo‘nalishlari va amaliyotlar ({total} ta)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-red-950/40 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Xizmat</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Xizmat nomi..."
          className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Table */}
      <div className="border border-zinc-800 bg-[#0a0c13] overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            <span className="text-xs uppercase tracking-widest font-mono">
              Xizmatlar yuklanmoqda...
            </span>
          </div>
        ) : services.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Scale className="w-12 h-12 mx-auto text-zinc-700 stroke-1" />
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Xizmatlar topilmadi
            </p>
            <p className="text-xs text-zinc-600">
              Yangi xizmat qo‘shish uchun yuqoridagi tugmani bosing.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                  <th className="py-3 px-4 w-12 text-center">Tartib</th>
                  <th className="py-3 px-4">Xizmat Nomi & Qisqa Tavsif</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Ishlar soni</th>
                  <th className="py-3 px-4">Holat</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {services.map((service) => {
                  const IconComp = ICONS_MAP[service.iconName || 'Scale'] || Scale;
                  return (
                    <tr key={service._id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono text-zinc-500 text-xs">
                        #{service.order}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-950 border border-zinc-800 text-red-500 shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-white">
                              {service.title?.uz || service.title?.ru || service.title?.en}
                            </div>
                            <p className="text-[11px] text-zinc-400 max-w-md line-clamp-1 mt-0.5">
                              {service.shortDesc?.uz || service.shortDesc?.ru || '—'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-zinc-400">
                        /{service.slug}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-zinc-300">
                        {service.casesCount || 0}+
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleActive(service._id, service.isActive)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                            service.isActive
                              ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-400'
                              : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                          }`}
                        >
                          {service.isActive ? (
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

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(service)}
                            className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="O‘chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT SERVICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-zinc-800 w-full max-w-2xl p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {editingService ? 'Xizmatni Tahrirlash' : 'Yangi Xizmat Qo‘shish'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Language Switcher */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Matn tili:
                </span>
                <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800">
                  {(['uz', 'ru', 'en'] as TabLang[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang)}
                      className={`px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                        activeTab === lang
                          ? 'bg-red-600 text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {lang === 'uz' ? '🇺🇿 UZ' : lang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Xizmat Nomi — [{activeTab.toUpperCase()}]{' '}
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
                  placeholder="Korporativ va Tijorat Huquqi"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-medium"
                />
              </div>

              {/* Short Desc */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Qisqa Tavsif (Karta uchun) — [{activeTab.toUpperCase()}]
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDesc[activeTab]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDesc: { ...formData.shortDesc, [activeTab]: e.target.value },
                    })
                  }
                  placeholder="Biznesni ro‘yxatdan o‘tkazish, shartnomalar va korporativ nizolar..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none"
                />
              </div>

              {/* Full Desc */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  To‘liq Tavsif (Batafsil sahifa uchun) — [{activeTab.toUpperCase()}]
                </label>
                <textarea
                  rows={4}
                  value={formData.fullDesc[activeTab]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDesc: { ...formData.fullDesc, [activeTab]: e.target.value },
                    })
                  }
                  placeholder="Xizmat haqida batafsil ma’lumot..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none"
                />
              </div>

              {/* Features (newline separated) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Afzalliklar / Xususiyatlar (Har bir qatorda bittadan) — [{activeTab.toUpperCase()}]
                </label>
                <textarea
                  rows={3}
                  value={formData.featuresText[activeTab]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featuresText: {
                        ...formData.featuresText,
                        [activeTab]: e.target.value,
                      },
                    })
                  }
                  placeholder="Biznesni qayta tashkil etish&#10;M&A bitimlarini yuridik kuzatish&#10;Ichki korporativ hujjatlar auditi"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-mono"
                />
              </div>

              {/* Common metadata settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-zinc-800">
                {/* Icon Selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Ikonka
                  </label>
                  <select
                    value={formData.iconName}
                    onChange={(e) =>
                      setFormData({ ...formData, iconName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {Object.keys(ICONS_MAP).map((iconKey) => (
                      <option key={iconKey} value={iconKey}>
                        {iconKey}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cases Count */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Muvaffaqiyatli ishlar
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.casesCount}
                    onChange={(e) =>
                      setFormData({ ...formData, casesCount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Tartib raqami
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Slug & Active */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    URL Slug (ixtiyoriy)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="korporativ-huquq"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-mono"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-4 h-4 rounded-none text-red-600 bg-zinc-950 border-zinc-800 focus:ring-0"
                    />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Saytda ko‘rsatish (Faol)
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white uppercase font-bold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>{editingService ? 'Saqlash' : 'Qo‘shish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
