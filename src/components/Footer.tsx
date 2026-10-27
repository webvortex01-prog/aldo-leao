import React from 'react';
import { Logo } from './Logo';
import { Lock } from 'lucide-react';
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
    { label: 'Legado', href: '#legado' },
    { label: 'Head Jurídico', href: '#head-juridico' },
    { label: 'Atuação', href: '#areas-atuacao' },
    { label: 'Soluções de Excelência', href: '#solucoes-excelencia' },
    { label: 'Consulta Digital', href: '#consulta-digital' },
    { label: 'Planejamento Patrimonial', href: '#holding-familiar' },
    { label: 'Publicações', href: '#publicacoes' },
    { label: 'Livros', href: '#livros' },
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
    <footer className="bg-[#03060C] text-slate-400 border-t border-[#D4AF37]/20 pt-16 pb-12 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid com Coluna Institucional e Navegação com Acesso Restrito (Itens 11 e XI) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#D4AF37]/20 text-left">
          {/* Coluna 1: Logo e Texto Institucional do Projeto (Item 14 e 48) */}
          <div className="md:col-span-7 flex flex-col justify-start">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans-body leading-relaxed font-light mb-4">
              {f?.institutionalParagraph1 || 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.'}
            </p>
            <p className="text-xs text-[#E5C158] font-medium leading-relaxed font-sans-body mb-4">
              {f?.institutionalParagraph2 || 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.'}
            </p>

            {/* Links de Proteção Jurídica e Compliance (LGPD, Termos de Uso e Cookies - Item 11) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-semibold">
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-[#E5C158] hover:text-[#F6E27A] hover:underline underline-offset-2 transition-colors cursor-pointer text-left"
              >
                🔒 Política de Privacidade (LGPD)
              </button>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <button
                type="button"
                onClick={onOpenTerms}
                className="text-[#E5C158] hover:text-[#F6E27A] hover:underline underline-offset-2 transition-colors cursor-pointer text-left"
              >
                ⚖️ Termos de Uso e Cookies
              </button>
            </div>
          </div>

          {/* Coluna 2: Navegação na Ordem Rigorosa do Projeto e Link ACESSO RESTRITO (Itens 11, 14, 44 e 60) */}
          <div className="md:col-span-5">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2">
              Navegação
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans-body">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-[#F6E27A] transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-2 border-t border-[#D4AF37]/15">
              <button
                onClick={onOpenAdmin}
                className="text-xs font-bold text-[#E5C158] hover:text-[#F6E27A] flex items-center gap-1.5 cursor-pointer uppercase transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>CADEADO ACESSO RESTRITO</span>
              </button>
            </div>
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
