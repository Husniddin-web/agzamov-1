'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Globe,
  UploadCloud,
  Check,
  Loader2,
  AlertCircle,
  X,
  Briefcase,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { adminFetch, adminUploadFile, getFullImageUrl } from '@/lib/adminApi';

interface Partner {
  _id: string;
  companyName: string;
  logoUrl: string;
  websiteUrl?: string;
  order: number;
  isActive: boolean;
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    logoUrl: '',
    websiteUrl: '',
    order: 1,
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      params.append('limit', '50');

      const res = await adminFetch(`/partners?${params.toString()}`);
      setPartners(res.data || []);
      if (res.meta) setTotal(res.meta.total || 0);
    } catch (err) {
      console.error('Fetch partners error:', err);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const openCreateModal = () => {
    setEditingPartner(null);
    setFormData({
      companyName: '',
      logoUrl: '',
      websiteUrl: '',
      order: partners.length + 1,
      isActive: true,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      companyName: partner.companyName,
      logoUrl: partner.logoUrl,
      websiteUrl: partner.websiteUrl || '',
      order: partner.order,
      isActive: partner.isActive,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const data = await adminUploadFile(file, 'partners');
      setFormData((prev) => ({ ...prev, logoUrl: data.url }));
    } catch (err: any) {
      setError(err.message || 'Logoni yuklashda xatolik yuz berdi');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      setError('Iltimos, kompaniya nomini kiriting');
      return;
    }
    if (!formData.logoUrl.trim()) {
      setError('Iltimos, kompaniya logosini yuklang');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      ...formData,
      companyName: formData.companyName.trim(),
      websiteUrl: formData.websiteUrl.trim() || undefined,
      order: Number(formData.order) || 1,
    };

    try {
      if (editingPartner) {
        await adminFetch(`/partners/${editingPartner._id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch('/partners', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setIsModalOpen(false);
      fetchPartners();
    } catch (err: any) {
      setError(err.message || 'Hamkorni saqlashda xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      await adminFetch(`/partners/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !current }),
      });
      setPartners((prev) =>
        prev.map((p) => (p._id === id ? { ...p, isActive: !current } : p))
      );
    } catch (err) {
      console.error('Toggle partner active error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham ushbu hamkorni o‘chirmoqchimisiz?')) return;
    try {
      await adminFetch(`/partners/${id}`, { method: 'DELETE' });
      fetchPartners();
    } catch (err) {
      console.error('Delete partner error:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase">
            Hamkorlar va Mijozlar
          </h1>
          <p className="text-xs text-zinc-400">
            Bosh sahifadagi hamkor kompaniyalar logotiplari va havolalari ({total} ta)
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-red-950/40 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Hamkor</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kompaniya nomi..."
          className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
        />
      </div>

      {/* Partners Cards Grid */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-zinc-500 gap-3 border border-zinc-800 bg-[#0a0c13]">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          <span className="text-xs uppercase tracking-widest font-mono">
            Hamkorlar yuklanmoqda...
          </span>
        </div>
      ) : partners.length === 0 ? (
        <div className="p-16 text-center space-y-3 border border-zinc-800 bg-[#0a0c13]">
          <Briefcase className="w-12 h-12 mx-auto text-zinc-700 stroke-1" />
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
            Hamkorlar topilmadi
          </p>
          <p className="text-xs text-zinc-600">
            Yangi hamkor qo‘shish uchun yuqoridagi tugmani bosing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-[#0a0c13] border border-zinc-800 p-5 space-y-4 hover:border-zinc-700 transition-colors group relative"
            >
              {/* Logo Area */}
              <div className="relative h-24 bg-zinc-950 border border-zinc-800 flex items-center justify-center p-4">
                {partner.logoUrl ? (
                  <Image
                    src={getFullImageUrl(partner.logoUrl)}
                    alt={partner.companyName}
                    fill
                    className="object-contain p-2 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    unoptimized
                  />
                ) : (
                  <Briefcase className="w-8 h-8 text-zinc-600" />
                )}
              </div>

              {/* Information */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white uppercase tracking-tight truncate">
                    {partner.companyName}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">
                    #{partner.order}
                  </span>
                </div>

                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-zinc-400 hover:text-red-400 flex items-center gap-1 mt-1 truncate"
                  >
                    <Globe className="w-3 h-3 text-red-500 shrink-0" />
                    <span className="truncate">{partner.websiteUrl}</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-zinc-600 italic block mt-1">
                    Vebsayt ko‘rsatilmagan
                  </span>
                )}
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <button
                  onClick={() => handleToggleActive(partner._id, partner.isActive)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                    partner.isActive
                      ? 'bg-emerald-950/60 border border-emerald-800/80 text-emerald-400'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                  }`}
                >
                  {partner.isActive ? (
                    <>
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Faol</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-2.5 h-2.5" />
                      <span>Yashirin</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(partner)}
                    className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-zinc-800 w-full max-w-md p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                {editingPartner ? 'Hamkorni Tahrirlash' : 'Yangi Hamkor Qo‘shish'}
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
              {/* Logo Upload */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Kompaniya Logosi <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-16 bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                    {formData.logoUrl ? (
                      <Image
                        src={getFullImageUrl(formData.logoUrl)}
                        alt="Preview"
                        fill
                        className="object-contain p-1"
                        unoptimized
                      />
                    ) : (
                      <UploadCloud className="w-5 h-5 text-zinc-600" />
                    )}
                  </div>
                  <label className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 hover:border-red-600 cursor-pointer text-center block">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    {uploading ? (
                      <span className="text-red-500 font-mono">Yuklanmoqda...</span>
                    ) : (
                      <span>{formData.logoUrl ? 'Logoni o‘zgartirish' : 'Logo tanlash'}</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Kompaniya Nomi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Korzinka Uz"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Vebsayt Havolasi (ixtiyoriy)
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, websiteUrl: e.target.value })
                  }
                  placeholder="https://example.uz"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                />
              </div>

              {/* Order & Active */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Tartib Raqami
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
                      Faol
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
                  <span>{editingPartner ? 'Saqlash' : 'Qo‘shish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
