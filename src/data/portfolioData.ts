import { GraphicItem, VideoItem, ServiceItem, SkillItem, ExperienceItem, TestimonialItem, ProcessStep, Differentiator } from '../types';
import habiburPortrait from '../assets/images/regenerated_image_1785462133752.png';

// Hero portrait image for Habibur Rahman
export const HERO_PORTRAIT_URL = habiburPortrait;

// Social Media & Graphic Design Portfolio items
export const GRAPHIC_ITEMS: GraphicItem[] = [];

// Video Portfolio items with exact YouTube links provided in prompt
export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'v-01',
    title: 'Kinetic Motion Graphics Reel',
    category: 'Motion Graphics',
    youtubeUrl: 'https://youtube.com/shorts/Pk3tWWYyDWw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek kinetic typography and 2D/3D motion graphics overlay designed for fast-paced digital branding.',
    duration: '0:30'
  },
  {
    id: 'v-02',
    title: 'Dynamic Visual Effects & Motion',
    category: 'Motion Graphics',
    youtubeUrl: 'https://youtube.com/shorts/OiRwK-EbTeQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Advanced shape layers, glowing particles, and seamless match-cut transitions created in Adobe After Effects.',
    duration: '0:25'
  },
  {
    id: 'v-03',
    title: 'Creative Brand Motion Commercial',
    category: 'Motion Graphics',
    youtubeUrl: 'https://youtube.com/shorts/8BXlRc1wnnQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'High-energy promotional short with punchy sound design and visual pacing for modern social ads.',
    duration: '0:28'
  },
  {
    id: 'v-04',
    title: 'Viral Cash Cow Channel Video',
    category: 'Cash Cow',
    youtubeUrl: 'https://youtube.com/shorts/9KZW_Jl0MDw',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
    description: 'Engaging, fast-paced faceless Cash Cow style editing with animated captions, motion graphics, and sound design.',
    duration: '0:45'
  },
  {
    id: 'v-05',
    title: 'Habibur Rahman Official Motion Showreel',
    category: 'Showreel',
    youtubeUrl: 'https://youtube.com/shorts/ot3iY_iOPTc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive highlight reel showcasing top graphic designs, motion graphic sequences, and video editing work.',
    duration: '0:50'
  },
  {
    id: 'v-06',
    title: 'After Effects Basic Motion Masterclass',
    category: 'After Effects Basic Motion',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'A deep-dive breakdown into keyframing, easing graph editor, expressions, and shape motion.',
    isComingSoon: true
  },
  {
    id: 'v-07',
    title: 'Nafees Salim Collaboration Project',
    category: 'Nafees Salim',
    youtubeUrl: 'https://youtu.be/dIeS7W25rcI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Full YouTube production video featuring high-end storytelling cuts, sound design, color grading, and motion graphics.',
    duration: '10:12'
  }
];

// Services list
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 's-graphic',
    title: 'Graphic Design',
    description: 'Visually captivating designs engineered to grab attention and communicate your brand message effortlessly.',
    iconName: 'Palette',
    deliverables: ['Vector Assets', 'Print Ready Files', 'Source Files (.AI, .PSD)', 'High-Res Exports'],
    popular: true
  },
  {
    id: 's-motion',
    title: 'Motion Graphics',
    description: 'Bringing static graphics to life with smooth keyframe animations, logo stings, and kinetic typography.',
    iconName: 'Film',
    deliverables: ['After Effects Projects', '4K Video Render', 'Lottie / GIF Animations', 'Sound Effects Synced'],
    popular: true
  },
  {
    id: 's-video',
    title: 'Video Editing',
    description: 'Seamless storytelling with cinematic color grading, fast-paced pacing, jump-cuts, captions, and sound design.',
    iconName: 'Video',
    deliverables: ['1080p / 4K Video Exports', 'Premiere Pro Files', 'Engaging Subtitles', 'Sound Mix'],
    popular: true
  },
  {
    id: 's-social',
    title: 'Social Media Design',
    description: 'High-converting Instagram carousels, Facebook banners, LinkedIn posts, and story templates.',
    iconName: 'Share2',
    deliverables: ['Formatted Multi-ratio Banners', 'Editable Canva/PSD Templates', 'Grid Layout Strategy']
  },
  {
    id: 's-poster',
    title: 'Poster Design',
    description: 'Creative event posters, movie posters, and aesthetic wall art that leave a lasting visual impact.',
    iconName: 'Image',
    deliverables: ['High Resolution CMYK/RGB', 'Mockup Presentations', 'Custom Typography']
  },
  {
    id: 's-typography',
    title: 'Typography',
    description: 'Custom font pairing, kinetic letterform arrangements, expressive titles, and brand typography rules.',
    iconName: 'Type',
    deliverables: ['Font Pairing Hierarchy', 'Custom Vector Titles', 'Type Style Guides']
  },
  {
    id: 's-brochure',
    title: 'Brochure Design',
    description: 'Multi-page corporate brochures, bi-fold/tri-fold flyers, and product catalogs designed to sell.',
    iconName: 'BookOpen',
    deliverables: ['PDF Digital Brochure', 'Print Ready PDF with Bleed', 'InDesign Layouts']
  },
  {
    id: 's-brand',
    title: 'Brand Identity',
    description: 'Complete brand ecosystem including logos, color palettes, brand guidelines, and visual language.',
    iconName: 'Sparkles',
    deliverables: ['Brand Style Guide PDF', 'Logo Variations', 'Typography System', 'Stationery Kit'],
    popular: true
  },
  {
    id: 's-ad',
    title: 'Product Advertisement',
    description: 'High-impact commercial graphics and motion ads designed for social media ad campaigns (Meta, TikTok, YouTube).',
    iconName: 'Megaphone',
    deliverables: ['A/B Testing Variants', 'Vertical/Square Formats', 'Call to Action Focus']
  },
  {
    id: 's-thumb',
    title: 'Thumbnail Design',
    description: 'Viral YouTube and video thumbnails crafted with psychological triggers to boost click-through rate (CTR).',
    iconName: 'LayoutGrid',
    deliverables: ['High CTR Thumbnails', 'Subject Cutouts', 'Lighting & Glow Effects']
  }
];

