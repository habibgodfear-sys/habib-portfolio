import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, Film, Video, Share2, Image, Type, BookOpen, Sparkles, Megaphone, LayoutGrid, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/portfolioData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Palette,
  Film,
  Video,
  Share2,
  Image,
  Type,
  BookOpen,
  Sparkles,
  Megaphone,
  LayoutGrid
};

export default function Services({ onSelectService }: ServicesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Specialized Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Tailored Creative Solutions for <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Maximum Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base"
          >
            From high-converting thumbnails and kinetic motion graphics to comprehensive brand identity systems.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service: ServiceItem, index: number) => {
            const IconComponent = ICON_MAP[service.iconName] || Palette;
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]"
              >
                {/* Popular Tag */}
                {service.popular && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-bold uppercase tracking-widest font-mono">
                    Popular
                  </div>
                )}

                <div>
                  {/* Service Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-cyan-300 group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300 mb-6 shadow-inner">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors font-sans">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-8 pt-4 border-t border-white/5">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                      Deliverables Include:
                    </div>
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry CTA Button */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-slate-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn clickable shadow-sm"
                  id={`service-inquire-${service.id}`}
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
