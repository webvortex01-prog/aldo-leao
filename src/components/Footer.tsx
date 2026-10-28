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
    { label: 'Legado', href: '#legado' },
    { label: 'Dr. Aldo Leão', href: '#head-juridico' },
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
        {/* Grid com Coluna Institucional e Navegação com Acesso Restrito (Itens 11, 53 e 54) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#D4AF37]/20 text-left">
          {/* Coluna 1: Conformidade Legal & Governança (Item 54: logo e texto duplicados excluídos) */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">
              Conformidade Legal & Governança Digital
            </h4>
            <p className="text-xs text-slate-400 font-sans-body leading-relaxed font-light mb-4 max-w-lg">
              Atuação jurídica estratégica pautada pela ética, segurança da informação e estrita conformidade com a LGPD e normativas do Conselho Federal da OAB.
            </p>

            {/* Links de Proteção Jurídica e Compliance (LGPD, Termos de Uso e Cookies - Item 11) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs font-semibold">
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
