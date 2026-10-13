import React from 'react';
import { Scale } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const NationalDigitalPresence: React.FC = () => {
  const { siteConfig } = useSite();
  const np = siteConfig.nationalPresence;

  return (
    <section id="presenca-nacional" className="py-20 md:py-24 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 text-left">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
              <span>{np?.kicker || 'ATENDIMENTO JURÍDICO DE EXCELÊNCIA EM TODO O BRASIL'}</span>
            </div>

            {/* Title */}
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-4.5xl font-bold text-white tracking-tight leading-tight mb-6 [text-wrap:balance]">
              {np?.title || 'PRESENÇA NACIONAL'}{' '}
              <span className="gold-text-gradient">{np?.titleHighlight || 'DIGITAL'}</span>
            </h2>

            {/* Text from Config */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5 font-light">
              {np?.paragraph1 || 'Com sede em Porto Alegre, a Advocacia Estratégica Dr. Aldo Leão rompe as fronteiras geográficas para levar a Excelência Jurídica Centenária a clientes de todo o território nacional.'}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5 font-light">
              {np?.paragraph2 || 'Por meio de uma infraestrutura tecnológica de última geração e de processos 100% digitais, disponibilizamos uma advocacia estratégica moderna, segura e eficiente, proporcionando atendimento virtual com a mesma qualidade, proximidade e excelência do atendimento presencial.'}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
              {np?.paragraph3 || 'Nosso modelo de atuação elimina deslocamentos desnecessários, otimiza o tempo dos clientes e amplia o acesso a soluções jurídicas especializadas, sem abrir mão da segurança, da confidencialidade e da excelência profissional.'}
            </p>

            <div className="p-4 rounded-xl bg-[#09152B] border border-[#D4AF37]/30 mb-8">
              <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                {np?.quoteBox || 'EXPERIMENTE A ADVOCACIA ESTRATÉGICA DO FUTURO, HOJE.'}
              </p>
            </div>

            {/* Três boxes pequenos com a balança da justiça em dourado (Item 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-[#E5C158]" />
                </div>
                <span className="text-xs text-slate-200 font-medium leading-snug">
                  {np?.card1Text || 'Atuação Digital no Brasil'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-[#E5C158]" />
                </div>
                <span className="text-xs text-slate-200 font-medium leading-snug">
                  {np?.card2Text || 'Infraestrutura Tecnológica de última geração'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 flex items-start gap-3 shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4 text-[#E5C158]" />
                </div>
                <span className="text-xs text-slate-200 font-medium leading-snug">
                  {np?.card3Text || 'Comodidade, Segurança, Confidencialidade, Sigilo e Economia para cada cliente.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mapa do Brasil com inscrição Presença Nacional Digital (Item 30) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-gradient-to-b from-[#09152B] via-[#071122] to-[#050B14] p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Inscrição Superior */}
              <div className="w-full border-b border-[#D4AF37]/25 pb-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider font-cinzel">
                    {np?.badgeStatus || 'Atendimento 100% Digital Ativo'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{np?.badgeStates || '27 Estados'}</span>
              </div>

              {/* Imagem Oficial da Presença Nacional Digital enviada */}
              <div className="relative w-full overflow-hidden rounded-xl border border-[#D4AF37]/40 shadow-inner bg-[#050B14] my-2 group">
                <img
                  src={np?.mapImageUrl || '/presencadigital.jpeg'}
                  alt="Presença Nacional Digital - Aldo Leão Advocacia Estratégica"
                  className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes('presencadigital.jpeg')) {
                      target.src = '/presencadigital.jpeg';
                    }
                  }}
                />
              </div>

              {/* Inscrição Principal Solicitada no Item 30 */}
              <div className="w-full mt-4 pt-4 border-t border-[#D4AF37]/30 text-center">
                <p className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider uppercase">
                  Presença Nacional Digital
                </p>
                <p className="text-xs text-[#E5C158] font-medium mt-1">
                  Atuação Estratégica em Todo o Brasil com Sede em Porto Alegre
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