// Skill Items
export const SKILLS_DATA: SkillItem[] = [
  { name: 'Photoshop', level: 98, category: 'Design Tools', icon: 'Image', color: '#31A8FF' },
  { name: 'Illustrator', level: 95, category: 'Design Tools', icon: 'PenTool', color: '#FF9A00' },
  { name: 'After Effects', level: 96, category: 'Animation & Motion', icon: 'Sparkles', color: '#9999FF' },
  { name: 'Premiere Pro', level: 92, category: 'Animation & Motion', icon: 'Video', color: '#EA77FF' },
  { name: 'Motion Graphics', level: 95, category: 'Animation & Motion', icon: 'Film', color: '#3B82F6' },
  { name: 'Typography', level: 90, category: 'Design Tools', icon: 'Type', color: '#60A5FA' },
  { name: 'Brand Identity', level: 94, category: 'Creative Strategy', icon: 'Crown', color: '#38BDF8' },
  { name: 'Video Editing', level: 95, category: 'Animation & Motion', icon: 'Scissors', color: '#2563EB' }
];

// Timeline Experience
export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: '2025 - Present',
    role: 'International Freelance Creative Specialist',
    company: 'Upwork & Direct Clients',
    location: 'Global / Remote',
    description: [
      'Delivered over 150+ high-end graphic design, motion graphics, and video editing projects for clients across US, UK, Europe, UAE, and Asia.',
      'Specialized in creating high-converting YouTube thumbnails, cash cow video edits, brand identities, and kinetic social media ads.',
      'Maintained a 100% Client Satisfaction score with 5-star ratings on international freelance marketplaces.'
    ],
    skillsUsed: ['After Effects', 'Photoshop', 'Premiere Pro', 'Illustrator', 'Client Relations']
  },
  {
    period: '2025 - 2026',
    role: 'Graphic Designer & Video Editor',
    company: 'Creative Media & Projects',
    location: 'Bangladesh',
    description: [
      'Produced digital graphic assets, viral YouTube thumbnails, and kinetic promo videos for content creators and local businesses.',
      'Worked closely with clients to formulate visual brand guidelines and high-converting marketing materials.'
    ],
    skillsUsed: ['Photoshop', 'Illustrator', 'After Effects', 'Typography', 'Video Editing']
  }
];

// Why Choose Me
export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Creative Ideas',
    description: 'Fresh, innovative concepts tailored to make your brand stand out from the competition.',
    icon: 'Lightbulb'
  },
  {
    title: 'Premium Design',
    description: 'Pixel-perfect quality with luxury aesthetic, high typography standards, and immaculate polish.',
    icon: 'Award'
  },
  {
    title: 'Fast Delivery',
    description: 'Efficient workflow with strict adherence to deadlines without compromising quality.',
    icon: 'Zap'
  },
  {
    title: 'Attention to Detail',
    description: 'Obsessive focus on alignment, spacing, color harmony, typography hierarchy, and smoothness.',
    icon: 'Target'
  },
  {
    title: 'Unlimited Creativity',
    description: 'Versatile skill set spanning static graphic design, complex motion graphics, and cinematic video editing.',
    icon: 'Infinity'
  },
  {
    title: 'Professional Communication',
    description: 'Clear, transparent, and responsive updates throughout every stage of the project.',
    icon: 'MessageSquare'
  },
  {
    title: 'Client Satisfaction',
    description: 'Dedicated to exceeding expectations with revisions until you are 100% thrilled with the result.',
    icon: 'Smile'
  }
];

