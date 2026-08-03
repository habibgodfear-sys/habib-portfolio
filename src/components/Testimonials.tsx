import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/portfolioData';

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

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
            <span>Client Endorsements</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            What International Clients Say <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              About My Creative Work
            </span>
          </motion.h2>
        </div>

        {/* 3 Premium Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] flex flex-col justify-between group relative"
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-6 text-slate-800 group-hover:text-blue-500/20 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Project Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono font-bold mb-4">
                  {testimonial.projectType}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.clientName}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {testimonial.clientName}
                  </h4>
                  <div className="text-xs text-slate-400 font-sans">
                    {testimonial.role} • <span className="text-cyan-400 font-mono">{testimonial.country}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
