import React, { useState } from 'react';
import { Code2, Copy, Check, X, Sparkles, Download, Info } from 'lucide-react';
import { GraphicItem, VideoItem } from '../types';
import { GRAPHIC_ITEMS, VIDEO_ITEMS } from '../data/portfolioData';

interface ExportCodeModalProps {
  isOpen: boolean;
  userGraphicItems: GraphicItem[];
  userVideoItems: VideoItem[];
  deletedGraphicItemIds: string[];
  deletedVideoItemIds: string[];
  onClose: () => void;
}

export default function ExportCodeModal({
  isOpen,
  userGraphicItems,
  userVideoItems,
  deletedGraphicItemIds,
  deletedVideoItemIds,
  onClose,
}: ExportCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Compute final combined list
  const finalGraphicItems = [...userGraphicItems, ...GRAPHIC_ITEMS].filter(
    (item) => !deletedGraphicItemIds.includes(item.id)
  );

  const finalVideoItems = [...userVideoItems, ...VIDEO_ITEMS].filter(
    (item) => !deletedVideoItemIds.includes(item.id)
  );

  // Generate formatted TypeScript code string for portfolioData.ts
  const generatedCode = `// Updated Portfolio Data for Vercel Permanent Deployment
// Copy and paste this code inside: src/data/portfolioData.ts

export const GRAPHIC_ITEMS = ${JSON.stringify(finalGraphicItems, null, 2)};

export const VIDEO_ITEMS = ${JSON.stringify(finalVideoItems, null, 2)};
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-slate-900/95 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(59,130,246,0.3)] text-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-4 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>ভ্যারসেলে সবার জন্য আপডেট করার কোড</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-400">
              Vercel / GitHub e Permanent Update code export
            </p>
          </div>
        </div>

        {/* Bengali Explanation banner */}
        <div className="mb-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-300 space-y-2 shrink-0">
          <div className="flex items-start gap-2 text-cyan-300 font-semibold">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>কেন আপনার আপলোড করা ফাইল অন্য মানুষ দেখতে পাচ্ছিল না?</span>
          </div>
          <p className="leading-relaxed">
            ওয়েবসাইটটি একটি স্ট্যাটিক সাইট হিসেবে Vercel-এ লাইভ আছে। আপনি যখন ব্রাউজার থেকে ছবি আপলোড করেন, তা আপনার নিজস্ব ব্রাউজারে সংরক্ষিত হয়। সারাবিশ্বের সবার জন্য এই ছবিগুলো স্থায়ী করতে নিচের <strong>১-ক্লিক কোড কপি</strong> করে আপনার প্রজেক্টের <code className="bg-slate-950 px-1.5 py-0.5 rounded border border-white/10 text-cyan-300">src/data/portfolioData.ts</code> ফাইলে পেস্ট করে গিটহাবে পুশ করলেই Vercel-এ লাইভ হয়ে যাবে!
          </p>
        </div>

        {/* Code Box */}
        <div className="relative flex-1 min-h-[220px] bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs overflow-auto text-slate-300 scrollbar-thin">
          <pre>{generatedCode}</pre>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 mt-2 shrink-0 border-t border-slate-800">
          <button
            onClick={handleCopy}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-300" />
                <span>কপি হয়েছে! (Code Copied)</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>কোড কপি করুন (Copy Code)</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJson}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>ফাইল ডাউনলোড করুন (portfolioData.ts)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
