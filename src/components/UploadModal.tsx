import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Image as ImageIcon, Video, CheckCircle, Sparkles, AlertCircle, Link as LinkIcon, Trash2 } from 'lucide-react';
import { GraphicItem, VideoItem } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGraphicItem: (item: GraphicItem) => void;
  onAddVideoItem: (item: VideoItem) => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onAddGraphicItem,
  onAddVideoItem,
}: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Graphic Form State
  const [graphicTitle, setGraphicTitle] = useState('');
  const [graphicCategory, setGraphicCategory] = useState<GraphicItem['category']>('Social Media');
  const [graphicDescription, setGraphicDescription] = useState('');
  const [graphicClient, setGraphicClient] = useState('');
  const [graphicTools, setGraphicTools] = useState('Adobe Photoshop, Illustrator');
  const [graphicImagePreview, setGraphicImagePreview] = useState<string | null>(null);

  // Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState<VideoItem['category']>('Motion Graphics');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFilePreview, setVideoFilePreview] = useState<string | null>(null);
  const [videoDescription, setVideoDescription] = useState('');
  const [videoDuration, setVideoDuration] = useState('0:45');
  const [videoThumbnailPreview, setVideoThumbnailPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const videoThumbInputRef = useRef<HTMLInputElement | null>(null);

  // Handle Graphic Image File Upload
  const handleGraphicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('File size exceeds 15MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setGraphicImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Video File Upload (.mp4, .webm, .mov)
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('Video file size exceeds 100MB limit for browser storage.');
        return;
      }
      const fileObjUrl = URL.createObjectURL(file);
      setVideoFilePreview(fileObjUrl);
      if (!videoTitle) {
        const titleWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        setVideoTitle(titleWithoutExt);
      }

      // Automatically extract video frame for realistic thumbnail preview
      const tempVideo = document.createElement('video');
      tempVideo.src = fileObjUrl;
      tempVideo.muted = true;
      tempVideo.playsInline = true;
      tempVideo.currentTime = 0.5;
      tempVideo.onloadeddata = () => {
        setTimeout(() => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = tempVideo.videoWidth || 640;
            canvas.height = tempVideo.videoHeight || 360;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
              const frameUrl = canvas.toDataURL('image/jpeg', 0.85);
              if (frameUrl) {
                setVideoThumbnailPreview(frameUrl);
              }
            }
          } catch (err) {
            console.warn('Video frame capture notice:', err);
          }
        }, 150);
      };
    }
  };

  // Handle Video Thumbnail File Upload
  const handleVideoThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setVideoThumbnailPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Graphic Image Item
  const handleGraphicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!graphicTitle.trim()) {
      alert('Please enter a title for your graphic design.');
      return;
    }
    if (!graphicImagePreview) {
      alert('Please upload an image file for your design.');
      return;
    }

    const newItem: GraphicItem = {
      id: `user-g-${Date.now()}`,
      title: graphicTitle,
      category: graphicCategory,
      imageUrl: graphicImagePreview,
      description: graphicDescription || 'Custom uploaded design portfolio work.',
      tools: graphicTools.split(',').map((t) => t.trim()).filter(Boolean),
      client: graphicClient || 'Direct Client / Personal Project',
      year: new Date().getFullYear().toString(),
      featured: true,
    };

    onAddGraphicItem(newItem);
    setSuccessMessage('Design image uploaded successfully to portfolio!');

    // Reset Form
    setTimeout(() => {
      setGraphicTitle('');
      setGraphicDescription('');
      setGraphicClient('');
      setGraphicImagePreview(null);
      setSuccessMessage(null);
      onClose();
    }, 1200);
  };

  // Submit Video Item
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) {
      alert('Please enter a title for your video edit.');
      return;
    }

    if (!videoFilePreview && !videoUrl.trim()) {
      alert('Please upload a video file (.mp4/.webm) OR enter a YouTube / video link.');
      return;
    }

    const thumb = videoThumbnailPreview || videoFilePreview || '';

    const newVideo: VideoItem = {
      id: `user-v-${Date.now()}`,
      title: videoTitle,
      category: videoCategory,
      videoFileUrl: videoFilePreview || undefined,
      youtubeUrl: videoUrl.trim() || undefined,
      thumbnailUrl: thumb,
      description: videoDescription || 'Custom video editing and motion graphics showcase.',
      duration: videoDuration || '0:30',
    };

    onAddVideoItem(newVideo);
    setSuccessMessage('Video project added successfully to portfolio!');

    setTimeout(() => {
      setVideoTitle('');
      setVideoUrl('');
      setVideoFilePreview(null);
      setVideoDescription('');
      setVideoThumbnailPreview(null);
      setSuccessMessage(null);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.2)] text-white z-10 my-auto overflow-hidden"
        >
          {/* Top Decorative Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500 to-cyan-400 blur-sm" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all clickable"
            id="upload-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-sans text-white">
                Upload Work to Portfolio
              </h2>
              <p className="text-xs text-slate-400">
                Add your custom images, social media designs, or video editing projects
              </p>
            </div>
          </div>

          {/* Type Tab Selector */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 mb-6">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all clickable ${
                activeTab === 'image'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Upload Image / Design</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all clickable ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Add Video Edit</span>
            </button>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-fade-in">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
              <span className="text-sm font-semibold">{successMessage}</span>
            </div>
          )}

          {/* FORM: Image Design Upload */}
          {activeTab === 'image' && (
            <form onSubmit={handleGraphicSubmit} className="space-y-4">
              {/* Image Upload Drag-and-Drop Area */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Select Image File (PNG, JPG, WEBP)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleGraphicFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {graphicImagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-blue-500/50 aspect-video max-h-56 bg-slate-950 flex items-center justify-center group">
                    <img
                      src={graphicImagePreview}
                      alt="Upload Preview"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                      >
                        Change Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setGraphicImagePreview(null)}
                        className="p-2 rounded-xl bg-rose-600 text-white text-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      Click to choose image from your computer
                    </p>
                    <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP (Max 15MB)</p>
                  </div>
                )}
              </div>

              {/* Title & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Design Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={graphicTitle}
                    onChange={(e) => setGraphicTitle(e.target.value)}
                    placeholder="e.g. realme Buds Commercial Poster"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={graphicCategory}
                    onChange={(e) => setGraphicCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="Poster Design">Poster Design</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Thumbnail">Thumbnail</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Brochure">Brochure Design</option>
                  </select>
                </div>
              </div>

              {/* Client & Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={graphicClient}
                    onChange={(e) => setGraphicClient(e.target.value)}
                    placeholder="e.g. Brand Campaign"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Software / Tools Used
                  </label>
                  <input
                    type="text"
                    value={graphicTools}
                    onChange={(e) => setGraphicTools(e.target.value)}
                    placeholder="e.g. Photoshop, Illustrator"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={graphicDescription}
                  onChange={(e) => setGraphicDescription(e.target.value)}
                  placeholder="Short description of the design concept, colors, and features..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 clickable mt-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Publish Image to Live Portfolio</span>
              </button>
            </form>
          )}

          {/* FORM: Video Project Upload */}
          {activeTab === 'video' && (
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              {/* Option A: Direct Video File Upload */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Option 1: Upload MP4 / WebM Video File from Computer
                </label>
                <input
                  type="file"
                  ref={videoFileInputRef}
                  onChange={handleVideoFileChange}
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                />

                {videoFilePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-cyan-500/50 aspect-video max-h-48 bg-black flex items-center justify-center group">
                    <video
                      src={videoFilePreview}
                      controls
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setVideoFilePreview(null)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white text-xs shadow-lg"
                      title="Remove video file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => videoFileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 hover:border-cyan-400 rounded-2xl p-4 text-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition-all flex items-center justify-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">
                        Click to upload video file (.mp4, .webm, .mov)
                      </p>
                      <p className="text-xs text-slate-400">Direct instant video player playback</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Option B: YouTube / Shorts URL */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Option 2: OR Paste YouTube Video / Shorts / Vimeo Link
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/shorts/... or https://youtu.be/..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. High Energy Motion Graphics Edit"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Video Category
                  </label>
                  <select
                    value={videoCategory}
                    onChange={(e) => setVideoCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Cash Cow">Cash Cow / YouTube</option>
                    <option value="Showreel">Showreel / Reel</option>
                    <option value="After Effects Basic Motion">After Effects Motion</option>
                    <option value="Nafees Salim">Collaboration Project</option>
                  </select>
                </div>
              </div>

              {/* Duration & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={videoDuration}
                    onChange={(e) => setVideoDuration(e.target.value)}
                    placeholder="e.g. 0:45"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Brief description of motion graphics, sound design, and style..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 clickable mt-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Publish Video Project to Live Portfolio</span>
              </button>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
