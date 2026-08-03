import { motion } from 'motion/react';
import { Sparkles, Mail, Phone, Heart, Send, MessageSquare, ArrowUpRight, Award, Film, CheckCircle } from 'lucide-react';

interface EndOutroAnimationProps {
  onOpenHireModal: () => void;
  onOpenUploadModal: () => void;
}

export default function EndOutroAnimation({
  onOpenHireModal,
  onOpenUploadModal,
}: EndOutroAnimationProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden border-t border-white/10 z-20">
      {/* Background Radial Glow & Animated Light Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-indigo-600/30 rounded-full blur-[180px]"
        />
        
        {/* Animated Light Sweep Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-8 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>PROJECT CASE STUDY OUTRO</span>
        </motion.div>

        {/* Big Behance Style Kinetic Headline: "THANKS FOR WATCHING!" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3 mb-8"
        >
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight font-sans leading-none">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-lg">
              THANKS FOR
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">
              WATCHING!
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed pt-2">
            Have a project in mind? Let’s collaborate and turn your visions into high-impact kinetic motion graphics and viral videos.
          </p>
        </motion.div>

        {/* Floating Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onOpenHireModal}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] hover:scale-105 transition-all flex items-center gap-3 clickable"
          >
            <Send className="w-5 h-5 text-white" />
            <span>START A PROJECT WITH HABIBUR</span>
            <ArrowUpRight className="w-5 h-5 text-cyan-200" />
          </button>

          <button
            onClick={onOpenUploadModal}
            className="px-7 py-4 rounded-2xl bg-slate-900/90 border border-white/20 hover:border-cyan-400/80 text-cyan-300 hover:text-white font-bold text-base shadow-xl hover:scale-105 transition-all flex items-center gap-2.5 clickable"
          >
            <Film className="w-5 h-5 text-cyan-400" />
            <span>ADD YOUR OWN VIDEO / ARTWORK</span>
          </button>
        </motion.div>

        {/* Social / Direct Contact Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Email Card */}
          <a
            href="mailto:habibgodfear@gmail.com"
            className="group p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:bg-slate-900 transition-all text-left flex items-start gap-4 shadow-lg hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
          >
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Direct Email
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                habibgodfear@gmail.com
              </h4>
              <p className="text-xs text-slate-400 mt-1">Available 24/7 for international inquiry</p>
            </div>
          </a>

          {/* WhatsApp / Phone Card */}
          <a
            href="https://wa.me/8801620053348"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left flex items-start gap-4 shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
          >
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                WhatsApp / Call
              </span>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                +880 1620 053348
              </h4>
              <p className="text-xs text-slate-400 mt-1">Instant project discussion & chat</p>
            </div>
          </a>

          {/* Guarantee / Quality Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 text-left flex items-start gap-4 shadow-lg">
            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                100% Satisfaction
              </span>
              <h4 className="text-sm font-bold text-white">
                Unlimited Revisions
              </h4>
              <p className="text-xs text-slate-400 mt-1">Until your vision is 100% perfected</p>
            </div>
          </div>
        </div>

        {/* Back To Top Kinetic Button */}
        <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Habibur Rahman Portfolio Case Study Completed</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full bg-slate-900 border border-white/15 hover:border-cyan-400 text-white font-bold transition-all flex items-center gap-2 shadow-md hover:scale-105 clickable"
          >
            <span>Return to Top</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
