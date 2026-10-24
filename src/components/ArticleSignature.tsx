import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { ArticleSignatureConfig } from '../types';

interface ArticleSignatureProps {
  publicationTitle?: string;
  customConfig?: ArticleSignatureConfig;
  previewMode?: boolean;
  className?: string;
}

export const ArticleSignature: React.FC<ArticleSignatureProps> = ({
  publicationTitle,
  customConfig,
  previewMode = false,
  className = ''
}) => {
  const { siteConfig } = useSite();

  const config: ArticleSignatureConfig = customConfig || siteConfig?.articleSignature || {
    enabled: true,
    line1: 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA',
    line1Color: '#FFFFFF',
    line2: 'Excelência Jurídica Desde 1908',
    line2Color: '#D4AF37',
    buttonText: 'AGENDAR CONSULTA',
    buttonTextColor: '#E0E6ED',
    whatsappNumber: '',
    whatsappMessage: 'Olá! Estava lendo uma publicação no portal da Aldo Leão Advocacia Estratégica e gostaria de agendar uma consulta jurídica.'
  };

  if (!config.enabled && !previewMode) {
    return null;
  }

  const line1 = config.line1 || 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA';
  const line1Color = config.line1Color || '#FFFFFF';
  const line2 = config.line2 || 'Excelência Jurídica Desde 1908';
  const line2Color = config.line2Color || '#D4AF37';
  const buttonText = config.buttonText || 'AGENDAR CONSULTA';
  const buttonTextColor = config.buttonTextColor || '#E0E6ED';

  const rawNumber = config.whatsappNumber || siteConfig?.contact?.whatsappNumber || '5551998088998';
  const cleanPhone = rawNumber.replace(/\D/g, '');

  const baseMessage = config.whatsappMessage || 'Olá! Li um artigo no portal da Aldo Leão Advocacia Estratégica e gostaria de agendar uma consulta jurídica.';
  const finalMessage = publicationTitle
    ? `${baseMessage}\n\n(Referência: "${publicationTitle}")`
    : baseMessage;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`;

  return (
    <div
      className={`relative rounded-xl p-6 sm:p-7 bg-gradient-to-b from-[#08152B] via-[#050B14] to-[#040810] border border-[#D4AF37]/45 shadow-2xl text-center overflow-hidden my-6 ${className}`}
    >
      {/* Decorative top gold hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-36 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

      {/* Subtle background ambient glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#D4AF37]/5 blur-2xl pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Linha 1: Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA */}
        <p
          className="text-xs sm:text-sm font-semibold tracking-wider uppercase leading-snug drop-shadow-sm font-sans"
          style={{ color: line1Color }}
        >
          {line1}
        </p>

        {/* Small center divider dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70 my-2" />

        {/* Linha 2: Excelência Jurídica Desde 1908 */}
        <p
          className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-wide drop-shadow-sm"
          style={{ color: line2Color }}
        >
          {line2}
        </p>

        {/* Botão de Agendamento WhatsApp */}
        <div className="mt-5">
          {previewMode ? (
            <div
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-[#0C1D38] via-[#10274B] to-[#0C1D38] border border-[#D4AF37]/70 shadow-lg cursor-default select-none"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span
                className="font-bold text-xs sm:text-sm tracking-wider uppercase font-sans"
                style={{ color: buttonTextColor }}
              >
                {buttonText}
              </span>
              <span className="text-[10px] text-slate-400 font-sans tracking-normal font-normal border-l border-slate-700/80 pl-2">
                WhatsApp
              </span>
            </div>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 group cursor-pointer text-[#050B14]"
              title="Agendar Consulta via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#050B14] fill-current group-hover:scale-110 transition-transform" />
              <span className="font-black text-xs sm:text-sm tracking-wider uppercase font-sans text-[#050B14]">
                {buttonText}
              </span>
              <span className="text-[10px] text-[#050B14]/80 font-sans tracking-normal font-bold border-l border-[#050B14]/30 pl-2">
                WhatsApp
              </span>
            </a>
          )}
        </div>

        {/* Micro footer disclaimer */}
        <p className="text-[10px] text-slate-400 font-sans mt-3.5 tracking-wide">
          Atendimento Jurídico Personalizado · Agendamento Direto
        </p>
      </div>
    </div>
  );
};
