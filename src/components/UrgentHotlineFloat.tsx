import React, { useState } from 'react';
import { PhoneCall, MessageSquare, Shield, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface HotlineProps {
  onOpenConsultation: () => void;
}

export const UrgentHotlineFloat: React.FC<HotlineProps> = ({ onOpenConsultation }) => {
  const { siteConfig } = useSite();
  const [collapsed, setCollapsed] = useState(false);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Ol%C3%A1%20Dr.%20Aldo%20Le%C3%A3o%2C%20preciso%20de%20atendimento%20jur%C3%ADdico%20estrat%C3%A9gico%20de%20urg%C3%AAncia.`, '_blank');
  };


  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0E1F3D] border border-[#D4AF37] text-[#F6E27A] flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer"
        aria-label="Plantão 24h"
      >
        <Shield className="w-5 h-5 text-[#E5C158]" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      <div className="relative bg-[#071122]/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 text-left">
        <button
          onClick={() => setCollapsed(true)}
          className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#050B14] border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-[10px]"
          aria-label="Minimizar"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] shrink-0">
          <Shield className="w-4 h-4" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-cinzel">
              Plantão Estratégico 24h
            </span>
            <span className="text-[9px] text-[#25D366] font-semibold">Ativo</span>
          </div>
          <p className="text-[10px] text-slate-400">
            Casos urgentes com Dr. Aldo Leão
          </p>
        </div>

        <button
          onClick={handleWhatsApp}
          className="px-3 py-1.5 rounded bg-[#25D366] text-black text-xs font-semibold hover:bg-[#20ba59] transition-colors flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
