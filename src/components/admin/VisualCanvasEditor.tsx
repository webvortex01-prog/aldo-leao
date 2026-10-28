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
import { ImageUploadField } from './ImageUploadField';
import { PracticeArea, DigitalBook, Publication } from '../../types';
import { VisualDrawerContent } from './VisualDrawerContent';

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
  | 'academia'
  | 'all_images';

export const VisualCanvasEditor: React.FC<VisualCanvasEditorProps> = ({
  onSwitchToFormMode,
  onBackToSite
}) => {
  const { siteConfig, updateSiteConfig, resetSiteConfigToDefault } = useSite();

  const [activeSection, setActiveSection] = useState<EditableSectionKey | null>(null);
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewClean, setIsPreviewClean] = useState(false);
  const [activePage, setActivePage] = useState<'home' | 'holding-landing' | 'academia'>('home');
  const [holdingTab, setHoldingTab] = useState<'section' | 'landing'>('section');
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
          className="fixed inset-y-0 right-0 z-50 w-full sm:w-[560px] md:w-[660px] lg:w-[760px] bg-[#071122] border-l-2 border-[#D4AF37]/50 shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-300"
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

          {/* Conteúdo com scroll dos campos da seção ativa - Paridade Total 100% */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 text-left">
            <VisualDrawerContent
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              onSwitchToFormMode={onSwitchToFormMode}
            />
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