// Work Process
export const WORK_PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Research',
    description: 'Deep dive into your brand, target audience, competitors, and project objectives to establish strategic direction.',
    icon: 'Search',
    details: ['Brief Analysis', 'Competitor Benchmark', 'Visual Direction Moodboard']
  },
  {
    step: '02',
    title: 'Planning',
    description: 'Structure the project timeline, storyboard motion sequences, and map out visual hierarchy.',
    icon: 'Compass',
    details: ['Creative Concept', 'Storyboard / Wireframe', 'Milestone Agreement']
  },
  {
    step: '03',
    title: 'Sketch',
    description: 'Draft initial hand sketches, typography explorations, and vector outlines before digital execution.',
    icon: 'Edit3',
    details: ['Logo/Layout Drafting', 'Styleframe Concepts', 'Client Review']
  },
  {
    step: '04',
    title: 'Design',
    description: 'Craft high-resolution visual artwork in Photoshop and Illustrator with precise typography and colors.',
    icon: 'Palette',
    details: ['Pixel-Perfect Artwork', 'Color Hierarchy', 'High-Res Assets']
  },
  {
    step: '05',
    title: 'Animation',
    description: 'Bring static graphics to life in After Effects with fluid keyframing, motion blurs, and audio sync.',
    icon: 'Film',
    details: ['Keyframe Motion', 'Special Effects & FX', 'Sound Design Synchronization']
  },
  {
    step: '06',
    title: 'Revision',
    description: 'Fine-tune details, polish timing, adjust lighting/colors based on your valuable feedback.',
    icon: 'RefreshCw',
    details: ['Client Critique', 'Pixel Refinement', 'Final Quality Check']
  },
  {
    step: '07',
    title: 'Delivery',
    description: 'Hand over organized source files, high-definition renders, and formatted assets ready for launch.',
    icon: 'CheckCircle2',
    details: ['All Source Files (.PSD, .AI, .AEP)', '4K Video Renders', 'Commercial Usage License']
  }
];

// Testimonials
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 't-01',
    clientName: 'Alexander Wright',
    role: 'Founder & CEO',
    company: 'Apex Media Group',
    country: 'United States',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Habibur is an exceptional creative talent! His motion graphics brought our brand promo to life beyond our expectations. Fast communication, immaculate attention to detail, and a true artist.',
    projectType: 'Motion Graphics Promo'
  },
  {
    id: 't-02',
    clientName: 'Sophia Lindqvist',
    role: 'Creative Director',
    company: 'Nordic Brand House',
    country: 'Sweden',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Working with Habibur on our complete brand identity redesign was a breeze. He translated our vision into high-end, luxury designs that elevated our market presence immediately. Highly recommended!',
    projectType: 'Brand Identity & Guidelines'
  },
  {
    id: 't-03',
    clientName: 'Marcus Vance',
    role: 'YouTube Creator (2.4M Subs)',
    company: 'Vance Tech Studios',
    country: 'United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Habibur’s YouTube thumbnails and video editing boosted our video CTR from 6.2% to 14.8%! His understanding of visual pacing, sound design, and color grading is world-class.',
    projectType: 'YouTube Video & Thumbnails'
  }
];

// Helper function to extract YouTube Embed URL
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Handle YouTube Shorts
  if (trimmed.includes('youtube.com/shorts/')) {
    const id = trimmed.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('/')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1`;
  }
  
  // Handle youtu.be short links
  if (trimmed.includes('youtu.be/')) {
    const id = trimmed.split('youtu.be/')[1]?.split('?')[0]?.split('/')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1`;
  }

  // Handle standard youtube.com/watch?v=
  if (trimmed.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(trimmed);
      const id = urlObj.searchParams.get('v');
      if (id) {
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1`;
      }
    } catch {
      // fallback manual parse
      const id = trimmed.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&enablejsapi=1`;
    }
  }

  // Handle youtube.com/embed/
  if (trimmed.includes('youtube.com/embed/')) {
    if (!trimmed.includes('autoplay=1')) {
      return trimmed.includes('?') ? `${trimmed}&autoplay=1` : `${trimmed}?autoplay=1`;
    }
    return trimmed;
  }

  return trimmed;
}

// Helper function to extract YouTube Embed URL with forced Muted Autoplay for Hover Previews
export function getYouTubeAutoplayEmbedUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  let id = '';
  if (trimmed.includes('youtube.com/shorts/')) {
    id = trimmed.split('youtube.com/shorts/')[1]?.split('?')[0]?.split('/')[0] || '';
  } else if (trimmed.includes('youtu.be/')) {
    id = trimmed.split('youtu.be/')[1]?.split('?')[0]?.split('/')[0] || '';
  } else if (trimmed.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(trimmed);
      id = urlObj.searchParams.get('v') || '';
    } catch {
      id = trimmed.split('v=')[1]?.split('&')[0] || '';
    }
  } else if (trimmed.includes('youtube.com/embed/')) {
    id = trimmed.split('youtube.com/embed/')[1]?.split('?')[0]?.split('/')[0] || '';
  }

  if (id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${id}&enablejsapi=1`;
  }
  return trimmed;
}
