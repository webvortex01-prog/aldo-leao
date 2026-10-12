import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, PhoneCall } from 'lucide-react';
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
  onOpenTutorial,
  onOpenLandingPage 
}) => {
  const { siteConfig } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#050B14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single Element) */}
        <a href="#" className="shrink-0 transition-opacity hover:opacity-95" aria-label="Aldo Leão Advocacia Estratégica">
          <Logo size="md" />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs tracking-wider uppercase font-medium text-slate-300">
          <a
            href="#areas-atuacao"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Áreas de Atuação
          </a>
          <a
            href="#selo-40-anos"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1 text-[#F6E27A] font-semibold flex items-center gap-1"
          >
            <span>Selo 40 Anos</span>
          </a>
          <a
            href="#legado"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Legado 1908
          </a>
          <a
            href="#solucoes-excelencia"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Soluções
          </a>
          <a
            href="#academia-leao"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1 text-[#F6E27A]"
          >
            Academia Leão
          </a>
          <a
            href="#holding-familiar"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1 text-[#F6E27A] font-semibold"
          >
            Holding 4.0
          </a>
          <a
            href="#head-juridico"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Head Jurídico
          </a>
          <a
            href="#livros"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1 text-[#F6E27A] font-semibold"
          >
            Livros ({siteConfig.digitalBooks?.length || 6})
          </a>
          <a
            href="#publicacoes"
            className="hover:text-[#F6E27A] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Publicações
          </a>

          {onOpenLandingPage && (
            <button
              onClick={onOpenLandingPage}
              className="text-[11px] font-bold text-[#050B14] bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] hover:brightness-110 px-2.5 py-1 rounded shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
              title="Acessar Landing Page Exclusiva de Holding 4.0"
            >
              Landing Holding 4.0
            </button>
          )}

          {onOpenTutorial && (
            <button
              onClick={onOpenTutorial}
              className="text-[11px] font-semibold text-sky-300 hover:text-white px-2.5 py-1 rounded bg-sky-950/60 border border-sky-600/40 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              title="Abrir o Tutorial e Guia do Projeto"
            >
              Guia do Projeto
            </button>
          )}

          <button
            onClick={onOpenAdmin}
            className="text-[11px] font-semibold text-[#E5C158] hover:text-[#F6E27A] px-2.5 py-1 rounded bg-[#0A1730] border border-[#D4AF37]/35 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            title="Editor de Sites (Acesso Restrito)"
          >
            Admin
          </button>
        </nav>


        {/* Zone 3: Primary Action for Desktop (lg+) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="relative group overflow-hidden px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5" />
              Consulta Confidencial
            </span>
          </button>
        </div>

        {/* Mobile & Tablet Hamburger Toggle & Quick Actions */}
        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] hover:brightness-110 active:scale-95 transition-all shadow whitespace-nowrap cursor-pointer"
          >
            Consulta
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] uppercase font-bold text-[#F6E27A] bg-[#0E1F3D] border border-[#D4AF37]/50 rounded hover:bg-[#162D58] transition-colors cursor-pointer"
            title="Editor de Sites (Admin)"
          >
            Admin
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/70 text-[#F6E27A] hover:bg-[#1A365D] hover:border-[#F6E27A] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 active:scale-95 transition-all cursor-pointer shadow-lg flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            title={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#F6E27A]" /> : <Menu className="w-6 h-6 text-[#F6E27A]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070F1E] border-b border-[#D4AF37]/30 px-5 sm:px-6 py-5 space-y-4 max-h-[82vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-200">
            <a
              href="#areas-atuacao"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 flex items-center gap-2"
            >
              <span>⚖️</span>
              <span>Áreas de Atuação</span>
            </a>
            <a
              href="#selo-40-anos"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 text-[#F6E27A] font-bold flex items-center gap-2"
            >
              <span>🎖️</span>
              <span>Selo 40 Anos (1986–2026)</span>
            </a>
            <a
              href="#legado"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 flex items-center gap-2"
            >
              <span>🏛️</span>
              <span>Legado Centenário 1908</span>
            </a>
            <a
              href="#academia-leao"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 text-[#F6E27A] flex items-center gap-2"
            >
              <span>🎓</span>
              <span>Academia Leão & Palestras</span>
            </a>
            <a
              href="#solucoes-excelencia"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 flex items-center gap-2"
            >
              <span>⚡</span>
              <span>Soluções de Excelência</span>
            </a>
            <a
              href="#holding-familiar"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 text-[#F6E27A] font-semibold flex items-center gap-2"
            >
              <span>🏢</span>
              <span>Holding Familiar 4.0</span>
            </a>
            <a
              href="#head-juridico"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 flex items-center gap-2"
            >
              <span>👨‍⚖️</span>
              <span>Head Jurídico Dr. Aldo</span>
            </a>
            <a
              href="#livros"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 text-[#F6E27A] font-semibold flex items-center gap-2"
            >
              <span>📚</span>
              <span>Livros & Obras ({siteConfig.digitalBooks?.length || 6})</span>
            </a>
            <a
              href="#publicacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F6E27A] transition-colors py-1 flex items-center gap-2"
            >
              <span>📰</span>
              <span>Publicações & Artigos</span>
            </a>
            {onOpenLandingPage && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLandingPage();
                }}
                className="text-left text-xs uppercase font-black text-[#050B14] bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] p-2.5 rounded shadow cursor-pointer flex items-center gap-2"
              >
                <span>💎</span>
                <span>Landing Page Holding 4.0 (Exclusiva)</span>
              </button>
            )}
            {onOpenTutorial && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTutorial();
                }}
                className="text-left text-xs uppercase font-bold text-sky-400 py-1.5 flex items-center gap-2 cursor-pointer hover:text-sky-300"
              >
                <span>📘</span>
                <span>Guia do Projeto Exemplar</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left text-xs uppercase font-bold text-[#F6E27A] py-1.5 flex items-center gap-2 cursor-pointer hover:brightness-110"
            >
              <span>⚙️</span>
              <span>Admin (Editor de Sites)</span>
            </button>
          </nav>
          <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded text-center text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Consulta Confidencial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

