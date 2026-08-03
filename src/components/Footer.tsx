import { ArrowUp, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-white pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-white font-mono">
                  HR
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Habibur Rahman
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              International Graphic Designer, Motion Graphics Designer & Video Editor. Crafting award-worthy visual assets and kinetic motion graphics for clients around the globe.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <a href="mailto:habibgodfear@gmail.com" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>habibgodfear@gmail.com</span>
              </a>
              <a href="tel:+8801620053348" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+8801620053348</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Story</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors">Graphic Portfolio</a></li>
              <li><a href="#videos" className="hover:text-blue-400 transition-colors">Video Showcase</a></li>
              <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills Matrix</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact Me</a></li>
            </ul>
          </div>

          {/* Location & Status */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-bold">
              Current Availability
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for New Projects</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Accepting freelance gigs, YouTube editing retainers, and motion design contracts.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            Copyright © 2026 <strong className="text-slate-300">Habibur Rahman</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for International Creative Excellence</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-blue-400 hover:text-white transition-colors clickable"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
