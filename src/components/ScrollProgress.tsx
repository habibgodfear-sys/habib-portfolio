import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const progress = (scrollTop / (fullHeight - windowHeight)) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));

      if (scrollTop > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900 z-[100] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_#3b82f6]"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 text-blue-400 hover:text-white hover:bg-blue-600/30 hover:border-blue-500 transition-all shadow-[0_0_25px_rgba(59,130,246,0.3)] group clickable"
            aria-label="Back to top"
            id="back-to-top-btn"
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              {/* Circular Progress SVG */}
              <svg className="absolute w-10 h-10 -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-400"
                  strokeDasharray={`${scrollPercentage}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
