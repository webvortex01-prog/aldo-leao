import React from 'react';
import { Logo } from './Logo';
import { Lock } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../utils/phoneUtils';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenTutorial?: () => void;
  onOpenLandingPage?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { siteConfig } = useSite();
  const c = siteConfig.contact;
  const f = siteConfig.footer;

  const officialWhatsApp = getCleanWhatsAppDigits(c?.whatsappNumber, '5551998088998');

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Presença Digital', href: '#presenca-nacional' },
    { label: 'Legado', href: '#legado' },
    { label: 'Head Jurídico', href: '#head-juridico' },
    { label: 'Atuação', href: '#areas-atuacao' },
    { label: 'Serviços', href: '#solucoes-excelencia' },
    { label: 'Planejamento', href: '#holding-familiar' },
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
        {/* Grid Principal com 3 Colunas Estruturadas conforme Item 14 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/20 text-left">
          {/* Coluna 1: Logo e Texto Institucional do Projeto (Item 14) */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans-body leading-relaxed font-light mb-4">
              {f?.institutionalParagraph1 || 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.'}
            </p>
            <p className="text-xs text-[#E5C158] font-medium leading-relaxed font-sans-body">
              {f?.institutionalParagraph2 || 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.'}
            </p>
          </div>

          {/* Coluna 2: Navegação na Ordem Rigorosa do Projeto e Link ACESSO RESTRITO (Item 14 e 16) */}
          <div className="md:col-span-3">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-sans-body">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-[#F6E27A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-xs font-bold text-[#E5C158] hover:text-[#F6E27A] flex items-center gap-1.5 cursor-pointer uppercase transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>ACESSO RESTRITO</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: ESCRITÓRIO DIGITAL BRASIL conforme Item 14 */}
          <div className="md:col-span-4">
            <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2">
              ESCRITÓRIO DIGITAL BRASIL
            </h4>
            <div className="space-y-3 text-xs text-slate-300 font-sans-body font-light">
              <div>
                <strong className="text-white block font-medium">Porto Alegre:</strong>
                <span>{c?.addressPortoAlegre || 'Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, CEP 90440-011'}</span>
              </div>

              <div>
                <strong className="text-white block font-medium">Telefones:</strong>
                <p>{cleanAndFormatPhone(c?.phonePrimary, '(51) 99808-8998')} e {cleanAndFormatPhone(c?.phoneSecondary, '(51) 99807-8998')}</p>
              </div>

              <div>
                <strong className="text-white block font-medium">WhatsApp Oficial:</strong>
                <a
                  href={`https://wa.me/${officialWhatsApp}?text=Ol%C3%A1%20ALDO%20LE%C3%83O%20ADVOCACIA%20ESTRAT%C3%89GICA%2C%20gostaria%20de%20falar%20com%20um%20Advogado%20especialista.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-semibold hover:underline"
                >
                  {cleanAndFormatPhone(c?.phonePrimary, '(51) 99808-8998')}
                </a>
              </div>

              <div>
                <strong className="text-white block font-medium">E-mails:</strong>
                <p>{c?.emailHolding || c?.emailPrimary || 'aldoleaoadvocacia@gmail.com'}</p>
                <p>{c?.emailAcademia || c?.emailSecondary || 'aldoleao.planejamento@gmail.com'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            {f?.copyrightText || `© ${new Date().getFullYear()} Aldo Leão Advocacia Estratégica · Tradição Jurídica Centenária Desde 1908. Todos os direitos reservados.`}
          </p>
          <p className="max-w-xl text-center md:text-right">
            {f?.oabComplianceText || 'Provimento nº 205/2021 do Conselho Federal da OAB · Inscrição OAB/RS 22.418.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
