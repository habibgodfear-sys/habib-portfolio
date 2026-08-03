export interface GraphicItem {
  id: string;
  title: string;
  category: 'Typography' | 'Poster Design' | 'Thumbnail' | 'Product Design' | 'Social Media' | 'Brochure' | 'Brochure Design' | 'Advertisement' | 'Brand Identity';
  imageUrl: string;
  description: string;
  tools: string[];
  client?: string;
  year: string;
  featured?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  youtubeUrl?: string;
  videoFileUrl?: string;
  embedUrl?: string;
  thumbnailUrl: string;
  description: string;
  isComingSoon?: boolean;
  duration?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  popular?: boolean;
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'Design Tools' | 'Animation & Motion' | 'Creative Strategy';
  icon: string;
  color: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  skillsUsed: string[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
  projectType: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Differentiator {
  title: string;
  description: string;
  icon: string;
}
