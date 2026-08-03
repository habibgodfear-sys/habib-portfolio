import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, X, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  onLogout: () => void;
}

export default function AdminAuthModal({
  isOpen,
  isAdmin,
  onClose,
  onLoginSuccess,
  onLogout,
}: AdminAuthModalProps) {
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Default admin passcode is 1234 or saved custom PIN
  const getStoredPin = () => {
    return localStorage.getItem('adminPasscode') || '1234';
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getStoredPin();

    if (pinInput.trim() === correctPin) {
      setErrorMsg('');
      setPinInput('');
      onLoginSuccess();
      onClose();
    } else {
      setErrorMsg('ভুল পাসকোড! সঠিক PIN দিন (Default: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-slate-900/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(6,182,212,0.25)] text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isAdmin ? (
          /* Already Admin View */
          <div className="text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">
              👑 অ্যাডমিন মোড অ্যাক্টিভ রয়েছে
            </h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              আপনি এখন প্যানেলের মালিক হিসেবে ফাইল আপলোড ও মুছে ফেলার পূর্ণ অধিকার পাচ্ছেন। সাধারণ ভিজিটরদের জন্য এই বাটনগুলো লুকানো থাকবে।
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all"
              >
                বন্ধ করুন (Close)
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-sm font-semibold transition-all"
              >
                লগআউট (Logout)
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  অ্যাডমিন লগইন (Admin Login)
                </h3>
                <p className="text-xs text-slate-400">
                  সাইটের নিয়ন্ত্রণ ও আপলোড অপশন আনলক করতে PIN দিন
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  অ্যাডমিন পাসকোড (Admin PIN)
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setErrorMsg('');
                    }}
                    placeholder="Enter Admin PIN (Default: 1234)"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errorMsg && (
                  <p className="text-xs font-medium text-rose-400 mt-2 flex items-center gap-1">
                    ⚠️ {errorMsg}
                  </p>
                )}
                <p className="text-[11px] text-cyan-400/80 mt-2 font-mono">
                  💡 ডিফল্ট পাসকোড: <span className="bg-slate-950 px-2 py-0.5 rounded border border-cyan-500/30 font-bold text-white">1234</span>
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>অ্যাডমিন আনলক করুন (Unlock Admin)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
