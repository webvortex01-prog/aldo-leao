import React from 'react';
import { ArrowRight, ShieldCheck, Scale, Award } from 'lucide-react';
import heroLionImg from '../assets/images/hero_lion_gold_law_1791570163709.jpg';
import { useSite } from '../context/SiteContext';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { siteConfig } = useSite();
  const { hero } = siteConfig;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Background ambient luxury lighting */}
      <div className="absolute inset-0 bg-[#050B14] pointer-events-none">
        <div className="absolute -top-40 right-10 w-[650px] h-[650px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 left-10 w-[550px] h-[550px] bg-[#0E1F3D]/40 rounded-full blur-[160px] pointer-events-none" />
        {/* Subtle fine grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Elegant Section Kicker (Clean unboxed typography) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-5">
              <span>{hero.kicker}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-bold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]">
              {hero.titlePart1}{' '}
              <span className="gold-text-gradient">{hero.titleHighlight}</span>{' '}
              {hero.titlePart2}
            </h1>

            {/* Subtitle / Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light mb-8 font-sans-body">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded text-sm font-semibold tracking-wide text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                <span>Agendar Consulta Estratégica</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded text-sm font-medium tracking-wide text-slate-200 border border-[#D4AF37]/35 bg-[#0A1424]/60 hover:bg-[#0E1D33] hover:text-[#F6E27A] hover:border-[#D4AF37]/70 transition-all cursor-pointer"
              >
                <span>Diagnóstico de Risco Preliminar</span>
              </a>
            </div>

            {/* Trust Evidence Strip */}
            <div className="pt-8 border-t border-[#D4AF37]/20 grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {hero.oabNumber}
                </p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  Inscrição Consolidada
                </p>
              </div>

              <div>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-[#E5C158] tabular-nums">
                  {hero.yearsExperience}
                </p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  Cortes Superiores
                </p>
              </div>

              <div>
                <p className="font-cinzel text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {hero.assetsPreserved}
                </p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  Patrimônio Preservado
                </p>
              </div>
            </div>
          </div>


          {/* Right Column: Hero Visual Asset (Sculpted Golden Lion & Scales of Justice) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Outer Decorative Frame with Gold Accents */}
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Golden Ambient Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/40 via-[#F6E27A]/20 to-transparent rounded-2xl blur-lg opacity-70" />

              {/* Card Container */}
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-[#070F1E] shadow-2xl">
                {/* Visual Image with Fallback */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[5/4] w-full overflow-hidden bg-[#0A1424]">
                  <img
                    src={heroLionImg}
                    alt="Símbolo da Justiça e Leão de Ouro - Aldo Leão Advocacia Estratégica"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback visually rich container
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient Scrim for Contrast & Elegance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-85" />

                  {/* Top-Right Seal Badge */}
                  <div className="absolute top-4 right-4 bg-[#050B14]/85 backdrop-blur-md border border-[#D4AF37]/40 rounded px-3 py-1.5 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
                    <span className="font-cinzel text-[11px] font-semibold tracking-wider text-[#F6E27A] uppercase">
                      Sigilo Fiduciário
                    </span>
                  </div>

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#070F1E]/90 backdrop-blur-md border border-[#D4AF37]/25">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158]">
                          <Scale className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-cinzel text-sm font-bold text-white tracking-wide">
                            Vigilância & Combate Técnico
                          </p>
                          <p className="text-xs text-slate-300">
                            A força do leão a serviço da verdade e do direito
                          </p>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block font-cinzel text-xs text-[#E5C158] font-semibold tracking-widest uppercase">
                        Lex Regis
                      </span>
                    </div>
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
