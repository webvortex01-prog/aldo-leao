export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface CaseStudy {
  id: string;
  value: string;
  category: 'tributario' | 'patrimonial' | 'penal' | 'societario' | string;
  title: string;
  tribunal: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface PracticeArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints?: string[];
  casesSummary?: string;
  badge?: string;
  slug?: string;
  isHoldingLandingLink?: boolean;
}

export interface ExcellenceSolution {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  extendedText?: string;
  keyPoints?: string[];
  isLandingLink?: boolean;
}

export interface TimelineEvent {
  year: string;
  generation: string;
  title: string;
  description: string;
  badge?: string;
}

export interface Publication {
  id: string;
  type: 'artigo' | 'noticia';
  title: string;
  area: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  slug: string;
  image?: string;
}

export interface DigitalBook {
  id: string;
  title: string;
  author: string;
  area: string;
  description: string;
  coverImage?: string;
  pages?: string;
  year?: string;
  isbn?: string;
  format?: string;
  downloadAvailable?: boolean;
  downloadCount?: string;
  badge?: string;
  chapters?: string[];
  sampleExcerpt?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type LeadUrgency = 'baixa' | 'media' | 'imediata';
export type LeadStatus = 'novo' | 'em_analise' | 'reuniao_agendada' | 'proposta' | 'contratado' | 'arquivado';

export interface ConsultationRequest {
  id?: string;
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  area: string;
  urgency: LeadUrgency;
  estimatedValue?: string;
  summary: string;
  ndaAccepted: boolean;
  createdAt?: string;
  status?: LeadStatus;
  internalNotes?: string;
  source?: string;
}

export interface SiteConfig {
  hero: {
    kicker: string;
    titlePart1: string;
    titleHighlight: string;
    titlePart2: string;
    description: string;
    tagline: string;
    foundingYear: string;
    experienceYears: string;
    oabNumber?: string;
    yearsExperience?: string;
    assetsPreserved?: string;
  };
  contact: {
    whatsappNumber: string; // 5551998088998
    phonePrimary: string;   // (51) 998.088.998
    phoneSecondary: string; // (51) 998.078.998
    emailPrimary: string;   // aldoleao.adv@gmail.com
    emailSecondary: string; // advaldoleaobr@gmail.com
    emailHolding: string;   // holdingfamiliarbr@gmail.com
    addressPortoAlegre: string;
    officeHours: string;
    spAddress?: string;
    bsbAddress?: string;
    cwbAddress?: string;
    spPhone?: string;
    bsbPhone?: string;
    cwbPhone?: string;
    email?: string;
  };
  founder: {
    name: string;
    fullName: string;
    title: string;
    credentials: string;
    photoUrl: string;
    bioParagraph1: string;
    bioParagraph2: string;
    specialties: string[];
    differences: string[];
  };
  practiceAreas: PracticeArea[];
  excellenceSolutions: ExcellenceSolution[];
  publications: Publication[];
  digitalBooks: DigitalBook[];
  caseStudies: CaseStudy[];
}
