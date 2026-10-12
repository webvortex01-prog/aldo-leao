import React from 'react';
import { Scale } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const NationalDigitalPresence: React.FC = () => {
  const { siteConfig } = useSite();
  const np = siteConfig.nationalPresence;

  return (
    <section id="presenca-nacional" className="py-20 md:py-24 bg-[#060D1A] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
              <span>ATENDIMENTO JURÍDICO DE EXCELÊNCIA EM TODO O BRASIL</span>
            </div>

            {/* Title */}
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-4.5xl font-bold text-white tracking-tight leading-tight mb-6 [text-wrap:balance]">
              PRESENÇA NACIONAL <span className="gold-text-gradient">DIGITAL</span>
            </h2>

            {/* Text from PDF */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5">
              Com sede em Porto Alegre, a <strong className="text-white font-medium">Advocacia Estratégica Dr. Aldo Leão</strong> rompe
              as fronteiras geográficas para levar a Excelência Jurídica Centenária a clientes de todo o território nacional.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5">
              Por meio de uma infraestrutura tecnológica de última geração e de processos 100% digitais, disponibilizamos uma advocacia
              estratégica moderna, segura e eficiente, proporcionando atendimento virtual com a mesma qualidade, proximidade e
              excelência do atendimento presencial.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-6">
              Nosso modelo de atuação elimina deslocamentos desnecessários, otimiza o tempo dos clientes e amplia o acesso a soluções
              jurídicas especializadas, sem abrir mão da segurança, da confidencialidade e da excelência profissional.
            </p>

            <div className="p-4 rounded-xl bg-[#09152B] border border-[#D4AF37]/30 mb-8">
              <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                EXPERIMENTE A ADVOCACIA ESTRATÉGICA DO FUTURO, HOJE.
              </p>
            </div>

            {/* Technology & Digital Service Icons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-lg bg-[#071122] border border-[#D4AF37]/30 flex items-center gap-3">
                <Scale className="w-5 h-5 text-[#E5C158] shrink-0" />
                <span className="text-xs text-slate-200 font-medium leading-snug">
                  {np?.card1Text || 'Atuação Digital no Brasil'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071122] border border-[#D4AF37]/30 flex items-center gap-3">
                <Scale className="w-5 h-5 text-[#E5C158] shrink-0" />
                <span className="text-xs text-slate-200 font-medium leading-snug">
                  {np?.card2Text || 'Infraestrutura Tecnológica de última geração'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#071122] border border-[#D4AF37]/30 flex items-center gap-3">
                <Scale className="w-5 h-5 text-[#E5C158] shrink-0" />
                <span className="text-xs text-slate-200 font-medium leading-snug">
                  {np?.card3Text || 'Comodidade, Segurança, Confidencialidade, Sigilo e Economia para cada cliente.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#071122]">
              <img
                src="/img/dr-aldo-reuniao.jpg"
                alt="Dr. Aldo Leão em Reunião e Atendimento Estratégico"
                className="w-full h-[420px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#071122]/90 backdrop-blur-md border border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A]">
                    <Scale className="w-5 h-5 text-[#E5C158]" />
                  </div>
                  <div>
                    <p className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                      Processos 100% Digitais
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Sede em Porto Alegre · Atendimento Estratégico no Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
