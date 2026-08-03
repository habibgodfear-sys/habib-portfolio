import { motion } from 'motion/react';
import { Search, Compass, Edit3, Palette, Film, RefreshCw, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { WORK_PROCESS_STEPS } from '../data/portfolioData';

const ICON_MAP: Record<string, any> = {
  Search,
  Compass,
  Edit3,
  Palette,
  Film,
  RefreshCw,
  CheckCircle2
};

export default function WorkProcess() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

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
            <span>Structured Execution</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            7-Step Work Process to <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Guaranteed Perfection
            </span>
          </motion.h2>

          <p className="text-slate-400 text-sm sm:text-base">
            From initial research to polished source files — a battle-tested workflow designed for speed and precision.
          </p>
        </div>

        {/* Process Horizontal/Grid Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS_STEPS.map((step, index) => {
            const IconComp = ICON_MAP[step.icon] || Sparkles;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {step.step}
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors font-sans">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Sub-details list */}
                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-1.5 text-[11px] text-slate-300 font-mono">
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
