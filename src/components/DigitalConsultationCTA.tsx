import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck, Scale, Clock } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface DigitalConsultationCTAProps {
  onOpenConsultation: () => void;
}

export const DigitalConsultationCTA: React.FC<DigitalConsultationCTAProps> = ({
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();

  const handleWhatsApp = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      'Olá Dr. Aldo Leão, gostaria de agendar uma Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#071122]">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/img/dr-aldo-reuniao.jpg"
              alt="Ambiente de Atendimento Jurídico Digital Dr. Aldo Leão"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071122] via-[#071122]/90 to-[#071122]/70" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 max-w-3xl text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
              <span>ATENDIMENTO DIGITAL EM TODO O BRASIL</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
              AGENDE SUA <span className="gold-text-gradient">CONSULTA DIGITAL</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
              Agende a sua Consulta Jurídica Digital com a <strong className="text-white font-medium">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong> e
              descubra as soluções jurídicas avançadas e inteligentes para a sua necessidade.
              Nosso atendimento virtual no Brasil é realizado de forma personalizada, com segurança digital, confidencialidade
              e a mesma excelência do atendimento presencial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <Clock className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span>Atendimento pontual com hora previamente marcada</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#E5C158] shrink-0" />
                <span>Sigilo fiduciário OAB resguardado</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                <span>AGENDAR CONSULTA DIGITAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] transition-all cursor-pointer shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Chamar no WhatsApp (51) 998088998</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
