import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Search, X, QrCode, Printer, Download, Shield } from 'lucide-react';
import { Certificate } from '../../types';
import { INITIAL_CERTIFICATES } from '../../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateVerifierModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('WEBSUM-2026-8891');
  const [result, setResult] = useState<Certificate | null>(INITIAL_CERTIFICATES[0]);
  const [searched, setSearched] = useState(true);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = INITIAL_CERTIFICATES.find(
      (c) => c.certificateCode.trim().toLowerCase() === code.trim().toLowerCase()
    );
    setResult(found || null);
    setSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Certificate Verification Portal</h3>
            <p className="text-xs text-slate-500">Official Websums Software Pvt. Ltd. Credential Validator</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Enter 15-Digit Certificate ID Code:
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. WEBSUM-2026-8891"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 font-mono text-slate-900 uppercase focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
            >
              Verify Code
            </button>
          </div>
          <div className="mt-2 flex items-center space-x-2 text-[11px] text-slate-500">
            <span>Quick test codes:</span>
            <button
              type="button"
              onClick={() => { setCode('WEBSUM-2026-8891'); setResult(INITIAL_CERTIFICATES[0]); }}
              className="text-blue-600 font-mono underline hover:text-blue-800"
            >
              WEBSUM-2026-8891
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => { setCode('WEBSUM-2026-9042'); setResult(INITIAL_CERTIFICATES[1]); }}
              className="text-blue-600 font-mono underline hover:text-blue-800"
            >
              WEBSUM-2026-9042
            </button>
          </div>
        </form>

        {/* Verification Result Display */}
        {searched && (
          result ? (
            <div id="printable-certificate" className="bg-gradient-to-b from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200/60">
                <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>OFFICIALLY VERIFIED CERTIFICATE</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">ID: {result.certificateCode}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Intern Name:</span>
                    <h4 className="text-base font-extrabold text-slate-900">{result.studentName}</h4>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Specialization Domain:</span>
                    <p className="font-semibold text-blue-700">{result.domain}</p>
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <span className="text-slate-400 font-medium">Issue Date:</span>
                      <p className="font-semibold text-slate-800">{result.issueDate}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Grade Secured:</span>
                      <p className="font-bold text-emerald-600">{result.grade}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Box */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200">
                  <img
                    src={result.qrCodeUrl}
                    alt="QR Verification"
                    className="w-24 h-24 rounded"
                  />
                  <span className="text-[10px] text-slate-400 font-mono mt-1">Scan to Re-verify</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>Websums Software Pvt. Ltd. Registry Verified</span>
                </div>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center space-y-2">
              <XCircle className="w-10 h-10 text-red-500 mx-auto" />
              <h4 className="font-bold text-red-900 text-sm">Certificate Code Not Found</h4>
              <p className="text-xs text-red-600">
                The code "{code}" does not match any certificate in our official registry. Please verify the 15-digit code or contact support@websums.com.
              </p>
            </div>
          )
        )}

      </div>
    </div>
  );
};
