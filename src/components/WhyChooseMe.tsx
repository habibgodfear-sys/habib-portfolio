import { motion } from 'motion/react';
import { Lightbulb, Award, Zap, Target, Infinity, MessageSquare, Smile, Sparkles } from 'lucide-react';
import { DIFFERENTIATORS } from '../data/portfolioData';

const ICON_MAP: Record<string, any> = {
  Lightbulb,
  Award,
  Zap,
  Target,
  Infinity,
  MessageSquare,
  Smile
};

export default function WhyChooseMe() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

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
            <span>Competitive Edge</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Why Choose Habibur Rahman for <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Your Next Big Project?
            </span>
          </motion.h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Delivering elite design standards, lightning-fast execution, and seamless client collaboration.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DIFFERENTIATORS.map((diff, index) => {
            const IconComp = ICON_MAP[diff.icon] || Sparkles;

            return (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-7 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 shadow-lg hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-blue-500/40 transition-all mb-6">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors font-sans">
                    {diff.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
