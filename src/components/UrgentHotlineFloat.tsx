import React from 'react';
import { Scale } from 'lucide-react';

interface HotlineProps {
  onOpenConsultation?: () => void;
}

export const UrgentHotlineFloat: React.FC<HotlineProps> = () => {
  const whatsappNumber = '5551998088998';
  const whatsappMessage = encodeURIComponent(
    'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de falar com um Advogado especialista.'
  );

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-xl pointer-events-none px-1 sm:px-0">
      <div className="pointer-events-auto relative w-full bg-[#071122]/95 backdrop-blur-md border border-[#D4AF37]/70 rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-between gap-2 sm:gap-3 text-left">
        {/* Balança da Justiça em Dourado */}
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/80 flex items-center justify-center text-[#F6E27A] shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.35)]">
          <Scale className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#E5C158]" />
        </div>

        {/* Título Centralizado/Alinhado elegante e compacto */}
        <div className="flex flex-col min-w-0 flex-1 justify-center">
          <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider font-cinzel truncate">
            EXCELÊNCIA JURÍDICA DESDE 1908
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#E5C158] font-medium leading-tight truncate">
            Aldo Leão Advocacia Estratégica · Atendimento Nacional
          </span>
        </div>

        {/* Botão do WhatsApp refinado e otimizado para mobile */}
        <button
          onClick={handleWhatsApp}
          className="px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-black text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 shadow-md cursor-pointer shrink-0"
          title="Falar no WhatsApp Oficial (51 998088998)"
          aria-label="WhatsApp Oficial"
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 fill-current shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
