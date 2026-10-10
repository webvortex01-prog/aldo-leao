import React, { useState } from 'react';
import { Trophy, TrendingUp, ShieldCheck, ChevronRight, Scale } from 'lucide-react';
import { CaseStudy } from '../types';
import { useSite } from '../context/SiteContext';

export const CaseStudies: React.FC = () => {
  const { siteConfig } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const cases = siteConfig.caseStudies;

  const filteredCases = activeCategory === 'todos' 
    ? cases 
    : cases.filter(c => c.category === activeCategory);


  return (
    <section id="casos" className="py-20 md:py-28 bg-[#050B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-3">
              <span>Evidências de Resultado</span>
              <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
              <span>Casos Reais & Precedentes</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Histórico de <span className="gold-text-gradient">Grandes Vitórias</span>
            </h2>
          </div>

          {/* Interactive filter tabs (clean segmented controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#09152B] rounded-lg border border-[#D4AF37]/25 overflow-x-auto max-w-full">
            {[
              { id: 'todos', label: 'Todos os Casos' },
              { id: 'tributario', label: 'Tributário & CARF' },
              { id: 'patrimonial', label: 'Patrimonial' },
              { id: 'penal', label: 'Penal Econômico' },
              { id: 'societario', label: 'Societário & M&A' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="rounded-xl p-8 gold-hairline-card flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Metric Header */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#D4AF37]/20">
                  <div>
                    <span className="font-cinzel text-2xl sm:text-3xl font-extrabold gold-text-gradient tabular-nums">
                      {cs.value}
                    </span>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                      {cs.tribunal}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C158] shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                </div>

                {/* Case Title */}
                <h3 className="font-cinzel text-xl font-bold text-white mb-4">
                  {cs.title}
                </h3>

                {/* Challenge & Solution details */}
                <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans-body mb-6">
                  <div>
                    <strong className="text-[#E5C158] font-semibold block mb-0.5 uppercase text-[11px] tracking-wider">
                      O Desafio:
                    </strong>
                    <p className="text-slate-300 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <strong className="text-[#E5C158] font-semibold block mb-0.5 uppercase text-[11px] tracking-wider">
                      A Estratégia Aplicada:
                    </strong>
                    <p className="text-slate-300 leading-relaxed">{cs.solution}</p>
                  </div>
                </div>
              </div>

              {/* Result Pill-free footer */}
              <div className="pt-4 border-t border-[#D4AF37]/15 bg-[#050B14]/40 -mx-8 -mb-8 p-6 rounded-b-xl border-x-0 border-b-0">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-[#F6E27A]">
                    {cs.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Summary Metric Strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#071122] via-[#0A1730] to-[#071122] border border-[#D4AF37]/35 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F6E27A] shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-bold text-white">
                Compromisso com Resultados Mensuráveis
              </h4>
              <p className="text-xs text-slate-300">
                Mais de duas décadas resguardando a integridade jurídica e patrimonial dos maiores grupos econômicos do país.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <span className="font-cinzel text-2xl font-bold text-[#F6E27A] tabular-nums">96.4%</span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">Taxa de Resolução Favorável</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
