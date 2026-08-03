import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, Send, Upload, ShieldCheck, Lock, Code2 } from 'lucide-react';

interface NavbarProps {
  onOpenHireModal: () => void;
  onOpenUploadModal?: () => void;
  isAdmin?: boolean;
  onOpenAdminModal?: () => void;
  onOpenExportModal?: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Videos', href: '#videos' },
  { label: 'Social Media', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({
  onOpenHireModal,
  onOpenUploadModal,
  isAdmin = false,
  onOpenAdminModal,
  onOpenExportModal,
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Intersection / active section detector
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-5'
      }`}
      id="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 group clickable"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 p-[1px] shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-lg text-white font-mono">
              HR
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors font-sans">
              Habibur Rahman
            </span>
            <span className="text-[11px] text-slate-400 tracking-wider uppercase font-mono">
              Creative Director
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors clickable ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-500/80 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Admin Toggle / Status */}
          {isAdmin ? (
            <>
              {/* Export Vercel Code button */}
              {onOpenExportModal && (
                <button
                  onClick={onOpenExportModal}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-blue-300 hover:text-white bg-blue-950/80 border border-blue-500/40 hover:border-blue-400 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                  title="Export Code for Vercel Permanent Update"
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export Vercel Code</span>
                </button>
              )}

              {/* Upload Work button only shown in Admin Mode */}
              {onOpenUploadModal && (
                <button
                  onClick={onOpenUploadModal}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-400/40 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  id="nav-upload-btn"
                >
                  <Upload className="w-3.5 h-3.5 text-white" />
                  <span>+ Upload Work</span>
                </button>
              )}

              {/* Admin Badge */}
              {onOpenAdminModal && (
                <button
                  onClick={onOpenAdminModal}
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 hover:bg-amber-900/60 transition-all flex items-center gap-1.5"
                  title="Admin Mode Enabled"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>👑 Admin</span>
                </button>
              )}
            </>
          ) : (
            /* Admin Login Link for Habibur */
            onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 transition-all flex items-center gap-1.5"
                title="Admin Access (PIN: 1234)"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Admin Login</span>
              </button>
            )
          )}

          <button
            onClick={onOpenHireModal}
            className="relative group px-5 py-2 rounded-full text-xs font-semibold text-white overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] flex items-center gap-2 clickable ml-1"
            id="nav-hire-me-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span>Hire Me</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white clickable"
          aria-label="Toggle Navigation Menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    activeSection === item.href.substring(1)
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.href.substring(1) && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                  )}
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                {isAdmin ? (
                  <>
                    {onOpenExportModal && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenExportModal();
                        }}
                        className="w-full py-3 rounded-xl bg-blue-950/90 border border-blue-500/40 text-blue-200 font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span>Export Vercel Code</span>
                      </button>
                    )}

                    {onOpenUploadModal && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenUploadModal();
                        }}
                        className="w-full py-3 rounded-xl bg-cyan-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4 text-white" />
                        <span>+ Upload Custom Work</span>
                      </button>
                    )}

                    {onOpenAdminModal && (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenAdminModal();
                        }}
                        className="w-full py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>👑 Admin Mode Settings</span>
                      </button>
                    )}
                  </>
                ) : (
                  onOpenAdminModal && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdminModal();
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Admin Login (PIN: 1234)</span>
                    </button>
                  )
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenHireModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Hire Habibur Rahman</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
