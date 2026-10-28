import React from 'react';
import { Logo } from './Logo';
import { useSite } from '../context/SiteContext';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../utils/phoneUtils';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenTutorial?: () => void;
  onOpenLandingPage?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenTerms?: () => void;
  onOpenOabDisclaimer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenOabDisclaimer,
}) => {
  const { siteConfig } = useSite();
  const c = siteConfig.contact;
  const f = siteConfig.footer;

  const officialWhatsApp = getCleanWhatsAppDigits(c?.whatsappNumber, '5551998088998');

    const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Presença Nacional Digital', href: '#presenca-nacional' },
    { label: 'Legado Centenário', href: '#legado' },
    { label: 'Dr. Aldo Leão', href: '#head-juridico' },
    { label: 'Áreas de Atuação', href: '#areas-atuacao' },
    { label: 'Soluções de Excelência', href: '#solucoes-excelencia' },
    { label: 'Consulta Digital', href: '#consulta-digital' },
    { label: 'Planejamento Patrimonial 4.0', href: '#holding-familiar' },
    { label: 'Publicações Jurídicas', href: '#publicacoes' },
    { label: 'Livros Digitais', href: '#livros' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#03060C] text-slate-400 border-t border-[#D4AF37]/20 pt-12 pb-10 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navegação na Ordem Rigorosa do Projeto */}
        <div className="pb-8 border-b border-[#D4AF37]/20">
          <div className="flex items-center justify-between mb-4 border-b border-[#D4AF37]/30 pb-2">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
              Navegação Institucional
            </h4>
            <span className="text-[10px] text-[#E5C158] uppercase font-bold tracking-widest hidden sm:inline">
              Aldo Leão Advocacia Estratégica
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-sans-body">
            {navLinks.map((link) => (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="hover:text-[#F6E27A] transition-colors block py-0.5 text-slate-300 font-medium"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Nota de Direitos Autorais Simplificada e Direta Conforme Itens 11, XI e 60 */}
        <div className="pt-8 pb-4 text-center max-w-4xl mx-auto space-y-2">
          <p className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            © 1908 – 2026 ALDO LEÃO ADVOCACIA ESTRATÉGICA
          </p>
          <p className="font-cinzel text-[11px] sm:text-xs font-bold text-[#E5C158] uppercase tracking-widest">
            TODOS OS DIREITOS AUTORAIS RESERVADOS
          </p>
        </div>
      </div>
    </footer>
  );
};
