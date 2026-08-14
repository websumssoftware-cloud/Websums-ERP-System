import React, { useState } from 'react';
import { X, DollarSign, CreditCard, Receipt, CheckCircle, Clock } from 'lucide-react';
import { Student } from '../../types';
import { useData } from '../../context/DataContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export const RecordPaymentModal: React.FC<Props> = ({ isOpen, onClose, student }) => {
  const { updateStudentFee } = useData();
  const [paymentAmount, setPaymentAmount] = useState<number>(5000);
  const [paymentMode, setPaymentMode] = useState<'UPI / GPay' | 'Bank Transfer / NEFT' | 'Cash' | 'Credit / Debit Card'>('UPI / GPay');
  const [notes, setNotes] = useState('');

  if (!isOpen || !student) return null;

  const fee = student.feeDetails || {
    totalFee: 15000,
    paidAmount: 0,
    pendingAmount: 15000,
    status: 'Unpaid',
    transactions: []
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return;
    updateStudentFee(student.id, paymentAmount, paymentMode, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Record Fee Payment</h3>
            <p className="text-xs text-slate-500">Student Company Fee Management Record</p>
          </div>
        </div>

        {/* Student Summary Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-5 text-xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Student Name:</span>
            <span className="font-extrabold text-slate-900">{student.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium">Domain:</span>
            <span className="font-bold text-orange-600">{student.domain}</span>
          </div>
          <div className="h-px bg-slate-200 my-1"></div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2 bg-white rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Total Fee</div>
              <div className="font-black text-slate-800 text-sm">₹{fee.totalFee.toLocaleString('en-IN')}</div>
            </div>
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-[10px] text-emerald-700 font-bold uppercase">Paid So Far</div>
              <div className="font-black text-emerald-700 text-sm">₹{fee.paidAmount.toLocaleString('en-IN')}</div>
            </div>
            <div className="p-2 bg-rose-50 rounded-xl border border-rose-200">
              <div className="text-[10px] text-rose-700 font-bold uppercase">Balance Due</div>
              <div className="font-black text-rose-700 text-sm">₹{fee.pendingAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">New Payment Amount (INR ₹) *</label>
            <input
              type="number"
              required
              min={1}
              max={fee.pendingAmount > 0 ? fee.pendingAmount : 50000}
              placeholder="e.g. 5000"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-black text-base focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Payment Method / Mode *</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value as any)}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-bold focus:bg-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="UPI / GPay">UPI / GPay / PhonePe</option>
              <option value="Bank Transfer / NEFT">Bank Transfer / NEFT / RTGS</option>
              <option value="Cash">Cash Payment at Office</option>
              <option value="Credit / Debit Card">Credit / Debit Card</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Transaction Notes / Reference (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Received 2nd Installment via PhonePe UPI"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2"
            >
              <Receipt className="w-4 h-4" />
              <span>Record & Save Payment</span>
            </button>
          </div>
        </form>

        {/* Previous Transactions List */}
        {fee.transactions && fee.transactions.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-extrabold text-slate-900 mb-2.5 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Payment Transaction History ({fee.transactions.length})</span>
            </h4>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {fee.transactions.map((tx) => (
                <div key={tx.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">₹{tx.amount.toLocaleString('en-IN')} via {tx.paymentMode}</div>
                    <div className="text-[10px] text-slate-500">{tx.date} • {tx.receiptNo}</div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[9px]">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
