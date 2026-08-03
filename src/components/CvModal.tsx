import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, Mail, Phone, MapPin, CheckCircle2, Award } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-white"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-slate-950/60 sticky top-0 z-20 backdrop-blur-md">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Curriculum Vitae</h2>
              <p className="text-xs text-slate-400 font-mono">Habibur Rahman • Creative Director & Designer</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 clickable"
                title="Print CV"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-white/10 clickable"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable CV Document Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-slate-900 text-slate-200 text-sm">
            
            {/* CV Header Identity */}
            <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-white font-sans tracking-tight">
                  Habibur Rahman
                </h1>
                <p className="text-blue-400 font-semibold font-mono text-base mt-1">
                  Graphic Designer • Motion Graphics Designer • Video Editor
                </p>
              </div>

              <div className="space-y-1 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>habibgodfear@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+8801620053348</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Bangladesh (Global Remote)</span>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold mb-2">
                Executive Profile
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Versatile international freelance creative designer with 1+ year of experience engineering high-impact visual graphics, kinetic motion graphics, and video edits. Delivered 150+ commercial projects for creators, agencies, and corporations across North America, Europe, and Asia.
              </p>
            </div>

            {/* Core Competencies */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold mb-3">
                Core Competencies & Tools
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Adobe Photoshop (98%)',
                  'Adobe After Effects (96%)',
                  'Adobe Illustrator (95%)',
                  'Adobe Premiere Pro (92%)',
                  'Motion Graphics & FX',
                  'YouTube CTR Thumbnails',
                  'Brand Identity Systems',
                  'Typography & Layouts',
                  'Cash Cow Channel Edits'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs bg-slate-950 p-2 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-blue-400 font-mono font-bold mb-4">
                Work Experience
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>International Freelance Creative Specialist</span>
                    <span className="text-xs text-blue-300 font-mono">2023 - Present</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mb-2">Upwork & Direct Clients Worldwide</p>
                  <ul className="list-disc list-inside text-xs space-y-1 text-slate-300">
                    <li>Designed 150+ high-converting visual assets, brand identities, and motion ads.</li>
                    <li>Maintained 100% Client Satisfaction score across international marketplaces.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>Senior Motion Graphics Designer</span>
                    <span className="text-xs text-blue-300 font-mono">2022 - 2023</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mb-2">PixelCraft Media Agency</p>
                  <ul className="list-disc list-inside text-xs space-y-1 text-slate-300">
                    <li>Led motion graphics production for 80+ commercial advertising campaigns.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="pt-6 border-t border-white/10 text-center text-xs text-slate-500 font-mono">
              Available for immediate freelance bookings & long-term remote contracts.
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
