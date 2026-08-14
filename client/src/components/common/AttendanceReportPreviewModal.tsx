import React from 'react';
import { X, Download, FileText, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { DailyAttendanceReport } from '../../types';
import { generateAttendancePDF } from '../../utils/pdfGenerator';

interface AttendanceReportPreviewModalProps {
  report: DailyAttendanceReport | null;
  onClose: () => void;
}

export const AttendanceReportPreviewModal: React.FC<AttendanceReportPreviewModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  const handleDownload = async () => {
    await generateAttendancePDF(report);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
              <FileText className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Attendance Report Preview</h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">Previewing data before generating final PDF document</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-slate-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Date</span>
              </div>
              <p className="font-bold text-slate-900">{new Date(report.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-slate-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Batch Name</span>
              </div>
              <p className="font-bold text-slate-900">{report.batch}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-slate-500 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Submitted By</span>
              </div>
              <p className="font-bold text-slate-900">{report.mentorName}</p>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Total Interns</p>
              <p className="text-3xl font-black text-slate-800">{report.totalStudents}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
              <div className="flex items-center space-x-1.5 text-emerald-600 mb-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <p className="text-[11px] font-extrabold uppercase tracking-widest">Present</p>
              </div>
              <p className="text-3xl font-black text-emerald-700">{report.presentCount}</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col items-center justify-center text-center">
              <div className="flex items-center space-x-1.5 text-rose-600 mb-1">
                <XCircle className="w-3.5 h-3.5" />
                <p className="text-[11px] font-extrabold uppercase tracking-widest">Absent</p>
              </div>
              <p className="text-3xl font-black text-rose-700">{report.absentCount}</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center justify-center text-center">
              <div className="flex items-center space-x-1.5 text-amber-600 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <p className="text-[11px] font-extrabold uppercase tracking-widest">Late</p>
              </div>
              <p className="text-3xl font-black text-amber-700">{report.lateCount}</p>
            </div>
          </div>

          {/* Student Records Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Detailed Student Log</h3>
            </div>
            <div className="overflow-x-auto max-h-64">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Student Name</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Domain</th>
                    <th className="py-3 px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {report.records.map((rec, idx) => (
                    <tr key={rec.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="py-2.5 px-4 font-mono text-xs text-slate-500">{rec.studentId.replace('std-', '')}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-800">{rec.studentName}</td>
                      <td className="py-2.5 px-4 text-slate-600 text-xs">{rec.domain}</td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                          rec.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                          rec.status === 'Absent' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-white flex justify-end space-x-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 transition-all text-sm flex items-center space-x-2 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download Official PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
