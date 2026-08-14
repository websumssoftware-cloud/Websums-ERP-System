import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/navbar/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { DomainGrid } from './components/landing/DomainGrid';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { CeoDashboard } from './components/ceo/CeoDashboard';
import { MentorDashboard } from './components/mentor/MentorDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { CertificateVerifierModal } from './components/common/CertificateVerifierModal';
import { ApplicationModal } from './components/landing/ApplicationModal';
import { AuthModal } from './components/common/AuthModal';
import { ShieldCheck, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { user, role } = useAuth();
  const [activeView, setActiveView] = useState<string>('landing'); // 'landing' | 'dashboard'
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<'CEO' | 'Mentor' | 'Student'>('Student');
  const [showVerifierModal, setShowVerifierModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);

  // Auto-switch view to dashboard when user logs in, or landing when user logs out
  React.useEffect(() => {
    if (user && activeView === 'landing') {
      // Keep on landing unless they request dashboard, but if user logs in, take to dashboard
    }
  }, [user]);

  const handleOpenAuthForRole = (targetRole: 'CEO' | 'Mentor' | 'Student') => {
    setAuthDefaultRole(targetRole);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={(roleFocus) => {
          if (roleFocus) setAuthDefaultRole(roleFocus);
          setShowAuthModal(true);
        }}
        onOpenVerifier={() => setShowVerifierModal(true)}
        onOpenAppForm={() => setShowAppModal(true)}
        activeView={activeView}
        setActiveView={setActiveView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: PUBLIC LANDING WEBSITE */}
        {activeView === 'landing' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <HeroSection
              onApply={() => setShowAppModal(true)}
              onVerify={() => setShowVerifierModal(true)}
            />
            <DomainGrid
              onSelectDomain={() => setShowAppModal(true)}
              onApply={() => setShowAppModal(true)}
            />
            <TestimonialsSection />
          </div>
        )}

        {/* VIEW 2: ROLE-BASED PROTECTED DASHBOARDS */}
        {activeView === 'dashboard' && (
          <div className="animate-in fade-in duration-300">
            {user && role === 'CEO' && <CeoDashboard />}
            {user && role === 'Mentor' && <MentorDashboard />}
            {user && role === 'Student' && <StudentDashboard />}
            
            {/* Protected Access Card when NOT Logged In */}
            {(!user || role === 'Guest') && (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl max-w-xl mx-auto text-center space-y-6 my-12">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                    Authentication Required
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-3">Access Portal Panel</h2>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                    Access to CEO, Mentor, and Student workspace dashboards is strictly restricted to authenticated users. Please sign in to launch your panel.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => handleOpenAuthForRole('CEO')}
                    className="p-3 bg-slate-50 hover:bg-orange-50 rounded-2xl border border-slate-200 hover:border-orange-300 text-xs font-bold text-slate-800 transition-all flex flex-col items-center space-y-1"
                  >
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                    <span>CEO Login</span>
                  </button>
                  <button
                    onClick={() => handleOpenAuthForRole('Mentor')}
                    className="p-3 bg-slate-50 hover:bg-orange-50 rounded-2xl border border-slate-200 hover:border-orange-300 text-xs font-bold text-slate-800 transition-all flex flex-col items-center space-y-1"
                  >
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span>Mentor Login</span>
                  </button>
                  <button
                    onClick={() => handleOpenAuthForRole('Student')}
                    className="p-3 bg-slate-50 hover:bg-orange-50 rounded-2xl border border-slate-200 hover:border-orange-300 text-xs font-bold text-slate-800 transition-all flex flex-col items-center space-y-1"
                  >
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                    <span>Student Login</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full py-3.5 font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Open Sign In Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultRole={authDefaultRole}
        onSuccess={handleAuthSuccess}
      />
      <CertificateVerifierModal
        isOpen={showVerifierModal}
        onClose={() => setShowVerifierModal(false)}
      />
      <ApplicationModal
        isOpen={showAppModal}
        onClose={() => setShowAppModal(false)}
      />
    </div>
  );
};

import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainContent />
      </DataProvider>
    </AuthProvider>
  );
}
