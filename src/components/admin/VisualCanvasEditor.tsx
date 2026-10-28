import React, { useState } from 'react';
import { 
  Sparkles, 
  Save, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle2, 
  X, 
  Edit3, 
  Layers, 
  Image as ImageIcon, 
  FileText, 
  PhoneCall, 
  Scale, 
  BookOpen, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { Navbar } from '../Navbar';
import { HeroSlider } from '../HeroSlider';
import { NationalDigitalPresence } from '../NationalDigitalPresence';
import { CentennialLegacy } from '../CentennialLegacy';
import { HeadJuridico } from '../HeadJuridico';
import { PracticeAreas } from '../PracticeAreas';
import { ExcellenceSolutions } from '../ExcellenceSolutions';
import { DigitalConsultationCTA } from '../DigitalConsultationCTA';
import { HoldingFamiliarSection } from '../HoldingFamiliarSection';
import { PublicationsSection } from '../PublicationsSection';
import { DigitalBooksSection } from '../DigitalBooksSection';
import { LocationSection } from '../LocationSection';
import { Footer } from '../Footer';
import { HoldingLandingPage } from '../HoldingLandingPage';
import { AcademiaLeaoSection } from '../AcademiaLeaoSection';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../../utils/phoneUtils';

interface VisualCanvasEditorProps {
  onSwitchToFormMode: () => void;
  onBackToSite: () => void;
}

type EditableSectionKey = 
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
  | 'academia';

export const VisualCanvasEditor: React.FC<VisualCanvasEditorProps> = ({
  onSwitchToFormMode,
  onBackToSite
}) => {
  const { siteConfig, updateSiteConfig, resetSiteConfigToDefault } = useSite();

  const [activeSection, setActiveSection] = useState<EditableSectionKey | null>(null);
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewClean, setIsPreviewClean] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'holding-landing' | 'academia'>('home');
  const [saveToast, setSaveToast] = useState(false);

  // Helper para salvar com feedback
  const handleSave = () => {
    updateSiteConfig(siteConfig);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar todas as configurações do site para o padrão oficial do Dr. Aldo Leão?')) {
      resetSiteConfigToDefault();
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  // Helper para upload de imagem em base64
  const handleImageUpload = (
    updater: (url: string) => void,
    maxMb: number = 8
  ) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (file.size > maxMb * 1024 * 1024) {
        alert(`A imagem é muito pesada (máx ${maxMb}MB). Escolha uma menor.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updater(reader.result);
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // Wrapper visual para cada seção editável no modo Canva
  const renderSectionWrapper = (
    key: EditableSectionKey,
    title: string,
    children: React.ReactNode
  ) => {
    const isSelected = activeSection === key;

    if (isPreviewClean) {
      return <div>{children}</div>;
    }

    return (
      <div 
        className={`relative transition-all duration-300 group ${
          isSelected 
            ? 'ring-4 ring-[#D4AF37] ring-offset-4 ring-offset-[#050B14] shadow-[0_0_35px_rgba(212,175,55,0.4)]' 
            : 'hover:ring-2 hover:ring-[#D4AF37]/60'
        }`}
      >
        {/* Badge flutuante de edição no topo direito da seção */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setActiveSection(key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl transition-all ${
              isSelected
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] text-black shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-105'
                : 'bg-[#071122]/95 border border-[#D4AF37]/80 text-[#F6E27A] hover:bg-[#D4AF37] hover:text-black hover:scale-105 backdrop-blur-md'
            }`}
            title={`Editar ${title} em tempo real`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar {title}</span>
          </button>
        </div>

        {/* Indicador sutil da seção na borda esquerda */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2.5 py-1 rounded bg-[#050B14]/90 border border-[#D4AF37]/40 text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase backdrop-blur-sm">
            {title}
          </span>
        </div>

        {children}
      </div>
    );
  };

  // Largura do container central conforme dispositivo escolhido
  const getViewportContainerClass = () => {
    switch (deviceViewport) {
      case 'mobile':
        return 'w-[390px] min-h-screen my-6 mx-auto rounded-3xl border-8 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden';
      case 'tablet':
        return 'w-[768px] min-h-screen my-6 mx-auto rounded-2xl border-8 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden';
      default:
        return 'w-full min-h-screen';
    }
  };

  return (
    <div className="min-h-screen bg-[#03060c] text-slate-100 flex flex-col font-sans-body relative overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* BARRA SUPERIOR FIXA - TOOLBAR ESTILO CANVA                     */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-[#071122]/98 border-b border-[#D4AF37]/40 backdrop-blur-md shadow-2xl">
        <div className="max-w-[1700px] mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Lado Esquerdo: Identidade do Modo Canva */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] flex items-center justify-center text-black shadow-md">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-cinzel tracking-wider uppercase">
                  Editor Visual Live
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F6E27A] uppercase tracking-wider">
                  Estilo Canva
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Nuvem Ativa</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Navegue pelo site, clique em qualquer bloco para editar e veja o resultado na hora.
              </p>
            </div>
          </div>

          {/* Centro: Seletores de Página e Dispositivo */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Seletor de Página */}
            <div className="flex items-center bg-[#050B14] p-1 rounded-lg border border-[#D4AF37]/30">
              <button
                onClick={() => setActivePage('home')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'home'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Home / Portal
              </button>
              <button
                onClick={() => setActivePage('holding-landing')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'holding-landing'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Holding 4.0
              </button>
              <button
                onClick={() => setActivePage('academia')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'academia'
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Academia
              </button>
            </div>

            {/* Seletor de Resolução / Viewport */}
            <div className="hidden lg:flex items-center bg-[#050B14] p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setDeviceViewport('desktop')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceViewport === 'desktop' ? 'bg-[#0E1F3D] text-[#F6E27A]' : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Desktop"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceViewport('tablet')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceViewport === 'tablet' ? 'bg-[#0E1F3D] text-[#F6E27A]' : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Tablet (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceViewport('mobile')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceViewport === 'mobile' ? 'bg-[#0E1F3D] text-[#F6E27A]' : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização Mobile (390px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Alternar Pré-visualização Limpa */}
            <button
              onClick={() => setIsPreviewClean(!isPreviewClean)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition-all ${
                isPreviewClean
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-[#050B14] border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isPreviewClean ? 'Mostrar controles de edição' : 'Ocultar controles de edição para ver site limpo'}
            >
              {isPreviewClean ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPreviewClean ? 'Modo Normal' : 'Ver Limpo'}</span>
            </button>
          </div>

          {/* Lado Direito: Ações Principais (Salvar, Abas, Voltar) */}
          <div className="flex items-center gap-2">
            {/* Alternar para modo formulário por abas */}
            <button
              onClick={onSwitchToFormMode}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 border border-slate-700 bg-[#050B14] hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Mudar para o editor tradicional com todas as abas e formulários"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Modo Formulário (Abas)</span>
            </button>

            {/* Botão Salvar Todas as Alterações */}
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] via-[#F6E27A] to-[#D4AF37] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar</span>
            </button>

            {/* Voltar ao site */}
            <button
              onClick={onBackToSite}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white border border-slate-700/80 bg-[#050B14] hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>

        </div>

        {/* Notificação Toast de Salvo com Sucesso */}
        {saveToast && (
          <div className="bg-emerald-950/90 border-t border-emerald-500/40 text-emerald-200 text-xs py-2 px-4 flex items-center justify-center gap-2 shadow-inner animate-in fade-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Alterações salvas e sincronizadas com sucesso no site!</span>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* CORPO CENTRAL: O SITE SENDO RENDERIZADO AO VIVO               */}
      {/* ============================================================== */}
      <main className="flex-grow flex justify-center bg-[#03060c]">
        <div className={getViewportContainerClass()}>

          {/* CASO 1: HOME PAGE / PORTAL PRINCIPAL */}
          {activePage === 'home' && (
            <div className="bg-[#050B14] text-slate-100 flex flex-col font-sans-body w-full">
              {/* Navbar */}
              {renderSectionWrapper('navbar', 'Identidade & Topo', (
                <Navbar 
                  onOpenConsultation={() => setActiveSection('contact')}
                  onOpenAdmin={() => {}}
                  onOpenTutorial={() => {}}
                  onOpenLandingPage={() => setActivePage('holding-landing')}
                />
              ))}

              {/* Hero Slider */}
              {renderSectionWrapper('hero', 'Hero Slider (Slides 1 e 2)', (
                <HeroSlider 
                  onOpenConsultation={() => setActiveSection('consultation')}
                  onGoToLandingPage={() => setActivePage('holding-landing')}
                />
              ))}

              {/* Presença Nacional Digital */}
              {renderSectionWrapper('digital_presence', 'Presença Nacional Digital', (
                <NationalDigitalPresence />
              ))}

              {/* Legado Centenário */}
              {renderSectionWrapper('legacy', 'O Legado Centenário', (
                <CentennialLegacy />
              ))}

              {/* Head Jurídico (Dr. Aldo Leão) */}
              {renderSectionWrapper('founder', 'Head Jurídico · Dr. Aldo Leão', (
                <HeadJuridico 
                  onOpenConsultation={() => setActiveSection('consultation')}
                  onGoToLandingPage={() => setActivePage('holding-landing')}
                />
              ))}

              {/* Áreas de Atuação */}
              {renderSectionWrapper('services', 'Áreas de Atuação', (
                <PracticeAreas 
                  onGoToLandingPage={() => setActivePage('holding-landing')}
                  onOpenConsultation={() => setActiveSection('consultation')}
                />
              ))}

              {/* Soluções de Excelência */}
              {renderSectionWrapper('solutions', 'Soluções de Excelência', (
                <ExcellenceSolutions 
                  onGoToLandingPage={() => setActivePage('holding-landing')}
                  onOpenConsultation={() => setActiveSection('consultation')}
                  onGoToAcademia={() => setActivePage('academia')}
                />
              ))}

              {/* Agende sua Consulta Digital */}
              {renderSectionWrapper('consultation', 'Agende a sua Consulta Digital', (
                <DigitalConsultationCTA 
                  onOpenConsultation={() => setActiveSection('consultation')}
                />
              ))}

              {/* Holding Familiar */}
              {renderSectionWrapper('holding', 'Holding Familiar 4.0', (
                <HoldingFamiliarSection 
                  onGoToLandingPage={() => setActivePage('holding-landing')}
                />
              ))}

              {/* Publicações Jurídicas */}
              {renderSectionWrapper('publications', 'Publicações Jurídicas', (
                <PublicationsSection />
              ))}

              {/* Livros Digitais */}
              {renderSectionWrapper('books', 'Livros Digitais', (
                <DigitalBooksSection 
                  onOpenConsultation={() => setActiveSection('consultation')}
                />
              ))}

              {/* Contato & Localização */}
              {renderSectionWrapper('contact', 'Canais de Contato & Escritórios', (
                <LocationSection />
              ))}

              {/* Rodapé */}
              {renderSectionWrapper('footer', 'Rodapé Institucional & OAB', (
                <Footer 
                  onOpenAdmin={() => {}}
                  onOpenTutorial={() => {}}
                  onOpenLandingPage={() => setActivePage('holding-landing')}
                />
              ))}
            </div>
          )}

          {/* CASO 2: LANDING PAGE DE HOLDING FAMILIAR 4.0 */}
          {activePage === 'holding-landing' && (
            <div className="bg-[#050B14] text-slate-100 flex flex-col font-sans-body w-full">
              {renderSectionWrapper('holding', 'Landing Page Holding Familiar', (
                <HoldingLandingPage 
                  onBackToSite={() => setActivePage('home')}
                  onOpenAdmin={() => {}}
                  onOpenConsultation={() => setActiveSection('consultation')}
                />
              ))}
            </div>
          )}

          {/* CASO 3: ACADEMIA LEÃO FERREIRA */}
          {activePage === 'academia' && (
            <div className="bg-[#050B14] text-slate-100 flex flex-col font-sans-body w-full">
              {renderSectionWrapper('academia', 'Academia Leão Ferreira', (
                <AcademiaLeaoSection 
                  onBackToSite={() => setActivePage('home')}
                  onOpenConsultation={() => setActiveSection('consultation')}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ============================================================== */}
      {/* DRAWER LATERAL: PAINEL DE EDIÇÃO AO VIVO EM TEMPO REAL        */}
      {/* ============================================================== */}
      {activeSection && (
        <aside 
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] md:w-[540px] bg-[#071122] border-l-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300"
        >
          {/* Topo do Drawer */}
          <div className="p-4 sm:p-5 border-b border-[#D4AF37]/30 bg-[#050B14] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A]">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                  Edição ao Vivo
                </h3>
                <span className="text-[11px] text-[#E5C158] font-medium flex items-center gap-1">
                  <span>Modificações refletem na hora na tela</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveSection(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Fechar painel de edição rápida"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conteúdo com scroll dos campos da seção ativa */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 text-left">

            {/* Atalho para o Modo Formulário de Abas Completo */}
            <div className="p-3 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 flex items-center justify-between gap-3 shadow-md">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">
                  Prefere ver todos os campos e abas?
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

            {/* SEÇÃO 1: NAVBAR & IDENTIDADE */}
            {activeSection === 'navbar' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título do Logo
                  </label>
                  <input
                    type="text"
                    value={siteConfig.navbar?.logoTitle || 'ALDO LEÃO'}
                    onChange={(e) => updateSiteConfig({
                      navbar: { ...(siteConfig.navbar || {}), logoTitle: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm focus:outline-none focus:border-[#F6E27A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Subtítulo do Logo
                  </label>
                  <input
                    type="text"
                    value={siteConfig.navbar?.logoSubtitle || 'ADVOCACIA ESTRATÉGICA'}
                    onChange={(e) => updateSiteConfig({
                      navbar: { ...(siteConfig.navbar || {}), logoSubtitle: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm focus:outline-none focus:border-[#F6E27A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Número OAB / Registro
                  </label>
                  <input
                    type="text"
                    value={siteConfig.navbar?.oabNumber || 'OAB/RS 21.036'}
                    onChange={(e) => updateSiteConfig({
                      navbar: { ...(siteConfig.navbar || {}), oabNumber: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm focus:outline-none focus:border-[#F6E27A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Texto do Botão de Consulta (Navbar)
                  </label>
                  <input
                    type="text"
                    value={siteConfig.navbar?.btnConsultation || 'AGENDAR CONSULTA'}
                    onChange={(e) => updateSiteConfig({
                      navbar: { ...(siteConfig.navbar || {}), btnConsultation: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm focus:outline-none focus:border-[#F6E27A]"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 2: HERO SLIDER (SLIDES 1 E 2) */}
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <div className="p-3 bg-[#050B14] rounded-xl border border-[#D4AF37]/30">
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] mb-3">Slide 1 · Tradição 1908</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Kicker Superior</label>
                      <input
                        type="text"
                        value={siteConfig.hero.kicker}
                        onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, kicker: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                      />
                    </div>
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
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Título Destaque Dourado</label>
                      <input
                        type="text"
                        value={siteConfig.hero.titleHighlight}
                        onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, titleHighlight: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Descrição</label>
                      <textarea
                        rows={3}
                        value={siteConfig.hero.description}
                        onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, description: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Tagline</label>
                      <input
                        type="text"
                        value={siteConfig.hero.tagline}
                        onChange={(e) => updateSiteConfig({ hero: { ...siteConfig.hero, tagline: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Imagem Desktop (Slide 1)</label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleImageUpload((url) => updateSiteConfig({ hero: { ...siteConfig.hero, heroImageUrl: url } }))}
                          className="px-3 py-1.5 rounded bg-[#0E1F3D] border border-[#D4AF37]/50 text-xs text-[#F6E27A] hover:bg-[#D4AF37] hover:text-black transition-colors"
                        >
                          Trocar Foto Slide 1
                        </button>
                        <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                          {siteConfig.hero.heroImageUrl || 'Padrão'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#050B14] rounded-xl border border-[#D4AF37]/30">
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] mb-3">Slide 2 · Holding Familiar 4.0</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Título</label>
                      <input
                        type="text"
                        value={siteConfig.slide2?.title || 'PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0'}
                        onChange={(e) => updateSiteConfig({ slide2: { ...(siteConfig.slide2 || {}), title: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Destaque Dourado</label>
                      <input
                        type="text"
                        value={siteConfig.slide2?.titleHighlight || 'HOLDING FAMILIAR'}
                        onChange={(e) => updateSiteConfig({ slide2: { ...(siteConfig.slide2 || {}), titleHighlight: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-300 font-semibold mb-1">Parágrafo 1</label>
                      <textarea
                        rows={2}
                        value={siteConfig.slide2?.paragraph1 || ''}
                        onChange={(e) => updateSiteConfig({ slide2: { ...(siteConfig.slide2 || {}), paragraph1: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 3: PRESENÇA NACIONAL */}
            {activeSection === 'digital_presence' && (
              <div className="space-y-4">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Destaque Dourado
                  </label>
                  <input
                    type="text"
                    value={siteConfig.nationalPresence?.titleHighlight || ''}
                    onChange={(e) => updateSiteConfig({
                      nationalPresence: { ...(siteConfig.nationalPresence || {}), titleHighlight: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Parágrafo 1
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.nationalPresence?.paragraph1 || ''}
                    onChange={(e) => updateSiteConfig({
                      nationalPresence: { ...(siteConfig.nationalPresence || {}), paragraph1: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Card 1 Balança
                  </label>
                  <input
                    type="text"
                    value={siteConfig.nationalPresence?.card1Text || ''}
                    onChange={(e) => updateSiteConfig({
                      nationalPresence: { ...(siteConfig.nationalPresence || {}), card1Text: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Card 2 Balança
                  </label>
                  <input
                    type="text"
                    value={siteConfig.nationalPresence?.card2Text || ''}
                    onChange={(e) => updateSiteConfig({
                      nationalPresence: { ...(siteConfig.nationalPresence || {}), card2Text: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Card 3 Balança
                  </label>
                  <input
                    type="text"
                    value={siteConfig.nationalPresence?.card3Text || ''}
                    onChange={(e) => updateSiteConfig({
                      nationalPresence: { ...(siteConfig.nationalPresence || {}), card3Text: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 4: LEGADO CENTENÁRIO */}
            {activeSection === 'legacy' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Kicker
                  </label>
                  <input
                    type="text"
                    value={siteConfig.centennialLegacy?.goldKicker || ''}
                    onChange={(e) => updateSiteConfig({
                      centennialLegacy: { ...(siteConfig.centennialLegacy || {}), goldKicker: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={siteConfig.centennialLegacy?.title || ''}
                    onChange={(e) => updateSiteConfig({
                      centennialLegacy: { ...(siteConfig.centennialLegacy || {}), title: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título Card 40 Anos
                  </label>
                  <input
                    type="text"
                    value={siteConfig.centennialLegacy?.card40Title || '40 ANOS'}
                    onChange={(e) => updateSiteConfig({
                      centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Title: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Texto Card 40 Anos
                  </label>
                  <textarea
                    rows={2}
                    value={siteConfig.centennialLegacy?.card40Text || ''}
                    onChange={(e) => updateSiteConfig({
                      centennialLegacy: { ...(siteConfig.centennialLegacy || {}), card40Text: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 5: HEAD JURÍDICO (DR. ALDO LEÃO) */}
            {activeSection === 'founder' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Nome de Apresentação
                  </label>
                  <input
                    type="text"
                    value={siteConfig.founder.name}
                    onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, name: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título Profissional
                  </label>
                  <input
                    type="text"
                    value={siteConfig.founder.title}
                    onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, title: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Credenciais / OAB
                  </label>
                  <input
                    type="text"
                    value={siteConfig.founder.credentials}
                    onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, credentials: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Foto Oficial do Dr. Aldo Leão
                  </label>
                  <div className="flex items-center gap-3">
                    <img 
                      src={siteConfig.founder.photoUrl} 
                      alt="Dr Aldo Leao" 
                      className="w-12 h-14 object-cover rounded-lg border border-[#D4AF37]/50" 
                    />
                    <button
                      type="button"
                      onClick={() => handleImageUpload((url) => updateSiteConfig({ founder: { ...siteConfig.founder, photoUrl: url } }))}
                      className="px-3 py-1.5 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/50 text-xs text-[#F6E27A] hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      Trocar Retrato Oficial
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Biografia · Parágrafo 1
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.founder.bioParagraph1}
                    onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Biografia · Parágrafo 2
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.founder.bioParagraph2}
                    onChange={(e) => updateSiteConfig({ founder: { ...siteConfig.founder, bioParagraph2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 6: ÁREAS DE ATUAÇÃO */}
            {activeSection === 'services' && (
              <div className="space-y-4">
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
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
                  />
                </div>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] mb-3">5 Áreas de Atuação</h4>
                  <div className="space-y-3">
                    {siteConfig.practiceAreas.map((area, idx) => (
                      <div key={area.id} className="p-3 rounded-xl bg-[#050B14] border border-slate-700 space-y-2">
                        <span className="text-[10px] text-[#D4AF37] font-bold uppercase">Área {area.number}</span>
                        <input
                          type="text"
                          value={area.title}
                          onChange={(e) => {
                            const updated = [...siteConfig.practiceAreas];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateSiteConfig({ practiceAreas: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          value={area.description}
                          onChange={(e) => {
                            const updated = [...siteConfig.practiceAreas];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateSiteConfig({ practiceAreas: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-[#071122] border border-slate-700 text-slate-300 text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 7: SOLUÇÕES DE EXCELÊNCIA */}
            {activeSection === 'solutions' && (
              <div className="space-y-4">
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
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
                  />
                </div>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] mb-3">8 Soluções de Excelência</h4>
                  <div className="space-y-3">
                    {siteConfig.excellenceSolutions.map((sol, idx) => (
                      <div key={sol.id} className="p-3 rounded-xl bg-[#050B14] border border-slate-700 space-y-2">
                        <span className="text-[10px] text-[#D4AF37] font-bold uppercase">{sol.number} · {sol.subtitle || ''}</span>
                        <input
                          type="text"
                          value={sol.title}
                          onChange={(e) => {
                            const updated = [...siteConfig.excellenceSolutions];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateSiteConfig({ excellenceSolutions: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-[#071122] border border-slate-700 text-white text-xs font-semibold"
                        />
                        <textarea
                          rows={2}
                          value={sol.description}
                          onChange={(e) => {
                            const updated = [...siteConfig.excellenceSolutions];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateSiteConfig({ excellenceSolutions: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-[#071122] border border-slate-700 text-slate-300 text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 8: CONSULTA DIGITAL */}
            {activeSection === 'consultation' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={siteConfig.digitalConsultation?.sectionTitle || 'AGENDE A SUA'}
                    onChange={(e) => updateSiteConfig({
                      digitalConsultation: { ...(siteConfig.digitalConsultation || {}), sectionTitle: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.digitalConsultation?.description || ''}
                    onChange={(e) => updateSiteConfig({
                      digitalConsultation: { ...(siteConfig.digitalConsultation || {}), description: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Botão de Agendamento
                  </label>
                  <input
                    type="text"
                    value={siteConfig.digitalConsultation?.btnSchedule || 'SOLICITAR CONSULTA ESTRATÉGICA'}
                    onChange={(e) => updateSiteConfig({
                      digitalConsultation: { ...(siteConfig.digitalConsultation || {}), btnSchedule: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 9: HOLDING FAMILIAR */}
            {activeSection === 'holding' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-[#E5C158] uppercase">
                    {activePage === 'holding-landing' ? 'Landing Page Holding 4.0 (/1208/)' : 'Seção Holding na Home'}
                  </span>
                  <button
                    onClick={() => setActivePage(activePage === 'holding-landing' ? 'home' : 'holding-landing')}
                    className="text-[11px] text-[#F6E27A] hover:underline cursor-pointer"
                  >
                    Alternar para {activePage === 'holding-landing' ? 'Home' : 'Landing Page'}
                  </button>
                </div>

                {activePage === 'holding-landing' ? (
                  <div className="space-y-4">
                    <span className="text-[11px] font-bold text-[#F6E27A] uppercase block">1. Topo & Hero da Landing Page</span>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Eyebrow Dourado</label>
                      <input
                        type="text"
                        value={siteConfig.holdingLanding?.heroEyebrow || 'HOLDING FAMILIAR'}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroEyebrow: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-[#D4AF37]/40 text-xs text-[#F6E27A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Título do Hero</label>
                      <input
                        type="text"
                        value={siteConfig.holdingLanding?.heroTitle || 'PLANEJAMENTO'}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroTitle: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Subtítulo do Hero</label>
                      <input
                        type="text"
                        value={siteConfig.holdingLanding?.heroSubtitle || 'O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA AOS HERDEIROS'}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroSubtitle: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 1</label>
                      <textarea
                        rows={2}
                        value={siteConfig.holdingLanding?.heroParagraph1 || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph1: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 2</label>
                      <textarea
                        rows={2}
                        value={siteConfig.holdingLanding?.heroParagraph2 || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph2: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 3</label>
                      <textarea
                        rows={2}
                        value={siteConfig.holdingLanding?.heroParagraph3 || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph3: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 4</label>
                      <textarea
                        rows={2}
                        value={siteConfig.holdingLanding?.heroParagraph4 || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph4: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 5 (Destaque Branco)</label>
                      <textarea
                        rows={2}
                        value={siteConfig.holdingLanding?.heroParagraph5 || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingLanding: { ...(siteConfig.holdingLanding || {}), heroParagraph5: e.target.value }
                        })}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white font-medium"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-bold text-[#F6E27A] uppercase block mb-2">2. Botões & Seções da Landing Page</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Botão Agendar Viabilidade</label>
                          <input
                            type="text"
                            value={siteConfig.holdingLanding?.heroBtnViabilidade || 'AGENDAR SESSÃO DE VIABILIDADE'}
                            onChange={(e) => updateSiteConfig({
                              holdingLanding: { ...(siteConfig.holdingLanding || {}), heroBtnViabilidade: e.target.value }
                            })}
                            className="w-full p-1.5 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Botão Tabela de Custos</label>
                          <input
                            type="text"
                            value={siteConfig.holdingLanding?.heroBtnCustos || 'CUSTOS: INVENTÁRIO X PLANEJAMENTO 4.0'}
                            onChange={(e) => updateSiteConfig({
                              holdingLanding: { ...(siteConfig.holdingLanding || {}), heroBtnCustos: e.target.value }
                            })}
                            className="w-full p-1.5 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] font-bold text-[#F6E27A] uppercase block mb-1">3. Tabela Comparativa de Custos</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Economia em R$</label>
                          <input
                            type="text"
                            value={siteConfig.holdingLanding?.economiaValor || 'R$ 380.000,00'}
                            onChange={(e) => updateSiteConfig({
                              holdingLanding: { ...(siteConfig.holdingLanding || {}), economiaValor: e.target.value }
                            })}
                            className="w-full p-1.5 rounded bg-[#050B14] border border-emerald-500/50 text-xs text-emerald-300 font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">Economia Percentual (%)</label>
                          <input
                            type="text"
                            value={siteConfig.holdingLanding?.economiaPercentual || '82,6%'}
                            onChange={(e) => updateSiteConfig({
                              holdingLanding: { ...(siteConfig.holdingLanding || {}), economiaPercentual: e.target.value }
                            })}
                            className="w-full p-1.5 rounded bg-[#050B14] border border-emerald-500/50 text-xs text-emerald-300 font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                        Kicker
                      </label>
                      <input
                        type="text"
                        value={siteConfig.holdingFamiliar?.sectionKicker || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), sectionKicker: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={siteConfig.holdingFamiliar?.sectionTitle || 'HOLDING'}
                        onChange={(e) => updateSiteConfig({
                          holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), sectionTitle: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                        Imagem Oficial Aprovada
                      </label>
                      <div className="flex items-center gap-3">
                        <img 
                          src={siteConfig.holdingFamiliar?.cardImageUrl || '/img/holding-familiar-1.jpg'} 
                          alt="Holding" 
                          className="w-16 h-12 object-cover rounded-lg border border-[#D4AF37]/50" 
                        />
                        <button
                          type="button"
                          onClick={() => handleImageUpload((url) => updateSiteConfig({
                            holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), cardImageUrl: url }
                          }))}
                          className="px-3 py-1.5 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/50 text-xs text-[#F6E27A] hover:bg-[#D4AF37] hover:text-black transition-colors"
                        >
                          Trocar Imagem
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                        Parágrafo 1
                      </label>
                      <textarea
                        rows={3}
                        value={siteConfig.holdingFamiliar?.paragraph1 || ''}
                        onChange={(e) => updateSiteConfig({
                          holdingFamiliar: { ...(siteConfig.holdingFamiliar || {}), paragraph1: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEÇÃO 10: PUBLICAÇÕES & NOTÍCIAS */}
            {activeSection === 'publications' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título da Seção
                  </label>
                  <input
                    type="text"
                    value={siteConfig.publicationsSection?.titleWhite || 'PUBLICAÇÕES JURÍDICAS &'}
                    onChange={(e) => updateSiteConfig({
                      publicationsSection: { ...(siteConfig.publicationsSection || {}), titleWhite: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs uppercase font-bold text-[#F6E27A]">
                      Lista de Publicações ({siteConfig.publications.length})
                    </h4>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {siteConfig.publications.map((pub, idx) => (
                      <div key={pub.id} className="p-2.5 rounded-lg bg-[#050B14] border border-slate-700 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-[#D4AF37] font-semibold uppercase">{pub.type} · {pub.area}</span>
                          <span className="text-slate-400">{pub.date}</span>
                        </div>
                        <input
                          type="text"
                          value={pub.title}
                          onChange={(e) => {
                            const updated = [...siteConfig.publications];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateSiteConfig({ publications: updated });
                          }}
                          className="w-full px-2 py-1 rounded bg-[#071122] border border-slate-700 text-white text-xs font-semibold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 11: LIVROS DIGITAIS */}
            {activeSection === 'books' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Título da Seção
                  </label>
                  <input
                    type="text"
                    value={siteConfig.booksSection?.titleWhite || 'OBRAS &'}
                    onChange={(e) => updateSiteConfig({
                      booksSection: { ...(siteConfig.booksSection || {}), titleWhite: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-[#D4AF37]/40 text-white text-xs"
                  />
                </div>

                <div className="pt-2">
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] mb-2">
                    8 Obras Digitais ({siteConfig.digitalBooks.length})
                  </h4>
                  <div className="space-y-3">
                    {siteConfig.digitalBooks.map((book, idx) => (
                      <div key={book.id} className="p-3 rounded-xl bg-[#050B14] border border-slate-700 flex gap-3 items-center">
                        <img 
                          src={book.coverImage || '/capa-1.png'} 
                          alt={book.title} 
                          className="w-12 h-16 object-cover rounded border border-[#D4AF37]/40 shrink-0" 
                        />
                        <div className="flex-grow space-y-1">
                          <input
                            type="text"
                            value={book.title}
                            onChange={(e) => {
                              const updated = [...siteConfig.digitalBooks];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateSiteConfig({ digitalBooks: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-[#071122] border border-slate-700 text-white text-xs font-semibold"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleImageUpload((url) => {
                                const updated = [...siteConfig.digitalBooks];
                                updated[idx] = { ...updated[idx], coverImage: url };
                                updateSiteConfig({ digitalBooks: updated });
                              })}
                              className="text-[10px] text-[#F6E27A] hover:underline"
                            >
                              Trocar Capa
                            </button>
                            <span className="text-[10px] text-slate-400">· {book.year || '2026'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEÇÃO 12: CONTATO */}
            {activeSection === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    WhatsApp Oficial (Somente números)
                  </label>
                  <input
                    type="text"
                    value={siteConfig.contact.whatsappNumber}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, whatsappNumber: getCleanWhatsAppDigits(e.target.value, '5551998088998') }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-emerald-300 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Telefone Principal (Porto Alegre)
                  </label>
                  <input
                    type="text"
                    value={siteConfig.contact.phonePrimary}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, phonePrimary: cleanAndFormatPhone(e.target.value, '(51) 99808-8998') }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Telefone Secundário
                  </label>
                  <input
                    type="text"
                    value={siteConfig.contact.phoneSecondary}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, phoneSecondary: cleanAndFormatPhone(e.target.value, '(51) 99807-8998') }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    E-mail Principal
                  </label>
                  <input
                    type="email"
                    value={siteConfig.contact.emailPrimary}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, emailPrimary: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Endereço Sede (Porto Alegre)
                  </label>
                  <textarea
                    rows={2}
                    value={siteConfig.contact.addressPortoAlegre}
                    onChange={(e) => updateSiteConfig({
                      contact: { ...siteConfig.contact, addressPortoAlegre: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 13: RODAPÉ */}
            {activeSection === 'footer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Copyright
                  </label>
                  <input
                    type="text"
                    value={siteConfig.footer?.copyrightText || ''}
                    onChange={(e) => updateSiteConfig({
                      footer: { ...(siteConfig.footer || {}), copyrightText: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Texto OAB / Compliance
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.footer?.oabComplianceText || ''}
                    onChange={(e) => updateSiteConfig({
                      footer: { ...(siteConfig.footer || {}), oabComplianceText: e.target.value }
                    })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-white text-xs leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* SEÇÃO 14: ACADEMIA LEÃO FERREIRA */}
            {activeSection === 'academia' && (
              <div className="space-y-4">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-white text-sm"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 text-[#F6E27A] text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                    Texto do Palestrante
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.academiaLeao?.speakerText || ''}
                    onChange={(e) => updateSiteConfig({
                      academiaLeao: { ...(siteConfig.academiaLeao || {}), speakerText: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B14] border border-slate-700 text-white text-xs leading-relaxed"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Rodapé do Drawer com Ação de Conclusão */}
          <div className="p-4 border-t border-[#D4AF37]/30 bg-[#050B14] flex items-center justify-between gap-3">
            <button
              onClick={() => setActiveSection(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Fechar Painel
            </button>

            <button
              onClick={() => {
                handleSave();
                setActiveSection(null);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Salvar e Fechar</span>
            </button>
          </div>
        </aside>
      )}

    </div>
  );
};
