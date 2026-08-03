import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemTitle?: string;
  itemType: 'graphic' | 'video';
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  itemTitle,
  itemType,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-slate-900/95 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(225,29,72,0.25)] text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0 shadow-inner">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              আইটেম মুছে ফেলুন (Confirm Delete)
            </h3>
            <p className="text-xs font-mono text-rose-400/90 uppercase tracking-wider">
              {itemType === 'video' ? 'Video Project' : 'Graphic Design'}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300">
          <p className="mb-2">
            আপনি কি নিশ্চিত যে এই {itemType === 'video' ? 'ভিডিওটি' : 'ডিজাইনটি'} আপনার পোর্টফোলিও থেকে মুছে ফেলতে চান?
          </p>
          {itemTitle && (
            <p className="font-bold text-white bg-slate-900/90 px-3 py-2 rounded-xl border border-white/10 truncate font-mono text-xs">
              "{itemTitle}"
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-colors"
          >
            বাতিল (Cancel)
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white text-sm font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>মুছে ফেলুন (Delete)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
