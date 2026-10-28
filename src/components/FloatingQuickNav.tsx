import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Scale, 
  Award, 
  Building2, 
  UserCheck, 
  BookOpen, 
  MessageCircle, 
  ShieldCheck, 
  ChevronUp, 
  ChevronDown,
  Sparkles,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface FloatingQuickNavProps {
  onOpenConsultation: () => void;
  onOpenAdmin?: () => void;
  onOpenTutorial?: () => void;
  onOpenLandingPage?: () => void;
}

interface NavItem {
  id: string;
  emoji: string;
  label: string;
  description: string;
  action: () => void;
  highlight?: boolean;
}

export const FloatingQuickNav: React.FC<FloatingQuickNavProps> = ({
  onOpenConsultation,
  onOpenAdmin,
  onOpenTutorial,
  onOpenLandingPage,
}) => {
  const { siteConfig } = useSite();
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  // Item 23: Barra inicia recolhida com a balança da justiça em dourado
  const [isCollapsed, setIsCollapsed] = useState(true);

  const scrollToSection = (id: string) => {
    setIsFullMenuOpen(false);
    setActiveTooltip(null);
    setIsCollapsed(true);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems: NavItem[] = [
    {
      id: 'menu',
      emoji: '☰',
      label: 'Menu Completo',
      description: 'Abrir todas as seções e serviços do escritório',
      action: () => setIsFullMenuOpen(true),
      highlight: true,
    },
    {
      id: 'areas',
      emoji: '⚖️',
      label: 'Áreas de Atuação',
      description: 'Soluções Jurídicas de Alta Performance',
      action: () => scrollToSection('areas-atuacao'),
    },
    {
      id: 'legado',
      emoji: '🏛️',
      label: 'Legado Centenário',
      description: 'Tradição familiar desde 1908',
      action: () => scrollToSection('legado'),
    },
    {
      id: 'holding',
      emoji: '🏢',
      label: 'Holding 4.0',
      description: 'Planejamento patrimonial e sucessão estratégica',
      action: () => scrollToSection('holding-familiar'),
    },
    {
      id: 'head',
      emoji: '👨‍⚖️',
      label: 'Head Dr. Aldo',
      description: 'Perfil e liderança do Dr. Aldo Leão',
      action: () => scrollToSection('head-juridico'),
    },
    {
      id: 'livros',
      emoji: '📚',
      label: 'Livros Digitais',
      description: 'Biblioteca jurídica digital para download gratuito',
      action: () => scrollToSection('livros'),
    },
    {
      id: 'whatsapp',
      emoji: '💬',
      label: 'WhatsApp Plantão',
      description: 'Fale direto pelo WhatsApp oficial',
      action: () => {
        setActiveTooltip(null);
        setIsCollapsed(true);
        const text = encodeURIComponent(
          'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de falar com um Advogado especialista.'
        );
        window.open(
          `https://wa.me/${siteConfig.contact.whatsappNumber || '5551998088998'}?text=${text}`,
          '_blank'
        );
      },
    },
  ];

  return (
    <>
      {/* Floating Mini Menu Dock (Posicionado acima da barra inferior no mobile e no canto inferior no desktop) */}
      <div 
        className="fixed bottom-16 right-3 sm:bottom-5 sm:right-6 z-50 flex flex-col items-end select-none"
        aria-label="Menu Flutuante Rápido"
      >
        {/* Tooltip Card (Appears on Hover or Mobile Click/Tap) */}
        {activeTooltip && !isFullMenuOpen && (
          <div 
            className="mb-2 sm:mb-2.5 mr-1 py-1.5 px-3 rounded-lg bg-[#071122]/98 border border-[#D4AF37] text-white text-xs shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150 max-w-[200px] sm:max-w-[260px] pointer-events-none"
          >
            <span className="text-base leading-none shrink-0">
              {navItems.find((item) => item.id === activeTooltip)?.emoji}
            </span>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[#F6E27A] leading-tight">
                {navItems.find((item) => item.id === activeTooltip)?.label}
              </span>
              <span className="text-[10px] text-slate-300 leading-tight">
                {navItems.find((item) => item.id === activeTooltip)?.description}
              </span>
            </div>
          </div>
        )}

        {/* Main Floating Capsule: Recolhida por padrão com a Balança da Justiça em Dourado (Item 23) */}
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#102347] to-[#071122] border-2 border-[#D4AF37] text-[#F6E27A] shadow-[0_6px_25px_rgba(212,175,55,0.45)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
            title="Abrir menu de opções rápidas"
            aria-label="Abrir menu de opções rápidas"
          >
            <Scale className="w-5 h-5 text-[#E5C158] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#25D366] border border-[#071122] animate-pulse" />
          </button>
        ) : (
          // Expanded Dock: Vertical (grows upwards) on mobile (flex-col-reverse), horizontal on desktop (sm:flex-row)
          <div className="relative flex flex-col-reverse sm:flex-row items-center p-1 sm:p-1.5 rounded-full bg-[#061021]/95 backdrop-blur-xl border border-[#D4AF37]/60 shadow-[0_10px_35px_rgba(0,0,0,0.75)] animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Collapse toggle mini button */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-[#0B1A33]/80 hover:bg-[#132A54] text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer mt-1 sm:mt-0 sm:mr-1 shrink-0"
              title="Minimizar barra"
              aria-label="Minimizar"
            >
              ✕
            </button>

            {/* List of Emoji Buttons: Vertical column on mobile, horizontal row on desktop */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-1 sm:gap-1.5">
              {navItems.map((item) => {
                const isHighlight = item.highlight;
                const isSelected = activeTooltip === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTooltip(item.id);
                      item.action();
                    }}
                    onMouseEnter={() => setActiveTooltip(item.id)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onTouchStart={() => setActiveTooltip(item.id)}
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-base sm:text-lg transition-all duration-200 cursor-pointer ${
                      isHighlight
                        ? 'bg-gradient-to-br from-[#F6E27A] to-[#D4AF37] text-[#050B14] shadow-[0_0_12px_rgba(212,175,55,0.5)] font-bold hover:scale-110 active:scale-95'
                        : isSelected
                        ? 'bg-[#142B52] border border-[#D4AF37] scale-110 shadow-md'
                        : 'bg-[#0B1A33]/70 hover:bg-[#142B52] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:scale-110 active:scale-95'
                    }`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <span>{item.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Full Screen / Mobile Drawer Interactive Overlay (Triggered by ☰ Hamburger) */}
      {isFullMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsFullMenuOpen(false)}
        >
          <div 
            className="w-full max-w-lg bg-[#071122] border border-[#D4AF37]/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-6 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#D4AF37]/30 flex items-center justify-between bg-gradient-to-r from-[#0E1F3D] to-[#071122]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-xl">
                  🦁
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-cinzel">
                    Aldo Leão Advocacia
                  </h3>
                  <p className="text-[11px] text-[#E5C158] flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3 h-3 text-[#F6E27A]" />
                    40 Anos de Tradição e Excelência
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFullMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#050B14] border border-[#D4AF37]/40 text-slate-300 hover:text-white hover:border-[#D4AF37] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links Grid */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => scrollToSection('areas-atuacao')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">⚖️</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Áreas de Atuação
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Empresarial, Tributário, Agro
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('selo-40-anos')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🎖️</span>
                  <div>
                    <div className="text-xs font-bold text-[#F6E27A] group-hover:brightness-110">
                      Selo 40 Anos (1986–2026)
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Experiência comprovada
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('holding-familiar')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🏢</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Holding Familiar 4.0
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Blindagem e Sucessão
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('head-juridico')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">👨‍⚖️</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Head Jurídico Dr. Aldo
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Advogado titular e trajetória
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('legado')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🏛️</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Legado Centenário 1908
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Três gerações de juristas
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('academia-leao')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🎓</span>
                  <div>
                    <div className="text-xs font-bold text-[#F6E27A] group-hover:brightness-110">
                      Academia Leão
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Cursos, mentorias e eventos
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('publicacoes')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">📜</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Publicações Jurídicas
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Artigos & Notícias STF/STJ
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('livros')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">📚</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Livros & Obras Digitais
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Download de {siteConfig.digitalBooks?.length || 6} e-books
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => scrollToSection('contato')}
                  className="p-3 rounded-xl bg-[#0B1A33]/80 hover:bg-[#132A54] border border-[#D4AF37]/25 hover:border-[#D4AF37] flex items-center gap-3 text-left transition-all cursor-pointer group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">📍</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#F6E27A]">
                      Sede & Atendimento
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Porto Alegre e Nacional
                    </div>
                  </div>
                </button>
              </div>

              {/* Special Action Buttons */}
              <div className="pt-2 space-y-2 border-t border-[#D4AF37]/20">
                {onOpenLandingPage && (
                  <button
                    onClick={() => {
                      setIsFullMenuOpen(false);
                      onOpenLandingPage();
                    }}
                    className="w-full p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-[#F6E27A]/20 hover:from-[#D4AF37]/35 hover:to-[#F6E27A]/35 border border-[#D4AF37]/50 flex items-center justify-between text-left cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">💎</span>
                      <span className="text-xs font-bold text-[#F6E27A]">
                        Landing Page Exclusiva de Holding 4.0
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#F6E27A]" />
                  </button>
                )}

                {onOpenTutorial && (
                  <button
                    onClick={() => {
                      setIsFullMenuOpen(false);
                      onOpenTutorial();
                    }}
                    className="w-full p-2.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/40 text-left cursor-pointer transition-all flex items-center gap-2"
                  >
                    <span className="text-base">📘</span>
                    <div>
                      <div className="text-[11px] font-bold text-sky-300">Guia do Projeto</div>
                      <div className="text-[9px] text-slate-400">Manual Interativo e Conformidade</div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 border-t border-[#D4AF37]/30 bg-[#050B14] flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setIsFullMenuOpen(false);
                  onOpenConsultation();
                }}
                className="flex-1 py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Consulta Confidencial</span>
              </button>
              
              <button
                onClick={() => {
                  setIsFullMenuOpen(false);
                  window.open(
                    `https://wa.me/${siteConfig.contact.whatsappNumber}?text=Ol%C3%A1%20Dr.%20Aldo%20Le%C3%A3o%2C%20gostaria%20de%20um%20atendimento%20jur%C3%ADdico.`,
                    '_blank'
                  );
                }}
                className="py-3 px-4 rounded-xl text-center text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💬 WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
