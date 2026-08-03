import { motion } from 'motion/react';
import { Sparkles, Star, Zap, Flame, Film, Palette } from 'lucide-react';

const MARQUEE_ITEMS = [
  { text: 'CREATIVE DIRECTOR', icon: Sparkles, highlight: true },
  { text: 'MOTION GRAPHICS', icon: Zap, highlight: false },
  { text: 'HIGH RETENTION REELS', icon: Flame, highlight: true },
  { text: 'SOCIAL MEDIA POSTERS', icon: Palette, highlight: false },
  { text: 'VIDEO EDITING SHOWCASE', icon: Film, highlight: true },
  { text: 'KINETIC TYPOGRAPHY', icon: Star, highlight: false },
  { text: 'COMMERCIAL AD DESIGNS', icon: Sparkles, highlight: true },
  { text: '3D PRODUCT ANIMATION', icon: Zap, highlight: false },
];

export default function MarqueeTicker() {
  // Multiply items for continuous smooth infinite loop
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative py-8 bg-slate-950/90 border-y border-white/10 overflow-hidden select-none z-20">
      {/* Ambient Gradient Side Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Leftward Continuous Moving Text Ticker (Nahuda style) */}
      <div className="flex overflow-hidden whitespace-nowrap mb-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          }}
          className="flex items-center gap-8 shrink-0"
        >
          {repeatedItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`row1-${idx}`} className="flex items-center gap-4 group cursor-default">
                <span
                  className={`text-2xl sm:text-4xl font-extrabold font-mono tracking-widest uppercase transition-all duration-300 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]'
                      : 'text-slate-400 hover:text-white font-extrabold opacity-70 group-hover:opacity-100'
                  }`}
                >
                  {item.text}
                </span>

                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400 group-hover:scale-125 group-hover:rotate-12 transition-all">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Row 2: Rightward Moving Outlined Kinetic Text Bar */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          }}
          className="flex items-center gap-8 shrink-0 opacity-80"
        >
          {repeatedItems.map((item, idx) => {
            return (
              <div key={`row2-${idx}`} className="flex items-center gap-4">
                <span
                  className="text-xl sm:text-3xl font-black font-mono tracking-widest uppercase text-transparent stroke-text"
                  style={{
                    WebkitTextStroke: '1px rgba(96, 165, 250, 0.4)',
                  }}
                >
                  ✦ {item.text}
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/60 shadow-[0_0_8px_#38bdf8]" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
