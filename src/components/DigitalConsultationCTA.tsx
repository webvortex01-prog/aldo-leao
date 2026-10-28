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
    <section id="consulta-digital" className="py-20 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0E1F3D]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/45 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#071122]">
          {/* Fundo da section meio esfumaçado com a imagem de consulta virtual mais clara e com flutuação suave */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src="/img/consulta-virtual-2.jpg"
              alt="Atendimento Jurídico Digital Dr. Aldo Leão"
              className="w-full h-full object-cover object-[center_20%] opacity-65 sm:opacity-55 filter brightness-110 contrast-105 animate-smoky-float"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/dr-aldo-reuniao.jpg';
              }}
            />
            {/* Overlay esfumaçado luxury suave: escuro na esquerda pro texto, bem transparente na direita pra foto brilhar */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071122] via-[#071122]/70 to-[#071122]/20 backdrop-blur-[0.5px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071122]/80 via-transparent to-[#071122]/35" />
            <div className="absolute -top-10 right-10 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 p-6 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            {/* Coluna Texto e Ações */}
            <div className="lg:col-span-7">
              {/* Frase em dourado: ATENDIMENTO DIGITAL BRASIL (Item 57) */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3">
                <Scale className="w-3.5 h-3.5 text-[#F6E27A]" />
                <span>{dc?.sectionKicker || 'ATENDIMENTO DIGITAL BRASIL'}</span>
              </div>

              {/* Título: AGENDE SUA CONSULTA DIGITAL */}
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance] animate-title-reveal">
                {dc?.sectionTitle || 'AGENDE SUA'}{' '}
                <span className="gold-text-gradient">{dc?.sectionHighlight || 'CONSULTA DIGITAL'}</span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
                {dc?.description || 'Agende a sua Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA e descubra as soluções jurídicas avançadas e inteligentes para a sua necessidade. Nosso atendimento virtual no Brasil é realizado de forma personalizada, com segurança digital, confidencialidade e a mesma excelência do atendimento presencial.'}
              </p>

              {/* Ícones com balança da justiça e textos do Item 9 e 38 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0 shadow-md">
                    <Scale className="w-4 h-4 text-[#E5C158]" />
                  </div>
                  <span className="font-medium">{dc?.point1 || 'Agendamento prévio da consulta'}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0 shadow-md">
                    <Scale className="w-4 h-4 text-[#E5C158]" />
                  </div>
                  <span className="font-medium">{dc?.point2 || 'Consulta com hora marcada'}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="btn-gold-luxury group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <span>{dc?.btnSchedule || 'AGENDAR CONSULTA VIRTUAL'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="btn-gold-luxury group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] transition-all cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.35)]"
                >
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{dc?.btnWhatsApp || 'AGENDAR PELO WHATSAPP'}</span>
                </button>
              </div>
            </div>

            {/* Coluna Direita: Segunda imagem em moldura nobre de vidro flutuando suavemente */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#070F1E] group card-hover-interactive animate-card-float">
                <div className="aspect-[4/3] sm:aspect-[14/10] w-full overflow-hidden relative">
                  <img
                    src="/img/consulta-virtual-1.jpg"
                    alt="Dr. Aldo Leão em Consulta Digital Estratégica"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/consulta-virtual-2.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050B14]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-bold text-[#F6E27A] uppercase tracking-wider shadow-md">
                    Atendimento 100% Digital
                  </div>
                </div>

                <div className="p-4 bg-[#071122] border-t border-[#D4AF37]/30 text-center">
                  <p className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                    CONSULTA DIGITAL BRASIL
                  </p>
                  <p className="text-[11px] text-[#E5C158] font-medium mt-0.5">
                    Segurança Digital, Sigilo e Excelência Jurídica Centenária.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
