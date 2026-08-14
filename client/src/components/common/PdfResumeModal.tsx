import React from 'react';
import { X, FileText, Download, ExternalLink, ShieldCheck, UserCheck, GraduationCap, CheckCircle2, XCircle } from 'lucide-react';
import { StudentApplication } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  application: StudentApplication | null;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const PdfResumeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  application,
  onAccept,
  onReject
}) => {
  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-slate-900">{application.applicantName}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    application.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : application.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {application.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {application.college} • {application.domain} • Applied on {application.appliedDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Contact Email</div>
            <div className="font-semibold text-slate-900 truncate mt-0.5">{application.email}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Phone Number</div>
            <div className="font-semibold text-slate-900 mt-0.5">{application.phone}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Qualification</div>
            <div className="font-semibold text-slate-900 mt-0.5">{application.qualification || 'B.Tech / MCA Candidate'}</div>
          </div>
        </div>

        {application.statement && (
          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60 mb-4 text-xs text-slate-700">
            <span className="font-bold text-amber-900">Applicant Statement: </span>"{application.statement}"
          </div>
        )}

        {/* Interactive PDF Resume Viewer Area */}
        <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 p-4 mb-4 flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-full h-full min-h-[280px] bg-white rounded-xl border border-slate-200 shadow-inner flex flex-col items-center justify-center p-6 text-center">
            <FileText className="w-16 h-16 text-orange-500 mb-3 animate-pulse" />
            <h4 className="text-base font-extrabold text-slate-900">{application.resumeFileName}</h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
              PDF Resume verified & scanned by Websums Admission Security Portal.
            </p>

            <div className="flex items-center space-x-3">
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md shadow-orange-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Full PDF Document</span>
              </a>
              <a
                href={application.resumeUrl}
                download
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-all"
          >
            Close Viewer
          </button>

          {(onAccept || onReject) && (
            <div className="flex items-center space-x-2">
              {onReject && (
                <button
                  onClick={() => {
                    onReject(application.id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Application</span>
                </button>
              )}
              {onAccept && (
                <button
                  onClick={() => {
                    onAccept(application.id);
                    onClose();
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept & Enroll Student</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
