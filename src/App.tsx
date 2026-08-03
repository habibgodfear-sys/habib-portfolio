import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ThreeDCanvas from './components/ThreeDCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroFeaturedVideo from './components/HeroFeaturedVideo';
import MarqueeTicker from './components/MarqueeTicker';
import Services from './components/Services';
import GraphicPortfolio from './components/GraphicPortfolio';
import VideoPortfolio from './components/VideoPortfolio';
import Skills from './components/Skills';
import WhyChooseMe from './components/WhyChooseMe';
import Contact from './components/Contact';
import EndOutroAnimation from './components/EndOutroAnimation';
import Footer from './components/Footer';
import CvModal from './components/CvModal';
import LightboxModal from './components/LightboxModal';
import VideoModal from './components/VideoModal';
import UploadModal from './components/UploadModal';
import { GraphicItem, VideoItem } from './types';
import { VIDEO_ITEMS } from './data/portfolioData';

export default function App() {
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedGraphicItem, setSelectedGraphicItem] = useState<GraphicItem | null>(null);
  const [selectedVideoItem, setSelectedVideoItem] = useState<VideoItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Local Storage state for user-uploaded graphic items
  const [userGraphicItems, setUserGraphicItems] = useState<GraphicItem[]>(() => {
    try {
      const saved = localStorage.getItem('userGraphicItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Local Storage state for user-uploaded video items
  const [userVideoItems, setUserVideoItems] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('userVideoItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('userGraphicItems', JSON.stringify(userGraphicItems));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or disabled:', e);
    }
  }, [userGraphicItems]);

  useEffect(() => {
    try {
      localStorage.setItem('userVideoItems', JSON.stringify(userVideoItems));
    } catch (e) {
      console.warn('LocalStorage quota exceeded or disabled:', e);
    }
  }, [userVideoItems]);

  const handleAddGraphicItem = (newItem: GraphicItem) => {
    setUserGraphicItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteUserGraphicItem = (id: string) => {
    if (confirm('Are you sure you want to remove this uploaded image from your portfolio?')) {
      setUserGraphicItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddVideoItem = (newItem: VideoItem) => {
    setUserVideoItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteUserVideoItem = (id: string) => {
    if (confirm('Are you sure you want to remove this uploaded video from your portfolio?')) {
      setUserVideoItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleOpenHireModal = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceInquiry = (serviceName: string) => {
    setPreselectedService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-500 selection:text-white antialiased overflow-x-hidden relative">
      {/* 3D Particle Canvas Background (nahuda.web.app style) */}
      <ThreeDCanvas />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Top Reading Progress Bar & Back-to-Top */}
      <ScrollProgress />

      {/* Sticky Glass Navbar with Upload Action */}
      <Navbar
        onOpenHireModal={handleOpenHireModal}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
      />

      {/* Main Page Layout Sections */}
      <main className="relative z-10">
        {/* Fullscreen Hero Section */}
        <Hero
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenHireModal={handleOpenHireModal}
          onPlayVideo={(video) => setSelectedVideoItem(video)}
          featuredVideo={userVideoItems[0] || VIDEO_ITEMS[4]}
        />

        {/* Featured Video Showcase placed right after name / hero header */}
        <HeroFeaturedVideo
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onPlayVideo={(video) => setSelectedVideoItem(video)}
          featuredVideo={userVideoItems[0] || VIDEO_ITEMS[4]}
        />

        {/* Nahuda.web.app Style Infinite Moving Marquee Ticker */}
        <MarqueeTicker />

        {/* Video & Motion Portfolio with Upload Feature & Video Showcase */}
        <VideoPortfolio
          onPlayVideo={(video) => setSelectedVideoItem(video)}
          userVideoItems={userVideoItems}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onDeleteUserVideoItem={handleDeleteUserVideoItem}
        />

        {/* Graphic Design Masonry Portfolio with Upload Feature */}
        <GraphicPortfolio
          onOpenLightbox={(item) => setSelectedGraphicItem(item)}
          userGraphicItems={userGraphicItems}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onDeleteUserGraphicItem={handleDeleteUserGraphicItem}
        />

        {/* Services Section */}
        <Services onSelectService={handleSelectServiceInquiry} />

        {/* Skills Matrix */}
        <Skills />

        {/* Why Choose Me */}
        <WhyChooseMe />

        {/* Contact Form & Location */}
        <Contact preselectedService={preselectedService} />

        {/* Behance-Style Animated Project Outro */}
        <EndOutroAnimation
          onOpenHireModal={handleOpenHireModal}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
        />
      </main>

      {/* Sleek Footer */}
      <Footer />

      {/* Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      {/* Image & Video Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddGraphicItem={handleAddGraphicItem}
        onAddVideoItem={handleAddVideoItem}
      />

      {/* Lightbox Image Preview Modal */}
      <LightboxModal
        item={selectedGraphicItem}
        onClose={() => setSelectedGraphicItem(null)}
      />

      {/* Video YouTube Player Modal */}
      <VideoModal
        video={selectedVideoItem}
        onClose={() => setSelectedVideoItem(null)}
      />
    </div>
  );
}
