'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Inbox,
  Search,
  Phone,
  Calendar,
  Trash2,
  Loader2,
  CheckCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  X,
  Save,
} from 'lucide-react';
import { adminFetch } from '@/lib/adminApi';

type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';

interface Lead {
  _id: string;
  fullName: string;
  phone: string;
  service?: string;
  message?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  NEW: {
    label: 'Yangi',
    badgeClass: 'bg-red-950/70 border-red-800 text-red-300',
    icon: Clock,
  },
  CONTACTED: {
    label: 'Bog‘lanildi',
    badgeClass: 'bg-amber-950/70 border-amber-800 text-amber-300',
    icon: Phone,
  },
  IN_PROGRESS: {
    label: 'Jarayonda',
    badgeClass: 'bg-blue-950/70 border-blue-800 text-blue-300',
    icon: CheckCircle,
  },
  CLOSED: {
    label: 'Yopildi',
    badgeClass: 'bg-zinc-800 border-zinc-700 text-zinc-400',
    icon: CheckCircle2,
  },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  // Modal / Drawer state for viewing & adding notes
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', String(limit));
      if (search.trim()) params.append('search', search.trim());
      if (selectedStatus !== 'ALL') params.append('status', selectedStatus);

      const res = await adminFetch(`/leads?${params.toString()}`);
      setLeads(res.data || []);
      if (res.meta) {
        setTotal(res.meta.total || 0);
        setTotalPages(res.meta.totalPages || 1);
      }
    } catch (err) {
      console.error('Leads fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, selectedStatus]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Update Status
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      await adminFetch(`/leads/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
      );
      if (activeLead && activeLead._id === id) {
        setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  // Save Note
  const handleSaveNote = async () => {
    if (!activeLead) return;
    setSavingNote(true);
    try {
      await adminFetch(`/leads/${activeLead._id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: activeLead.status, notes: noteText }),
      });
      setLeads((prev) =>
        prev.map((l) => (l._id === activeLead._id ? { ...l, notes: noteText } : l))
      );
      setActiveLead((prev) => (prev ? { ...prev, notes: noteText } : null));
    } catch (err) {
      console.error('Save note error:', err);
    } finally {
      setSavingNote(false);
    }
  };

  // Delete Lead
  const handleDelete = async (id: string) => {
    if (!confirm('Haqiqatan ham ushbu arizani o‘chirmoqchimisiz?')) return;
    try {
      await adminFetch(`/leads/${id}`, { method: 'DELETE' });
      if (activeLead?._id === id) setActiveLead(null);
      fetchLeads();
    } catch (err) {
      console.error('Delete lead error:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase">
            Arizalar va Murojaatlar
          </h1>
          <p className="text-xs text-zinc-400">
            Sayt orqali yuborilgan barcha konsultatsiya arizalari ro‘yxati ({total} ta)
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-zinc-950 border border-zinc-800 text-xs">
          {[
            { key: 'ALL', label: 'Barchasi' },
            { key: 'NEW', label: 'Yangi' },
            { key: 'CONTACTED', label: 'Bog‘lanildi' },
            { key: 'IN_PROGRESS', label: 'Jarayonda' },
            { key: 'CLOSED', label: 'Yopildi' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedStatus(tab.key);
                setPage(1);
              }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider transition-colors cursor-pointer text-[11px] whitespace-nowrap ${
                selectedStatus === tab.key
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Mijoz ismi, telefon, xabar..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="border border-zinc-800 bg-[#0a0c13] overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            <span className="text-xs uppercase tracking-widest font-mono">
              Arizalar yuklanmoqda...
            </span>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Inbox className="w-12 h-12 mx-auto text-zinc-700 stroke-1" />
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
              Arizalar topilmadi
            </p>
            <p className="text-xs text-zinc-600">
              Qidiruv parametrlarini o‘zgartiring yoki yangi arizalarni kuting.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                  <th className="py-3 px-4">Mijoz</th>
                  <th className="py-3 px-4">Xizmat / Mavzu</th>
                  <th className="py-3 px-4">Xabar mazmuni</th>
                  <th className="py-3 px-4">Sana</th>
                  <th className="py-3 px-4">Holati</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-xs">
                {leads.map((lead) => {
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                  return (
                    <tr
                      key={lead._id}
                      className="hover:bg-zinc-900/30 transition-colors cursor-pointer group"
                      onClick={() => {
                        setActiveLead(lead);
                        setNoteText(lead.notes || '');
                      }}
                    >
                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                          {lead.fullName}
                        </div>
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3 text-red-500" />
                          <span>{lead.phone}</span>
                        </a>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 text-zinc-300">
                        {lead.service ? (
                          <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-300">
                            {lead.service}
                          </span>
                        ) : (
                          <span className="text-zinc-600 italic text-[11px]">Umumiy</span>
                        )}
                      </td>

                      {/* Message preview */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-zinc-400 truncate text-[11px]">
                          {lead.message || '—'}
                        </p>
                        {lead.notes && (
                          <p className="text-amber-400/80 text-[10px] truncate flex items-center gap-1 mt-0.5 font-mono">
                            <span>Izoh:</span> {lead.notes}
                          </p>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-[11px] text-zinc-500 font-mono whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-zinc-600" />
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="text-[10px] text-zinc-600">
                          {new Date(lead.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead._id, e.target.value as LeadStatus)
                          }
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-950 border focus:outline-none cursor-pointer ${statusInfo.badgeClass}`}
                        >
                          <option value="NEW" className="bg-zinc-950 text-red-400">
                            Yangi
                          </option>
                          <option value="CONTACTED" className="bg-zinc-950 text-amber-400">
                            Bog‘lanildi
                          </option>
                          <option value="IN_PROGRESS" className="bg-zinc-950 text-blue-400">
                            Jarayonda
                          </option>
                          <option value="CLOSED" className="bg-zinc-950 text-zinc-400">
                            Yopildi
                          </option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-3.5 px-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setActiveLead(lead);
                              setNoteText(lead.notes || '');
                            }}
                            className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Ko‘rish va izoh yozish"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead._id)}
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

      {/* LEAD DETAILS & NOTE DRAWER / MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b0e14] border border-zinc-800 w-full max-w-xl p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-red-500 font-bold">
                    Ariza tafsilotlari
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 border ${
                      STATUS_CONFIG[activeLead.status]?.badgeClass
                    }`}
                  >
                    {STATUS_CONFIG[activeLead.status]?.label}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1">
                  {activeLead.fullName}
                </h3>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-zinc-950 p-4 border border-zinc-800/80">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">
                  Telefon
                </span>
                <a
                  href={`tel:${activeLead.phone}`}
                  className="font-mono text-red-400 hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3 h-3" />
                  <span>{activeLead.phone}</span>
                </a>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block font-bold">
                  Yuborilgan vaqti
                </span>
                <span className="font-mono text-zinc-300 mt-0.5 block">
                  {new Date(activeLead.createdAt).toLocaleString()}
                </span>
              </div>
              {activeLead.service && (
                <div className="col-span-2">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">
                    Tanlangan xizmat
                  </span>
                  <span className="text-white font-medium mt-0.5 block">
                    {activeLead.service}
                  </span>
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Mijoz Xabari:
              </label>
              <div className="p-3.5 bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                {activeLead.message || 'Xabar matni qoldirilmagan.'}
              </div>
            </div>

            {/* Admin Note */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>Admin Izohi (Ichki eslatma):</span>
                <span className="text-[10px] text-zinc-500 font-normal">
                  Mijozga ko‘rinmaydi
                </span>
              </label>
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Masalan: Mijoz bilan 14:00 da gaplashildi, shartnoma loyihasi yuborilmoqda..."
                className="w-full p-3 bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none"
              />
            </div>

            {/* Status changer & Note save */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Holat:</span>
                <select
                  value={activeLead.status}
                  onChange={(e) =>
                    handleStatusChange(activeLead._id, e.target.value as LeadStatus)
                  }
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-zinc-950 border border-zinc-800 text-white focus:outline-none cursor-pointer"
                >
                  <option value="NEW">Yangi</option>
                  <option value="CONTACTED">Bog‘lanildi</option>
                  <option value="IN_PROGRESS">Jarayonda</option>
                  <option value="CLOSED">Yopildi</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={savingNote}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {savingNote ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>Izohni Saqlash</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
