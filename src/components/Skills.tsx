import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Image, PenTool, Video, Film, Type, Crown, Scissors } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';

const SKILL_ICONS: Record<string, any> = {
  Image,
  PenTool,
  Sparkles,
  Video,
  Film,
  Type,
  Crown,
  Scissors
};

const SKILL_CATEGORIES = ['All', 'Design Tools', 'Animation & Motion', 'Creative Strategy'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Mastery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Skills & Software <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Proficiency Matrix
            </span>
          </motion.h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Mastery over industry-standard creative tools and artistic disciplines.
          </p>
        </div>

        {/* Skill Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 clickable ${
                activeCategory === cat
                  ? 'text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                  : 'text-slate-400 bg-slate-900/80 border border-white/10 hover:text-white hover:bg-slate-800'
              }`}
              id={`skill-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Progress Bar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredSkills.map((skill, index) => {
            const IconComp = SKILL_ICONS[skill.icon] || Sparkles;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-all shadow-xl hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] group"
              >
                {/* Skill Name & Level Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-blue-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold font-mono text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Skill Progress Track */}
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-[2px] border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_#3b82f6]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
