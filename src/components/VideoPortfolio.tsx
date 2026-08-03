import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Clock, Lock, Trash2, Film, Scissors, Layers, Video, Eye, ThumbsUp, LayoutGrid, List, ArrowUpRight, Plus } from 'lucide-react';
import { VIDEO_ITEMS, getYouTubeAutoplayEmbedUrl } from '../data/portfolioData';
import { VideoItem } from '../types';
import Tilt3DCard from './Tilt3DCard';

interface VideoPortfolioProps {
  onPlayVideo: (item: VideoItem) => void;
  userVideoItems: VideoItem[];
  onOpenUploadModal: () => void;
  onDeleteUserVideoItem?: (id: string) => void;
}

export default function VideoPortfolio({
  onPlayVideo,
  userVideoItems,
  onOpenUploadModal,
  onDeleteUserVideoItem,
}: VideoPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredVideo, setHoveredVideo] = useState<VideoItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const allVideos = [...userVideoItems, ...VIDEO_ITEMS];

  // Dynamically compute categories
  const categoriesSet = new Set(['All']);
  allVideos.forEach((v) => {
    if (v.category) categoriesSet.add(v.category);
  });
  const videoCategories = Array.from(categoriesSet);

  const filteredVideos = selectedCategory === 'All'
    ? allVideos
    : allVideos.filter((item) => item.category === selectedCategory);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="videos" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/10" onMouseMove={handleMouseMove}>
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unseen Studio Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div className="max-w-3xl space-y-3 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-slate-900 border border-white/15 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>[ UNSEEN PROJECTS SHOWCASE ]</span>
              <span className="text-slate-500">//</span>
              <span className="text-slate-300">{allVideos.length} WORKS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase"
            >
              Selected Motion & <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Video Edit Archives
              </span>
            </motion.h2>

            <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl">
              Curated collection of high-retention video edits, kinetic motion graphics, commercial promos, and viral social media reels.
            </p>
          </div>

          {/* Top Controls: View Switcher & Upload Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Grid / List View Toggle Switch */}
            <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-white/15">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all clickable ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Showcase View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GRID</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all clickable ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Unseen List View"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">INDEX LIST</span>
              </button>
            </div>

            {/* Add Custom Work Button */}
            <button
              onClick={onOpenUploadModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2 clickable"
              id="upload-video-edit-btn"
            >
              <Plus className="w-4 h-4 text-cyan-200" />
              <span>Upload Work</span>
            </button>
          </div>
        </div>

        {/* Studio Specs Bar */}

        {/* Unseen Minimal Filter Category Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mr-2 hidden sm:inline-block">
              [ FILTER ]
            </span>
            {videoCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap clickable ${
                    isActive
                      ? 'text-white bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-cyan-400/40'
                      : 'text-slate-400 bg-slate-900/90 border border-white/10 hover:text-white hover:bg-slate-800'
                  }`}
                  id={`video-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
            <span>SHOWING:</span>
            <span className="text-cyan-400 font-bold">{filteredVideos.length} ITEMS</span>
          </div>
        </div>

        {/* MODE A: UNSEEN 3D GRID VIEW */}
        {viewMode === 'grid' && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredVideos.map((video: VideoItem, index: number) => {
                const isComingSoon = video.isComingSoon;
                const isUserUploaded = video.id.startsWith('user-v-');
                const projectNum = (index + 1).toString().padStart(2, '0');

                return (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <Tilt3DCard
                      onClick={() => !isComingSoon && onPlayVideo(video)}
                      onMouseEnter={() => {
                        setHoveredCardId(video.id);
                        setHoveredVideo(video);
                      }}
                      onMouseLeave={() => {
                        setHoveredCardId(null);
                        setHoveredVideo(null);
                      }}
                      className={`group relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ${
                        isComingSoon
                          ? 'opacity-80 cursor-not-allowed border-dashed border-amber-500/30'
                          : 'cursor-pointer hover:border-cyan-400/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.25)] clickable'
                      }`}
                    >
                      {/* Thumbnail Container */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                        {/* Auto-Playing Video Layer on Hover */}
                        {!isComingSoon && hoveredCardId === video.id ? (
                          video.videoFileUrl ? (
                            <video
                              src={video.videoFileUrl}
                              muted
                              loop
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover object-center relative z-10"
                            />
                          ) : video.youtubeUrl ? (
                            <iframe
                              src={getYouTubeAutoplayEmbedUrl(video.youtubeUrl)}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              className="w-full h-full border-0 absolute inset-0 z-10 pointer-events-none"
                            />
                          ) : video.thumbnailUrl ? (
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center scale-105"
                            />
                          ) : null
                        ) : video.videoFileUrl ? (
                          <video
                            src={video.videoFileUrl}
                            muted
                            loop
                            autoPlay
                            playsInline
                            poster={video.thumbnailUrl || undefined}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : video.thumbnailUrl ? (
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover object-center ${
                              isComingSoon ? 'grayscale brightness-50' : 'group-hover:scale-105 transition-transform duration-700'
                            }`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center">
                            <Film className="w-12 h-12 text-blue-400/80 animate-pulse" />
                          </div>
                        )}

                        {/* Dark Gradient Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-15 pointer-events-none" />

                        {/* Index Number Badge (Unseen Style) */}
                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/20 text-cyan-300 text-[11px] font-mono font-bold shadow-md">
                            [{projectNum}]
                          </span>
                        </div>

                        {/* User Upload Tag */}
                        {isUserUploaded && (
                          <div className="absolute top-3 left-16 z-20">
                            <span className="px-2.5 py-1 rounded-md bg-cyan-500/90 text-slate-950 text-[10px] font-mono font-extrabold uppercase shadow-md">
                              User Edit
                            </span>
                          </div>
                        )}

                        {/* Delete User Video Button */}
                        {isUserUploaded && onDeleteUserVideoItem && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteUserVideoItem(video.id);
                            }}
                            className="absolute top-3 right-3 z-20 p-2 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white shadow-lg transition-all"
                            title="Delete Uploaded Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Duration Tag Top Right */}
                        {video.duration && !isUserUploaded && (
                          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs font-mono">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            <span>{video.duration}</span>
                          </div>
                        )}

                        {/* Active Hover Autoplay Badge */}
                        {!isComingSoon && hoveredCardId === video.id && (
                          <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-cyan-400 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.9)] flex items-center gap-1.5 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                            <span>▶ AUTOPLAYING PREVIEW</span>
                          </div>
                        )}

                        {/* Radiant Light Play Button Overlay (Hidden when actively playing on hover) */}
                        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-20 ${hoveredCardId === video.id ? 'opacity-0' : 'opacity-100'}`}>
                          {isComingSoon ? (
                            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300">
                              <Lock className="w-6 h-6" />
                              <span className="text-xs font-bold uppercase tracking-widest font-mono">
                                Coming Soon
                              </span>
                            </div>
                          ) : (
                            <div className="relative flex items-center justify-center">
                              {/* Radiating Light Aura & Rays */}
                              <div className="absolute w-32 h-32 rounded-full bg-cyan-400/35 blur-xl animate-pulse" />
                              <div className="absolute w-24 h-24 rounded-full bg-blue-500/30 animate-ping opacity-80" />
                              <div className="absolute w-20 h-20 rounded-full bg-indigo-500/30 animate-pulse blur-sm" />
                              
                              {/* Glowing Button Sphere */}
                              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-500 p-[2px] shadow-[0_0_45px_rgba(56,189,248,1),0_0_90px_rgba(59,130,246,0.7)] group-hover:scale-115 transition-transform duration-300">
                                <div className="w-full h-full bg-slate-950/85 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-[inner_0_0_15px_rgba(56,189,248,0.8)]">
                                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5 filter drop-shadow-[0_0_14px_rgba(56,189,248,1)]" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Video Meta Information */}
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                            {video.category}
                          </span>
                          <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-mono">
                            <span className="flex items-center gap-1 text-slate-300">
                              <Eye className="w-3 h-3 text-cyan-400" />
                              <span>{(index * 3.4 + 12.5).toFixed(1)}k</span>
                            </span>
                            <span className="flex items-center gap-1 text-slate-300">
                              <ThumbsUp className="w-3 h-3 text-amber-400" />
                              <span>{(index * 0.5 + 1.2).toFixed(1)}k</span>
                            </span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors font-sans line-clamp-1 flex items-center justify-between">
                          <span>{video.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </Tilt3DCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* MODE B: UNSEEN STUDIO INDEX LIST VIEW */}
        {viewMode === 'list' && (
          <div className="divide-y divide-white/10 border-y border-white/10 bg-slate-900/40 rounded-2xl overflow-hidden">
            {filteredVideos.map((video: VideoItem, index: number) => {
              const projectNum = (index + 1).toString().padStart(2, '0');
              const isUserUploaded = video.id.startsWith('user-v-');

              return (
                <div
                  key={video.id}
                  onClick={() => !video.isComingSoon && onPlayVideo(video)}
                  onMouseEnter={() => setHoveredVideo(video)}
                  onMouseLeave={() => setHoveredVideo(null)}
                  className="group py-5 px-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-800/60 transition-colors cursor-pointer clickable relative"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      [{projectNum}]
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {video.title}
                        </h3>
                        {isUserUploaded && (
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                            USER
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-1 hidden sm:block">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider hidden md:inline-block">
                      {video.category}
                    </span>

                    <span className="text-xs font-mono text-slate-500 hidden lg:inline-block">
                      2026
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!video.isComingSoon) onPlayVideo(video);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-mono font-extrabold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.7)] hover:shadow-[0_0_35px_rgba(56,189,248,1)] hover:scale-105 active:scale-95 group/playbtn"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-4 h-4 rounded-full bg-cyan-300 animate-ping opacity-75" />
                        <Play className="w-3.5 h-3.5 fill-white text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,1)] relative z-10" />
                      </div>
                      <span className="tracking-wider">PLAY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200 group-hover/playbtn:translate-x-0.5 group-hover/playbtn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Unseen Hover Video/Image Tooltip Cursor for List View */}
        {viewMode === 'list' && hoveredVideo && (
          <div
            className="fixed pointer-events-none z-[9990] w-72 aspect-video rounded-2xl overflow-hidden border border-cyan-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.5)] bg-slate-950 transition-all duration-100 hidden md:block"
            style={{
              top: `${mousePos.y + 15}px`,
              left: `${mousePos.x + 20}px`,
            }}
          >
            {hoveredVideo.videoFileUrl ? (
              <video
                src={hoveredVideo.videoFileUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : hoveredVideo.youtubeUrl ? (
              <iframe
                src={getYouTubeAutoplayEmbedUrl(hoveredVideo.youtubeUrl)}
                title={hoveredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full border-0 pointer-events-none"
              />
            ) : (
              <img
                src={hoveredVideo.thumbnailUrl}
                alt={hoveredVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5 z-10 pointer-events-none">
              <span className="text-xs font-bold text-cyan-300 font-mono line-clamp-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ▶ {hoveredVideo.title}
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

