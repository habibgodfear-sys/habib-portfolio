import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Sparkles, ChevronDown, Award, CheckCircle, Zap, Play } from 'lucide-react';
import { HERO_PORTRAIT_URL, VIDEO_ITEMS } from '../data/portfolioData';
import { VideoItem } from '../types';

interface HeroProps {
  onOpenCvModal: () => void;
  onOpenHireModal: () => void;
  onPlayVideo?: (video: VideoItem) => void;
  featuredVideo?: VideoItem;
}

export default function Hero({ onOpenCvModal, onOpenHireModal, onPlayVideo, featuredVideo }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Background Animated Gradient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Blue Glow Top Left */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px]"
        />

        {/* Cyan Glow Bottom Right */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px]"
        />

        {/* Indigo Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[180px]" />

        {/* Unseen/Lusion High-Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        {/* Unseen Top Studio Live Time & Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono text-slate-400 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold">[ UNSEEN x LUSION MOTION STUDIO ]</span>
            <span className="text-slate-600">//</span>
            <span className="text-cyan-400">DHAKA, BD (UTC+06:00)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>INDEX: <strong className="text-white">2026 WORKS</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Status Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest font-mono shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Available for Global Visual Projects & Freelance</span>
            </motion.div>

            {/* Main Title Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                x: mousePos.x * 0.4,
                y: mousePos.y * 0.4,
              }}
              className="will-change-transform"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] font-sans uppercase">
                Hi, I’m <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
                  Habibur Rahman
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-base sm:text-xl text-slate-300 font-medium"
            >
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-blue-300 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                Graphic Designer
              </span>
              <span className="text-slate-600">•</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-cyan-300 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                Motion Graphics
              </span>
              <span className="text-slate-600">•</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-indigo-300 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                Video Editor
              </span>
            </motion.div>

            {/* Professional Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-normal"
            >
              Transforming raw ideas into high-converting visual masterpieces. Specializing in high-end brand identities, kinetic motion graphics, viral YouTube editing, and aesthetic typography for international clients and creators worldwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              {/* View Portfolio */}
              <button
                onClick={scrollToPortfolio}
                className="flex-1 sm:flex-none px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all flex items-center justify-center gap-2.5 group clickable"
                id="hero-view-portfolio-btn"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Hire Me */}
              <button
                onClick={onOpenHireModal}
                className="flex-1 sm:flex-none px-7 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-blue-500/40 text-blue-300 hover:text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all flex items-center justify-center gap-2 group clickable"
                id="hero-hire-me-btn"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Hire Me</span>
              </button>

              {/* Download CV */}
              <button
                onClick={onOpenCvModal}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 clickable"
                id="hero-download-cv-btn"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Download CV</span>
              </button>
            </motion.div>

            {/* Key Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span>150+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>5-Star Rated Worldwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>24-Hour Turnaround Available</span>
              </div>
            </motion.div>
          </div>

          {/* Right Portrait Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <motion.div
              style={{
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="relative w-full max-w-[380px] sm:max-w-[420px]"
            >
              {/* Outer Glowing Glass Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-blue-500/30 via-slate-900/80 to-cyan-500/20 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.25)]">
                {/* Photo Container */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/25 via-cyan-500/10 to-transparent pointer-events-none" />
                  
                  <img
                    src={HERO_PORTRAIT_URL}
                    alt="Habibur Rahman - Graphic & Motion Designer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 z-10 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer" onClick={scrollToPortfolio}>
        <span className="text-[11px] uppercase tracking-widest font-mono text-slate-500">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-blue-400" />
        </motion.div>
      </div>
    </section>
  );
}
