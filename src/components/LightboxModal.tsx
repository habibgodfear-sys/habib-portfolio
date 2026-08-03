import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Tag, Sparkles } from 'lucide-react';
import { GraphicItem } from '../types';

interface LightboxModalProps {
  item: GraphicItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/15 text-white transition-all shadow-2xl clickable"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-5xl w-full bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Image Display */}
          <div className="lg:w-2/3 bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Details Sidebar */}
          <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-slate-900 text-white overflow-y-auto">
            <div className="space-y-6">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white leading-tight">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Metadata */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
                {item.client && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-400" />
                    <span>Client: <strong className="text-white">{item.client}</strong></span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Year: <strong className="text-white">{item.year}</strong></span>
                </div>

                <div className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-indigo-400 mt-0.5" />
                  <div>
                    <div className="text-slate-400 mb-1">Tools & Software:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/10 text-slate-200 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <a
                href="#contact"
                onClick={() => onClose()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg clickable"
              >
                <span>Request Similar Project</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
