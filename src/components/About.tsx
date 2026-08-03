import { motion } from 'motion/react';
import { Award, Users, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const CORE_SKILLS = [
  'Graphic Design',
  'Motion Graphics',
  'Video Editing',
  'Brand Identity',
  'Social Media Design',
  'Typography',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe After Effects',
  'Creative Storytelling',
  'Problem Solving',
  'Premiere Pro'
];

const STATS = [
  { label: 'Years Experience', value: '1+', icon: Clock, color: 'text-blue-400' },
  { label: 'Projects Completed', value: '150+', icon: CheckCircle2, color: 'text-cyan-400' },
  { label: 'Global Clients', value: '40+', icon: Users, color: 'text-indigo-400' },
  { label: 'Client Rating', value: '5.0 ★', icon: Award, color: 'text-amber-400' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

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
            <span>About Habibur Rahman</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Crafting Visionary Visuals for <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Global Brands & Creators
            </span>
          </motion.h2>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-4">
              Passionate Creative Specialist based in Bangladesh
            </h3>

            <p className="text-slate-300 text-base leading-relaxed mb-6">
              Hello! I’m <strong className="text-white font-semibold">Habibur Rahman</strong>, an international freelance <strong className="text-blue-400">Graphic Designer</strong>, <strong className="text-cyan-400">Motion Graphics Designer</strong>, and <strong className="text-indigo-400">Video Editor</strong> with over 1 year of commercial experience.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              My design philosophy combines strategic storytelling, modern Swiss grid typography, bold motion kinetics, and high visual contrast. Whether designing a viral YouTube thumbnail, an entire corporate brand identity, or an After Effects motion advertisement, I focus on delivering work that grabs instant attention and drives measurable results for my clients.
            </p>

            {/* Core Competencies Badges */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold">
                Core Stack & Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {CORE_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs font-medium text-slate-200 hover:border-blue-500/50 hover:text-blue-300 transition-all shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Statistics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl shadow-xl transition-all group hover:bg-slate-800/50 flex flex-col items-start justify-between min-h-[160px]"
                >
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="mt-4">
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-1 font-sans">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
