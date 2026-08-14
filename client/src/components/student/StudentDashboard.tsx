import React, { useState } from 'react';
import { 
  GraduationCap, 
  Video, 
  BookOpen, 
  FileText, 
  Award, 
  Bot, 
  Briefcase, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Download, 
  Send, 
  Printer, 
  Sparkles, 
  Play, 
  MessageSquare,
  FileCheck,
  TrendingUp,
  UserCheck,
  Zap,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_DOMAINS, INITIAL_LIVE_CLASSES, INITIAL_LECTURES, INITIAL_ASSIGNMENTS, SAMPLE_QUIZ, INITIAL_JOBS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { assignments, submitAssignment, attendanceReports, liveClasses, recordedLectures } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'lectures' | 'assignments' | 'quiz' | 'certificate' | 'resume' | 'jobs' | 'ai-mentor' | 'chat'>('overview');
  
  // Calculate Dynamic Attendance Rate based on reports
  const studentRecords = attendanceReports.flatMap(r => r.records.filter(rec => rec.studentName === user?.name || rec.studentName === 'Aarav Sharma'));
  let attendanceRate = 100;
  if (studentRecords.length > 0) {
    const presentOrLate = studentRecords.filter(r => r.status === 'Present' || r.status === 'Late').length;
    attendanceRate = Math.round((presentOrLate / studentRecords.length) * 100);
  } else {
    attendanceRate = 96; // Fallback mock value
  }

  const [submittedAssignments, setSubmittedAssignments] = useState<string[]>([]);
  
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  // Resume Builder State
  const [resumeData, setResumeData] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    college: 'IIT Delhi',
    domain: 'MERN Stack Developer',
    summary: 'Passionate Full Stack MERN engineer trained at Websums Software Pvt. Ltd. Proficient in React 19, TypeScript, Node.js, Express, and MongoDB Atlas.',
    skills: 'React 19, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, Redux Toolkit, Git, REST APIs'
  });

  // Video Modal State
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const [submissionLinks, setSubmissionLinks] = useState<Record<string, string>>({});
  const [assignmentSubmitted, setAssignmentSubmitted] = useState<string | null>(null);

  const handleAssignmentSubmit = (id: string) => {
    const link = submissionLinks[id] || '';
    submitAssignment(id, user?.name || 'Aarav Sharma', link);
    setSubmittedAssignments([...submittedAssignments, id]);
    setAssignmentSubmitted(id);
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => setAssignmentSubmitted(null), 3000);
  };

  // AI Mentor Chat Messages
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { sender: 'AI', text: 'Hello Aarav! I am your Websum AI Technical Mentor. How can I assist you with React 19, Node.js, or your internship assignments today?' }
  ]);

  // Handle Quiz Submission
  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === SAMPLE_QUIZ.questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => (prev || 0) + 1);
    }
    if (currentQuestionIndex + 1 < SAMPLE_QUIZ.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz Finished! Trigger Confetti
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;
    const userMsg = { sender: 'User', text: aiChatInput };
    setAiMessages((prev) => [...prev, userMsg]);
    const input = aiChatInput;
    setAiChatInput('');

    setTimeout(() => {
      let reply = "That's a great technical question! In MERN Stack development, best practice is to separate your controller logic into service layers and use Mongoose aggregation pipelines for complex data queries.";
      if (input.toLowerCase().includes('react')) {
        reply = "In React 19, standard state management can be streamlined using server actions or the new `use` hook to resolve promises directly inside components!";
      } else if (input.toLowerCase().includes('jwt') || input.toLowerCase().includes('auth')) {
        reply = "For enterprise security, store Access Tokens in memory and Refresh Tokens in HttpOnly secure cookies to prevent XSS attacks!";
      }
      setAiMessages((prev) => [...prev, { sender: 'AI', text: reply }]);
    }, 1000);
  };

  const domainObj = INITIAL_DOMAINS[0];

  return (
    <div className="space-y-6">
      
      {/* Student Top Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-400/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-orange-950/80 text-xs font-extrabold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-amber-900" />
            <span>Intern Learning Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Welcome back, {user?.name || 'Aarav Sharma'}! 👋</h2>
          <p className="text-xs text-orange-950/90 mt-1 font-medium">Domain: <span className="font-bold underline">{domainObj.name}</span> • Batch W-2026-A</p>
        </div>

        <div className="flex items-center space-x-4 bg-white/25 px-5 py-3 rounded-2xl backdrop-blur-md border border-white/40 text-xs font-semibold shadow-sm">
          <div className="text-center">
            <div className="text-white font-black text-xl">96%</div>
            <div className="text-[10px] text-orange-950/90 font-bold uppercase">Attendance</div>
          </div>
          <div className="h-8 w-px bg-white/30"></div>
          <div className="text-center">
            <div className="text-white font-black text-xl">95%</div>
            <div className="text-[10px] text-orange-950/90 font-bold uppercase">Profile Complete</div>
          </div>
        </div>
      </div>

      {/* Student Navigation Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'overview' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setActiveTab('syllabus')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'syllabus' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📚 Syllabus & Progress
        </button>
        <button
          onClick={() => setActiveTab('lectures')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'lectures' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📹 Lectures & Notes
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'assignments' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📝 Assignments ({assignments.length})
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'quiz' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ⚡ MCQ Quiz Playground
        </button>
        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'certificate' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📜 Certificate Hub
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'resume' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          📄 Resume Builder
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'jobs' ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm shadow-orange-300/40' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          💼 Job Portal & PPOs
        </button>
        <button
          onClick={() => setActiveTab('ai-mentor')}
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            activeTab === 'ai-mentor' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
          }`}
        >
          🤖 Websum AI Mentor
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Live Class Launcher */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                  <span className="text-xs font-bold text-slate-900">NEXT LIVE CLASS SCHEDULED</span>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {liveClasses.length > 0 ? liveClasses[0].meetingPlatform + ' Live' : 'No Classes Scheduled'}
                </span>
              </div>
              
              {liveClasses.length > 0 ? (
                <>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{liveClasses[0].title}</h3>
                    <p className="text-xs text-slate-600 mt-1">Instructor: {liveClasses[0].mentorName} • Duration: {liveClasses[0].durationMinutes} Mins</p>
                    <p className="text-xs font-semibold text-blue-700 mt-2">🕒 Time: {liveClasses[0].date} at {liveClasses[0].time}</p>
                  </div>
                  <a
                    href={liveClasses[0].meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center justify-center space-x-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Live Lecture Room</span>
                  </a>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm font-medium text-slate-500">No upcoming live classes at the moment.</p>
                </div>
              )}
            </div>

            {/* Quick Progress Summary */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Course Milestones</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Syllabus Completed</span>
                    <span className="text-blue-600">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-[65%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Attendance Rate</span>
                    <span className={`font-black ${attendanceRate >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>{attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 rounded-full transition-all duration-1000 ease-out ${attendanceRate >= 75 ? 'bg-emerald-600' : 'bg-rose-500'}`} style={{ width: `${attendanceRate}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Assignments Submitted</span>
                    <span className="text-purple-600">8 / 8</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-[100%]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SYLLABUS TAB */}
      {activeTab === 'syllabus' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900">{domainObj.name} Weekly Curriculum</h3>
          <div className="space-y-3">
            {domainObj.syllabus.map((w) => (
              <div key={w.week} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">Week {w.week}: {w.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                    ✓ Completed
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {w.topics.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LECTURES & NOTES TAB */}
      {activeTab === 'lectures' && (
        <div className="space-y-8">
          
          {/* Section 1: Live Interactive Classes (Zoom / Google Meet) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span>Live Interactive Classes (Zoom & Google Meet)</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Join live instructor sessions and interactive Q&A</p>
              </div>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200/80">
                {liveClasses.length} Active Classes
              </span>
            </div>

            {liveClasses.length === 0 ? (
              <div className="text-center py-6 bg-slate-50/60 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500">No live classes scheduled right now.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveClasses.map((lc) => (
                  <div key={lc.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border ${
                          lc.meetingPlatform === 'Zoom' ? 'bg-sky-100 text-sky-800 border-sky-200' : 'bg-rose-100 text-rose-800 border-rose-200'
                        }`}>
                          {lc.meetingPlatform === 'Zoom' ? '🔷 Zoom Meeting' : '🔴 Google Meet'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">{lc.batch}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-xs">{lc.title}</h4>
                      <p className="text-[11px] text-slate-600 font-medium">Mentor: {lc.mentorName} • 🕒 {lc.date} at {lc.time}</p>
                    </div>

                    <a
                      href={lc.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Live {lc.meetingPlatform} Class</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Recorded Video Lectures & Materials */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
                <Play className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Recorded Video Lectures & Study Materials ({recordedLectures.length})</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Watch past class recordings, Google Drive links, and YouTube video tutorials</p>
            </div>

            {recordedLectures.length === 0 ? (
              <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                 <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                 <h4 className="text-sm font-bold text-slate-600">No recorded lectures available yet</h4>
                 <p className="text-xs text-slate-400 mt-1">Your mentor will upload class recordings here soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recordedLectures.map((lec) => (
                  <div key={lec.id} className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
                    <div className="relative">
                      <img src={lec.thumbnailUrl} alt={lec.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <button
                        onClick={() => setPlayingVideo(lec.videoUrl)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2 text-xs bg-white flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">Week {lec.week}</span>
                        <h4 className="font-bold text-slate-900 mt-1">{lec.title}</h4>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px] pt-2 border-t border-slate-100 mt-2">
                        <span>Duration: {lec.duration}</span>
                        <button
                          onClick={() => setPlayingVideo(lec.videoUrl)}
                          className="font-extrabold text-orange-600 hover:text-orange-700 underline"
                        >
                          Watch Video ▶
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ASSIGNMENTS TAB */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Your Assignments</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Complete tasks and submit your GitHub repositories or PDF reports.</p>
            </div>
            <div className="flex items-center space-x-2 text-sm font-bold bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
              <span className="text-orange-900">Progress:</span>
              <span className="text-orange-600 text-base">{submittedAssignments.length} / {assignments.length}</span>
            </div>
          </div>

          <div className="space-y-4">
            {assignments.map((asg) => {
              const isSubmitted = submittedAssignments.includes(asg.id);
              return (
                <div key={asg.id} className={`group bg-white p-6 rounded-3xl border ${isSubmitted ? 'border-emerald-200/70' : 'border-slate-200'} shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden`}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSubmitted ? 'bg-gradient-to-b from-emerald-400 to-emerald-500' : 'bg-gradient-to-b from-orange-400 to-amber-500'} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border ${isSubmitted ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100/50'}`}>
                        {isSubmitted ? <CheckCircle2 className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-black text-slate-900">{asg.title}</h3>
                        <div className="flex flex-wrap gap-2 text-[11px] font-bold mt-1.5">
                          <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/60">{asg.domain}</span>
                          <span className="flex items-center space-x-1 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                            <Clock className="w-3 h-3" />
                            <span>Due: {asg.dueDate}</span>
                          </span>
                          <span className="flex items-center space-x-1 text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                            <Award className="w-3 h-3" />
                            <span>Marks: {asg.maxMarks}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {isSubmitted && (
                      <div className="flex items-center space-x-3 sm:self-start">
                        <span className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-black rounded-xl border border-emerald-200/80 text-xs flex items-center space-x-1.5 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Successfully Submitted</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pl-[64px]">
                    <p className="text-[12px] text-slate-600 font-medium leading-relaxed max-w-3xl">{asg.description}</p>
                    
                    {asg.pdfFileName && (
                      <div className="mt-3 flex">
                        <a href="#" className="flex items-center space-x-2 text-[11px] font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl transition-all border border-orange-200/60 shadow-sm active:scale-95">
                          <Download className="w-3.5 h-3.5" />
                          <span>{asg.pdfFileName}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {!isSubmitted && (
                    <div className="pt-4 mt-2 border-t border-slate-100 pl-[64px] flex flex-col sm:flex-row items-center gap-3">
                      <input 
                        type="text" 
                        value={submissionLinks[asg.id] || ''}
                        onChange={(e) => setSubmissionLinks({ ...submissionLinks, [asg.id]: e.target.value })}
                        placeholder="Paste your GitHub Repo link or Google Drive link..." 
                        className="flex-1 w-full px-4 py-3 text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:font-medium placeholder:text-slate-400"
                      />
                      <button
                        onClick={() => handleAssignmentSubmit(asg.id)}
                        className="w-full sm:w-auto px-6 py-3 font-extrabold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                      >
                        {assignmentSubmitted === asg.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 animate-ping" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Work</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            
            {assignments.length === 0 && (
              <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-slate-200/50">
                <div className="w-16 h-16 bg-white shadow-sm text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-700">No Assignments Yet</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Your mentor hasn't assigned any tasks for this domain.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MCQ QUIZ PLAYGROUND */}
      {activeTab === 'quiz' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">{SAMPLE_QUIZ.title}</h3>
              <p className="text-xs text-slate-500">Domain: {SAMPLE_QUIZ.domain}</p>
            </div>
            <div className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-xl">
              Question {currentQuestionIndex + 1} / {SAMPLE_QUIZ.questions.length}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900">
              {SAMPLE_QUIZ.questions[currentQuestionIndex].question}
            </h4>

            <div className="space-y-2">
              {SAMPLE_QUIZ.questions[currentQuestionIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                    selectedAnswer === idx
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <div className="text-xs font-bold text-emerald-600">
                {score !== null && `Current Score: ${score}`}
              </div>
              <button
                disabled={selectedAnswer === null}
                onClick={handleNextQuestion}
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm"
              >
                {currentQuestionIndex + 1 === SAMPLE_QUIZ.questions.length ? 'Submit Quiz' : 'Next Question →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE HUB */}
      {activeTab === 'certificate' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-card max-w-3xl mx-auto space-y-6 text-center" id="printable-certificate">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide">Certificate of Internship Completion</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">WEBSUMS SOFTWARE PVT. LTD. • BANGALORE</p>
          </div>

          <div className="py-4 space-y-3">
            <p className="text-xs text-slate-600">This is to officially certify that</p>
            <h3 className="text-2xl font-black text-blue-700 underline decoration-2 underline-offset-4">{user?.name || 'Aarav Sharma'}</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              has successfully completed the intensive enterprise internship in <span className="font-bold text-slate-900">MERN Stack Development</span> with distinction grade (A+) during Batch W-2026-A.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-200 text-xs">
            <div className="text-left font-mono text-slate-500 space-y-1">
              <div>Certificate Code: <strong className="text-slate-900">WEBSUM-2026-8891</strong></div>
              <div>Issue Date: July 15, 2026</div>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=WEBSUM-2026-8891" alt="QR Code" className="w-16 h-16 rounded border border-slate-200" />
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm flex items-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME BUILDER */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <h3 className="text-base font-bold text-slate-900">Interactive Resume Form</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={resumeData.domain}
                  onChange={(e) => setResumeData({ ...resumeData, domain: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary Statement</label>
                <textarea
                  rows={3}
                  value={resumeData.summary}
                  onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200"
                ></textarea>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technical Skills</label>
                <textarea
                  rows={2}
                  value={resumeData.skills}
                  onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                  className="w-full p-2 rounded-xl border border-slate-200"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Resume Live Preview Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4 font-sans text-xs">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-extrabold text-slate-900">{resumeData.name}</h2>
              <p className="text-xs font-bold text-blue-600">{resumeData.domain}</p>
              <p className="text-[11px] text-slate-500">{resumeData.email} • {resumeData.phone} • {resumeData.college}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Professional Summary</h4>
              <p className="text-slate-600 leading-relaxed">{resumeData.summary}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Core Competencies</h4>
              <p className="text-slate-700 font-semibold">{resumeData.skills}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase mb-1">Internship Experience</h4>
              <div className="font-bold text-slate-900">Websums Software Pvt. Ltd. (Bangalore)</div>
              <p className="text-slate-500 text-[11px]">Full Stack MERN Developer Intern • June 2026 - Present</p>
            </div>
          </div>
        </div>
      )}

      {/* JOB PORTAL & PPOS */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
            <h3 className="text-base font-bold text-slate-900 mb-1">Placement Partner Hiring Opportunities</h3>
            <p className="text-xs text-slate-500">Apply with your Websums verified credential score</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_JOBS.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                    {job.type}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{job.roleTitle}</h4>
                  <p className="text-xs font-semibold text-blue-600">{job.companyName}</p>
                  <p className="text-[11px] text-slate-500">{job.location} • {job.salaryPackage}</p>
                </div>
                <button className="w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm">
                  1-Click Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WEBSUM AI MENTOR */}
      {activeTab === 'ai-mentor' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card max-w-3xl mx-auto overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 bg-purple-900 text-white flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Websum AI Mentor Assistant</h3>
              <p className="text-[10px] text-purple-200">Powered by Enterprise LLM • Available 24/7</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {aiMessages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'User' ? 'bg-blue-600 text-white font-medium' : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAiSend} className="p-3 border-t border-slate-200 flex space-x-2 bg-white">
            <input
              type="text"
              placeholder="Ask a technical question about React 19, Node.js, JWT..."
              value={aiChatInput}
              onChange={(e) => setAiChatInput(e.target.value)}
              className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
            />
            <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-700">
              Send
            </button>
          </form>
        </div>
      )}

      {/* Video Modal Player */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
          <div className="bg-slate-950 rounded-2xl max-w-4xl w-full p-2 relative shadow-2xl border border-slate-800">
            <button onClick={() => setPlayingVideo(null)} className="absolute -top-4 -right-4 text-white text-lg z-50 bg-rose-600 hover:bg-rose-700 rounded-full w-10 h-10 shadow-xl flex items-center justify-center transition-transform hover:scale-110 border-2 border-slate-900">
              ✕
            </button>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {playingVideo.match(/\.(mp4|webm|ogg)$/i) || playingVideo.includes('w3schools.com') ? (
                <video src={playingVideo} controls autoPlay className="w-full h-full object-contain"></video>
              ) : playingVideo.includes('youtube.com') || playingVideo.includes('youtu.be') ? (
                <iframe 
                  src={playingVideo.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : playingVideo.includes('drive.google.com') ? (
                 <iframe 
                  src={playingVideo.replace(/\/view.*/, '/preview')} 
                  className="w-full h-full" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                ></iframe>
              ) : playingVideo.includes('meet.google.com') ? (
                <div className="w-full h-full relative">
                  <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1.5 rounded-lg text-white text-xs font-bold flex items-center space-x-2 backdrop-blur-md border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span>Google Meet Recording Simulator</span>
                  </div>
                  <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay className="w-full h-full object-contain"></video>
                </div>
              ) : (
                <iframe 
                  src={playingVideo} 
                  className="w-full h-full bg-white" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
