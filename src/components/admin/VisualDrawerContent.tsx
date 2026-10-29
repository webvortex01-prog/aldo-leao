import React, { useState } from 'react';
import { 
  Sparkles, 
  Edit3, 
  Image as ImageIcon, 
  FileText, 
  PhoneCall, 
  Scale, 
  BookOpen, 
  ChevronRight, 
  Plus, 
  Trash2, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  Trophy, 
  Upload, 
  ShieldCheck, 
  ExternalLink,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { ImageUploadField } from './ImageUploadField';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../../utils/phoneUtils';
import { PracticeArea, DigitalBook, Publication } from '../../types';

export type EditableSectionKey = 
  | 'navbar'
  | 'hero'
  | 'digital_presence'
  | 'legacy'
  | 'founder'
  | 'services'
  | 'solutions'
  | 'consultation'
  | 'holding'
  | 'publications'
  | 'books'
  | 'contact'
  | 'footer'
  | 'academia'
  | 'all_images';

interface VisualDrawerContentProps {
  activeSection: EditableSectionKey;
  setActiveSection: (key: EditableSectionKey | null) => void;
  onSwitchToFormMode: () => void;
}

export const VisualDrawerContent: React.FC<VisualDrawerContentProps> = ({
  activeSection,
  setActiveSection,
  onSwitchToFormMode
}) => {
  const { siteConfig, updateSiteConfig } = useSite();
  const [holdingSubTab, setHoldingSubTab] = useState<'section' | 'landing'>('section');

  // Helpers para gerenciamento de itens dinâmicos
  const handleAddTimelineEvent = () => {
    const events = siteConfig.centennialLegacy?.events || [];
    const newEvent = {
      year: '2026',
      title: 'Novo Marco Histórico',
      lawyers: ['Dr. Aldo Leão'],
      description: 'Descrição da conquista institucional ou consolidação jurídica do escritório.'
    };
    updateSiteConfig({
      centennialLegacy: {
        ...(siteConfig.centennialLegacy || {}),
        events: [...events, newEvent]
      }
    });
  };

  const handleRemoveTimelineEvent = (index: number) => {
    const events = (siteConfig.centennialLegacy?.events || []).filter((_, i) => i !== index);
    updateSiteConfig({
      centennialLegacy: {
        ...(siteConfig.centennialLegacy || {}),
        events
      }
    });
  };

  const handleAddPracticeArea = () => {
    const newArea: PracticeArea = {
      id: `area-${Date.now()}`,
      number: String((siteConfig.practiceAreas || []).length + 1).padStart(2, '0'),
      title: 'Nova Especialidade Jurídica',
      subtitle: 'Atuação Estratégica e Preventiva',
      description: 'Descrição detalhada dos serviços jurídicos de alta complexidade prestados aos clientes.',
      badge: 'Especializada'
    };
    updateSiteConfig({
      practiceAreas: [...(siteConfig.practiceAreas || []), newArea]
    });
  };

  const handleRemovePracticeArea = (index: number) => {
    const updated = (siteConfig.practiceAreas || []).filter((_, i) => i !== index);
    updateSiteConfig({ practiceAreas: updated });
  };

  const handleAddBook = () => {
    const newBook: DigitalBook = {
      id: `livro-${Date.now()}`,
      title: 'Novo Livro / E-Book Jurídico',
      author: 'Dr. Aldo Leão',
      area: 'Planejamento Patrimonial 4.0',
      description: 'Sinopse e descrição da obra jurídica para download gratuito.',
      pages: '120 páginas',
      year: '2026',
      publicationOrder: 0,
      isbn: 'Oficial',
      format: 'Livro Digital (PDF Gratuito)',
      downloadAvailable: true,
      downloadCount: '1.200 downloads',
      badge: 'Download Gratuito',
      coverImage: '/capa-1.png'
    };
    updateSiteConfig({
      digitalBooks: [newBook, ...(siteConfig.digitalBooks || [])]
    });
  };

  const handleRemoveBook = (index: number) => {
    if (window.confirm('Tem certeza que deseja remover este livro digital?')) {
      const updated = (siteConfig.digitalBooks || []).filter((_, i) => i !== index);
      updateSiteConfig({ digitalBooks: updated });
    }
  };

  const handleAddPublication = (type: 'artigo' | 'noticia' = 'artigo') => {
    const isArtigo = type === 'artigo';
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const newPub: Publication = {
      id: `pub-${Date.now()}`,
      type,
      title: isArtigo ? 'Novo Artigo Jurídico · Dr. Aldo Leão' : 'Nova Notícia Jurídica Estratégica',
      area: 'Planejamento Patrimonial 4.0',
      date: formattedDate,
      readTime: '5 min de leitura',
      slug: `${type}-${Date.now()}`,
      excerpt: isArtigo
        ? 'Resumo executivo do artigo jurídico para prévia nos cartões e leitura rápida.'
        : 'Resumo da nova notícia com informações estratégicas para os clientes e empresas.',
      content: isArtigo
        ? 'Escreva ou cole aqui o conteúdo completo do artigo jurídico assinado pelo Dr. Aldo Leão. Este texto será exibido integralmente na página de leitura com a assinatura oficial ao final.'
        : 'Escreva ou cole aqui o conteúdo completo da notícia jurídica com os desdobramentos legais e análise estratégica.'
    };
    updateSiteConfig({
      publications: [newPub, ...(siteConfig.publications || [])]
    });
  };

  const handleRemovePublication = (index: number) => {
    if (window.confirm('Tem certeza que deseja remover esta publicação?')) {
      const updated = (siteConfig.publications || []).filter((_, i) => i !== index);
      updateSiteConfig({ publications: updated });
    }
  };

  const handleAddDifferential = () => {
    const current = siteConfig.founder.differentials || [];
    updateSiteConfig({
      founder: { ...siteConfig.founder, differentials: [...current, 'Novo diferencial estratégico'] }
    });
  };

  const handleRemoveDifferential = (index: number) => {
    const current = (siteConfig.founder.differentials || []).filter((_, i) => i !== index);
    updateSiteConfig({ founder: { ...siteConfig.founder, differentials: current } });
  };

  const handleAddCurriculumLeadership = () => {
    const current = siteConfig.founder.curriculumLeadershipItems || [];
    updateSiteConfig({
      founder: { ...siteConfig.founder, curriculumLeadershipItems: [...current, 'Nova liderança institucional'] }
    });
  };

  const handleRemoveCurriculumLeadership = (index: number) => {
    const current = (siteConfig.founder.curriculumLeadershipItems || []).filter((_, i) => i !== index);
    updateSiteConfig({ founder: { ...siteConfig.founder, curriculumLeadershipItems: current } });
  };

  const handleAddCurriculumTrajectory = () => {
    const current = siteConfig.founder.curriculumTrajectoryItems || [];
    updateSiteConfig({
      founder: { ...siteConfig.founder, curriculumTrajectoryItems: [...current, 'Novo cargo ou função institucional'] }
    });
  };

  const handleRemoveCurriculumTrajectory = (index: number) => {
    const current = (siteConfig.founder.curriculumTrajectoryItems || []).filter((_, i) => i !== index);
    updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryItems: current } });
  };

  const handleAddCurriculumDocencia = () => {
    const current = siteConfig.founder.curriculumDocenciaItems || [];
    updateSiteConfig({
      founder: { ...siteConfig.founder, curriculumDocenciaItems: [...current, 'Nova instituição ou disciplina acadêmica'] }
    });
  };

  const handleRemoveCurriculumDocencia = (index: number) => {
    const current = (siteConfig.founder.curriculumDocenciaItems || []).filter((_, i) => i !== index);
    updateSiteConfig({ founder: { ...siteConfig.founder, curriculumDocenciaItems: current } });
  };

  const handleAddCurriculumBook = () => {
    const current = siteConfig.founder.curriculumBooksList || [];
    updateSiteConfig({
      founder: { ...siteConfig.founder, curriculumBooksList: [...current, 'Nova obra jurídica publicada'] }
    });
  };

  const handleRemoveCurriculumBook = (index: number) => {
    const current = (siteConfig.founder.curriculumBooksList || []).filter((_: string, i: number) => i !== index);
    updateSiteConfig({ founder: { ...siteConfig.founder, curriculumBooksList: current } });
  };

  const handleAddHoldingProblem = () => {
    const current = siteConfig.holdingLanding?.problemsList || [];
    updateSiteConfig({
      holdingLanding: { ...(siteConfig.holdingLanding || {}), problemsList: [...current, 'Novo problema diagnosticado no inventário'] }
    });
  };

  const handleRemoveHoldingProblem = (index: number) => {
    const current = (siteConfig.holdingLanding?.problemsList || []).filter((_, i) => i !== index);
    updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), problemsList: current } });
  };

  const handleAddHoldingAdvantage = () => {
    const current = siteConfig.holdingLanding?.advantagesList || [];
    updateSiteConfig({
      holdingLanding: { ...(siteConfig.holdingLanding || {}), advantagesList: [...current, 'Nova vantagem exclusiva da Holding'] }
    });
  };

  const handleRemoveHoldingAdvantage = (index: number) => {
    const current = (siteConfig.holdingLanding?.advantagesList || []).filter((_, i) => i !== index);
    updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), advantagesList: current } });
  };

  const handleAddHoldingTarget = () => {
    const current = siteConfig.holdingLanding?.targetList || [];
    updateSiteConfig({
      holdingLanding: { ...(siteConfig.holdingLanding || {}), targetList: [...current, 'Novo perfil do público-alvo'] }
    });
  };

  const handleRemoveHoldingTarget = (index: number) => {
    const current = (siteConfig.holdingLanding?.targetList || []).filter((_, i) => i !== index);
    updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), targetList: current } });
  };

  const handleAddHoldingFaq = () => {
    const current = siteConfig.holdingLanding?.faqs || [];
    const newFaq = {
      q: 'Nova Pergunta sobre Holding Familiar 4.0',
      a: 'Resposta técnica e orientação jurídica fundamentada.'
    };
    updateSiteConfig({
      holdingLanding: { ...(siteConfig.holdingLanding || {}), faqs: [...current, newFaq] }
    });
  };

  const handleRemoveHoldingFaq = (index: number) => {
    const current = (siteConfig.holdingLanding?.faqs || []).filter((_, i) => i !== index);
    updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), faqs: current } });
  };

  return (
    <div className="space-y-6">

      {/* Seletor Rápido de Seções no Topo do Drawer */}
      <div className="p-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/30">
        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 px-1">
          Navegar Rápido Entre Seções:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {[
            { key: 'navbar', label: 'Navbar' },
            { key: 'hero', label: 'Hero Slides' },
            { key: 'digital_presence', label: 'Presença' },
            { key: 'legacy', label: 'Legado 1908' },
            { key: 'founder', label: 'Dr. Aldo' },
            { key: 'services', label: 'Especialidades' },
            { key: 'solutions', label: 'Soluções' },
            { key: 'consultation', label: 'Agendamento' },
            { key: 'holding', label: 'Holding 4.0' },
            { key: 'publications', label: 'Publicações' },
            { key: 'books', label: 'Livros' },
            { key: 'contact', label: 'Contato' },
            { key: 'footer', label: 'Rodapé' },
            { key: 'academia', label: 'Academia' },
            { key: 'all_images', label: '🖼️ Todas as Fotos' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveSection(item.key as EditableSectionKey)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === item.key
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] text-black shadow-md'
                  : 'bg-[#071122] text-slate-300 hover:text-white hover:bg-[#0E1F3D] border border-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Atalho para o Modo Formulário Completo de Abas */}
      <div className="p-3 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 flex items-center justify-between gap-3 shadow-md">
        <div className="min-w-0">
          <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
            Quer ver em formato de Abas e Camadas?
          </span>
          <span className="text-[10px] text-slate-400 block line-clamp-1">
            Abra o painel com pesquisa global de A a Z.
          </span>
        </div>
        <button
          type="button"
          onClick={onSwitchToFormMode}
          className="px-3 py-1.5 rounded-lg bg-[#0E1F3D] hover:bg-[#D4AF37] text-[#F6E27A] hover:text-black border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow shrink-0"
        >
          Abrir Abas →
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. SEÇÃO: NAVBAR & IDENTIDADE                                  */}
      {/* ============================================================== */}
      {activeSection === 'navbar' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F6E27A]" />
              <span>Identidade Visual & Barra Superior (Navbar)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Configure o nome que aparece no logo, no topo, no rodapé e a OAB oficial.
            </p>
          </div>

          <ImageUploadField
            label="Logomarca Oficial (Leão Dourado / Símbolo do Escritório)"
            description="Faça o upload do arquivo de imagem do logo (PNG transparente recomendado) ou use o padrão."
            currentValue={siteConfig.navbar?.logoImageUrl}
            defaultValue="/img/logo-symbol.png"
            aspectRatio="square"
            onChange={(newUrl) => updateSiteConfig({
              navbar: { ...(siteConfig.navbar || {}), logoImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Nome do Escritório (Logo Principal)
              </label>
              <input
                type="text"
                value={siteConfig.navbar?.logoTitle || 'Aldo Leão'}
                onChange={(e) => updateSiteConfig({
                  navbar: { ...(siteConfig.navbar || {}), logoTitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Subtítulo do Logo (Slogan)
              </label>
              <input
                type="text"
                value={siteConfig.navbar?.logoSubtitle || 'Advocacia Estratégica'}
                onChange={(e) => updateSiteConfig({
                  navbar: { ...(siteConfig.navbar || {}), logoSubtitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Inscrição da OAB Oficial
              </label>
              <input
                type="text"
                value={siteConfig.navbar?.oabNumber || 'OAB/RS 48.452'}
                onChange={(e) => updateSiteConfig({
                  navbar: { ...(siteConfig.navbar || {}), oabNumber: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Texto do Botão Superior (Navbar)
              </label>
              <input
                type="text"
                value={siteConfig.navbar?.btnConsultation || 'Consulta Digital'}
                onChange={(e) => updateSiteConfig({
                  navbar: { ...(siteConfig.navbar || {}), btnConsultation: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SEÇÃO: HERO SLIDER (SLIDES 1 E 2)                           */}
      {/* ============================================================== */}
      {activeSection === 'hero' && (
        <div className="space-y-6">
          {/* SLIDE 1 */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-4">
            <h4 className="text-xs uppercase font-bold text-[#F6E27A] border-b border-slate-800 pb-2">
              Slide 1 · Tradição Centenária Desde 1908
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageUploadField
                label="Foto Desktop Slide 1"
                description="Exibida em computadores e notebooks."
                currentValue={siteConfig.hero.heroImageUrl}
                defaultValue="/img/novofundohero.jpg"
                aspectRatio="video"
                onChange={(newUrl) => updateSiteConfig({
                  hero: { ...siteConfig.hero, heroImageUrl: newUrl }
                })}
              />

              <ImageUploadField
                label="Foto Mobile Slide 1"
                description="Versão vertical para smartphones."
                currentValue={siteConfig.hero.heroImageMobileUrl}
                defaultValue="/img/novofundohero_mobile.jpg"
                aspectRatio="portrait"
                onChange={(newUrl) => updateSiteConfig({
                  hero: { ...siteConfig.hero, heroImageMobileUrl: newUrl }
                })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Kicker Superior 1</label>
                <input
                  type="text"
                  value={siteConfig.hero.kicker}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, kicker: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Kicker Superior 2</label>
                <input
                  type="text"
                  value={siteConfig.hero.kickerSub || 'ADVOCACIA ESTRATÉGICA'}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, kickerSub: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#F6E27A] font-semibold mb-1">Tagline Box Superior</label>
              <input
                type="text"
                value={siteConfig.hero.tagline || 'EXCELÊNCIA JURÍDICA CENTENÁRIA EM TRÊS GERAÇÕES'}
                onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, tagline: e.target.value } })}
                className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/60 text-[#F6E27A] text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Título Parte 1</label>
                <input
                  type="text"
                  value={siteConfig.hero.titlePart1}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, titlePart1: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F6E27A] font-semibold mb-1">Título Destaque Dourado</label>
                <input
                  type="text"
                  value={siteConfig.hero.titleHighlight}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, titleHighlight: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/60 text-[#F6E27A] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Título Parte 2</label>
                <input
                  type="text"
                  value={siteConfig.hero.titlePart2 || '· MAIS DE UM SÉCULO DE EXCELÊNCIA'}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, titlePart2: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Texto Principal (Slide 1)</label>
              <textarea
                rows={3}
                value={siteConfig.hero.description}
                onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, description: e.target.value } })}
                className="w-full p-2.5 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Botão CTA 1</label>
                <input
                  type="text"
                  value={siteConfig.hero.cta1Text || 'Agende a sua Consulta Digital'}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, cta1Text: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Botão CTA 2</label>
                <input
                  type="text"
                  value={siteConfig.hero.cta2Text || 'Holding Familiar 4.0'}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, cta2Text: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-4">
            <h4 className="text-xs uppercase font-bold text-[#F6E27A] border-b border-slate-800 pb-2">
              Slide 2 · Holding Familiar & Planejamento Patrimonial 4.0
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageUploadField
                label="Foto Desktop Slide 2 (BMW Oficial)"
                description="Foto de fundo do Slide 2 com portão dourado e carro BMW."
                currentValue={siteConfig.hero.heroSlide2ImageUrl}
                defaultValue="/img/holding-familiar-1.jpg"
                aspectRatio="video"
                onChange={(newUrl) => updateSiteConfig({
                  hero: { ...siteConfig.hero, heroSlide2ImageUrl: newUrl }
                })}
              />

              <ImageUploadField
                label="Foto Mobile Slide 2"
                description="Versão vertical otimizada para smartphones."
                currentValue={siteConfig.hero.heroSlide2ImageMobileUrl}
                defaultValue="/img/holding-familiar-1.jpg"
                aspectRatio="portrait"
                onChange={(newUrl) => updateSiteConfig({
                  hero: { ...siteConfig.hero, heroSlide2ImageMobileUrl: newUrl }
                })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.eyebrow || 'HOLDING FAMILIAR'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), eyebrow: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F6E27A] font-semibold mb-1">Título do Slide 2</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.title || 'PLANEJAMENTO PATRIMONIAL 4.0'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), title: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Chamada 1 (Que Legado Vai Deixar?)</label>
              <input
                type="text"
                value={siteConfig.slide2?.callout1 || 'QUE LEGADO VOCÊ VAI DEIXAR AOS SEUS HERDEIROS?'}
                onChange={(e) => updateSiteConfig({
                  slide2: { ...(siteConfig.slide2 || {}), callout1: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Chamada 2 (Evite Alta Perda)</label>
              <input
                type="text"
                value={siteConfig.slide2?.callout2 || 'EVITE A ALTA PERDA PATRIMONIAL E FINANCEIRA DOS SEUS FILHOS NO INVENTÁRIO.'}
                onChange={(e) => updateSiteConfig({
                  slide2: { ...(siteConfig.slide2 || {}), callout2: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Título Box Inferior</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.boxTitle || 'O INVENTÁRIO GERA UMA ALTA PERDA PATRIMONIAL'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), boxTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F6E27A] font-semibold mb-1">Título Card Direita</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.rightCardTitle || 'PERDA PATRIMONIAL E FINANCEIRA DOS HERDEIROS'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), rightCardTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-[#F6E27A] text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">Texto Card Direita (Alíquotas ITCMD)</label>
              <textarea
                rows={2}
                value={siteConfig.slide2?.rightCardText || 'Em média a Perda Patrimonial dos herdeiros é de 40% do Patrimônio...'}
                onChange={(e) => updateSiteConfig({
                  slide2: { ...(siteConfig.slide2 || {}), rightCardText: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>

            {/* Parâmetros do Estudo de Custos do Slide 2 */}
            <div className="p-3 rounded-lg bg-[#071122] border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-[#E5C158] uppercase block">
                Parâmetros do Estudo Comparativo do Slide 2
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-[9px] text-slate-400 mb-0.5">Aquisição (IR)</label>
                  <input
                    type="text"
                    value={siteConfig.slide2?.sampleAcquisition || 'R$ 1.000.000,00'}
                    onChange={(e) => updateSiteConfig({
                      slide2: { ...(siteConfig.slide2 || {}), sampleAcquisition: e.target.value }
                    })}
                    className="w-full p-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 mb-0.5">Mercado</label>
                  <input
                    type="text"
                    value={siteConfig.slide2?.sampleMarket || 'R$ 1.500.000,00'}
                    onChange={(e) => updateSiteConfig({
                      slide2: { ...(siteConfig.slide2 || {}), sampleMarket: e.target.value }
                    })}
                    className="w-full p-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 mb-0.5">Custo Inventário</label>
                  <input
                    type="text"
                    value={siteConfig.slide2?.inventoryTotal || 'R$ 180.000,00 a R$ 250.000,00'}
                    onChange={(e) => updateSiteConfig({
                      slide2: { ...(siteConfig.slide2 || {}), inventoryTotal: e.target.value }
                    })}
                    className="w-full p-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-[#F6E27A] font-bold mb-0.5">% Economia</label>
                  <input
                    type="text"
                    value={siteConfig.slide2?.savingsPercentage || 'Economia de até 75%'}
                    onChange={(e) => updateSiteConfig({
                      slide2: { ...(siteConfig.slide2 || {}), savingsPercentage: e.target.value }
                    })}
                    className="w-full p-1.5 rounded bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-[11px] font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SEÇÃO: PRESENÇA NACIONAL                                    */}
      {/* ============================================================== */}
      {activeSection === 'digital_presence' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#F6E27A]" />
              <span>Presença Digital Nacional & Atuação Estratégica</span>
            </h3>
          </div>

          <ImageUploadField
            label="Mapa do Brasil / Imagem de Atuação Nacional"
            description="Foto que representa a cobertura em todos os estados do Brasil."
            currentValue={siteConfig.nationalPresence?.mapImageUrl}
            defaultValue="/img/presenca-nacional-mapa.jpg"
            aspectRatio="video"
            onChange={(newUrl) => updateSiteConfig({
              nationalPresence: { ...(siteConfig.nationalPresence || {}), mapImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Kicker Superior
              </label>
              <input
                type="text"
                value={siteConfig.nationalPresence?.kicker || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), kicker: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Título
              </label>
              <input
                type="text"
                value={siteConfig.nationalPresence?.title || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), title: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
              Destaque Dourado do Título
            </label>
            <input
              type="text"
              value={siteConfig.nationalPresence?.titleHighlight || ''}
              onChange={(e) => updateSiteConfig({
                nationalPresence: { ...(siteConfig.nationalPresence || {}), titleHighlight: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
            />
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 1</label>
              <textarea
                rows={2}
                value={siteConfig.nationalPresence?.paragraph1 || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph1: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 2</label>
              <textarea
                rows={2}
                value={siteConfig.nationalPresence?.paragraph2 || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph2: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 3</label>
              <textarea
                rows={2}
                value={siteConfig.nationalPresence?.paragraph3 || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph3: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
              Box de Citação (Quote)
            </label>
            <textarea
              rows={2}
              value={siteConfig.nationalPresence?.quoteBox || ''}
              onChange={(e) => updateSiteConfig({
                nationalPresence: { ...(siteConfig.nationalPresence || {}), quoteBox: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Card 1 · Balança</label>
              <input
                type="text"
                value={siteConfig.nationalPresence?.card1Text || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), card1Text: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Card 2 · Mapa</label>
              <input
                type="text"
                value={siteConfig.nationalPresence?.card2Text || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), card2Text: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Card 3 · Brasão</label>
              <input
                type="text"
                value={siteConfig.nationalPresence?.card3Text || ''}
                onChange={(e) => updateSiteConfig({
                  nationalPresence: { ...(siteConfig.nationalPresence || {}), card3Text: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. SEÇÃO: LEGADO CENTENÁRIO (TRADIÇÃO 1908)                    */}
      {/* ============================================================== */}
      {activeSection === 'legacy' && (
        <div className="space-y-5">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#F6E27A]" />
              <span>Tradição Jurídica Centenária & Selo 1908</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ImageUploadField
              label="Selo Centenário 1908 Oficial"
              description="Selo dourado comemorativo da 3ª geração do escritório."
              currentValue={siteConfig.centennialLegacy?.sealImageUrl}
              defaultValue="/img/selo-1908.png"
              aspectRatio="square"
              onChange={(newUrl) => updateSiteConfig({
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), sealImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="Assinatura Oficial do Dr. Aldo Leão"
              description="Assinatura manuscrita em traço dourado (PNG transparente recomendado)."
              currentValue={siteConfig.centennialLegacy?.signatureImageUrl || siteConfig.founder.signatureImageUrl}
              defaultValue="/img/assinatura-dr-aldo.png"
              aspectRatio="video"
              onChange={(newUrl) => {
                updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), signatureImageUrl: newUrl },
                  founder: { ...siteConfig.founder, signatureImageUrl: newUrl }
                });
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Kicker Dourado
              </label>
              <input
                type="text"
                value={siteConfig.centennialLegacy?.goldKicker || ''}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), goldKicker: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-white font-bold mb-1">
                Título
              </label>
              <input
                type="text"
                value={siteConfig.centennialLegacy?.title || ''}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), title: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">Subtítulo</label>
            <input
              type="text"
              value={siteConfig.centennialLegacy?.subtitle || ''}
              onChange={(e) => updateSiteConfig({
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), subtitle: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="space-y-2">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 1</label>
              <textarea
                rows={2}
                value={siteConfig.centennialLegacy?.paragraph1 || ''}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), paragraph1: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 2</label>
              <textarea
                rows={2}
                value={siteConfig.centennialLegacy?.paragraph2 || ''}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), paragraph2: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          {/* Box 40 Anos */}
          <div className="p-3 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-2">
            <span className="text-[10px] font-bold text-[#F6E27A] uppercase block">Card 40 Anos</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={siteConfig.centennialLegacy?.card40Title || '40 ANOS'}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Title: e.target.value }
                })}
                placeholder="Título Card 40 Anos"
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
              />
              <input
                type="text"
                value={siteConfig.centennialLegacy?.card40Text || ''}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Text: e.target.value }
                })}
                placeholder="Texto do Card 40 Anos"
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          {/* Linha do Tempo Dinâmica */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                  Linha do Tempo · Marcos Centenários ({(siteConfig.centennialLegacy?.events || []).length})
                </h4>
                <p className="text-[10px] text-slate-400">Adicione, edite ou remova marcos históricos.</p>
              </div>
              <button
                type="button"
                onClick={handleAddTimelineEvent}
                className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] hover:bg-[#D4AF37]/30 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Adicionar Marco</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {(siteConfig.centennialLegacy?.events || []).map((ev, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#071122] border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={ev.year}
                      onChange={(e) => {
                        const updated = [...(siteConfig.centennialLegacy?.events || [])];
                        updated[idx] = { ...updated[idx], year: e.target.value };
                        updateSiteConfig({ centennialLegacy: { ...(siteConfig.centennialLegacy || {}), events: updated } });
                      }}
                      className="w-20 p-1.5 rounded bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => {
                        const updated = [...(siteConfig.centennialLegacy?.events || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        updateSiteConfig({ centennialLegacy: { ...(siteConfig.centennialLegacy || {}), events: updated } });
                      }}
                      className="flex-1 p-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTimelineEvent(idx)}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={ev.description}
                    onChange={(e) => {
                      const updated = [...(siteConfig.centennialLegacy?.events || [])];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      updateSiteConfig({ centennialLegacy: { ...(siteConfig.centennialLegacy || {}), events: updated } });
                    }}
                    className="w-full p-1.5 rounded bg-[#050B14] border border-slate-700 text-slate-300 text-[11px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. SEÇÃO: HEAD JURÍDICO (DR. ALDO LEÃO)                        */}
      {/* ============================================================== */}
      {activeSection === 'founder' && (
        <div className="space-y-5">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#F6E27A]" />
              <span>Dr. Aldo Leão · Head Jurídico & 40 Anos de Advocacia</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Escolha o retrato oficial, edite as 4 biografias, diferenciais e o currículo completo.
            </p>
          </div>

          <ImageUploadField
            label="Foto Oficial do Dr. Aldo Leão"
            description="Carregue uma nova foto ou selecione uma foto pronta da galeria oficial."
            currentValue={siteConfig.founder.photoUrl}
            defaultValue="/img/dr-aldo-portrait.jpg"
            aspectRatio="portrait"
            onChange={(newUrl) => updateSiteConfig({
              founder: { ...siteConfig.founder, photoUrl: newUrl }
            })}
            presetOptions={[
              { label: 'Retrato Formal', url: '/img/dr-aldo-portrait.jpg' },
              { label: 'Dr. Aldo Forense', url: '/img/dr-aldo-1.jpg' },
              { label: 'Ambiente Executivo', url: '/img/dr-aldo-2.jpg' },
              { label: 'Consultoria Estratégica', url: '/img/dr-aldo-3.jpg' },
              { label: 'Gabinete & Biblioteca', url: '/img/dr-aldo-4.jpg' },
              { label: 'Alta Definição', url: '/img/dr-aldo-foco.jpg' },
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Kicker da Seção
              </label>
              <input
                type="text"
                value={siteConfig.founder.sectionKicker || 'ADVOCACIA ESTRATÉGICA DESDE 1986'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, sectionKicker: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Nome de Apresentação
              </label>
              <input
                type="text"
                value={siteConfig.founder.name}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, name: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                Inscrição OAB
              </label>
              <input
                type="text"
                value={siteConfig.founder.credentials || 'OAB/RS 48.452'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, credentials: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Nome Completo Oficial
              </label>
              <input
                type="text"
                value={siteConfig.founder.fullName}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, fullName: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                Frase Dourada Abaixo da Imagem
              </label>
              <input
                type="text"
                value={siteConfig.founder.title || 'EXCELÊNCIA JURÍDICA CENTENÁRIA'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, title: e.target.value } })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
              Frase Dourada Abaixo do Título da Página
            </label>
            <input
              type="text"
              value={siteConfig.founder.sectionSubtitle || 'LIDERANÇA JURÍDICA E TRADIÇÃO DE VANGUARDA'}
              onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, sectionSubtitle: e.target.value } })}
              className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-medium"
            />
          </div>

          {/* 6 Parágrafos de Biografia */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
              Parágrafos da Biografia Oficial
            </span>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 1</label>
              <textarea
                rows={2}
                value={siteConfig.founder.bioParagraph1}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph1: e.target.value } })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 2</label>
              <textarea
                rows={2}
                value={siteConfig.founder.bioParagraph2}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph2: e.target.value } })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 3</label>
              <textarea
                rows={2}
                value={siteConfig.founder.bioParagraph3 || 'Com uma trajetória de mais de quatro décadas dedicada à Excelência Jurídica...'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph3: e.target.value } })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 4</label>
              <textarea
                rows={2}
                value={siteConfig.founder.bioParagraph4 || 'Sua sólida atuação profissional é marcada por uma expressiva contribuição acadêmica e intelectual.'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph4: e.target.value } })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 5</label>
              <textarea
                rows={2}
                value={siteConfig.founder.bioParagraph5 || 'O Dr. Aldo Leão possui extensa produção jurídica...'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph5: e.target.value } })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 6</label>
              <textarea
                rows={2}
                value={siteConfig.founder.bioParagraph6 || 'Sob sua liderança, o escritório consolida um modelo de atendimento de altíssimo padrão...'}
                onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph6: e.target.value } })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          {/* Diferenciais Estratégicos */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                Diferenciais Estratégicos ({ (siteConfig.founder.differentials || []).length })
              </span>
              <button
                type="button"
                onClick={handleAddDifferential}
                className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
            <div className="space-y-1.5">
              {(siteConfig.founder.differentials || []).map((diff, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={diff}
                    onChange={(e) => {
                      const updated = [...(siteConfig.founder.differentials || [])];
                      updated[idx] = e.target.value;
                      updateSiteConfig({ founder: { ...siteConfig.founder, differentials: updated } });
                    }}
                    className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDifferential(idx)}
                    className="p-1.5 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Currículo Vitae Completo (Modal Saiba Mais) */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/45 space-y-4">
            <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider block border-b border-[#D4AF37]/30 pb-1.5">
              Currículo Oficial Completo do Dr. Aldo Leão (Modal Saiba Mais)
            </span>

            {/* 5 Parágrafos da Trajetória */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
                Trajetória Profissional — 5 Parágrafos
              </span>
              <div>
                <label className="block text-[9px] text-slate-400 mb-0.5">Parágrafo 1</label>
                <textarea
                  rows={2}
                  value={siteConfig.founder.curriculumTrajectoryP1 || ''}
                  onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP1: e.target.value } })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 mb-0.5">Parágrafo 2</label>
                <textarea
                  rows={2}
                  value={siteConfig.founder.curriculumTrajectoryP2 || ''}
                  onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP2: e.target.value } })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 mb-0.5">Parágrafo 3</label>
                <textarea
                  rows={2}
                  value={siteConfig.founder.curriculumTrajectoryP3 || ''}
                  onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP3: e.target.value } })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 mb-0.5">Parágrafo 4</label>
                <textarea
                  rows={2}
                  value={siteConfig.founder.curriculumTrajectoryP4 || ''}
                  onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP4: e.target.value } })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 mb-0.5">Parágrafo 5 (Frase Dourada)</label>
                <input
                  type="text"
                  value={siteConfig.founder.curriculumTrajectoryP5 || ''}
                  onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP5: e.target.value } })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                />
              </div>
            </div>

            {/* Listas do Currículo: Liderança, Cargos, Docência, Obras */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              {/* Liderança */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase">Especialização e Liderança</span>
                  <button
                    type="button"
                    onClick={handleAddCurriculumLeadership}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar
                  </button>
                </div>
                {(siteConfig.founder.curriculumLeadershipItems || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 mb-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...(siteConfig.founder.curriculumLeadershipItems || [])];
                        updated[idx] = e.target.value;
                        updateSiteConfig({ founder: { ...siteConfig.founder, curriculumLeadershipItems: updated } });
                      }}
                      className="flex-1 p-1 rounded bg-[#071122] border border-slate-700 text-white text-[11px]"
                    />
                    <button type="button" onClick={() => handleRemoveCurriculumLeadership(idx)} className="p-1 text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cargos */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase">Cargos e Funções Institucionais</span>
                  <button
                    type="button"
                    onClick={handleAddCurriculumTrajectory}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar
                  </button>
                </div>
                {(siteConfig.founder.curriculumTrajectoryItems || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 mb-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...(siteConfig.founder.curriculumTrajectoryItems || [])];
                        updated[idx] = e.target.value;
                        updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryItems: updated } });
                      }}
                      className="flex-1 p-1 rounded bg-[#071122] border border-slate-700 text-white text-[11px]"
                    />
                    <button type="button" onClick={() => handleRemoveCurriculumTrajectory(idx)} className="p-1 text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Docência */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase">Docência e Magistério Superior</span>
                  <button
                    type="button"
                    onClick={handleAddCurriculumDocencia}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar
                  </button>
                </div>
                {(siteConfig.founder.curriculumDocenciaItems || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 mb-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...(siteConfig.founder.curriculumDocenciaItems || [])];
                        updated[idx] = e.target.value;
                        updateSiteConfig({ founder: { ...siteConfig.founder, curriculumDocenciaItems: updated } });
                      }}
                      className="flex-1 p-1 rounded bg-[#071122] border border-slate-700 text-white text-[11px]"
                    />
                    <button type="button" onClick={() => handleRemoveCurriculumDocencia(idx)} className="p-1 text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Livros do Currículo */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#E5C158] uppercase">Obras Jurídicas do Currículo</span>
                  <button
                    type="button"
                    onClick={handleAddCurriculumBook}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar
                  </button>
                </div>
                {(siteConfig.founder.curriculumBooksList || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5 mb-1">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...(siteConfig.founder.curriculumBooksList || [])];
                        updated[idx] = e.target.value;
                        updateSiteConfig({ founder: { ...siteConfig.founder, curriculumBooksList: updated } });
                      }}
                      className="flex-1 p-1 rounded bg-[#071122] border border-slate-700 text-white text-[11px]"
                    />
                    <button type="button" onClick={() => handleRemoveCurriculumBook(idx)} className="p-1 text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SEÇÃO: ÁREAS DE ATUAÇÃO (ESPECIALIDADES)                     */}
      {/* ============================================================== */}
      {activeSection === 'services' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#F6E27A]" />
              <span>Áreas de Atuação & Especialidades Estratégicas</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Kicker do Cabeçalho
              </label>
              <input
                type="text"
                value={siteConfig.practiceAreasHeader?.kicker || ''}
                onChange={(e) => updateSiteConfig({
                  practiceAreasHeader: { ...(siteConfig.practiceAreasHeader || {}), kicker: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-white font-bold mb-1">
                Título em Branco
              </label>
              <input
                type="text"
                value={siteConfig.practiceAreasHeader?.titleWhite || 'ÁREAS DE'}
                onChange={(e) => updateSiteConfig({
                  practiceAreasHeader: { ...(siteConfig.practiceAreasHeader || {}), titleWhite: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A]">
                  Especialidades Jurídicas ({(siteConfig.practiceAreas || []).length})
                </h4>
                <p className="text-[10px] text-slate-400">Adicione ou edite os dados de cada especialidade.</p>
              </div>
              <button
                type="button"
                onClick={handleAddPracticeArea}
                className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Adicionar Área
              </button>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {(siteConfig.practiceAreas || []).map((area, idx) => (
                <div key={area.id || idx} className="p-3 rounded-xl bg-[#071122] border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold">{area.number || String(idx + 1).padStart(2, '0')}</span>
                    <input
                      type="text"
                      value={area.title}
                      onChange={(e) => {
                        const updated = [...(siteConfig.practiceAreas || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        updateSiteConfig({ practiceAreas: updated });
                      }}
                      className="flex-1 px-2 py-1 rounded bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePracticeArea(idx)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={area.subtitle || ''}
                    placeholder="Subtítulo ou Foco de Atuação"
                    onChange={(e) => {
                      const updated = [...(siteConfig.practiceAreas || [])];
                      updated[idx] = { ...updated[idx], subtitle: e.target.value };
                      updateSiteConfig({ practiceAreas: updated });
                    }}
                    className="w-full px-2 py-1 rounded bg-[#050B14] border border-slate-800 text-slate-300 text-[11px]"
                  />
                  <textarea
                    rows={2}
                    value={area.description}
                    placeholder="Descrição detalhada dos serviços"
                    onChange={(e) => {
                      const updated = [...(siteConfig.practiceAreas || [])];
                      updated[idx] = { ...updated[idx], description: e.target.value };
                      updateSiteConfig({ practiceAreas: updated });
                    }}
                    className="w-full p-2 rounded bg-[#050B14] border border-slate-800 text-slate-300 text-[11px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. SEÇÃO: SOLUÇÕES DE EXCELÊNCIA & ACADEMIA LEÃO                */}
      {/* ============================================================== */}
      {activeSection === 'solutions' && (
        <div className="space-y-5">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F6E27A]" />
              <span>Soluções de Excelência & Academia Leão</span>
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={siteConfig.excellenceSolutionsHeader?.title || 'SOLUÇÕES DE'}
              onChange={(e) => updateSiteConfig({
                excellenceSolutionsHeader: { ...(siteConfig.excellenceSolutionsHeader || {}), title: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs font-bold"
            />
          </div>

          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {(siteConfig.excellenceSolutions || []).map((sol, idx) => (
              <div key={sol.id || idx} className="p-3 rounded-xl bg-[#050B14] border border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase">{sol.number}</span>
                  <input
                    type="text"
                    value={sol.title}
                    onChange={(e) => {
                      const updated = [...siteConfig.excellenceSolutions];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      updateSiteConfig({ excellenceSolutions: updated });
                    }}
                    className="flex-1 px-2 py-1 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
                <textarea
                  rows={2}
                  value={sol.description}
                  onChange={(e) => {
                    const updated = [...siteConfig.excellenceSolutions];
                    updated[idx] = { ...updated[idx], description: e.target.value };
                    updateSiteConfig({ excellenceSolutions: updated });
                  }}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-800 text-slate-300 text-[11px]"
                />
              </div>
            ))}
          </div>

          {/* Academia Leão Ferreira */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 space-y-3">
            <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider block">
              Academia Leão Ferreira & Palestras
            </span>
            <ImageUploadField
              label="Foto da Palestra Academia Leão"
              description="Foto do Dr. Aldo Leão ministrando conferência jurídica."
              currentValue={siteConfig.academiaLeao?.lecturePhotoUrl}
              defaultValue="/img/palestra-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                academiaLeao: { ...(siteConfig.academiaLeao || {}), lecturePhotoUrl: newUrl }
              })}
            />
            <input
              type="text"
              value={siteConfig.academiaLeao?.phraseGold || 'CONFERENCISTA E PALESTRANTE NACIONAL'}
              onChange={(e) => updateSiteConfig({
                academiaLeao: { ...(siteConfig.academiaLeao || {}), phraseGold: e.target.value }
              })}
              placeholder="Frase Dourada da Academia"
              className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
            />
            <textarea
              rows={2}
              value={siteConfig.academiaLeao?.speakerText || ''}
              onChange={(e) => updateSiteConfig({
                academiaLeao: { ...(siteConfig.academiaLeao || {}), speakerText: e.target.value }
              })}
              placeholder="Texto do Palestrante"
              className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. SEÇÃO: AGENDAMENTO / CONSULTA DIGITAL                       */}
      {/* ============================================================== */}
      {activeSection === 'consultation' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F6E27A]" />
              <span>Agendamento de Consulta Digital</span>
            </h3>
          </div>

          <ImageUploadField
            label="Imagem de Fundo da Seção de Agendamento"
            description="Foto de fundo que ambienta a caixa de solicitação de consulta."
            currentValue={siteConfig.digitalConsultation?.bgImageUrl}
            defaultValue="/img/novofundohero.jpg"
            aspectRatio="video"
            onChange={(newUrl) => updateSiteConfig({
              digitalConsultation: { ...(siteConfig.digitalConsultation || {}), bgImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Título em Branco
              </label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.sectionTitle || 'AGENDE A SUA'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), sectionTitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Destaque Dourado
              </label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.sectionHighlight || 'CONSULTA DIGITAL'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), sectionHighlight: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">Descrição</label>
            <textarea
              rows={3}
              value={siteConfig.digitalConsultation?.description || ''}
              onChange={(e) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), description: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Botão Agendamento</label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.btnSchedule || 'SOLICITAR CONSULTA ESTRATÉGICA'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), btnSchedule: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Botão WhatsApp</label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.btnWhatsApp || 'FALAR VIA WHATSAPP'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), btnWhatsApp: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. SEÇÃO: HOLDING FAMILIAR & LANDING PAGE 4.0 (/1208/)         */}
      {/* ============================================================== */}
      {activeSection === 'holding' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F6E27A]" />
                <span>Holding Familiar & Planejamento Patrimonial 4.0</span>
              </h3>
              <p className="text-[10px] text-slate-400">Escolha abaixo se deseja editar a Seção da Home ou a Landing Page Completa (/1208/).</p>
            </div>
          </div>

          {/* Abas Alternadoras da Holding */}
          <div className="flex rounded-xl bg-[#050B14] p-1 border border-[#D4AF37]/40 gap-1">
            <button
              type="button"
              onClick={() => setHoldingSubTab('section')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                holdingSubTab === 'section'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              1. Seção na Home
            </button>
            <button
              type="button"
              onClick={() => setHoldingSubTab('landing')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                holdingSubTab === 'landing'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] text-black shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              2. Landing Page 4.0 (/1208/)
            </button>
          </div>

          {/* CASO A: SEÇÃO DA HOLDING NA HOME */}
          {holdingSubTab === 'section' ? (
            <div className="space-y-4">
              <ImageUploadField
                label="Foto Oficial do Card (BMW e Portão Dourado)"
                description="Foto de alto padrão aprovada pelo cliente para ilustrar a holding familiar."
                currentValue={siteConfig.holdingFamiliar?.cardImageUrl}
                defaultValue="/img/holding-familiar-1.jpg"
                aspectRatio="video"
                onChange={(newUrl) => updateSiteConfig({
                  holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), cardImageUrl: newUrl }
                })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Kicker</label>
                  <input
                    type="text"
                    value={siteConfig.holdingFamiliar?.sectionKicker || 'PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0'}
                    onChange={(e) => updateSiteConfig({
                      holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), sectionKicker: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white font-semibold mb-1">Título</label>
                  <input
                    type="text"
                    value={siteConfig.holdingFamiliar?.sectionTitle || 'HOLDING'}
                    onChange={(e) => updateSiteConfig({
                      holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), sectionTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">Destaque</label>
                  <input
                    type="text"
                    value={siteConfig.holdingFamiliar?.sectionHighlight || 'FAMILIAR'}
                    onChange={(e) => updateSiteConfig({
                      holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), sectionHighlight: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 1</label>
                  <textarea
                    rows={2}
                    value={siteConfig.holdingFamiliar?.paragraph1 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph1: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 2</label>
                  <textarea
                    rows={2}
                    value={siteConfig.holdingFamiliar?.paragraph2 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph2: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">Parágrafo 3</label>
                  <textarea
                    rows={2}
                    value={siteConfig.holdingFamiliar?.paragraph3 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph3: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* CASO B: LANDING PAGE COMPLETA HOLDING 4.0 (/1208/) */
            <div className="space-y-5">
              {/* Fotos da Landing Page */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ImageUploadField
                  label="Foto Familiar Showcase (BMW)"
                  description="Foto principal da família no portão dourado."
                  currentValue={siteConfig.holdingLanding?.showcaseImageUrl}
                  defaultValue="/img/holding-familiar-1.jpg"
                  aspectRatio="video"
                  onChange={(newUrl) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), showcaseImageUrl: newUrl }
                  })}
                />

                <ImageUploadField
                  label="Foto Dr. Aldo na Landing Page"
                  description="Foto de autoridade jurídica do Dr. Aldo Leão."
                  currentValue={siteConfig.holdingLanding?.drAldoPhotoUrl}
                  defaultValue="/img/palestra-1.jpg"
                  aspectRatio="portrait"
                  onChange={(newUrl) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoPhotoUrl: newUrl }
                  })}
                />
              </div>

              {/* Textos do Hero da LP */}
              <div className="p-3 rounded-xl bg-[#050B14] border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  Textos do Hero da Landing Page
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.heroEyebrow || 'HOLDING FAMILIAR'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroEyebrow: e.target.value }
                    })}
                    placeholder="Eyebrow"
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A]"
                  />
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.heroTitle || 'PLANEJAMENTO'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroTitle: e.target.value }
                    })}
                    placeholder="Título Hero"
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.heroSubtitle || 'O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), heroSubtitle: e.target.value }
                  })}
                  placeholder="Subtítulo Hero"
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#E5C158] font-bold"
                />

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 block font-semibold">Os 5 Parágrafos do Hero</span>
                  <textarea
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph1 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph1: e.target.value }
                    })}
                    placeholder="Parágrafo 1"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-white text-[11px]"
                  />
                  <textarea
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph2 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph2: e.target.value }
                    })}
                    placeholder="Parágrafo 2"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-white text-[11px]"
                  />
                  <textarea
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph3 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph3: e.target.value }
                    })}
                    placeholder="Parágrafo 3"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-white text-[11px]"
                  />
                  <textarea
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph4 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph4: e.target.value }
                    })}
                    placeholder="Parágrafo 4"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-white text-[11px]"
                  />
                  <textarea
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph5 || ''}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph5: e.target.value }
                    })}
                    placeholder="Parágrafo 5 (Destaque)"
                    className="w-full p-1.5 rounded bg-[#071122] border border-[#D4AF37]/40 text-white text-[11px] font-medium"
                  />
                </div>
              </div>

              {/* Os 7 Problemas Fatais do Inventário */}
              <div className="p-3 rounded-xl bg-[#050B14] border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-red-400 uppercase">
                    Problemas do Inventário ({(siteConfig.holdingLanding?.problemsList || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingProblem}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {(siteConfig.holdingLanding?.problemsList || []).map((prob, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={prob}
                        onChange={(e) => {
                          const updated = [...(siteConfig.holdingLanding?.problemsList || [])];
                          updated[idx] = e.target.value;
                          updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), problemsList: updated } });
                        }}
                        className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHoldingProblem(idx)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* As 18 Vantagens da Holding Familiar */}
              <div className="p-3 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F6E27A] uppercase">
                    Vantagens da Holding Familiar ({(siteConfig.holdingLanding?.advantagesList || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingAdvantage}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                  {(siteConfig.holdingLanding?.advantagesList || []).map((adv, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#D4AF37] w-5 text-right">{idx + 1}.</span>
                      <input
                        type="text"
                        value={adv}
                        onChange={(e) => {
                          const updated = [...(siteConfig.holdingLanding?.advantagesList || [])];
                          updated[idx] = e.target.value;
                          updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), advantagesList: updated } });
                        }}
                        className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHoldingAdvantage(idx)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estudo Comparativo de Custos Completo */}
              <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 space-y-3">
                <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider block">
                  Tabela Comparativa de Custos (Inventário x Holding 4.0)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">ITCMD Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.itcmdInventario || 'R$ 75.000,00 (5%)'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), itcmdInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">ITCMD Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.itcmdHolding || 'R$ 60.000,00 (4%)'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), itcmdHolding: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-emerald-500/40 text-emerald-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Honorários Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.honorariosInventario || 'R$ 120.000,00 (8%)'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), honorariosInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">Honorários Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.honorariosHolding || 'R$ 70.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), honorariosHolding: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-emerald-500/40 text-emerald-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Total Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.totalInventario || 'R$ 297.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), totalInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-red-500/50 text-red-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">Total Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.totalHolding || 'R$ 133.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), totalHolding: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-emerald-500/50 text-emerald-300 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] font-bold mb-0.5">Economia em R$</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.economiaValor || 'R$ 164.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), economiaValor: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37] text-[#F6E27A] text-xs font-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 font-bold mb-0.5">Economia %</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.economiaPercentual || '55,21%'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), economiaPercentual: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-emerald-500 text-emerald-300 text-xs font-black"
                    />
                  </div>
                </div>
              </div>

              {/* FAQs da Landing Page */}
              <div className="p-3 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F6E27A] uppercase">
                    Perguntas Frequentes / FAQs ({(siteConfig.holdingLanding?.faqs || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingFaq}
                    className="text-[10px] text-[#F6E27A] hover:underline"
                  >
                    + Adicionar FAQ
                  </button>
                </div>
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {(siteConfig.holdingLanding?.faqs || []).map((faq, idx) => (
                    <div key={idx} className="p-2 rounded bg-[#071122] border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const updated = [...(siteConfig.holdingLanding?.faqs || [])];
                            updated[idx] = { ...updated[idx], q: e.target.value };
                            updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), faqs: updated } });
                          }}
                          className="flex-1 p-1 rounded bg-[#050B14] border border-slate-700 text-white text-xs font-semibold"
                        />
                        <button type="button" onClick={() => handleRemoveHoldingFaq(idx)} className="p-1 text-red-400">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.a}
                        onChange={(e) => {
                          const updated = [...(siteConfig.holdingLanding?.faqs || [])];
                          updated[idx] = { ...updated[idx], a: e.target.value };
                          updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), faqs: updated } });
                        }}
                        className="w-full p-1 rounded bg-[#050B14] border border-slate-800 text-slate-300 text-[11px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 10. SEÇÃO: PUBLICAÇÕES & ARTIGOS                               */}
      {/* ============================================================== */}
      {activeSection === 'publications' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F6E27A]" />
              <span>Publicações Jurídicas & Pareceres</span>
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white font-bold mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={siteConfig.publicationsSection?.titleWhite || 'PUBLICAÇÕES JURÍDICAS &'}
              onChange={(e) => updateSiteConfig({
                publicationsSection: { ...(siteConfig.publicationsSection || {}), titleWhite: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A]">
                  Publicações Cadastradas ({(siteConfig.publications || []).length})
                </h4>
                <p className="text-[10px] text-slate-400">Novos itens aparecem instantaneamente no topo do portal.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddPublication('artigo')}
                  className="px-2.5 py-1 rounded bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] text-black text-[11px] font-bold flex items-center gap-1 cursor-pointer hover:brightness-110"
                >
                  <Plus className="w-3 h-3" /> + Artigo
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPublication('noticia')}
                  className="px-2.5 py-1 rounded bg-[#0E1F3D] border border-[#D4AF37] text-[#F6E27A] text-[11px] font-bold flex items-center gap-1 cursor-pointer hover:bg-[#142A52]"
                >
                  <Plus className="w-3 h-3" /> + Notícia
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {(siteConfig.publications || []).map((pub, idx) => (
                <div
                  key={pub.id || idx}
                  className={`p-3.5 rounded-xl bg-[#071122] border space-y-2.5 ${
                    idx === 0 ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={pub.type || 'artigo'}
                        onChange={(e) => {
                          const updated = [...(siteConfig.publications || [])];
                          updated[idx] = { ...updated[idx], type: e.target.value as 'artigo' | 'noticia' };
                          updateSiteConfig({ publications: updated });
                        }}
                        className="px-2 py-0.5 rounded bg-[#050B14] border border-slate-700 text-[10px] text-[#F6E27A] font-bold uppercase"
                      >
                        <option value="artigo">Artigo Jurídico</option>
                        <option value="noticia">Notícia Jurídica</option>
                      </select>
                      {idx === 0 && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Topo
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePublication(idx)}
                      className="p-1 text-red-400 hover:text-red-300"
                      title="Remover publicação"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Título da Publicação</label>
                    <input
                      type="text"
                      value={pub.title}
                      onChange={(e) => {
                        const updated = [...(siteConfig.publications || [])];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        updateSiteConfig({ publications: updated });
                      }}
                      placeholder="Título da Publicação"
                      className="w-full px-2 py-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Área Jurídica</label>
                      <input
                        type="text"
                        value={pub.area}
                        onChange={(e) => {
                          const updated = [...(siteConfig.publications || [])];
                          updated[idx] = { ...updated[idx], area: e.target.value };
                          updateSiteConfig({ publications: updated });
                        }}
                        placeholder="Ex: Planejamento Patrimonial 4.0"
                        className="w-full px-2 py-1 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Data</label>
                      <input
                        type="text"
                        value={pub.date || ''}
                        onChange={(e) => {
                          const updated = [...(siteConfig.publications || [])];
                          updated[idx] = { ...updated[idx], date: e.target.value };
                          updateSiteConfig({ publications: updated });
                        }}
                        placeholder="Ex: 29/10/2026"
                        className="w-full px-2 py-1 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Resumo / Prévia</label>
                    <textarea
                      rows={2}
                      value={pub.excerpt}
                      onChange={(e) => {
                        const updated = [...(siteConfig.publications || [])];
                        updated[idx] = { ...updated[idx], excerpt: e.target.value };
                        updateSiteConfig({ publications: updated });
                      }}
                      placeholder="Resumo do Artigo"
                      className="w-full p-2 rounded bg-[#050B14] border border-slate-800 text-slate-300 text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-0.5 flex items-center justify-between">
                      <span>Conteúdo Integral</span>
                      <span className="text-[9px] text-[#D4AF37]">Texto lido no portal</span>
                    </label>
                    <textarea
                      rows={4}
                      value={pub.content || ''}
                      onChange={(e) => {
                        const updated = [...(siteConfig.publications || [])];
                        updated[idx] = { ...updated[idx], content: e.target.value };
                        updateSiteConfig({ publications: updated });
                      }}
                      placeholder="Escreva ou cole o conteúdo completo do artigo ou notícia jurídica..."
                      className="w-full p-2 rounded bg-[#050B14] border border-slate-800 text-slate-200 text-[11px] leading-relaxed font-sans"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 11. SEÇÃO: LIVROS E OBRAS DIGITAIS                             */}
      {/* ============================================================== */}
      {activeSection === 'books' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F6E27A]" />
              <span>Livros & E-Books Digitais (Downloads Gratuitos)</span>
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white font-bold mb-1">
              Título da Seção
            </label>
            <input
              type="text"
              value={siteConfig.booksSection?.titleWhite || 'OBRAS &'}
              onChange={(e) => updateSiteConfig({
                booksSection: { ...(siteConfig.booksSection || {}), titleWhite: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A]">
                  Obras Digitais ({(siteConfig.digitalBooks || []).length})
                </h4>
                <p className="text-[10px] text-slate-400">Faça o upload da capa de cada e-book e edite sinopses.</p>
              </div>
              <button
                type="button"
                onClick={handleAddBook}
                className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Adicionar Livro
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {(siteConfig.digitalBooks || []).map((book, idx) => (
                <div
                  key={book.id || idx}
                  className={`p-3.5 rounded-xl bg-[#071122] border space-y-3 ${
                    idx === 0 ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase">Livro #{idx + 1}</span>
                      {idx === 0 && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Topo
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBook(idx)}
                      className="p-1 text-red-400 hover:text-red-300"
                      title="Remover livro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ImageUploadField
                    label={`Capa de "${book.title}"`}
                    currentValue={book.coverImage}
                    defaultValue="/capa-1.png"
                    aspectRatio="portrait"
                    onChange={(newUrl) => {
                      const updated = [...(siteConfig.digitalBooks || [])];
                      updated[idx] = { ...updated[idx], coverImage: newUrl };
                      updateSiteConfig({ digitalBooks: updated });
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Título do Livro</label>
                      <input
                        type="text"
                        value={book.title}
                        onChange={(e) => {
                          const updated = [...(siteConfig.digitalBooks || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateSiteConfig({ digitalBooks: updated });
                        }}
                        placeholder="Título do Livro"
                        className="w-full px-2 py-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Área Jurídica</label>
                      <input
                        type="text"
                        value={book.area || ''}
                        onChange={(e) => {
                          const updated = [...(siteConfig.digitalBooks || [])];
                          updated[idx] = { ...updated[idx], area: e.target.value };
                          updateSiteConfig({ digitalBooks: updated });
                        }}
                        placeholder="Área Jurídica"
                        className="w-full px-2 py-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Autor</label>
                      <input
                        type="text"
                        value={book.author || 'Dr. Aldo Leão'}
                        onChange={(e) => {
                          const updated = [...(siteConfig.digitalBooks || [])];
                          updated[idx] = { ...updated[idx], author: e.target.value };
                          updateSiteConfig({ digitalBooks: updated });
                        }}
                        placeholder="Autor"
                        className="w-full px-2 py-1 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Páginas</label>
                      <input
                        type="text"
                        value={book.pages || '120 páginas'}
                        onChange={(e) => {
                          const updated = [...(siteConfig.digitalBooks || [])];
                          updated[idx] = { ...updated[idx], pages: e.target.value };
                          updateSiteConfig({ digitalBooks: updated });
                        }}
                        placeholder="Ex: 120 páginas"
                        className="w-full px-2 py-1 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Sinopse da Obra</label>
                    <textarea
                      rows={2}
                      value={book.description}
                      onChange={(e) => {
                        const updated = [...(siteConfig.digitalBooks || [])];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        updateSiteConfig({ digitalBooks: updated });
                      }}
                      placeholder="Sinopse da Obra"
                      className="w-full p-2 rounded bg-[#050B14] border border-slate-800 text-slate-300 text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 12. SEÇÃO: CONTATO & LOCALIZAÇÃO                               */}
      {/* ============================================================== */}
      {activeSection === 'contact' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F6E27A]" />
              <span>Canais de Atendimento, Telefones & Endereços</span>
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-emerald-400 font-bold mb-1">
              WhatsApp Oficial (Com DDD e código do país)
            </label>
            <input
              type="text"
              value={siteConfig.contact.whatsappNumber}
              onChange={(e) => updateSiteConfig({
                contact: { ...siteConfig.contact, whatsappNumber: getCleanWhatsAppDigits(e.target.value, '5551998088998') }
              })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-emerald-500/50 text-emerald-300 font-mono text-sm font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Porto Alegre (Linha 1)</label>
              <input
                type="text"
                value={siteConfig.contact.phonePrimary}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, phonePrimary: cleanAndFormatPhone(e.target.value, '(51) 99808-8998') }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Porto Alegre (Linha 2)</label>
              <input
                type="text"
                value={siteConfig.contact.phoneSecondary}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, phoneSecondary: cleanAndFormatPhone(e.target.value, '(51) 99807-8998') }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">São Paulo</label>
              <input
                type="text"
                value={siteConfig.contact.phoneSaoPaulo || '(11) 99808-8998'}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, phoneSaoPaulo: cleanAndFormatPhone(e.target.value, '(11) 99808-8998') }
                })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Brasília</label>
              <input
                type="text"
                value={siteConfig.contact.phoneBrasilia || '(61) 99808-8998'}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, phoneBrasilia: cleanAndFormatPhone(e.target.value, '(61) 99808-8998') }
                })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Curitiba</label>
              <input
                type="text"
                value={siteConfig.contact.phoneCuritiba || '(41) 99808-8998'}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, phoneCuritiba: cleanAndFormatPhone(e.target.value, '(41) 99808-8998') }
                })}
                className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">E-mail Principal</label>
              <input
                type="email"
                value={siteConfig.contact.emailPrimary}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, emailPrimary: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">E-mail Dr. Aldo Leão</label>
              <input
                type="email"
                value={siteConfig.contact.emailDrAldo || 'dr.aldo@aldoleao.adv.br'}
                onChange={(e) => updateSiteConfig({
                  contact: { ...siteConfig.contact, emailDrAldo: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#F6E27A] font-bold mb-1">Box 1 · Atendimento Virtual Brasil (Texto)</label>
            <textarea
              rows={3}
              value={siteConfig.contact.boxVirtualText || 'Nosso atendimento em todo o território nacional é feito com hora marcada, mediante prévio agendamento pelo WhatsApp, de 2a à 6a feira, das 08:30/11:30hs e das 13:30/18:30hs.'}
              onChange={(e) => updateSiteConfig({
                contact: { ...siteConfig.contact, boxVirtualText: e.target.value }
              })}
              className="w-full p-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-white text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">Endereço Sede (Porto Alegre)</label>
            <textarea
              rows={2}
              value={siteConfig.contact.addressPortoAlegre}
              onChange={(e) => updateSiteConfig({
                contact: { ...siteConfig.contact, addressPortoAlegre: e.target.value }
              })}
              className="w-full p-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 13. SEÇÃO: RODAPÉ INSTITUCIONAL                                */}
      {/* ============================================================== */}
      {activeSection === 'footer' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F6E27A]" />
              <span>Rodapé Institucional & Conformidade Ética</span>
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
              Copyright Oficial
            </label>
            <input
              type="text"
              value={siteConfig.footer?.copyrightText || ''}
              onChange={(e) => updateSiteConfig({
                footer: { ...(siteConfig.footer || {}), copyrightText: e.target.value }
              })}
              className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Texto de Conformidade Ética OAB
            </label>
            <textarea
              rows={3}
              value={siteConfig.footer?.oabComplianceText || ''}
              onChange={(e) => updateSiteConfig({
                footer: { ...(siteConfig.footer || {}), oabComplianceText: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 14. SEÇÃO: ACADEMIA LEÃO FERREIRA                              */}
      {/* ============================================================== */}
      {activeSection === 'academia' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#F6E27A]" />
              <span>Academia Leão Ferreira · Centro de Estudos Jurídicos</span>
            </h3>
          </div>

          <ImageUploadField
            label="Foto Oficial da Palestra"
            description="Foto do Dr. Aldo Leão ministrando conferência jurídica."
            currentValue={siteConfig.academiaLeao?.lecturePhotoUrl}
            defaultValue="/img/palestra-1.jpg"
            aspectRatio="video"
            onChange={(newUrl) => updateSiteConfig({
              academiaLeao: { ...(siteConfig.academiaLeao || {}), lecturePhotoUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Kicker
              </label>
              <input
                type="text"
                value={siteConfig.academiaLeao?.kicker || 'CENTRO DE ESTUDOS JURÍDICOS SUPERIORES'}
                onChange={(e) => updateSiteConfig({
                  academiaLeao: { ...(siteConfig.academiaLeao || {}), kicker: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Frase Dourada
              </label>
              <input
                type="text"
                value={siteConfig.academiaLeao?.phraseGold || 'CONFERENCISTA E PALESTRANTE NACIONAL'}
                onChange={(e) => updateSiteConfig({
                  academiaLeao: { ...(siteConfig.academiaLeao || {}), phraseGold: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">Texto do Palestrante</label>
            <textarea
              rows={3}
              value={siteConfig.academiaLeao?.speakerText || ''}
              onChange={(e) => updateSiteConfig({
                academiaLeao: { ...(siteConfig.academiaLeao || {}), speakerText: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 15. SEÇÃO: TODAS AS FOTOS DO SITE (CENTRAL DE UPLOAD COMPLETO) */}
      {/* ============================================================== */}
      {activeSection === 'all_images' && (
        <div className="space-y-5">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#F6E27A]" />
              <span>Central com Todas as Fotos e Imagens do Site</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Troque qualquer foto do site direto por aqui com prévia ao vivo em tempo real.
            </p>
          </div>

          <div className="space-y-4">
            <ImageUploadField
              label="1. Logomarca Navbar (Símbolo Leão Dourado)"
              currentValue={siteConfig.navbar?.logoImageUrl}
              defaultValue="/img/logo-symbol.png"
              aspectRatio="square"
              onChange={(newUrl) => updateSiteConfig({
                navbar: { ...(siteConfig.navbar || {}), logoImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="2. Slide 1 · Fundo Desktop (Duas Estátuas da Justiça)"
              currentValue={siteConfig.hero.heroImageUrl}
              defaultValue="/img/novofundohero.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                hero: { ...siteConfig.hero, heroImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="3. Slide 1 · Fundo Mobile (Smartphones)"
              currentValue={siteConfig.hero.heroImageMobileUrl}
              defaultValue="/img/novofundohero_mobile.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => updateSiteConfig({
                hero: { ...siteConfig.hero, heroImageMobileUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="4. Slide 2 · Fundo Desktop (BMW Oficial & Portão Dourado)"
              currentValue={siteConfig.hero.heroSlide2ImageUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                hero: { ...siteConfig.hero, heroSlide2ImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="5. Slide 2 · Fundo Mobile"
              currentValue={siteConfig.hero.heroSlide2ImageMobileUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => updateSiteConfig({
                hero: { ...siteConfig.hero, heroSlide2ImageMobileUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="6. Retrato Oficial do Dr. Aldo Leão"
              currentValue={siteConfig.founder.photoUrl}
              defaultValue="/img/dr-aldo-portrait.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => updateSiteConfig({
                founder: { ...siteConfig.founder, photoUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="7. Assinatura Oficial Dr. Aldo Leão"
              currentValue={siteConfig.founder.signatureImageUrl}
              defaultValue="/img/assinatura-dr-aldo.png"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                founder: { ...siteConfig.founder, signatureImageUrl: newUrl },
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), signatureImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="8. Selo Centenário 1908"
              currentValue={siteConfig.centennialLegacy?.sealImageUrl}
              defaultValue="/img/selo-1908.png"
              aspectRatio="square"
              onChange={(newUrl) => updateSiteConfig({
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), sealImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="9. Foto da Seção Holding na Home (BMW)"
              currentValue={siteConfig.holdingFamiliar?.cardImageUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), cardImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="10. Foto Familiar Showcase Landing Page (/1208/)"
              currentValue={siteConfig.holdingLanding?.showcaseImageUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                holdingLanding: { ...(siteConfig.holdingLanding || {}), showcaseImageUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="11. Foto Dr. Aldo Leão na Landing Page (/1208/)"
              currentValue={siteConfig.holdingLanding?.drAldoPhotoUrl}
              defaultValue="/img/palestra-1.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => updateSiteConfig({
                holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoPhotoUrl: newUrl }
              })}
            />

            <ImageUploadField
              label="12. Fundo da Seção Agendamento de Consulta"
              currentValue={siteConfig.digitalConsultation?.bgImageUrl}
              defaultValue="/img/novofundohero.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), bgImageUrl: newUrl }
              })}
            />
          </div>
        </div>
      )}

    </div>
  );
};
