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
  navbar?: {
    logoTitle?: string;
    logoSubtitle?: string;
    logoImageUrl?: string;
    btnConsultation?: string;
    oabNumber?: string;
  };
  hero: {
    kicker: string;
    kickerSub?: string;
    titlePart1: string;
    titleHighlight: string;
    titlePart2?: string;
    description: string;
    tagline: string;
    heroImageUrl?: string;
    foundingYear?: string;
    experienceYears?: string;
    oabNumber?: string;
    yearsExperience?: string;
    assetsPreserved?: string;
    cta1Text?: string;
    cta2Text?: string;
    badgeYear?: string;
    badgeText?: string;
  };
  contact: {
    sectionKicker?: string;
    sectionTitle?: string;
    introGold?: string;
    whatsappNumber: string; // 5551998088998
    phonePrimary: string;   // (51) 99808-8998
    phoneSecondary: string; // (51) 99807-8998
    emailPrimary: string;   // aldoleaoadvocacia@gmail.com
    emailSecondary: string; // advaldoleaobr@gmail.com
    emailHolding?: string;   // holdingfamiliarbr@gmail.com
    emailHolding1?: string;  // aldoleao.planejamento@gmail.com
    emailHolding2?: string;  // holdingfamiliarbr@gmail.com
    emailAcademia?: string;  // academialeaoferreira@gmail.com
    addressPortoAlegre: string;
    officeHours: string;
    boxVirtualTitle?: string;
    boxVirtualText?: string;
    spAddress?: string;
    bsbAddress?: string;
    cwbAddress?: string;
    spPhone?: string;
    bsbPhone?: string;
    cwbPhone?: string;
    email?: string;
  };
  founder: {
    sectionKicker?: string;
    sectionTitle?: string;
    sectionHighlight?: string;
    name: string;
    fullName: string;
    title: string;
    credentials: string;
    photoUrl: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3?: string;
    bioParagraph4?: string;
    specialties: string[];
    differences: string[];
    signatureImageUrl?: string;
    saibaMaisBtn?: string;
    btnConsultation?: string;
    btnLivros?: string;
    counterTitle?: string;
    counterSub?: string;
    counterYears?: number;
    counterSuffix?: string;
    modalBio1?: string;
    modalBio2?: string;
  };
  practiceAreas: PracticeArea[];
  excellenceSolutions: ExcellenceSolution[];
  publications: Publication[];
  digitalBooks: DigitalBook[];
  caseStudies: CaseStudy[];
  slide2?: {
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    paragraph4?: string;
    callout1?: string;
    callout2?: string;
    buttonText?: string;
    boxTitle?: string;
    boxText?: string;
    rightCardTitle?: string;
    rightCardSub?: string;
    rightCardText?: string;
    rightCardBtn?: string;
    badgeTitle?: string;
    badgeSubtitle?: string;
    badgeYears?: string;
    sampleAcquisition?: string;
    sampleMarket?: string;
    sampleCapitalGain?: string;
    inventoryTotal?: string;
    holdingTotal?: string;
    savingsAmount?: string;
    savingsPercentage?: string;
  };
  nationalPresence?: {
    kicker?: string;
    title?: string;
    titleHighlight?: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    quoteBox?: string;
    card1Text?: string;
    card2Text?: string;
    card3Text?: string;
    badgeStatus?: string;
    badgeStates?: string;
    mapImageUrl?: string;
  };
  centennialLegacy?: {
    goldKicker?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    paragraph1?: string;
    paragraph2?: string;
    events?: {
      year: string;
      title: string;
      lawyers: string[];
      description: string;
    }[];
    signatureImageUrl?: string;
    sealImageUrl?: string;
    buttonText?: string;
    card40Title?: string;
    card40Kicker?: string;
    card40Text?: string;
    sub1908?: string;
    sub1935?: string;
    sub1951?: string;
    sub1915?: string;
    sub1986?: string;
    sub2026?: string;
  };
  holdingFamiliar?: {
    sectionKicker?: string;
    sectionTitle?: string;
    sectionHighlight?: string;
    paragraph1?: string;
    paragraph2?: string;
    paragraph3?: string;
    boxWhatIsTitle?: string;
    boxWhatIsHeading?: string;
    boxWhatIsText?: string;
    boxWhyTitle?: string;
    boxWhyText?: string;
    benefitsTitle?: string;
    benefits?: string[];
    tableTitle?: string;
    tableSubtitle?: string;
    tableSavingsText?: string;
  };
  digitalConsultation?: {
    sectionKicker?: string;
    sectionTitle?: string;
    sectionHighlight?: string;
    description?: string;
    point1?: string;
    point2?: string;
    btnSchedule?: string;
    btnWhatsApp?: string;
    bgImageUrl?: string;
  };
  footer?: {
    institutionalParagraph1?: string;
    institutionalParagraph2?: string;
    textCol1Paragraph1?: string;
    textCol1Paragraph2?: string;
    copyrightText?: string;
    oabComplianceText?: string;
    oabDisclaimer?: string;
  };
  urgentHotline?: {
    badge?: string;
    title?: string;
    phoneText?: string;
    oabText?: string;
  };
}
