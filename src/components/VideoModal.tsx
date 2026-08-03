import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Film } from 'lucide-react';
import { VideoItem } from '../types';
import { getYouTubeEmbedUrl } from '../data/portfolioData';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  const isDirectVideoFile = video.videoFileUrl || (video.youtubeUrl && (video.youtubeUrl.endsWith('.mp4') || video.youtubeUrl.endsWith('.webm') || video.youtubeUrl.startsWith('blob:') || video.youtubeUrl.startsWith('data:video/')));
  const embedUrl = !isDirectVideoFile && video.youtubeUrl ? getYouTubeEmbedUrl(video.youtubeUrl) : null;
  const directSrc = video.videoFileUrl || (isDirectVideoFile ? video.youtubeUrl : undefined);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/15 text-white transition-all shadow-2xl hover:scale-110 clickable"
          aria-label="Close Video Player"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl w-full bg-slate-900 border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(59,130,246,0.3)] flex flex-col"
        >
          {/* Video Player Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {isDirectVideoFile && directSrc ? (
              <video
                src={directSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster={video.thumbnailUrl}
              >
                Your browser does not support playing this video file.
              </video>
            ) : embedUrl ? (
              <iframe
                src={embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                <Film className="w-12 h-12 text-blue-400 animate-pulse" />
                <p className="text-base font-semibold text-white">No stream URL available for this video preview.</p>
              </div>
            )}
          </div>

          {/* Video Title & Meta */}
          <div className="p-6 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px] font-mono font-bold uppercase mb-2">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>{video.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{video.title}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">{video.description}</p>
            </div>

            <a
              href="#contact"
              onClick={() => onClose()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition-all whitespace-nowrap shadow-lg clickable"
            >
              Order Similar Video Edit
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
