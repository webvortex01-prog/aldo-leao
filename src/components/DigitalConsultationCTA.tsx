import React from 'react';
import { ArrowRight, MessageSquare, Scale } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface DigitalConsultationCTAProps {
  onOpenConsultation: () => void;
}

export const DigitalConsultationCTA: React.FC<DigitalConsultationCTAProps> = ({
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();
  const dc = siteConfig.digitalConsultation;

  const handleWhatsApp = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de falar com um Advogado especialista e agendar uma Consulta Virtual.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#071122]">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={dc?.bgImageUrl || '/img/dr-aldo-reuniao.jpg'}
              alt="Ambiente de Atendimento Jurídico Digital Dr. Aldo Leão"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/dr-aldo-reuniao.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071122] via-[#071122]/90 to-[#071122]/70" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 max-w-3xl text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
              <span>{dc?.sectionKicker || 'ATENDIMENTO DIGITAL EM TODO O BRASIL'}</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance] animate-title-reveal">
              {dc?.sectionTitle || 'AGENDE SUA'} <span className="gold-text-gradient">{dc?.sectionHighlight || 'CONSULTA DIGITAL'}</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
              {dc?.description || 'Agende a sua Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA e descubra as soluções jurídicas avançadas e inteligentes para a sua necessidade. Nosso atendimento virtual no Brasil é realizado de forma personalizada, com segurança digital, confidencialidade e a mesma excelência do atendimento presencial.'}
            </p>

            {/* Ícones com balança da justiça e textos do Item 9 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-[#E5C158]" />
                </div>
                <span>{dc?.point1 || 'Agendamento prévio da consulta'}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-[#E5C158]" />
                </div>
                <span>{dc?.point2 || 'Consulta com hora marcada'}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="btn-gold-luxury group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                <span>{dc?.btnSchedule || 'AGENDAR CONSULTA VIRTUAL'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="btn-gold-luxury group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] transition-all cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.35)]"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>{dc?.btnWhatsApp || 'Agendar pelo WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
