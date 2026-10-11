import React from 'react';
import { Quote } from 'lucide-react';

export const InstitutionalQuote: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#050B14] relative border-t border-[#D4AF37]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Large Gold Quote Icon */}
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mx-auto mb-8 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
          <Quote className="w-8 h-8 fill-current" />
        </div>

        {/* Primary Impact Quote */}
        <blockquote className="font-cinzel text-xl sm:text-2xl md:text-3.5xl font-bold text-white leading-relaxed mb-8 [text-wrap:balance]">
          “Patrimônios podem ser construídos em uma vida.{' '}
          <span className="gold-text-gradient">
            Legados apenas são perpetuados quando protegidos com inteligência jurídica.
          </span>”
        </blockquote>

        {/* Context Narrative */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans-body mb-8 font-light">
          Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar iniciado em 1908
          pelo Prof. Dr. Arnaldo da Silva Ferreira, dando continuidade à tradição do escritório de advocacia
          mais antigo do Brasil e consolidando mais de 40 anos de experiência profissional na advocacia estratégica brasileira.
        </p>

        {/* Signature & Brand Attributor Lockup */}
        <div className="inline-flex flex-col items-center pt-6 border-t border-[#D4AF37]/25">
          <img
            src="/img/assinatura-gold.png"
            alt="Assinatura Dr. Aldo Leão"
            className="h-11 sm:h-14 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] opacity-95 mb-3"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
            }}
          />
          <span className="font-cinzel text-lg font-bold text-white tracking-widest uppercase">
            ALDO LEÃO
          </span>
          <span className="font-cinzel text-xs font-semibold text-[#E5C158] tracking-[0.24em] uppercase mt-1">
            ADVOCACIA ESTRATÉGICA
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
            Tradição Jurídica Desde 1908 · 40 Anos de Advocacia Estratégica (1986–2026)
          </span>
        </div>
      </div>
    </section>
  );
};
