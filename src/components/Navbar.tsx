import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, PhoneCall, Lock, BarChart3 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
  onOpenTutorial?: () => void;
  onOpenLandingPage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenConsultation, 
  onOpenAdmin, 
}) => {
  const { siteConfig } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ordem rigorosa dos menus solicitada no Item 44:
  // Home, Presença Nacional, Legado, Head, Atuação, Soluções, Consulta, Planejamento, Publicações, Livros e Contato
  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Presença Nacional', href: '#presenca-nacional' },
    { label: 'Legado', href: '#legado' },
    { label: 'Head', href: '#head-juridico' },
    { label: 'Atuação', href: '#areas-atuacao' },
    { label: 'Soluções', href: '#solucoes-excelencia' },
    { label: 'Consulta', href: '#consulta-digital' },
    { label: 'Planejamento', href: '#holding-familiar' },
    { label: 'Publicações', href: '#publicacoes' },
    { label: 'Livros', href: '#livros' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = window.innerWidth >= 640 ? 80 : 64;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#D4AF37]/25 bg-[#050B14]/95 backdrop-blur-md shadow-xl transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Identidade Visual com Imagem do Logo Oficial Inteiro (Sem Cortes) */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="shrink-0 transition-opacity hover:opacity-95 flex items-center py-1 group" 
          aria-label="Aldo Leão Advocacia Estratégica"
        >
          <img
            src={siteConfig?.navbar?.logoImageUrl || '/img/logo.png'}
            alt="Aldo Leão Advocacia Estratégica"
            className="h-11 sm:h-14 md:h-16 w-auto max-h-full max-w-[200px] sm:max-w-[280px] object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] transition-transform duration-200 group-hover:scale-[1.02]"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              if (!el.src.includes('logo-oficial.png')) {
                el.src = '/img/logo-oficial.png';
              } else if (!el.src.includes('logo.jpg')) {
                el.src = '/img/logo.jpg';
              }
            }}
          />
        </a>

        {/* Zone 2: Navigation Links seguindo estritamente a ordem do Item 16 (Desktop XL) */}
        <nav className="hidden xl:flex items-center gap-4 text-[11px] tracking-wider uppercase font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}

          {/* Botão ESTATÍSTICAS (substitui Gabinete conforme Item 2 e 16, exige senha) */}
          <button
            onClick={onOpenAdmin}
            className="text-[11px] font-bold text-[#E5C158] hover:text-[#F6E27A] px-2.5 py-1 rounded bg-[#0A1730] border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 shadow-sm"
            title="Estatísticas e Gestão (Acesso com Senha)"
          >
            <BarChart3 className="w-3 h-3 text-[#E5C158]" />
            <span>ESTATÍSTICAS</span>
          </button>
        </nav>

        {/* Zone 3: Botão de Consulta Confidencial (Desktop LG/XL) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Para telas entre lg e xl, mostra o botão Estatísticas aqui */}
          <button
            onClick={onOpenAdmin}
            className="xl:hidden text-[11px] font-bold text-[#E5C158] hover:text-[#F6E27A] px-2.5 py-1.5 rounded bg-[#0A1730] border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 shadow-sm"
            title="Estatísticas e Gestão (Acesso com Senha)"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>ESTATÍSTICAS</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5" />
              {siteConfig?.navbar?.btnConsultation || 'Consulta Digital'}
            </span>
          </button>
        </div>

        {/* Mobile & Tablet Hamburger Toggle & Quick Actions */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenAdmin}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] uppercase font-bold text-[#F6E27A] bg-[#0E1F3D] border border-[#D4AF37]/50 rounded hover:bg-[#162D58] transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            title="Estatísticas (Acesso com Senha)"
          >
            <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E5C158]" />
            <span className="hidden xs:inline">ESTATÍSTICAS</span>
            <span className="xs:hidden">DADOS</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/70 text-[#F6E27A] hover:bg-[#1A365D] hover:border-[#F6E27A] focus:outline-none active:scale-95 transition-all cursor-pointer shadow-lg flex items-center justify-center shrink-0"
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            title={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#F6E27A]" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#F6E27A]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070F1E] border-b border-[#D4AF37]/30 px-5 sm:px-6 py-5 space-y-3 max-h-[82vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs uppercase tracking-wider text-slate-200 hover:text-[#F6E27A] py-2 border-b border-slate-800/80 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#D4AF37] text-xs">→</span>
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs uppercase font-bold text-[#E5C158] hover:text-[#F6E27A] py-2.5 border-b border-slate-800/80 flex items-center gap-2 text-left"
            >
              <BarChart3 className="w-4 h-4 text-[#E5C158]" />
              <span>ESTATÍSTICAS (ACESSO RESTRITO)</span>
            </button>
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Agendar Consulta Digital</span>
            </button>
          </div>
        </div>
      )}
    </header>
      {/* Spacer to prevent fixed header from overlapping the content */}
      <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />
    </>
  );
};
