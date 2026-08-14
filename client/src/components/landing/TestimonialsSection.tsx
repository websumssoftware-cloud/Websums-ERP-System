import React, { useState } from 'react';
import { Star, Quote, Building, ChevronLeft, ChevronRight, Send, MessageSquarePlus } from 'lucide-react';

const INITIAL_TESTIMONIALS = [
    {
      name: 'Aarav Sharma',
      role: 'Full Stack Engineer at Google India',
      domain: 'MERN Stack Development Intern',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      text: 'The internship at Websums Software Pvt. Ltd. was game-changing! Building actual microservice architectures with live code reviews helped me crack Google’s technical interviews.'
    },
    {
      name: 'Sneha Patel',
      role: 'Product Designer at Microsoft',
      domain: 'UI/UX Design Intern',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'Extremely structured curriculum with weekly design sprints. The QR verifiable certificate helped me gain immense credibility during recruiters outreach.'
    },
    {
      name: 'Rohan Kulkarni',
      role: 'DevOps Engineer at Amazon Cloud',
      domain: 'DevOps & AWS Cloud Intern',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Hands-on practice with Kubernetes clusters and AWS infrastructure pipelines. Mentors were available in live chat every day!'
    }
  ];

  const partners = [
    'Microsoft', 'Google Cloud', 'Amazon Web Services', 'Websums Software', 'Infosys', 'TCS Digital', 'Wipro Enterprise', 'Accenture'
  ];

export const TestimonialsSection: React.FC = () => {
  const [allTestimonials, setAllTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allTestimonials.length / itemsPerPage);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    domain: '',
    text: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    const newTestimonial = {
      ...formData,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&color=fff&size=150`,
    };

    setAllTestimonials([newTestimonial, ...allTestimonials]);
    setFormData({ name: '', role: '', domain: '', text: '' });
    setCurrentPage(0);
  };

  const nextPage = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  const prevPage = () => setCurrentPage((p) => Math.max(0, p - 1));

  const visibleTestimonials = allTestimonials.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/80 to-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Placement Partners Marquee / Grid */}
        <div className="text-center space-y-6">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            OUR INTERNS ARE PLACED AT WORLD-CLASS ENTERPRISES
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 opacity-95">
            {partners.map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200/80 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 font-extrabold text-sm text-slate-600 hover:text-blue-600 group cursor-default">
                <Building className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Loved by <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">10,000+</span> Students & Engineers
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Read real stories from our alumni who secured high-paying tech roles.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
            {visibleTestimonials.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[1.5rem] p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="w-10 h-10 text-blue-50 absolute top-4 right-4 group-hover:text-blue-100 group-hover:scale-110 transition-all duration-300" />
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed font-medium">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 mt-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50 group-hover:ring-blue-50 transition-all duration-300"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{item.name}</h4>
                    <p className="text-[11px] font-bold text-blue-600 mt-0.5">{item.role}</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">{item.domain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 pt-10">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 0}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-sm font-bold text-slate-500">
                Page {currentPage + 1} of {totalPages}
              </div>
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages - 1}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Add Testimonial Form */}
        <div className="max-w-2xl mx-auto mt-16 bg-white rounded-[2rem] p-8 border border-slate-200/80 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10"></div>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shadow-sm">
              <MessageSquarePlus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Share Your Experience</h3>
              <p className="text-xs text-slate-500 font-medium">Add a live testimonial right now</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Role</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" 
                  placeholder="e.g. SDE at Microsoft" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Internship Domain</label>
              <input 
                type="text" 
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value})}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none" 
                placeholder="e.g. Cloud Computing Intern" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Story *</label>
              <textarea 
                required
                rows={3}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none" 
                placeholder="How was your experience?" 
              ></textarea>
            </div>
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <span>Post Testimonial</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};
