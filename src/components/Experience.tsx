import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Professional Experience & <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Proven Track Record
            </span>
          </motion.h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={exp.role + exp.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Marker Circle */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-slate-950 border-2 border-blue-500 group-hover:bg-blue-500 group-hover:border-cyan-300 transition-all shadow-[0_0_15px_rgba(59,130,246,0.6)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Glass Card */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-blue-500/40 transition-all shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                {/* Period & Location Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Role Title & Company */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {exp.role}
                </h3>
                <div className="text-sm font-semibold text-blue-400 mb-6 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>{exp.company}</span>
                </div>

                {/* Description Bullet points */}
                <ul className="space-y-2.5 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.skillsUsed.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-slate-300 border border-white/10">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
