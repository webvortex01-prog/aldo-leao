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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center max-w-[95vw]">
      <div className="relative bg-[#071122]/95 backdrop-blur-md border border-[#D4AF37]/60 rounded-xl px-4 py-2.5 sm:py-3 shadow-2xl flex items-center gap-3 sm:gap-4 text-left">
        {/* Balança da Justiça em Dourado */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/70 flex items-center justify-center text-[#F6E27A] shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.3)]">
          <Scale className="w-5 h-5 text-[#E5C158]" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider font-cinzel">
              EXCELÊNCIA JURÍDICA DESDE 1908
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-[#E5C158] font-medium leading-tight">
            num legado jurídico de Três Gerações
          </p>
        </div>

        <button
          onClick={handleWhatsApp}
          className="px-3 sm:px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-black text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer shrink-0 ml-1 sm:ml-2"
          title="Falar no WhatsApp Oficial"
        >
          <svg
            className="w-4 h-4 fill-current shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden xs:inline">WhatsApp</span>
        </button>
      </div>
    </div>
  );
};

