import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Film, Upload, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { VideoItem } from '../types';
import { getYouTubeEmbedUrl, getYouTubeAutoplayEmbedUrl } from '../data/portfolioData';

interface HeroFeaturedVideoProps {
  onOpenUploadModal: () => void;
  onPlayVideo: (video: VideoItem) => void;
  featuredVideo?: VideoItem;
}

export default function HeroFeaturedVideo({
  onOpenUploadModal,
  onPlayVideo,
  featuredVideo,
}: HeroFeaturedVideoProps) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Default showreel video if none passed
  const defaultShowreel: VideoItem = featuredVideo || {
    id: 'hero-featured-v',
    title: 'Habibur Rahman • Featured Motion Reel',
    category: 'Showreel',
    youtubeUrl: 'https://youtube.com/shorts/ot3iY_iOPTc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    description: 'Official Motion Design & Video Editing showcase reel by Habibur Rahman.',
    duration: '0:50',
  };

  const isDirectFile = defaultShowreel.videoFileUrl || (defaultShowreel.youtubeUrl && (defaultShowreel.youtubeUrl.endsWith('.mp4') || defaultShowreel.youtubeUrl.startsWith('blob:') || defaultShowreel.youtubeUrl.startsWith('data:video/')));
  const embedUrl = !isDirectFile && defaultShowreel.youtubeUrl ? getYouTubeEmbedUrl(defaultShowreel.youtubeUrl) : null;
  const directVideoSrc = defaultShowreel.videoFileUrl || (isDirectFile ? defaultShowreel.youtubeUrl : undefined);

  return (
    <section className="relative py-12 bg-slate-950 border-t border-white/10 overflow-hidden text-white z-20">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  Featured Reel
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] text-blue-300 font-mono">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Right After Name</span>
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Habibur Rahman’s Official Video Showcase
              </h2>
            </div>
          </div>

          {/* Change Video Button */}
          <button
            onClick={onOpenUploadModal}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 hover:border-cyan-400/60 text-slate-200 hover:text-white text-xs font-semibold shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 clickable"
            id="hero-change-video-btn"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Change / Upload My Video</span>
          </button>
        </div>

        {/* Video Player Card Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-1.5 bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-indigo-500/30 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.3)] overflow-hidden group"
        >
          <div className="relative aspect-video w-full rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center">
            
            {/* Direct Video File Player */}
            {isPlayingInline && isDirectFile && directVideoSrc ? (
              <video
                src={directVideoSrc}
                autoPlay
                controls
                muted={isMuted}
                className="w-full h-full object-contain bg-black"
                poster={defaultShowreel.thumbnailUrl}
              />
            ) : isPlayingInline && embedUrl ? (
              /* Inline YouTube Embed */
              <iframe
                src={embedUrl.includes('autoplay=1') ? embedUrl : `${embedUrl}&autoplay=1`}
                title={defaultShowreel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              /* Thumbnail & Big Play Trigger Cover */
              <div
                onClick={() => {
                  if (isDirectFile || embedUrl) {
                    setIsPlayingInline(true);
                  } else {
                    onPlayVideo(defaultShowreel);
                  }
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full h-full cursor-pointer group/thumb overflow-hidden"
              >
                {/* Auto-Playing Video Stream on Hover */}
                {isHovered ? (
                  defaultShowreel.videoFileUrl ? (
                    <video
                      src={defaultShowreel.videoFileUrl}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover object-center relative z-10"
                    />
                  ) : defaultShowreel.youtubeUrl ? (
                    <iframe
                      src={getYouTubeAutoplayEmbedUrl(defaultShowreel.youtubeUrl)}
                      title={defaultShowreel.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="w-full h-full border-0 absolute inset-0 z-10 pointer-events-none"
                    />
                  ) : defaultShowreel.thumbnailUrl ? (
                    <img
                      src={defaultShowreel.thumbnailUrl}
                      alt={defaultShowreel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 brightness-90"
                    />
                  ) : null
                ) : defaultShowreel.videoFileUrl ? (
                  <video
                    src={defaultShowreel.videoFileUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    poster={defaultShowreel.thumbnailUrl || undefined}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 brightness-90"
                  />
                ) : defaultShowreel.thumbnailUrl ? (
                  <img
                    src={defaultShowreel.thumbnailUrl}
                    alt={defaultShowreel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 brightness-90"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center">
                    <Film className="w-16 h-16 text-cyan-400 animate-pulse" />
                  </div>
                )}

                {/* Glass Gradient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-15 pointer-events-none" />

                {/* Big Radiant Light-Burst Play Button (Fades when actively playing on hover) */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
                  <div className="relative flex items-center justify-center group/play">
                    {/* Concentric Radiating Light Rays & Halos */}
                    <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-600/30 blur-2xl animate-pulse" />
                    <div className="absolute w-36 h-36 rounded-full bg-cyan-400/30 animate-ping opacity-75 duration-1000" />
                    <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 opacity-40 blur-md animate-pulse" />
                    
                    {/* Light Beam Flares */}
                    <div className="absolute w-64 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent blur-sm rotate-45 animate-pulse" />
                    <div className="absolute w-64 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-sm -rotate-45 animate-pulse" />

                    {/* Main Luminous Play Button Ring */}
                    <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-purple-500 p-[3px] shadow-[0_0_60px_rgba(56,189,248,1),0_0_120px_rgba(59,130,246,0.8),0_0_180px_rgba(168,85,247,0.6)] group-hover/thumb:scale-115 transition-all duration-500">
                      <div className="w-full h-full bg-slate-950/85 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-[inner_0_0_20px_rgba(56,189,248,0.8)]">
                        {/* Play Triangle with Light Glow */}
                        <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-white text-white translate-x-1 filter drop-shadow-[0_0_16px_rgba(56,189,248,1)] group-hover/thumb:text-cyan-200 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Radiating Light Text Badge */}
                  <span className="px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/80 text-cyan-300 text-xs font-mono font-extrabold uppercase tracking-widest backdrop-blur-xl shadow-[0_0_30px_rgba(56,189,248,0.7)] group-hover/thumb:bg-cyan-400 group-hover/thumb:text-slate-950 transition-all duration-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    <span>{isHovered ? '▶ AUTOPLAYING PREVIEW (CLICK FOR SOUND)' : '▶ CLICK TO PLAY SHOWREEL'}</span>
                  </span>
                </div>

                {/* Bottom Meta Overlay Bar */}
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider font-mono mb-2 inline-block">
                      {defaultShowreel.category}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-white drop-shadow-md">
                      {defaultShowreel.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-xl line-clamp-2">
                      {defaultShowreel.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayVideo(defaultShowreel);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-lg"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Fullscreen Modal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mute toggle button if playing direct video */}
            {isPlayingInline && isDirectFile && (
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white shadow-xl hover:bg-slate-800"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
