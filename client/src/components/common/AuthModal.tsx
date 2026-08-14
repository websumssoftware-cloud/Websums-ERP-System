import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { X, Lock, Mail, UserCheck, ShieldCheck, GraduationCap, Key, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: Role;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, defaultRole = 'CEO', onSuccess }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [selectedRole, setSelectedRole] = useState<Role>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Synchronize role if defaultRole changes when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedRole(defaultRole);
      const emailMap: Record<Role, string> = {
        CEO: 'ceo@websums.com',
        Mentor: 'mentor@websums.com',
        Student: 'student@websums.com'
      };
      setEmail(emailMap[defaultRole]);
    }
  }, [isOpen, defaultRole]);

  if (!isOpen) return null;

  const handleDemoQuickLogin = (role: Role) => {
    const emailMap: Record<Role, string> = {
      CEO: 'ceo@websums.com',
      Mentor: 'mentor@websums.com',
      Student: 'student@websums.com'
    };
    const nameMap: Record<Role, string> = {
      CEO: 'Subhasis Roy (CEO)',
      Mentor: 'Dr. Rajesh Verma',
      Student: 'Aarav Sharma'
    };
    login({
      id: `usr-${role.toLowerCase()}-1`,
      name: nameMap[role],
      email: emailMap[role],
      role: role,
      phone: '+91 98000 00000'
    });
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'forgot') {
      setOtpSent(true);
      return;
    }
    login({
      id: `usr-${Date.now()}`,
      name: name || `${selectedRole} User`,
      email: email,
      role: selectedRole,
      phone: '+91 98000 00000'
    });
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <img src="/logo.png" alt="Websums Logo" className="w-14 h-14 object-contain drop-shadow-md mx-auto mb-2" />
          <h3 className="text-xl font-extrabold text-slate-900">
            {tab === 'login' && 'Sign In to Enterprise Portal'}
            {tab === 'register' && 'Create Intern / Mentor Account'}
            {tab === 'forgot' && 'Reset Password & OTP'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Websums Software Pvt. Ltd.</p>
        </div>

        {/* Instant One-Click Demo Role Login Buttons */}
        <div className="mb-6 bg-orange-50/50 p-3 rounded-2xl border border-orange-100">
          <div className="text-[11px] font-bold text-orange-700 uppercase tracking-wider mb-2 text-center flex items-center justify-center space-x-1">
            <Key className="w-3.5 h-3.5" />
            <span>Quick Role Logins</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoQuickLogin('CEO')}
              className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-xs font-bold ${
                selectedRole === 'CEO' ? 'bg-white border-orange-400 text-orange-700 shadow-sm' : 'bg-white/80 border-slate-200 text-slate-700 hover:border-orange-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-600 mb-1" />
              <span>CEO</span>
            </button>
            <button
              onClick={() => handleDemoQuickLogin('Mentor')}
              className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-xs font-bold ${
                selectedRole === 'Mentor' ? 'bg-white border-orange-400 text-orange-700 shadow-sm' : 'bg-white/80 border-slate-200 text-slate-700 hover:border-orange-300'
              }`}
            >
              <UserCheck className="w-4 h-4 text-blue-600 mb-1" />
              <span>Mentor</span>
            </button>
            <button
              onClick={() => handleDemoQuickLogin('Student')}
              className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-xs font-bold ${
                selectedRole === 'Student' ? 'bg-white border-orange-400 text-orange-700 shadow-sm' : 'bg-white/80 border-slate-200 text-slate-700 hover:border-orange-300'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600 mb-1" />
              <span>Student</span>
            </button>
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-[10px] text-slate-400 uppercase font-semibold">
            <span className="bg-white px-2">or credentials login</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {tab === 'register' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 focus:bg-white"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Role Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['CEO', 'Mentor', 'Student'] as Role[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => {
                    setSelectedRole(r);
                    const emailMap: Record<Role, string> = {
                      CEO: 'ceo@websums.com',
                      Mentor: 'mentor@websums.com',
                      Student: 'student@websums.com'
                    };
                    setEmail(emailMap[r]);
                  }}
                  className={`py-2 rounded-xl border font-bold text-xs transition-all ${
                    selectedRole === r
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@websums.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 focus:bg-white"
              />
            </div>
          </div>

          {tab !== 'forgot' && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>
          )}

          {tab === 'forgot' && otpSent && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] font-semibold">
              ✅ Simulated OTP code <strong>(884-912)</strong> sent to {email}. Enter OTP to reset password.
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>{tab === 'login' ? 'Sign In Now' : tab === 'register' ? 'Register Account' : 'Send OTP Reset'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          {tab === 'login' ? (
            <>
              <button onClick={() => setTab('forgot')} className="hover:text-orange-600 font-medium">Forgot Password?</button>
              <button onClick={() => setTab('register')} className="font-bold text-orange-600 hover:underline">New Account?</button>
            </>
          ) : (
            <button onClick={() => setTab('login')} className="font-bold text-orange-600 hover:underline mx-auto">
              Back to Sign In
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
