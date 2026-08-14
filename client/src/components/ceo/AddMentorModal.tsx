import React, { useState } from 'react';
import { X, UserPlus, Shield, Check } from 'lucide-react';
import { INITIAL_DOMAINS } from '../../data/mockData';
import { useData } from '../../context/DataContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMentorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addMentor } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    assignedDomains: [INITIAL_DOMAINS[0].name],
    batch: 'Batch W-2026-A'
  });

  if (!isOpen) return null;

  const handleDomainToggle = (domainName: string) => {
    setFormData((prev) => {
      const exists = prev.assignedDomains.includes(domainName);
      if (exists) {
        if (prev.assignedDomains.length === 1) return prev; // Keep at least one
        return { ...prev, assignedDomains: prev.assignedDomains.filter((d) => d !== domainName) };
      } else {
        return { ...prev, assignedDomains: [...prev.assignedDomains, domainName] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMentor({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      assignedDomains: formData.assignedDomains,
      activeBatches: [formData.batch],
      status: 'Active'
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      assignedDomains: [INITIAL_DOMAINS[0].name],
      batch: 'Batch W-2026-A'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Add New Mentor</h3>
            <p className="text-xs text-slate-500">Executive Panel • Websums Software Pvt. Ltd.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mentor Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Ramesh Kulkarni"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. ramesh.k@websums.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98000 77889"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Batch Allocation *</label>
              <select
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:bg-white focus:border-orange-500 focus:outline-none"
              >
                <option value="Batch W-2026-A">Batch W-2026-A (Current Active)</option>
                <option value="Batch W-2026-B">Batch W-2026-B</option>
                <option value="Batch W-2026-C">Batch W-2026-C</option>
                <option value="Batch W-2026-D">Batch W-2026-D</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Assigned Internship Domains (Select 1 or more)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto p-2.5 border border-slate-200 rounded-2xl bg-slate-50">
              {INITIAL_DOMAINS.map((dom) => {
                const selected = formData.assignedDomains.includes(dom.name);
                return (
                  <div
                    key={dom.id}
                    onClick={() => handleDomainToggle(dom.name)}
                    className={`p-2.5 rounded-xl border text-[11px] font-medium cursor-pointer transition-all flex items-center justify-between ${
                      selected
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <span className="truncate pr-1">{dom.name}</span>
                    {selected && <Check className="w-3.5 h-3.5 flex-shrink-0 text-white" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Confirm & Register Mentor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
