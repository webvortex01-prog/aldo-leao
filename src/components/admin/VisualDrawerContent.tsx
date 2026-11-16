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
  Briefcase,
  Clock,
  Calendar
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { ImageUploadField } from './ImageUploadField';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../../utils/phoneUtils';
import { PracticeArea, ExcellenceSolution, DigitalBook, Publication } from '../../types';
import { RichTextarea } from './CmsEditor';

export type EditableSectionKey = 
  | 'navbar'
  | 'hero'
  | 'digital_presence'
  | 'legacy'
  | 'founder'
  | 'services'
  | 'solutions'
  | 'gestao_juridica'
  | 'consultation'
  | 'holding'
  | 'landing_holding'
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

  const handleAddExcellenceSolution = () => {
    const nextNum = String((siteConfig.excellenceSolutions || []).length + 1).padStart(2, '0');
    const newSol: ExcellenceSolution = {
      id: `sol-${Date.now()}`,
      number: nextNum,
      title: 'Nova Solução de Excelência',
      subtitle: 'ATUAÇÃO ESTRATÉGICA E PREVENTIVA',
      description: 'Descrição detalhada dos serviços de excelência jurídica especializada.',
      extendedText: ''
    };
    updateSiteConfig({
      excellenceSolutions: [...(siteConfig.excellenceSolutions || []), newSol]
    });
  };

  const handleRemoveExcellenceSolution = (index: number) => {
    const updated = (siteConfig.excellenceSolutions || []).filter((_, i) => i !== index);
    updateSiteConfig({ excellenceSolutions: updated });
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
    const pub = (siteConfig.publications || [])[index];
    if (window.confirm(`Tem certeza que deseja remover a publicação "${pub?.title || 'selecionada'}"?`)) {
      if (pub?.id) {
        try {
          const currentDeleted = JSON.parse(localStorage.getItem('aldoleao_deleted_pub_ids') || '[]');
          if (!currentDeleted.includes(pub.id)) {
            currentDeleted.push(pub.id);
            localStorage.setItem('aldoleao_deleted_pub_ids', JSON.stringify(currentDeleted));
          }
        } catch (e) {
          // Ignora
        }
      }
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
            { key: 'gestao_juridica', label: 'Gestão Jurídica 4.0' },
            { key: 'consultation', label: 'Agendamento' },
            { key: 'holding', label: 'Holding 4.0' },
            { key: 'landing_holding', label: '🚀 Landing Page (/1208/)' },
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

            {/* Guia de Medidas Ideais dos Papéis de Parede (Itens 106 e 113) */}
            <div className="p-3 rounded-xl bg-[#08152B] border border-[#D4AF37]/50 text-[11px] text-slate-200 space-y-1">
              <p className="font-bold text-[#F6E27A] uppercase tracking-wider">
                📐 Medidas Ideais Recomendadas para os Papéis de Parede (Slides 1 e 2):
              </p>
              <p>• <strong>Desktop (Computador / Notebook):</strong> <code className="text-[#F6E27A] font-bold">1920 x 1080 px</code> (Proporção 16:9 Full HD Horizontal)</p>
              <p>• <strong>Mobile (Celular / Smartphone):</strong> <code className="text-[#F6E27A] font-bold">1080 x 1920 px</code> (Proporção 9:16 Vertical)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ImageUploadField
                label="Foto Desktop Slide 1 (1920 x 1080 px)"
                description="Exibida em computadores e notebooks (Proporção 16:9)."
                currentValue={siteConfig.hero.heroImageUrl}
                defaultValue="/img/novofundohero.jpg"
                aspectRatio="video"
                onChange={(newUrl) => updateSiteConfig({
                  hero: { ...siteConfig.hero, heroImageUrl: newUrl }
                })}
              />

              <ImageUploadField
                label="Foto Mobile Slide 1 (1080 x 1920 px)"
                description="Versão vertical para smartphones (Proporção 9:16)."
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
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Primeira Frase Topo · Parte Dourada (Item 115)</label>
                <input
                  type="text"
                  value={siteConfig.hero.kicker ?? 'ALDO LEÃO'}
                  onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, kicker: e.target.value } })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Primeira Frase Topo · Parte Branca (Item 115)</label>
                <input
                  type="text"
                  value={siteConfig.hero.kickerSub ?? 'ADVOCACIA ESTRATÉGICA'}
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

            <RichTextarea
              label="Texto Principal (Slide 1)"
              rows={4}
              value={siteConfig.hero.description}
              onChange={(val) => updateSiteConfig({ hero: { ...siteConfig.hero, description: val } })}
              hint="Editor rico com controle de tamanho de fontes, cores, negrito, caixas e pré-visualização"
            />

            {/* Tempo de Transição do Slide 1 (Item 61) */}
            <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 flex items-center justify-between gap-3 shadow-md">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold">
                  ⏱️ Tempo de Exibição do Slide 1
                </label>
                <span className="text-[10px] text-slate-300">Tempo em segundos antes de alternar para o Slide 2</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  min={3}
                  max={120}
                  value={siteConfig.hero.slide1Duration || 18}
                  onChange={(e) => updateSiteConfig({
                    hero: { ...siteConfig.hero, slide1Duration: Number(e.target.value) || 18 }
                  })}
                  className="w-16 px-2 py-1.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/60 text-[#F6E27A] font-bold text-center text-xs"
                />
                <span className="text-xs text-slate-300 font-bold">seg</span>
              </div>
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

            {/* Box 2 do Slide 1 (Item 79: Totalmente Editável) */}
            <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-3">
              <h5 className="text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold">
                Box 2 · Advocacia Estratégica (Item 79)
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-300 font-semibold mb-1">Kicker Box 2</label>
                  <input
                    type="text"
                    value={siteConfig.hero.box2Kicker || 'Excelência Jurídica Centenária'}
                    onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, box2Kicker: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-300 font-semibold mb-1">Título Box 2</label>
                  <input
                    type="text"
                    value={siteConfig.hero.box2Title || 'ADVOCACIA ESTRATÉGICA'}
                    onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, box2Title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
              </div>
              <RichTextarea
                label="Texto Descritivo Box 2 (Item 79)"
                rows={3}
                value={siteConfig.hero.box2Text || 'Um legado jurídico familiar construído desde 1908, que atravessa três gerações e se traduz em uma Advocacia Estratégica que integra conhecimentos multidisciplinares, planejamento e inteligência jurídica.'}
                onChange={(val) => updateSiteConfig({ hero: { ...siteConfig.hero, box2Text: val } })}
                hint="Editor visual estilo Word com negrito, alinhamento, tamanho de fonte e cores"
              />
            </div>

            {/* Box Abaixo da Logomarca do Leão (Item 79: Totalmente Editável) */}
            <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-3">
              <h5 className="text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold">
                Box Sob a Logomarca do Leão (Item 79)
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-300 font-semibold mb-1">Título Sob a Logo</label>
                  <input
                    type="text"
                    value={siteConfig.hero.logoCardTitle || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA'}
                    onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, logoCardTitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#F6E27A] font-semibold mb-1">Subtítulo Sob a Logo</label>
                  <input
                    type="text"
                    value={siteConfig.hero.logoCardSubtitle || 'Excelência Jurídica Desde 1908'}
                    onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, logoCardSubtitle: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-[#F6E27A] text-xs font-bold"
                  />
                </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                <label className="block text-[11px] text-white font-semibold mb-1">Título Branco (Item 80)</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.titleWhite ?? 'PLANEJAMENTO '}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), titleWhite: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#F6E27A] font-semibold mb-1">Título Dourado (Item 80)</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.titleGold ?? 'PATRIMONIAL 4.0'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), titleGold: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                />
              </div>
            </div>

            {/* Texto Principal do Slide 2 com RichTextarea (Item 80) */}
            <RichTextarea
              label="Texto Principal do Slide 2 (Item 80)"
              rows={4}
              value={siteConfig.slide2?.paragraph1 || 'Proteja, organize e perpetue o seu legado com a inteligência jurídica e a segurança estratégica de nossos especialistas.'}
              onChange={(val) => updateSiteConfig({
                slide2: { ...(siteConfig.slide2 || {}), paragraph1: val }
              })}
              hint="Texto que fica abaixo do título do Slide 2"
            />

            {/* Box Comparativo de Custos do Slide 2 (Item 80) */}
            <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-3">
              <h5 className="text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold">
                Box Comparativo de Custos (Item 80)
              </h5>
              <div>
                <label className="block text-[10px] text-[#F6E27A] font-semibold mb-1">Título do Box de Custos</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.costBoxTitle || 'COMPARATIVO DE CUSTOS: INVENTÁRIO X HOLDING FAMILIAR'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), costBoxTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-white text-xs font-bold"
                />
              </div>
              <RichTextarea
                label="Texto do Box de Custos"
                rows={2}
                value={siteConfig.slide2?.costBoxText || 'Você sabia que o processo de Inventário acarreta aos seus herdeiros uma Alta Perda Patrimonial e Financeira que é evitada pelo PLANEJAMENTO PATRIMONIAL 4.0?'}
                onChange={(val) => updateSiteConfig({
                  slide2: { ...(siteConfig.slide2 || {}), costBoxText: val }
                })}
              />
            </div>

            {/* Box Sob a Foto Familiar (Item 80) */}
            <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-3">
              <h5 className="text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold">
                Box Sob a Foto Familiar (Item 80)
              </h5>
              <div>
                <label className="block text-[10px] text-white font-semibold mb-1">Texto em Branco</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.photoCardTitle || 'O PLANEJAMENTO 4.0 EVITA A PERDA PATRIMONIAL DOS HERDEIROS NO INVENTÁRIO'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), photoCardTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#F6E27A] font-semibold mb-1">Texto em Dourado</label>
                <input
                  type="text"
                  value={siteConfig.slide2?.photoCardSubtitle || 'VOCÊ JÁ FEZ O SEU PLANEJAMENTO PATRIMONIAL 4.0?'}
                  onChange={(e) => updateSiteConfig({
                    slide2: { ...(siteConfig.slide2 || {}), photoCardSubtitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
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

            <RichTextarea
              label="Texto Card Direita (Alíquotas ITCMD 8%, 16%, 20%, 30%)"
              rows={3}
              value={siteConfig.slide2?.rightCardText || 'Em média a Perda Patrimonial dos herdeiros é de 40% do Patrimônio...'}
              onChange={(val) => updateSiteConfig({
                slide2: { ...(siteConfig.slide2 || {}), rightCardText: val }
              })}
              hint="Editor rico com formatação avançada de alíquotas e cores"
            />

            {/* Tempo de Transição do Slide 2 (Item 61) */}
            <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 flex items-center justify-between gap-3 shadow-md">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold">
                  ⏱️ Tempo de Exibição do Slide 2
                </label>
                <span className="text-[10px] text-slate-300">Tempo em segundos antes de alternar para o Slide 1</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  min={3}
                  max={120}
                  value={siteConfig.hero.slide2Duration || 18}
                  onChange={(e) => updateSiteConfig({
                    hero: { ...siteConfig.hero, slide2Duration: Number(e.target.value) || 18 }
                  })}
                  className="w-16 px-2 py-1.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/60 text-[#F6E27A] font-bold text-center text-xs"
                />
                <span className="text-xs text-slate-300 font-bold">seg</span>
              </div>
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

          {/* Editor Rico de Todo o Conteúdo da Página Presença Nacional Digital (Item 81 e 82) */}
          <RichTextarea
            label="Conteúdo Integral da Página (Item 81 e 82)"
            rows={5}
            value={siteConfig.nationalPresence?.content || ''}
            onChange={(val) => updateSiteConfig({
              nationalPresence: { ...(siteConfig.nationalPresence || {}), content: val }
            })}
            hint="Permite editar livremente o texto de toda a página, incluindo imagens, tabelas, formatações e links como em Publicações Jurídicas. Se preenchido, substitui os parágrafos abaixo."
          />

          <div className="space-y-3">
            <RichTextarea
              label="Parágrafo 1"
              rows={2}
              value={siteConfig.nationalPresence?.paragraph1 || ''}
              onChange={(val) => updateSiteConfig({
                nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph1: val }
              })}
            />
            <RichTextarea
              label="Parágrafo 2"
              rows={2}
              value={siteConfig.nationalPresence?.paragraph2 || ''}
              onChange={(val) => updateSiteConfig({
                nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph2: val }
              })}
            />
            <RichTextarea
              label="Parágrafo 3"
              rows={2}
              value={siteConfig.nationalPresence?.paragraph3 || ''}
              onChange={(val) => updateSiteConfig({
                nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph3: val }
              })}
            />
          </div>

          <RichTextarea
            label="Box de Citação (Quote)"
            rows={2}
            value={siteConfig.nationalPresence?.quoteBox || ''}
            onChange={(val) => updateSiteConfig({
              nationalPresence: { ...(siteConfig.nationalPresence || {}), quoteBox: val }
            })}
          />

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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                Título em Branco (Item 84)
              </label>
              <input
                type="text"
                value={siteConfig.centennialLegacy?.titleWhite || siteConfig.centennialLegacy?.title || 'O LEGADO'}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), titleWhite: e.target.value, title: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Título em Dourado (Item 84)
              </label>
              <input
                type="text"
                value={siteConfig.centennialLegacy?.titleGold || siteConfig.centennialLegacy?.titleHighlight || 'CENTENÁRIO'}
                onChange={(e) => updateSiteConfig({
                  centennialLegacy: { ...(siteConfig.centennialLegacy || {}), titleGold: e.target.value, titleHighlight: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>

          {/* Editor Rico de Todo o Conteúdo da Página O Legado Centenário (Item 81 e 84) */}
          <RichTextarea
            label="Conteúdo Integral da Página (Item 81 e 84)"
            rows={4}
            value={siteConfig.centennialLegacy?.content || ''}
            onChange={(val) => updateSiteConfig({
              centennialLegacy: { ...(siteConfig.centennialLegacy || {}), content: val }
            })}
            hint="Permite editar livremente o texto de toda a página do Legado, incluindo imagens, tabelas, formatações e links como em Publicações Jurídicas. Se preenchido, substitui os parágrafos abaixo."
          />

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

          <div className="space-y-3">
            <RichTextarea
              label="Parágrafo 1"
              rows={2}
              value={siteConfig.centennialLegacy?.paragraph1 || ''}
              onChange={(val) => updateSiteConfig({
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), paragraph1: val }
              })}
            />
            <RichTextarea
              label="Parágrafo 2"
              rows={2}
              value={siteConfig.centennialLegacy?.paragraph2 || ''}
              onChange={(val) => updateSiteConfig({
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), paragraph2: val }
              })}
            />
          </div>

          {/* Box 40 Anos com Editor Rico e Selo (Item 85) */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <span className="text-xs font-bold text-[#F6E27A] uppercase block">
              Card 40 Anos + de Excelência Jurídica & Selo (Item 85)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Kicker do Card</label>
                <input
                  type="text"
                  value={siteConfig.centennialLegacy?.card40Kicker || 'ADVOCACIA ESTRATÉGICA'}
                  onChange={(e) => updateSiteConfig({
                    centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Kicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-white mb-0.5">Título do Card</label>
                <input
                  type="text"
                  value={siteConfig.centennialLegacy?.card40Title || '40 ANOS + DE EXCELÊNCIA JURÍDICA NA ADVOCACIA ESTRATÉGICA'}
                  onChange={(e) => updateSiteConfig({
                    centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Title: e.target.value }
                  })}
                  placeholder="Título Card 40 Anos"
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
              </div>
            </div>

            <RichTextarea
              label="Texto do Card 40 Anos (Item 85)"
              rows={3}
              value={siteConfig.centennialLegacy?.card40Text || 'A terceira geração de advogados do escritório jurídico mais antigo do Brasil, teve início em 1986, através do Dr. ALDO LEÃO, que consolidou a Advocacia Estratégica direcionada para a proteção patrimonial e empresarial no país, com o intuito de perpetuar legados com experiência, inteligência jurídica e serviços de vanguarda.'}
              onChange={(val) => updateSiteConfig({
                centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Text: val }
              })}
              hint="Texto com formatação rica do card de 40 anos"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Nome Abaixo do Selo</label>
                <input
                  type="text"
                  value={siteConfig.centennialLegacy?.sealName || 'Dr. ALDO LEÃO'}
                  onChange={(e) => updateSiteConfig({
                    centennialLegacy: { ...(siteConfig.centennialLegacy || {}), sealName: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#F6E27A] mb-0.5">Subtítulo Abaixo do Selo</label>
                <input
                  type="text"
                  value={siteConfig.centennialLegacy?.sealSubtitle || '40 ANOS DE ADVOCACIA ESTRATÉGICA'}
                  onChange={(e) => updateSiteConfig({
                    centennialLegacy: { ...(siteConfig.centennialLegacy || {}), sealSubtitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-[#F6E27A] text-xs font-bold"
                />
              </div>
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
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Frase Inicial Dourada (Item 86)
              </label>
              <input
                type="text"
                value={siteConfig.founder.initialGoldPhrase || siteConfig.founder.sectionKicker || 'ADVOCACIA ESTRATÉGICA DESDE 1986'}
                onChange={(e) => updateSiteConfig({
                  founder: {
                    ...siteConfig.founder,
                    initialGoldPhrase: e.target.value,
                    sectionKicker: e.target.value
                  }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
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

          {/* Editor Rico de Todo o Conteúdo da Página Dr. Aldo Leão (Item 81 e 86) */}
          <RichTextarea
            label="Conteúdo Integral da Página Dr. Aldo Leão (Item 81 e 86)"
            rows={5}
            value={siteConfig.founder.content || ''}
            onChange={(val) => updateSiteConfig({
              founder: { ...siteConfig.founder, content: val }
            })}
            hint="Permite editar livremente o texto de toda a página do Dr. Aldo Leão, com imagens, formatações e links como em Publicações Jurídicas. Se preenchido, substitui os parágrafos abaixo."
          />

          {/* Controle de Tamanho da Assinatura (Item 86) */}
          <div className="p-3.5 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#F6E27A] font-bold">
                Tamanho da Assinatura (Item 86)
              </label>
              <span className="text-xs font-bold text-white font-mono">
                {siteConfig.founder.signatureSize || 64}px
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={140}
              value={siteConfig.founder.signatureSize || 64}
              onChange={(e) => updateSiteConfig({
                founder: { ...siteConfig.founder, signatureSize: Number(e.target.value) }
              })}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-[10px] text-slate-300 block">
              Ajuste para aumentar ou diminuir a altura da assinatura manuscrita que fica logo abaixo do texto.
            </span>
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
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
              Parágrafos da Biografia Oficial (Editor Visual Completo)
            </span>
            <RichTextarea
              label="Parágrafo 1"
              rows={2}
              value={siteConfig.founder.bioParagraph1 ?? ''}
              onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph1: val } })}
            />
            <RichTextarea
              label="Parágrafo 2"
              rows={2}
              value={siteConfig.founder.bioParagraph2 ?? ''}
              onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph2: val } })}
            />
            <RichTextarea
              label="Parágrafo 3"
              rows={2}
              value={siteConfig.founder.bioParagraph3 ?? 'Com uma trajetória de mais de quatro décadas dedicada à Excelência Jurídica...'}
              onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph3: val } })}
            />
            <RichTextarea
              label="Parágrafo 4"
              rows={2}
              value={siteConfig.founder.bioParagraph4 ?? 'Sua sólida atuação profissional é marcada por uma expressiva contribuição acadêmica e intelectual.'}
              onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph4: val } })}
            />
            <RichTextarea
              label="Parágrafo 5"
              rows={2}
              value={siteConfig.founder.bioParagraph5 ?? 'O Dr. Aldo Leão possui extensa produção jurídica...'}
              onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph5: val } })}
            />
            <RichTextarea
              label="Parágrafo 6"
              rows={2}
              value={siteConfig.founder.bioParagraph6 ?? 'Sob sua liderança, o escritório consolida um modelo de atendimento de altíssimo padrão...'}
              onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph6: val } })}
            />
          </div>

          {/* Diferenciais Estratégicos (Item 86) */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div>
              <label className="block text-[10px] text-[#F6E27A] font-bold uppercase mb-1">
                Título do Bloco de Diferenciais (Item 86)
              </label>
              <input
                type="text"
                value={siteConfig.founder.differentialsTitle || 'Diferenciais Estratégicos:'}
                onChange={(e) => updateSiteConfig({
                  founder: { ...siteConfig.founder, differentialsTitle: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                Itens dos Diferenciais ({ (siteConfig.founder.differentials || []).length })
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

          {/* Box Contador 40 Anos (Item 87: Frases Dourada e Branca Editáveis) */}
          <div className="p-4 rounded-xl bg-[#08152B] border border-[#D4AF37]/40 space-y-3">
            <h5 className="text-xs uppercase tracking-wider text-[#F6E27A] font-bold">
              Box Contador 40 Anos · Frases Oficiais (Item 87)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-[#F6E27A] font-bold mb-1">
                  Frase Dourada Superior (Item 87)
                </label>
                <input
                  type="text"
                  value={siteConfig.founder.counterGoldPhrase || 'ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA'}
                  onChange={(e) => updateSiteConfig({
                    founder: { ...siteConfig.founder, counterGoldPhrase: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-white font-bold mb-1">
                  Frase Branca Inferior (Item 87)
                </label>
                <input
                  type="text"
                  value={siteConfig.founder.counterWhitePhrase || 'DESDE 1986 NUM LEGADO JURÍDICO CENTENÁRIO'}
                  onChange={(e) => updateSiteConfig({
                    founder: { ...siteConfig.founder, counterWhitePhrase: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Currículo Vitae Completo (Modal Saiba Mais) */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/45 space-y-4">
            <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider block border-b border-[#D4AF37]/30 pb-1.5">
              Currículo Oficial Completo do Dr. Aldo Leão (Modal Saiba Mais)
            </span>

            {/* 5 Parágrafos da Trajetória */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
                Trajetória Profissional — 5 Parágrafos (Modal Saiba Mais)
              </span>
              <RichTextarea
                label="Parágrafo 1"
                rows={2}
                value={siteConfig.founder.curriculumTrajectoryP1 ?? ''}
                onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP1: val } })}
              />
              <RichTextarea
                label="Parágrafo 2"
                rows={2}
                value={siteConfig.founder.curriculumTrajectoryP2 ?? ''}
                onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP2: val } })}
              />
              <RichTextarea
                label="Parágrafo 3"
                rows={2}
                value={siteConfig.founder.curriculumTrajectoryP3 ?? ''}
                onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP3: val } })}
              />
              <RichTextarea
                label="Parágrafo 4"
                rows={2}
                value={siteConfig.founder.curriculumTrajectoryP4 ?? ''}
                onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP4: val } })}
              />
              <RichTextarea
                label="Parágrafo 5 (Destaque Dourado)"
                rows={2}
                value={siteConfig.founder.curriculumTrajectoryP5 ?? ''}
                onChange={(val) => updateSiteConfig({ founder: { ...siteConfig.founder, curriculumTrajectoryP5: val } })}
              />
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

            {/* Box Azul Escuro Acima do Botão LIVROS DIGITAIS PUBLICADOS (Item 64 e 93) */}
            <div className="p-3.5 rounded-xl bg-[#071122] border border-[#D4AF37]/50 space-y-3 mt-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase">
                  Box Final (Acima do Botão "LIVROS DIGITAIS PUBLICADOS" · Item 64 e 93)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const isHidden = siteConfig.founder.curriculumClosingP1 === '' && siteConfig.founder.curriculumClosingP2 === '';
                    updateSiteConfig({
                      founder: {
                        ...siteConfig.founder,
                        curriculumClosingP1: isHidden
                          ? 'Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar centenário, que teve início em 1908 com o seu Avô Paterno o Prof. Dr. Arnaldo da Silva Ferreira, no Escritório de Advocacia mais antigo do Brasil, consolidando a convergência entre a tradição jurídica centenária de três gerações, a inteligência jurídica e a inovação da Advocacia Estratégica.'
                          : '',
                        curriculumClosingP2: isHidden
                          ? 'Atuando na Advocacia Estratégica desde 1986, com uma trajetória profissional de relevância jurídica nacional, pautada pelo rigor técnico, excelência e especialização na estruturação de soluções jurídicas avançadas, estratégicas e protetivas do patrimônio e da empresa para perpetuar o seu legado.'
                          : ''
                      }
                    });
                  }}
                  className="px-2 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-rose-200 hover:bg-rose-900/80 text-[10px] font-bold cursor-pointer shrink-0"
                >
                  {siteConfig.founder.curriculumClosingP1 === '' && siteConfig.founder.curriculumClosingP2 === ''
                    ? 'Restaurar Box'
                    : 'Excluir / Ocultar Box'}
                </button>
              </div>
              <RichTextarea
                label="Parágrafo 1 do Box Final (Item 64 e 93)"
                rows={3}
                value={siteConfig.founder.curriculumClosingP1 ?? 'Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar centenário, que teve início em 1908 com o seu Avô Paterno o Prof. Dr. Arnaldo da Silva Ferreira, no Escritório de Advocacia mais antigo do Brasil, consolidando a convergência entre a tradição jurídica centenária de três gerações, a inteligência jurídica e a inovação da Advocacia Estratégica.'}
                onChange={(val) => updateSiteConfig({
                  founder: { ...siteConfig.founder, curriculumClosingP1: val }
                })}
                hint="Formate livremente com negrito, cores e alinhamentos ou limpe para ocultar"
              />
              <RichTextarea
                label="Parágrafo 2 do Box Final (Item 64 e 93)"
                rows={3}
                value={siteConfig.founder.curriculumClosingP2 ?? 'Atuando na Advocacia Estratégica desde 1986, com uma trajetória profissional de relevância jurídica nacional, pautada pelo rigor técnico, excelência e especialização na estruturação de soluções jurídicas avançadas, estratégicas e protetivas do patrimônio e da empresa para perpetuar o seu legado.'}
                onChange={(val) => updateSiteConfig({
                  founder: { ...siteConfig.founder, curriculumClosingP2: val }
                })}
                hint="Formate livremente com negrito, cores e alinhamentos ou limpe para ocultar"
              />
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                value={siteConfig.practiceAreasHeader?.titleWhite || siteConfig.practiceAreasHeader?.title || 'ÁREAS DE'}
                onChange={(e) => updateSiteConfig({
                  practiceAreasHeader: { ...(siteConfig.practiceAreasHeader || {}), titleWhite: e.target.value, title: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Destaque Dourado do Título
              </label>
              <input
                type="text"
                value={siteConfig.practiceAreasHeader?.titleHighlight || 'ATUAÇÃO'}
                onChange={(e) => updateSiteConfig({
                  practiceAreasHeader: { ...(siteConfig.practiceAreasHeader || {}), titleHighlight: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] font-bold text-xs"
              />
            </div>
          </div>

          <div>
            <RichTextarea
              label="Texto de Introdução das Especialidades (Abaixo do Título)"
              rows={3}
              value={siteConfig.practiceAreasHeader?.description || 'Com a solidez de um legado jurídico iniciado em 1908 e a experiência de mais de quatro décadas da terceira geração da família na advocacia, a ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas avançadas e personalizadas, unindo inteligência estratégica, prevenção de riscos e excelência técnica para proteger patrimônios, fortalecer empresas e preservar legados. Nossa atuação concentra-se nas seguintes áreas:'}
              onChange={(val) => updateSiteConfig({
                practiceAreasHeader: { ...(siteConfig.practiceAreasHeader || {}), description: val }
              })}
              hint="Edição total do texto que fica abaixo de ÁREAS DE ATUAÇÃO"
            />
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
                  <RichTextarea
                    label="Descrição Detalhada do Card"
                    rows={2}
                    value={area.description}
                    onChange={(val) => {
                      const updated = [...(siteConfig.practiceAreas || [])];
                      updated[idx] = { ...updated[idx], description: val };
                      updateSiteConfig({ practiceAreas: updated });
                    }}
                    hint="Edição rica com quebras de linha preservadas, negrito, itálico e destaques"
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
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F6E27A]" />
              <span>Soluções de Excelência & Academia Leão</span>
            </h3>
            <button
              type="button"
              onClick={handleAddExcellenceSolution}
              className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Adicionar Solução
            </button>
          </div>

          {/* Cabeçalho da Seção Soluções de Excelência */}
          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block">
              Cabeçalho & Introdução (Primeira Frase Dourada, Título e Textos Descritivos)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                  Primeira Frase Dourada (Kicker)
                </label>
                <input
                  type="text"
                  value={siteConfig.excellenceSolutionsHeader?.kicker || 'INTELIGÊNCIA JURÍDICA, ESTRATÉGIA E INOVAÇÃO'}
                  onChange={(e) => updateSiteConfig({
                    excellenceSolutionsHeader: { ...(siteConfig.excellenceSolutionsHeader || {}), kicker: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071122] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white font-bold mb-1">
                  Título da Página (Branco)
                </label>
                <input
                  type="text"
                  value={siteConfig.excellenceSolutionsHeader?.title || 'SOLUÇÕES DE'}
                  onChange={(e) => updateSiteConfig({
                    excellenceSolutionsHeader: { ...(siteConfig.excellenceSolutionsHeader || {}), title: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                  Destaque Dourado do Título
                </label>
                <input
                  type="text"
                  value={siteConfig.excellenceSolutionsHeader?.titleHighlight || 'EXCELÊNCIA'}
                  onChange={(e) => updateSiteConfig({
                    excellenceSolutionsHeader: { ...(siteConfig.excellenceSolutionsHeader || {}), titleHighlight: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-[#071122] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
                />
              </div>
            </div>

            {/* Textos Descritivos Abaixo do Título com RichTextarea */}
            <div className="space-y-3">
              <RichTextarea
                label="Texto Descritivo 1 (Abaixo do Título)"
                rows={3}
                value={siteConfig.excellenceSolutionsHeader?.description1 || 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas inovadoras que integram tradição jurídica centenária, inteligência estratégica e gestão, proporcionando proteção patrimonial e empresarial, segurança jurídica, eficiência organizacional e perpetuação de patrimônios, empresas e legados familiares.'}
                onChange={(val) => updateSiteConfig({
                  excellenceSolutionsHeader: { ...(siteConfig.excellenceSolutionsHeader || {}), description1: val }
                })}
                hint="Edição completa do parágrafo 1 abaixo do título"
              />

              <RichTextarea
                label="Texto Descritivo 2 (Slogan de Excelência)"
                rows={2}
                value={siteConfig.excellenceSolutionsHeader?.description2 || 'A excelência jurídica resulta da combinação entre o conhecimento técnico centenário, experiência profissional e visão estratégica.'}
                onChange={(val) => updateSiteConfig({
                  excellenceSolutionsHeader: { ...(siteConfig.excellenceSolutionsHeader || {}), description2: val }
                })}
                hint="Edição completa do parágrafo 2 abaixo do título"
              />
            </div>
          </div>

          <div className="space-y-3">
            {(siteConfig.excellenceSolutions || []).map((sol, idx) => (
              <div key={sol.id || idx} className="p-3 rounded-xl bg-[#050B14] border border-slate-700 space-y-2">
                <div className="flex items-center justify-between gap-2">
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
                  <button
                    type="button"
                    onClick={() => handleRemoveExcellenceSolution(idx)}
                    className="p-1 text-red-400 hover:text-red-300"
                    title="Excluir Card de Solução"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={sol.subtitle || ''}
                  placeholder="Subtítulo da Solução"
                  onChange={(e) => {
                    const updated = [...siteConfig.excellenceSolutions];
                    updated[idx] = { ...updated[idx], subtitle: e.target.value };
                    updateSiteConfig({ excellenceSolutions: updated });
                  }}
                  className="w-full px-2 py-1 rounded bg-[#071122] border border-slate-800 text-[#F6E27A] text-[11px]"
                />
                <RichTextarea
                  label="Descrição no Card (Item 89 e 98)"
                  rows={2}
                  value={sol.description}
                  onChange={(val) => {
                    const updated = [...siteConfig.excellenceSolutions];
                    updated[idx] = { ...updated[idx], description: val };
                    updateSiteConfig({ excellenceSolutions: updated });
                  }}
                  hint="Respeita quebras de linha e formatação rica"
                />
                <RichTextarea
                  label="Texto Completo do Modal (Ao Clicar no Card)"
                  rows={3}
                  value={sol.extendedText || ''}
                  onChange={(val) => {
                    const updated = [...siteConfig.excellenceSolutions];
                    updated[idx] = { ...updated[idx], extendedText: val };
                    updateSiteConfig({ excellenceSolutions: updated });
                  }}
                />
                {sol.number === '08' && (
                  <button
                    type="button"
                    onClick={() => setActiveSection('gestao_juridica')}
                    className="w-full py-2 px-3 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F6E27A] hover:bg-[#D4AF37] hover:text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Editar Página Interna de Gestão Jurídica 4.0 →
                  </button>
                )}
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
            <RichTextarea
              label="Texto do Palestrante"
              rows={2}
              value={siteConfig.academiaLeao?.speakerText || ''}
              onChange={(val) => updateSiteConfig({
                academiaLeao: { ...(siteConfig.academiaLeao || {}), speakerText: val }
              })}
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7.5. SEÇÃO: PÁGINA INTERNA GESTÃO JURÍDICA 4.0 (Item 66 e 98)   */}
      {/* ============================================================== */}
      {activeSection === 'gestao_juridica' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F6E27A]" />
              <span>Página Interna: Gestão Jurídica 4.0 (Card 08)</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Edição completa da página interna da Gestão Jurídica 4.0 (Item 66 e 98).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-1">Botão Voltar (Item 66)</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.btnVoltarText || 'Voltar'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), btnVoltarText: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">Kicker Superior (Com Balança)</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.kickerBadge || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), kickerBadge: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white font-bold mb-1">Título Principal</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.heroTitle || 'GESTÃO JURÍDICA 4.0'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), heroTitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">Subtítulo Dourado</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.heroSubtitle || 'ADVOCACIA ESTRATÉGICA, INTELIGÊNCIA JURÍDICA E GESTÃO DE VANGUARDA'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), heroSubtitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>

          <RichTextarea
            label="Primeiro Parágrafo da Página (Item 66)"
            rows={4}
            value={siteConfig.gestaoJuridica?.introParagraph1 || 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções avançadas em Gestão Jurídica 4.0 direcionadas para empresas de variados portes e segmentos. Unimos a experiência de mais de quatro décadas da terceira geração à solidez de um legado jurídico centenário (1908). Nossa atuação disponibiliza o suporte jurídico estratégico integral ou setorizado, voltado à segurança jurídica empresarial e patrimonial, reduzindo a carga tributária, mitigando os riscos e vulnerabilidades, proporcionando a conformidade legal necessária para a otimização de resultados.'}
            onChange={(val) => updateSiteConfig({
              gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), introParagraph1: val }
            })}
          />
          <RichTextarea
            label="Vertentes de Alta Performance (Organizacional e Judicial - Item 66)"
            rows={4}
            value={siteConfig.gestaoJuridica?.introParagraph2 || 'Este serviço especializado e estratégico, possui duas vertentes de alta performance: ORGANIZACIONAL e/ou JUDICIAL.\n\n► GESTÃO JURÍDICA ORGANIZACIONAL\nCom atuação jurídica de forma preventiva e estratégica na identificação de riscos, vulnerabilidades e inconformidades legais operacionais, reduzimos ou evitamos prejuízos financeiros e passivos futuros, além de proteger patrimônios e empresas.'}
            onChange={(val) => updateSiteConfig({
              gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), introParagraph2: val }
            })}
          />

          {/* Frente 1: Organizacional */}
          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#F6E27A] uppercase block">
              Frente 1: Gestão Jurídica Organizacional & Diagnóstico Estratégico
            </span>
            <RichTextarea
              label="Texto do Box Azul-Marinho (Diagnóstico Situacional Estratégico)"
              rows={2}
              value={siteConfig.gestaoJuridica?.frente1BoxTitle || 'O Gerenciamento Jurídico é estruturado por meio de um Diagnóstico Situacional Estratégico, que contempla:'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente1BoxTitle: val }
              })}
            />
            <div className="space-y-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Item 1: Auditoria Preventiva</label>
                <input
                  type="text"
                  value={siteConfig.gestaoJuridica?.frente1Card1Desc || 'Auditoria preventiva da situação atual, contratos e fluxos corporativos;'}
                  onChange={(e) => updateSiteConfig({
                    gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente1Card1Desc: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Item 2: Análise Jurídica Especializada</label>
                <input
                  type="text"
                  value={siteConfig.gestaoJuridica?.frente1Card2Desc || 'Análise jurídica especializada alinhada ao modelo de negócios e setor de atuação;'}
                  onChange={(e) => updateSiteConfig({
                    gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente1Card2Desc: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Item 3: Mapeamento de Riscos e Vulnerabilidades</label>
                <input
                  type="text"
                  value={siteConfig.gestaoJuridica?.frente1Card3Desc || 'Mapeamento detalhado de riscos operacionais, tributários e inconformidades legais;'}
                  onChange={(e) => updateSiteConfig({
                    gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente1Card3Desc: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Item 4: Soluções Jurídicas Estratégicas</label>
                <input
                  type="text"
                  value={siteConfig.gestaoJuridica?.frente1Card4Desc || 'Desenvolvimento e implantação de soluções preventivas e estruturantes personalizadas;'}
                  onChange={(e) => updateSiteConfig({
                    gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente1Card4Desc: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
            <RichTextarea
              label="Conclusão da Frente 1"
              rows={3}
              value={siteConfig.gestaoJuridica?.frente1Conclusion || 'Transformamos a estrutura administrativa da sua empresa e do seu patrimônio em um ambiente juridicamente mais seguro, protegido, eficiente, preparado para o crescimento e a perpetuação sustentável do seu legado.'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente1Conclusion: val }
              })}
            />
          </div>

          {/* Frente 2: Judicial */}
          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#F6E27A] uppercase block">
              Frente 2: Gestão Jurídica Judicial & 3 Pilares Essenciais
            </span>
            <RichTextarea
              label="Introdução da Frente Judicial"
              rows={2}
              value={siteConfig.gestaoJuridica?.frente2Desc || 'Nossa atuação estratégica no contencioso judicial é voltada à construção de empresas mais resilientes, competitivas e juridicamente mais protegidas num ecossistema societário inteligente e legal, através de três pilares essenciais:'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente2Desc: val }
              })}
            />
            <RichTextarea
              label="Pilar 1: DECISÕES ASSERTIVAS"
              rows={2}
              value={siteConfig.gestaoJuridica?.frente2Pilar1Desc || 'Segurança jurídica avançada para a tomada de decisões empresariais e patrimoniais mais assertivas;'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente2Pilar1Desc: val }
              })}
            />
            <RichTextarea
              label="Pilar 2: GESTÃO DE RESULTADOS"
              rows={2}
              value={siteConfig.gestaoJuridica?.frente2Pilar2Desc || 'Otimização da gestão de litígios com foco na redução de riscos, vulnerabilidades e custos;'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente2Pilar2Desc: val }
              })}
            />
            <RichTextarea
              label="Pilar 3: COMPETITIVIDADE"
              rows={2}
              value={siteConfig.gestaoJuridica?.frente2Pilar3Desc || 'Fortalecimento da competitividade de mercado aliado à proteção jurídica patrimonial corporativa;'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente2Pilar3Desc: val }
              })}
            />
            <RichTextarea
              label="Impacto e Vantagem Competitiva da Frente Judicial"
              rows={3}
              value={siteConfig.gestaoJuridica?.frente2Impact || 'A integração da experiência centenária, da inteligência jurídica de advogados especialistas ao cotidiano de empresas e patrimônios, proporciona proteção, estabilidade, eficiência e uma vantagem competitiva decisiva para o sucesso do seu negócio e do seu patrimônio familiar.'}
              onChange={(val) => updateSiteConfig({
                gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), frente2Impact: val }
              })}
            />
          </div>

          {/* CTA Final */}
          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2">
            <span className="text-xs font-bold text-[#F6E27A] uppercase block">Destaques & Botão AGENDAR CONSULTA DIGITAL</span>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Destaque 1</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.ctaHighlight1 || 'Atendimento Brasil 100% digital e confidencial com a mesma excelência jurídica do presencial.'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), ctaHighlight1: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Destaque 2</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.ctaHighlight2 || 'Diagnóstico Estratégico Personalizado para o tamanho do seu negócio e patrimônio.'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), ctaHighlight2: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-0.5">Destaque 3</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.ctaHighlight3 || 'Três Gerações de Excelência Jurídica dedicadas à perpetuação do seu legado.'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), ctaHighlight3: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#F6E27A] font-bold mb-0.5">Texto do Botão de Agendamento</label>
              <input
                type="text"
                value={siteConfig.gestaoJuridica?.ctaButtonText || 'AGENDAR CONSULTA DIGITAL'}
                onChange={(e) => updateSiteConfig({
                  gestaoJuridica: { ...(siteConfig.gestaoJuridica || {}), ctaButtonText: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. SEÇÃO: AGENDAMENTO / CONSULTA DIGITAL (Item 68 e 100)       */}
      {/* ============================================================== */}
      {activeSection === 'consultation' && (
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F6E27A]" />
              <span>Agendamento de Consulta Digital (Item 68 e 100)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ImageUploadField
              label="Imagem de Fundo da Seção"
              description="Foto de fundo que ambienta a seção de solicitação de consulta."
              currentValue={siteConfig.digitalConsultation?.bgImageUrl}
              defaultValue="/img/consulta-virtual-2.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), bgImageUrl: newUrl }
              })}
            />
            <ImageUploadField
              label="Foto do Card Direito (Item 100)"
              description="Foto exibida no quadro direito ao lado do texto de agendamento."
              currentValue={siteConfig.digitalConsultation?.cardImageUrl}
              defaultValue="/img/consulta-virtual-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), cardImageUrl: newUrl }
              })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold">
                  Frase Dourada Superior (Item 57)
                </label>
                <button
                  type="button"
                  onClick={() => updateSiteConfig({
                    digitalConsultation: { ...(siteConfig.digitalConsultation || {}), sectionKicker: 'ATENDIMENTO DIGITAL BRASIL' }
                  })}
                  className="text-[10px] text-[#F6E27A] hover:underline cursor-pointer"
                  title="Restaurar Frase Oficial do Cliente"
                >
                  Restaurar "ATENDIMENTO DIGITAL BRASIL"
                </button>
              </div>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.sectionKicker || 'ATENDIMENTO DIGITAL BRASIL'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), sectionKicker: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Título em Branco
              </label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.sectionTitle || 'AGENDE SUA'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), sectionTitle: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                Destaque Dourado do Título
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

          <RichTextarea
            label="Descrição Principal (Editor Rico · Item 68 e 100)"
            rows={4}
            value={siteConfig.digitalConsultation?.description || 'Agende a sua Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA e descubra as soluções jurídicas avançadas e inteligentes para a sua necessidade. Nosso atendimento virtual no Brasil é realizado de forma personalizada, com segurança digital, confidencialidade e a mesma excelência do atendimento presencial.'}
            onChange={(val) => updateSiteConfig({
              digitalConsultation: { ...(siteConfig.digitalConsultation || {}), description: val }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Ponto de Destaque 1 (Balança)</label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.point1 || 'Agendamento prévio da consulta'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), point1: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Ponto de Destaque 2 (Balança)</label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.point2 || 'Consulta com hora marcada'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), point2: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
            <span className="text-xs font-bold text-[#F6E27A] uppercase block">
              Legendas do Card de Imagem Direito (Item 100)
            </span>
            <input
              type="text"
              value={siteConfig.digitalConsultation?.cardBadge || 'Atendimento 100% Digital'}
              onChange={(e) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), cardBadge: e.target.value }
              })}
              placeholder="Selo Dourado Superior"
              className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
            />
            <input
              type="text"
              value={siteConfig.digitalConsultation?.cardTitle || 'CONSULTA DIGITAL BRASIL'}
              onChange={(e) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), cardTitle: e.target.value }
              })}
              placeholder="Título do Card"
              className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
            />
            <input
              type="text"
              value={siteConfig.digitalConsultation?.cardSubtitle || 'Segurança Digital, Sigilo e Excelência Jurídica Centenária.'}
              onChange={(e) => updateSiteConfig({
                digitalConsultation: { ...(siteConfig.digitalConsultation || {}), cardSubtitle: e.target.value }
              })}
              placeholder="Subtítulo do Card"
              className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-slate-300 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Botão Agendamento</label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.btnSchedule || 'AGENDAR CONSULTA VIRTUAL'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), btnSchedule: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-semibold mb-1">Botão WhatsApp</label>
              <input
                type="text"
                value={siteConfig.digitalConsultation?.btnWhatsApp || 'Agendar pelo WhatsApp'}
                onChange={(e) => updateSiteConfig({
                  digitalConsultation: { ...(siteConfig.digitalConsultation || {}), btnWhatsApp: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 9. SEÇÃO: HOLDING FAMILIAR OU LANDING PAGE 4.0 (/1208/) (Item 71) */}
      {/* ============================================================== */}
      {(activeSection === 'holding' || activeSection === 'landing_holding') && (
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="font-cinzel text-sm font-bold text-white uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F6E27A]" />
                <span>
                  {activeSection === 'landing_holding'
                    ? 'Landing Page Holding Familiar (/1208/) · Item 71'
                    : 'Holding Familiar & Planejamento Patrimonial 4.0'}
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">
                {activeSection === 'landing_holding'
                  ? 'Edição completa da Landing Page de alta conversão /1208/ (Vantagens, FAQ, Problemas e Tabela de Custos).'
                  : 'Escolha abaixo se deseja editar a Seção da Home ou a Landing Page Completa (/1208/).'}
              </p>
            </div>
            {activeSection === 'landing_holding' && (
              <a
                href="/1208/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#F6E27A] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Abrir /1208/</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Abas Alternadoras da Holding */}
          <div className="flex rounded-xl bg-[#050B14] p-1 border border-[#D4AF37]/40 gap-1">
            <button
              type="button"
              onClick={() => {
                setHoldingSubTab('section');
                setActiveSection('holding');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'holding' && holdingSubTab === 'section'
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              1. Seção na Home
            </button>
            <button
              type="button"
              onClick={() => {
                setHoldingSubTab('landing');
                setActiveSection('landing_holding');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSection === 'landing_holding' || holdingSubTab === 'landing'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] text-black shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🚀 2. Landing Page 4.0 (/1208/)
            </button>
          </div>

          {/* CASO A: SEÇÃO DA HOLDING NA HOME + PÁGINA INTERNA (Item 69) */}
          {!(activeSection === 'landing_holding' || holdingSubTab === 'landing') ? (
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

              <div className="space-y-3">
                <RichTextarea
                  label="Parágrafo 1"
                  rows={2}
                  value={siteConfig.holdingFamiliar?.paragraph1 || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph1: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 2"
                  rows={2}
                  value={siteConfig.holdingFamiliar?.paragraph2 || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph2: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 3"
                  rows={2}
                  value={siteConfig.holdingFamiliar?.paragraph3 || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph3: val }
                  })}
                />
              </div>

              {/* Card da Imagem (BMW) */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2">
                <span className="text-xs font-bold text-[#F6E27A] uppercase block">
                  Textos Sob a Foto da Família & BMW
                </span>
                <input
                  type="text"
                  value={siteConfig.holdingFamiliar?.cardBadge || 'PROTEÇÃO JURÍDICA PATRIMONIAL E EMPRESARIAL'}
                  onChange={(e) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), cardBadge: e.target.value }
                  })}
                  placeholder="Badge Dourado"
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-bold"
                />
                <input
                  type="text"
                  value={siteConfig.holdingFamiliar?.cardTitle || 'HOLDING FAMILIAR E EMPRESARIAL'}
                  onChange={(e) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), cardTitle: e.target.value }
                  })}
                  placeholder="Título do Card"
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
                <RichTextarea
                  label="Texto do Card"
                  rows={2}
                  value={siteConfig.holdingFamiliar?.cardText || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), cardText: val }
                  })}
                />
              </div>

              {/* Modal / Página Interna da Holding Familiar (Item 69) */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
                <span className="text-xs font-bold text-[#F6E27A] uppercase block">
                  Página Interna / Modal: "SAIBA MAIS" da Holding Familiar (Item 69)
                </span>
                <input
                  type="text"
                  value={siteConfig.holdingFamiliar?.boxWhatIsHeading || 'O QUE É UMA HOLDING FAMILIAR?'}
                  onChange={(e) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), boxWhatIsHeading: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
                <RichTextarea
                  label="Texto: O Que é uma Holding Familiar?"
                  rows={3}
                  value={siteConfig.holdingFamiliar?.boxWhatIsText || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), boxWhatIsText: val }
                  })}
                />
                <input
                  type="text"
                  value={siteConfig.holdingFamiliar?.boxWhyTitle || 'POR QUE CONSTITUIR UMA HOLDING?'}
                  onChange={(e) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), boxWhyTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
                <RichTextarea
                  label="Texto: Por que Constituir uma Holding?"
                  rows={3}
                  value={siteConfig.holdingFamiliar?.boxWhyText || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), boxWhyText: val }
                  })}
                />
                <input
                  type="text"
                  value={siteConfig.holdingFamiliar?.tableTitle || 'CUSTOS: INVENTÁRIO X HOLDING FAMILIAR'}
                  onChange={(e) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), tableTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                />
                <RichTextarea
                  label="Subtítulo do Box de Custos (Item 69)"
                  rows={2}
                  value={siteConfig.holdingFamiliar?.tableSubtitle || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), tableSubtitle: val }
                  })}
                />
                <RichTextarea
                  label="Texto de Economia no Box de Custos"
                  rows={2}
                  value={siteConfig.holdingFamiliar?.tableSavingsText || ''}
                  onChange={(val) => updateSiteConfig({
                    holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), tableSavingsText: val }
                  })}
                />
              </div>
            </div>
          ) : (
            /* CASO B: LANDING PAGE COMPLETA HOLDING 4.0 (/1208/) (Itens 71, 77, 94, 105, 114) */
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
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-slate-800 space-y-3">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  1. Textos do Hero da Landing Page (/1208/)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Eyebrow Dourado</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.heroEyebrow || 'HOLDING FAMILIAR'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), heroEyebrow: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Título Branco</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.heroTitle || 'PLANEJAMENTO'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), heroTitle: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] mb-0.5">Destaque Dourado</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.heroTitleHighlight || 'PATRIMONIAL 4.0'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), heroTitleHighlight: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-[#E5C158] mb-0.5">Subtítulo do Hero</label>
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.heroSubtitle || 'O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroSubtitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#E5C158] font-bold"
                  />
                </div>

                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] text-slate-300 block font-semibold">Os 5 Parágrafos do Hero (Editor Rico)</span>
                  <RichTextarea
                    label="Parágrafo 1 do Hero"
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph1 ?? ''}
                    onChange={(val) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph1: val }
                    })}
                  />
                  <RichTextarea
                    label="Parágrafo 2 do Hero"
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph2 ?? ''}
                    onChange={(val) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph2: val }
                    })}
                  />
                  <RichTextarea
                    label="Parágrafo 3 do Hero"
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph3 ?? ''}
                    onChange={(val) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph3: val }
                    })}
                  />
                  <RichTextarea
                    label="Parágrafo 4 do Hero"
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph4 ?? ''}
                    onChange={(val) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph4: val }
                    })}
                  />
                  <RichTextarea
                    label="Parágrafo 5 do Hero (Destaque)"
                    rows={2}
                    value={siteConfig.holdingLanding?.heroParagraph5 ?? ''}
                    onChange={(val) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph5: val }
                    })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Botão 1 do Hero</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.heroBtnViabilidade || 'AGENDAR SESSÃO DE VIABILIDADE'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), heroBtnViabilidade: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Botão 2 do Hero</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.heroBtnCustos || 'COMPARATIVO DE CUSTOS'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), heroBtnCustos: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Card Showcase & Estratégia (O Que é uma Holding Familiar) */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  2. Card da Foto Familiar & Seção "O Que é uma Holding Familiar?"
                </span>
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.showcaseBadge || 'PROTEÇÃO JURÍDICA PATRIMONIAL E EMPRESARIAL'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), showcaseBadge: e.target.value }
                  })}
                  placeholder="Badge do Card da Foto"
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-xs text-[#F6E27A] font-bold"
                />
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.showcaseTitle || 'HOLDING FAMILIAR E EMPRESARIAL'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), showcaseTitle: e.target.value }
                  })}
                  placeholder="Título do Card da Foto"
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
                <RichTextarea
                  label="Texto do Card da Foto"
                  rows={2}
                  value={siteConfig.holdingLanding?.showcaseText ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), showcaseText: val }
                  })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] mb-0.5">Kicker da Seção Estratégia</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.strategyKicker || 'ESTRATÉGIA E GOVERNANÇA'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), strategyKicker: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white mb-0.5">Título da Seção Estratégia</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.strategyTitle || 'O QUE É UMA HOLDING FAMILIAR?'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), strategyTitle: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                    />
                  </div>
                </div>
                <RichTextarea
                  label="Parágrafo 1 (O Que é uma Holding Familiar)"
                  rows={2}
                  value={siteConfig.holdingLanding?.strategyParagraph1 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), strategyParagraph1: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 2 (O Que é uma Holding Familiar)"
                  rows={2}
                  value={siteConfig.holdingLanding?.strategyParagraph2 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), strategyParagraph2: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 3 (O Que é uma Holding Familiar)"
                  rows={2}
                  value={siteConfig.holdingLanding?.strategyParagraph3 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), strategyParagraph3: val }
                  })}
                />
              </div>

              {/* 3. Os 7 Problemas Fatais do Inventário */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-red-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-red-400 uppercase">
                    3. Problemas do Inventário ({(siteConfig.holdingLanding?.problemsList || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingProblem}
                    className="text-[10px] text-[#F6E27A] hover:underline cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.problemsKicker || 'DIAGNÓSTICO DE RISCO PATRIMONIAL'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), problemsKicker: e.target.value }
                    })}
                    placeholder="Kicker"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-[#F6E27A]"
                  />
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.problemsTitle || 'OS PROBLEMAS DO INVENTÁRIO'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), problemsTitle: e.target.value }
                    })}
                    placeholder="Título"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-white font-bold"
                  />
                </div>
                <div className="space-y-1.5">
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

              {/* 4. As 18 Vantagens da Holding Familiar */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F6E27A] uppercase">
                    4. Vantagens da Holding Familiar ({(siteConfig.holdingLanding?.advantagesList || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingAdvantage}
                    className="text-[10px] text-[#F6E27A] hover:underline cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.advantagesKicker || 'BENEFÍCIOS EXCLUSIVOS DO SISTEMA 4.0'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), advantagesKicker: e.target.value }
                    })}
                    placeholder="Kicker"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-[#F6E27A]"
                  />
                  <input
                    type="text"
                    value={siteConfig.holdingLanding?.advantagesTitle || 'AS VANTAGENS DA HOLDING FAMILIAR'}
                    onChange={(e) => updateSiteConfig({
                      holdingLanding: { ...(siteConfig.holdingLanding || {}), advantagesTitle: e.target.value }
                    })}
                    placeholder="Título"
                    className="w-full p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-white font-bold"
                  />
                </div>
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
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

              {/* 5. Estudo Comparativo de Custos Completo */}
              <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 space-y-3">
                <span className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider block">
                  5. Tabela Comparativa de Custos Completa (Inventário x Holding 4.0)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Valor de Aquisição (IR)</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.aquisicaoValor || 'R$ 500.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), aquisicaoValor: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] mb-0.5">Valor de Mercado Atual</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.mercadoValor || 'R$ 1.500.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), mercadoValor: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">1. ITCMD Inventário</label>
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
                    <label className="block text-[10px] text-emerald-400 mb-0.5">1. ITCMD Holding</label>
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
                    <label className="block text-[10px] text-slate-400 mb-0.5">2. Custas Judiciais Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.custasInventario || 'R$ 5.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), custasInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">2. Custas Junta Comercial Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.custasHolding || 'R$ 1.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), custasHolding: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-emerald-500/40 text-emerald-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">3. Certidões Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.certidoesInventario || 'R$ 2.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), certidoesInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">3. Certidões Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.certidoesHolding || 'R$ 0,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), certidoesHolding: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-emerald-500/40 text-emerald-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">4. Ganho de Capital (IR) Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.ganhoCapitalInventario || 'R$ 85.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), ganhoCapitalInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">4. Ganho de Capital (IR) Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.ganhoCapitalHolding || 'R$ 0,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), ganhoCapitalHolding: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-emerald-500/40 text-emerald-300 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">5. Honorários Inventário</label>
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
                    <label className="block text-[10px] text-emerald-400 mb-0.5">5. Honorários Holding</label>
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
                    <label className="block text-[10px] text-slate-400 mb-0.5">6. Registro de Imóveis Inventário</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.registroInventario || 'R$ 10.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), registroInventario: e.target.value }
                      })}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-emerald-400 mb-0.5">6. Registro de Imóveis Holding</label>
                    <input
                      type="text"
                      value={siteConfig.holdingLanding?.registroHolding || 'R$ 2.000,00'}
                      onChange={(e) => updateSiteConfig({
                        holdingLanding: { ...(siteConfig.holdingLanding || {}), registroHolding: e.target.value }
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

              {/* 6. Box: FAÇA O SEU PLANEJAMENTO 4.0 */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  6. Box CTA: "FAÇA O SEU PLANEJAMENTO 4.0"
                </span>
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.ctaBoxTitle || 'FAÇA O SEU PLANEJAMENTO 4.0'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), ctaBoxTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
                <RichTextarea
                  label="Texto do Box Faça o Seu Planejamento 4.0"
                  rows={2}
                  value={siteConfig.holdingLanding?.ctaBoxText ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), ctaBoxText: val }
                  })}
                />
              </div>

              {/* 7. Público-Alvo: Para Quem é a Holding Familiar? */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F6E27A] uppercase">
                    7. Público-Alvo: Para Quem é a Holding?
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingTarget}
                    className="text-[10px] text-[#F6E27A] hover:underline cursor-pointer"
                  >
                    + Adicionar Perfil
                  </button>
                </div>
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.targetTitle || 'PARA QUEM É A HOLDING FAMILIAR?'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), targetTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-white text-xs font-bold"
                />
                <RichTextarea
                  label="Introdução Público-Alvo"
                  rows={2}
                  value={siteConfig.holdingLanding?.targetIntro ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), targetIntro: val }
                  })}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {(siteConfig.holdingLanding?.targetList || []).map((tItem, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={tItem}
                        onChange={(e) => {
                          const updated = [...(siteConfig.holdingLanding?.targetList || [])];
                          updated[idx] = e.target.value;
                          updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), targetList: updated } });
                        }}
                        className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-[#F6E27A] font-bold"
                      />
                      <button type="button" onClick={() => handleRemoveHoldingTarget(idx)} className="p-1 text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Dr. Aldo Leão na Landing Page */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  8. Seção Dr. Aldo Leão na Landing Page (/1208/)
                </span>
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.drAldoKicker || 'ADVOCACIA ESTRATÉGICA DESDE 1986'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoKicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-xs text-[#F6E27A] font-bold"
                />
                <RichTextarea
                  label="Parágrafo 1 Bio Dr. Aldo (LP)"
                  rows={2}
                  value={siteConfig.holdingLanding?.drAldoBio1 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoBio1: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 2 Bio Dr. Aldo (LP)"
                  rows={2}
                  value={siteConfig.holdingLanding?.drAldoBio2 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoBio2: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 3 Bio Dr. Aldo (LP)"
                  rows={2}
                  value={siteConfig.holdingLanding?.drAldoBio3 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoBio3: val }
                  })}
                />
                <RichTextarea
                  label="Parágrafo 4 Bio Dr. Aldo (LP)"
                  rows={2}
                  value={siteConfig.holdingLanding?.drAldoBio4 ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoBio4: val }
                  })}
                />
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.drAldoCaption || 'Conferência e Liderança em Planejamento Patrimonial 4.0'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), drAldoCaption: e.target.value }
                  })}
                  placeholder="Legenda da Foto da Palestra"
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-slate-300"
                />
              </div>

              {/* 9. FAQs da Landing Page */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F6E27A] uppercase">
                    9. Perguntas Frequentes / FAQs ({(siteConfig.holdingLanding?.faqs || []).length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddHoldingFaq}
                    className="text-[10px] text-[#F6E27A] hover:underline cursor-pointer"
                  >
                    + Adicionar FAQ
                  </button>
                </div>
                <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                  {(siteConfig.holdingLanding?.faqs || []).map((faq, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-[#071122] border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const updated = [...(siteConfig.holdingLanding?.faqs || [])];
                            updated[idx] = { ...updated[idx], q: e.target.value };
                            updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), faqs: updated } });
                          }}
                          className="flex-1 p-1.5 rounded bg-[#050B14] border border-slate-700 text-white text-xs font-semibold"
                        />
                        <button type="button" onClick={() => handleRemoveHoldingFaq(idx)} className="p-1 text-red-400">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <RichTextarea
                        label="Resposta da Pergunta"
                        rows={2}
                        value={faq.a}
                        onChange={(val) => {
                          const updated = [...(siteConfig.holdingLanding?.faqs || [])];
                          updated[idx] = { ...updated[idx], a: val };
                          updateSiteConfig({ holdingLanding: { ...(siteConfig.holdingLanding || {}), faqs: updated } });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. Box Alguma Dúvida & Rodapé da LP */}
              <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  10. Box Final "Alguma Dúvida?" & Rodapé da Landing Page
                </span>
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.doubtTitle || 'ALGUMA DÚVIDA?'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), doubtTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A] font-bold"
                />
                <RichTextarea
                  label="Texto do Box de Dúvidas"
                  rows={2}
                  value={siteConfig.holdingLanding?.doubtText ?? ''}
                  onChange={(val) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), doubtText: val }
                  })}
                />
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.doubtBtnText || 'FALAR COM O ESPECIALISTA'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), doubtBtnText: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  value={siteConfig.holdingLanding?.footerCopyright || '© ALDO LEÃO ADVOCACIA ESTRATÉGICA – TODOS OS DIREITOS RESERVADOS'}
                  onChange={(e) => updateSiteConfig({
                    holdingLanding: { ...(siteConfig.holdingLanding || {}), footerCopyright: e.target.value }
                  })}
                  placeholder="Copyright do Rodapé da LP"
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-slate-300"
                />
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
              <span>Publicações Jurídicas & Artigos</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Cadastre novos artigos do Dr. Aldo Leão ou notícias jurídicas. Novos itens entram no topo e já aparecem no portal.
            </p>
          </div>

          {/* PAINEL DE AÇÃO RÁPIDA: PUBLICAR NOVO ARTIGO OU NOTÍCIA (NO TOPO) */}
          <div className="p-4 rounded-xl bg-[#0B1A35] border-2 border-[#D4AF37] shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E5C158] block">
                  Ação Rápida
                </span>
                <h4 className="text-xs uppercase font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
                  <span>Publicações no Site ({(siteConfig.publications || []).length})</span>
                </h4>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAddPublication('artigo')}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] text-black text-xs font-bold flex items-center gap-1 cursor-pointer hover:brightness-110 shadow-md"
                  title="Criar novo Artigo Jurídico assinado pelo Dr. Aldo Leão"
                >
                  <Plus className="w-3.5 h-3.5" /> + Novo Artigo
                </button>
                <button
                  type="button"
                  onClick={() => handleAddPublication('noticia')}
                  className="px-3 py-1.5 rounded-lg bg-[#071122] border border-[#D4AF37] text-[#F6E27A] text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-[#0E1F3D] shadow-md"
                  title="Criar nova Notícia Jurídica"
                >
                  <Plus className="w-3.5 h-3.5" /> + Nova Notícia
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-300">
              Clique em <strong>+ Novo Artigo</strong> para abrir o formulário com o campo de <strong>Título</strong> no topo da lista.
            </p>
          </div>

          {/* LISTA DAS PUBLICAÇÕES CADASTRADAS */}
          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {(siteConfig.publications || []).map((pub, idx) => (
              <div
                key={pub.id || idx}
                className={`p-3.5 rounded-xl bg-[#071122] border space-y-3 ${
                  idx === 0 ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-slate-700'
                }`}
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <select
                      value={pub.type || 'artigo'}
                      onChange={(e) => {
                        const updated = [...(siteConfig.publications || [])];
                        updated[idx] = { ...updated[idx], type: e.target.value as 'artigo' | 'noticia' };
                        updateSiteConfig({ publications: updated });
                      }}
                      className="px-2 py-0.5 rounded bg-[#050B14] border border-[#D4AF37]/50 text-[10px] text-[#F6E27A] font-bold uppercase"
                    >
                      <option value="artigo">Artigo Jurídico (Dr. Aldo Leão)</option>
                      <option value="noticia">Notícia Jurídica</option>
                    </select>
                    {idx === 0 && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Topo do Site
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePublication(idx)}
                    className="px-2 py-1 rounded bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 text-xs flex items-center gap-1 cursor-pointer transition-colors border border-red-500/30"
                    title="Excluir esta publicação definitivamente"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Excluir</span>
                  </button>
                </div>

                {/* CAMPO DE TÍTULO OFICIAL DESTACADO EM DOURADO */}
                <div className="p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/70 space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#F6E27A] flex items-center justify-between">
                    <span>🏷️ TÍTULO DO ARTIGO OU NOTÍCIA (Obrigatório)</span>
                  </label>
                  <input
                    type="text"
                    value={pub.title}
                    onChange={(e) => {
                      const updated = [...(siteConfig.publications || [])];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      updateSiteConfig({ publications: updated });
                    }}
                    placeholder="Digite o título da publicação (Ex: A Nova Disciplina do ITCMD)"
                    className="w-full px-2.5 py-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-white text-xs font-bold font-cinzel focus:border-[#F6E27A] focus:outline-none"
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
                    <label className="block text-[10px] uppercase text-slate-400 mb-0.5">Data da Publicação</label>
                    <input
                      type="text"
                      value={pub.date || ''}
                      onChange={(e) => {
                        const updated = [...(siteConfig.publications || [])];
                        updated[idx] = { ...updated[idx], date: e.target.value };
                        updateSiteConfig({ publications: updated });
                      }}
                      placeholder="Ex: 13/11/2026"
                      className="w-full px-2 py-1 rounded bg-[#050B14] border border-slate-700 text-white text-[11px]"
                    />
                  </div>
                </div>

                <RichTextarea
                  label="Resumo / Prévia no Card (Editor Rico)"
                  rows={2}
                  value={pub.excerpt}
                  onChange={(val) => {
                    const updated = [...(siteConfig.publications || [])];
                    updated[idx] = { ...updated[idx], excerpt: val };
                    updateSiteConfig({ publications: updated });
                  }}
                />

                <RichTextarea
                  label="Conteúdo Integral (Editor Rico com Parágrafos e Formatações)"
                  rows={6}
                  value={pub.content || ''}
                  onChange={(val) => {
                    const updated = [...(siteConfig.publications || [])];
                    updated[idx] = { ...updated[idx], content: val };
                    updateSiteConfig({ publications: updated });
                  }}
                  placeholder="Escreva ou cole o conteúdo completo do artigo ou notícia jurídica..."
                  hint="A assinatura oficial institucional é inserida automaticamente ao final do texto"
                />

                {/* Agendamento Opcional de Data e Horário (Item 59) */}
                <div className="p-2.5 rounded-lg bg-[#050B14] border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`drawer-sched-${pub.id || idx}`}
                      checked={!!pub.isScheduled}
                      onChange={(e) => {
                        const updated = [...(siteConfig.publications || [])];
                        updated[idx] = { ...updated[idx], isScheduled: e.target.checked };
                        updateSiteConfig({ publications: updated });
                      }}
                      className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                    />
                    <label htmlFor={`drawer-sched-${pub.id || idx}`} className="text-[11px] text-slate-300 font-semibold cursor-pointer">
                      Programar publicação para data e hora futura (Item 59)
                    </label>
                  </div>
                  {pub.isScheduled && (
                    <div className="pt-1.5 border-t border-slate-800 flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">Publicar em:</span>
                      <input
                        type="datetime-local"
                        value={pub.publishAt || ''}
                        onChange={(e) => {
                          const updated = [...(siteConfig.publications || [])];
                          updated[idx] = { ...updated[idx], publishAt: e.target.value };
                          updateSiteConfig({ publications: updated });
                        }}
                        className="px-2 py-1 rounded bg-[#071122] border border-[#D4AF37]/60 text-xs text-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CABEÇALHO INSTITUCIONAL DA SEÇÃO PUBLICAÇÕES (AO FINAL) */}
          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3 pt-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase block">
              Configurações do Cabeçalho da Página Publicações Jurídicas (Página 9)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-[#F6E27A] mb-0.5">Kicker Dourado</label>
                <input
                  type="text"
                  value={siteConfig.publicationsSection?.goldKicker || 'PRODUÇÃO INTELECTUAL E CIENTÍFICA'}
                  onChange={(e) => updateSiteConfig({
                    publicationsSection: { ...(siteConfig.publicationsSection || {}), goldKicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-white mb-0.5">Título Branco</label>
                <input
                  type="text"
                  value={siteConfig.publicationsSection?.titleWhite || 'PUBLICAÇÕES'}
                  onChange={(e) => updateSiteConfig({
                    publicationsSection: { ...(siteConfig.publicationsSection || {}), titleWhite: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#F6E27A] mb-0.5">Destaque Dourado</label>
                <input
                  type="text"
                  value={siteConfig.publicationsSection?.titleGold || 'JURÍDICAS'}
                  onChange={(e) => updateSiteConfig({
                    publicationsSection: { ...(siteConfig.publicationsSection || {}), titleGold: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>
            <RichTextarea
              label="Subtítulo / Introdução Institucional da Página"
              rows={2}
              value={siteConfig.publicationsSection?.subtitle || ''}
              onChange={(val) => updateSiteConfig({
                publicationsSection: { ...(siteConfig.publicationsSection || {}), subtitle: val }
              })}
            />
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

          {/* Cabeçalho e Textos da Página Livros Digitais (Itens 70, 101 e 111) */}
          <div className="p-3.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#F6E27A] uppercase block">
              Cabeçalho & Textos da Página de Livros Digitais (Itens 70, 101 e 111)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-[#F6E27A] mb-0.5">Kicker Dourado</label>
                <input
                  type="text"
                  value={siteConfig.booksSection?.goldKicker || 'PRODUÇÃO INTELECTUAL DE ALTA RELEVÂNCIA'}
                  onChange={(e) => updateSiteConfig({
                    booksSection: { ...(siteConfig.booksSection || {}), goldKicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-white mb-0.5">Título Branco</label>
                <input
                  type="text"
                  value={siteConfig.booksSection?.titleWhite || 'LIVROS'}
                  onChange={(e) => updateSiteConfig({
                    booksSection: { ...(siteConfig.booksSection || {}), titleWhite: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#F6E27A] mb-0.5">Destaque Dourado</label>
                <input
                  type="text"
                  value={siteConfig.booksSection?.titleGold || 'DIGITAIS'}
                  onChange={(e) => updateSiteConfig({
                    booksSection: { ...(siteConfig.booksSection || {}), titleGold: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>
            <RichTextarea
              label="Parágrafo 1 da Página de Livros Digitais (Item 70, 101 e 111)"
              rows={2}
              value={siteConfig.booksSection?.paragraph1 ?? ''}
              onChange={(val) => updateSiteConfig({
                booksSection: { ...(siteConfig.booksSection || {}), paragraph1: val }
              })}
            />
            <RichTextarea
              label="Parágrafo 2 da Página de Livros Digitais (Item 70, 101 e 111)"
              rows={2}
              value={siteConfig.booksSection?.paragraph2 ?? ''}
              onChange={(val) => updateSiteConfig({
                booksSection: { ...(siteConfig.booksSection || {}), paragraph2: val }
              })}
            />
            <RichTextarea
              label="Parágrafo 3 (Destaque Dourado)"
              rows={2}
              value={siteConfig.booksSection?.paragraph3 ?? ''}
              onChange={(val) => updateSiteConfig({
                booksSection: { ...(siteConfig.booksSection || {}), paragraph3: val }
              })}
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

                  <RichTextarea
                    label="Sinopse / Descrição da Obra (Item 70)"
                    rows={3}
                    value={book.description}
                    onChange={(val) => {
                      const updated = [...(siteConfig.digitalBooks || [])];
                      updated[idx] = { ...updated[idx], description: val };
                      updateSiteConfig({ digitalBooks: updated });
                    }}
                  />

                  {/* Sumário e Trecho de Destaque do Modal "Ler Sinopse & Amostra" (Item 70) */}
                  <div className="p-3 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#F6E27A] uppercase">
                        Sumário & Citação do Modal "Ler Sinopse & Amostra" (Item 70)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(siteConfig.digitalBooks || [])];
                          const currentChapters = updated[idx].chapters || [];
                          updated[idx] = {
                            ...updated[idx],
                            chapters: [...currentChapters, `Capítulo ${currentChapters.length + 1}: Novo Tópico`]
                          };
                          updateSiteConfig({ digitalBooks: updated });
                        }}
                        className="text-[10px] text-[#F6E27A] hover:underline cursor-pointer"
                      >
                        + Adicionar Capítulo
                      </button>
                    </div>
                    <input
                      type="text"
                      value={book.summaryTitle ?? 'SUMÁRIO DO LIVRO'}
                      onChange={(e) => {
                        const updated = [...(siteConfig.digitalBooks || [])];
                        updated[idx] = { ...updated[idx], summaryTitle: e.target.value };
                        updateSiteConfig({ digitalBooks: updated });
                      }}
                      placeholder="Título do Sumário (Ex: SUMÁRIO DO LIVRO)"
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-[#F6E27A] font-bold"
                    />
                    <div className="space-y-1.5">
                      {(book.chapters || []).map((chap, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={chap}
                            onChange={(e) => {
                              const updated = [...(siteConfig.digitalBooks || [])];
                              const chaps = [...(updated[idx].chapters || [])];
                              chaps[cIdx] = e.target.value;
                              updated[idx] = { ...updated[idx], chapters: chaps };
                              updateSiteConfig({ digitalBooks: updated });
                            }}
                            className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-800 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(siteConfig.digitalBooks || [])];
                              const chaps = (updated[idx].chapters || []).filter((_, i) => i !== cIdx);
                              updated[idx] = { ...updated[idx], chapters: chaps };
                              updateSiteConfig({ digitalBooks: updated });
                            }}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <RichTextarea
                      label="Trecho / Citação em Destaque no Modal (Ex: 'Deixar para resolver a sucessão após a morte...')"
                      rows={2}
                      value={book.sampleExcerpt ?? 'Deixar para resolver a sucessão após a morte é transferir ao Estado e à burocracia judicial uma parcela significativa daquilo que você levou uma vida inteira para construir para os seus filhos.'}
                      onChange={(val) => {
                        const updated = [...(siteConfig.digitalBooks || [])];
                        updated[idx] = { ...updated[idx], sampleExcerpt: val };
                        updateSiteConfig({ digitalBooks: updated });
                      }}
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

          <RichTextarea
            label="Box 1 · Atendimento Virtual Brasil (Texto)"
            rows={3}
            value={siteConfig.contact.boxVirtualText || 'Nosso atendimento em todo o território nacional é feito com hora marcada, mediante prévio agendamento pelo WhatsApp, de 2a à 6a feira, das 08:30/11:30hs e das 13:30/18:30hs.'}
            onChange={(val) => updateSiteConfig({
              contact: { ...siteConfig.contact, boxVirtualText: val }
            })}
          />

          <RichTextarea
            label="Endereço Sede (Porto Alegre)"
            rows={2}
            value={siteConfig.contact.addressPortoAlegre}
            onChange={(val) => updateSiteConfig({
              contact: { ...siteConfig.contact, addressPortoAlegre: val }
            })}
          />
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

          <RichTextarea
            label="Texto de Conformidade Ética OAB"
            rows={3}
            value={siteConfig.footer?.oabComplianceText || ''}
            onChange={(val) => updateSiteConfig({
              footer: { ...(siteConfig.footer || {}), oabComplianceText: val }
            })}
          />
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

          <RichTextarea
            label="Subtítulo da Academia"
            rows={2}
            value={siteConfig.academiaLeao?.subtitle || ''}
            onChange={(val) => updateSiteConfig({
              academiaLeao: { ...(siteConfig.academiaLeao || {}), subtitle: val }
            })}
          />
          <RichTextarea
            label="Parágrafo Descritivo 1"
            rows={3}
            value={siteConfig.academiaLeao?.description1 || ''}
            onChange={(val) => updateSiteConfig({
              academiaLeao: { ...(siteConfig.academiaLeao || {}), description1: val }
            })}
          />
          <RichTextarea
            label="Parágrafo Descritivo 2"
            rows={3}
            value={siteConfig.academiaLeao?.description2 || ''}
            onChange={(val) => updateSiteConfig({
              academiaLeao: { ...(siteConfig.academiaLeao || {}), description2: val }
            })}
          />
          <RichTextarea
            label="Texto do Palestrante"
            rows={3}
            value={siteConfig.academiaLeao?.speakerText || ''}
            onChange={(val) => updateSiteConfig({
              academiaLeao: { ...(siteConfig.academiaLeao || {}), speakerText: val }
            })}
          />
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
