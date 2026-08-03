import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';

interface ContactProps {
  preselectedService?: string;
}

export default function Contact({ preselectedService }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Graphic Design',
    budget: '$100 - $500',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate direct contact transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Graphic Design',
        budget: '$100 - $500',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden text-white border-t border-white/5">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Let’s Build Something <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Extraordinary Together
            </span>
          </motion.h2>

          <p className="text-slate-400 text-sm sm:text-base">
            Have a project in mind or need custom motion graphics? Drop a message and let’s connect!
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info & Map Column */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <a
                href="mailto:habibgodfear@gmail.com"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] clickable"
                id="contact-email-link"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                    Email Direct
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-blue-300 transition-colors font-mono">
                    habibgodfear@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone / WhatsApp Card */}
              <a
                href="tel:+8801620053348"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] clickable"
                id="contact-phone-link"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                    Phone / WhatsApp
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-mono">
                    +880 1620 053 348
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                    Location
                  </div>
                  <div className="text-base font-bold text-white font-mono">
                    Bangladesh (Remote Worldwide)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold">
                Connect on Social Media
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:bg-blue-600/30 hover:border-blue-500 transition-all clickable"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:bg-pink-600/30 hover:border-pink-500 transition-all clickable"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:bg-red-600/30 hover:border-red-500 transition-all clickable"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:bg-blue-500/30 hover:border-blue-400 transition-all clickable"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                </a>
              </div>
            </div>

            {/* Google Map Representation */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-48 bg-slate-900 shadow-xl flex items-center justify-center group">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430132!2d90.3910801!3d23.750876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad332801%3A0x88046b9a244a56d9!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
                className="w-full h-full opacity-60 grayscale filter contrast-125 group-hover:opacity-80 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Dhaka, Bangladesh</span>
                </span>
                <span className="text-emerald-400 font-bold">GMT +6 (Active)</span>
              </div>
            </div>

          </div>

          {/* Right Professional Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-2">
              Send a Project Message
            </h3>
            <p className="text-slate-400 text-sm mb-8">
              Fill out the details below and Habibur will get back to you within 2-4 hours.
            </p>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md">
                    Thank you for reaching out! Habibur Rahman has received your inquiry and will contact you directly at <strong className="text-blue-400 font-mono">{formData.email || 'your email'}</strong>.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-white/10"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-blue-500 focus:outline-none text-white text-sm transition-all"
                        id="contact-form-name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-blue-500 focus:outline-none text-white text-sm transition-all"
                        id="contact-form-email"
                      />
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-blue-500 focus:outline-none text-white text-sm transition-all"
                        id="contact-form-phone"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                        Requested Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-blue-500 focus:outline-none text-white text-sm transition-all"
                        id="contact-form-service"
                      >
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                        <option value="Video Editing">Video Editing</option>
                        <option value="Social Media Design">Social Media Design</option>
                        <option value="Poster Design">Poster Design</option>
                        <option value="Typography">Typography</option>
                        <option value="Brochure Design">Brochure Design</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Product Advertisement">Product Advertisement</option>
                        <option value="Thumbnail Design">Thumbnail Design</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your vision, timeline, or links to references..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 focus:border-blue-500 focus:outline-none text-white text-sm transition-all resize-none"
                      id="contact-form-message"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all flex items-center justify-center gap-2 clickable disabled:opacity-50"
                    id="contact-form-submit-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
