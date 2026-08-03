import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, ExternalLink, Upload, Trash2 } from 'lucide-react';
import { GRAPHIC_ITEMS } from '../data/portfolioData';
import { GraphicItem } from '../types';
import Tilt3DCard from './Tilt3DCard';

interface GraphicPortfolioProps {
  onOpenLightbox: (item: GraphicItem) => void;
  userGraphicItems: GraphicItem[];
  onOpenUploadModal: () => void;
  onDeleteUserGraphicItem?: (id: string) => void;
}

export default function GraphicPortfolio({
  onOpenLightbox,
  userGraphicItems,
  onOpenUploadModal,
  onDeleteUserGraphicItem,
}: GraphicPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Combine default items with user-uploaded items
  const allItems = [...userGraphicItems, ...GRAPHIC_ITEMS];

  // Dynamically compute categories
  const categoriesSet = new Set(['All']);
  allItems.forEach((item) => {
    if (item.category) categoriesSet.add(item.category);
  });
  const categories = Array.from(categoriesSet);

  const filteredItems = selectedCategory === 'All'
    ? allItems
    : allItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest font-mono"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Social Media & Graphic Design Portfolio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
            >
              Graphic Designs & <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                High-Impact Commercial Ads & Posters
              </span>
            </motion.h2>

            <p className="text-slate-400 text-sm sm:text-base">
              High-converting social media ad posters, product artwork, and custom uploaded design portfolios.
            </p>
          </div>

          {/* Upload Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={onOpenUploadModal}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all flex items-center justify-center gap-2.5 shrink-0 clickable"
            id="upload-graphic-design-btn"
          >
            <Upload className="w-4 h-4 text-cyan-200" />
            <span>Upload Image Design</span>
          </motion.button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 clickable ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                    : 'text-slate-400 bg-slate-900/80 border border-white/10 hover:text-white hover:bg-slate-800'
                }`}
                id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3D Tilt Grid Layout or Empty State */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 rounded-3xl bg-slate-900/40 border border-dashed border-white/15 text-center max-w-xl mx-auto my-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No Designs Displayed Yet
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              The portfolio is ready for your images. Click below to upload your social media ad posters, banner artworks, or designs!
            </p>
            <button
              onClick={onOpenUploadModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg transition-all flex items-center gap-2 clickable"
            >
              <Upload className="w-4 h-4 text-cyan-200" />
              <span>Upload Custom Design Image</span>
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredItems.map((item: GraphicItem, index: number) => {
                const isUserUploaded = item.id.startsWith('user-g-');

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Tilt3DCard
                      onClick={() => onOpenLightbox(item)}
                      className="group bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.2)] transition-all duration-500 clickable"
                    >
                      {/* Image Wrapper */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />

                        {/* User Upload Badge */}
                        {isUserUploaded && (
                          <div className="absolute top-3 left-3 z-20">
                            <span className="px-2.5 py-1 rounded-full bg-cyan-500/90 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider font-mono shadow-md">
                              Uploaded
                            </span>
                          </div>
                        )}

                        {/* Delete User Item Button */}
                        {isUserUploaded && onDeleteUserGraphicItem && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteUserGraphicItem(item.id);
                            }}
                            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white shadow-lg transition-all"
                            title="Delete Uploaded Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Dark Glass Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                          {/* Top Badges */}
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-[10px] font-bold uppercase tracking-wider font-mono">
                              {item.category}
                            </span>
                            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                              <Maximize2 className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Bottom Metadata */}
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-slate-300 text-xs line-clamp-2 mb-3">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.tools.map((tool) => (
                                <span key={tool} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Always-Visible Card Footer Bar */}
                      <div className="p-5 flex items-center justify-between border-t border-white/5 bg-slate-950/40">
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            {item.client ? `${item.client} • ${item.year}` : item.category}
                          </span>
                        </div>
                        <div className="text-slate-500 group-hover:text-blue-400 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </Tilt3DCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
