import React, { useState } from 'react';
import { Scale, ArrowRight, X, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ExcellenceSolution } from '../types';
import { useSite } from '../context/SiteContext';

interface ExcellenceSolutionsProps {
  onGoToLandingPage: () => void;
  onOpenConsultation: () => void;
}

export const ExcellenceSolutions: React.FC<ExcellenceSolutionsProps> = ({
  onGoToLandingPage,
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();
  const [selectedSolution, setSelectedSolution] = useState<ExcellenceSolution | null>(null);

  const solutions = siteConfig.excellenceSolutions;

  const handleSolutionClick = (sol: ExcellenceSolution) => {
    if (sol.isLandingLink) {
      onGoToLandingPage();
    } else if (sol.id === 'academia-leao-ferreira' || sol.title.toLowerCase().includes('academia')) {
      const el = document.getElementById('academia-leao');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setSelectedSolution(sol);
      }
    } else {
      setSelectedSolution(sol);
    }
  };

  const handleWhatsAppSolution = (solutionTitle: string) => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      `Olá Dr. Aldo Leão, gostaria de mais informações sobre ${solutionTitle} da ALDO LEÃO ADVOCACIA ESTRATÉGICA.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="solucoes-excelencia" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>INTELIGÊNCIA JURÍDICA, ESTRATÉGIA E INOVAÇÃO</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            SOLUÇÕES DE <span className="gold-text-gradient">EXCELÊNCIA</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-4">
            A <strong className="text-white">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong> desenvolve soluções jurídicas inovadoras
            que integram tradição jurídica centenária, inteligência estratégica e gestão, proporcionando proteção patrimonial e
            empresarial, segurança jurídica, eficiência organizacional e perpetuação de patrimônios, empresas e legados familiares.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans-body">
            A excelência jurídica resulta da combinação entre o conhecimento técnico centenário, experiência profissional e visão estratégica.
            Cada solução é estruturada de forma personalizada para antecipar riscos e transformar decisões jurídicas em vantagem competitiva.
          </p>
        </div>

        {/* 14 Solutions Grid (2 to 3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, index) => {
            const isFeatured = sol.isLandingLink;

            return (
              <div
                key={sol.id || index}
                onClick={() => handleSolutionClick(sol)}
                className={`group rounded-xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border hover:-translate-y-1.5 shadow-lg ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#0E1F3D] to-[#071122] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'bg-[#071122] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0B1A35]'
                }`}
              >
                <div>
                  {/* Top Bar of Box */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/15 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] group-hover:scale-105 transition-transform">
                      <Scale className="w-4 h-4" />
                    </div>
                    <span className="font-cinzel text-xs font-bold text-[#E5C158] tabular-nums">
                      {sol.number}.
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#F6E27A] transition-colors mb-1">
                    {sol.title}
                  </h3>
                  {sol.subtitle && (
                    <p className="text-[11px] font-semibold text-[#E5C158] mb-3 uppercase tracking-wide">
                      {sol.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans-body mb-5">
                    {sol.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F6E27A] group-hover:underline inline-flex items-center gap-1">
                    <span>{isFeatured ? 'CONHEÇA A HOLDING 4.0' : 'QUERO SABER MAIS'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </span>

                  {isFeatured && (
                    <span className="text-[9px] bg-[#D4AF37] text-black px-1.5 py-0.5 rounded font-extrabold uppercase">
                      Principal
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solution Detail Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                Solução de Excelência {selectedSolution.number}
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                {selectedSolution.title}
              </h3>
              {selectedSolution.subtitle && (
                <p className="text-xs text-[#E5C158] mt-1 uppercase font-semibold">
                  {selectedSolution.subtitle}
                </p>
              )}
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              <p>{selectedSolution.description}</p>
              {selectedSolution.extendedText && (
                <p className="p-3.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/25 text-slate-200">
                  {selectedSolution.extendedText}
                </p>
              )}

              {/* Special content for Gestão 4.0 or Academia Leão Ferreira */}
              {selectedSolution.id === 'gestao-juridica-40' && (
                <div className="space-y-2 pt-2">
                  <h4 className="font-cinzel text-xs font-bold text-white uppercase">
                    Diagnóstico Situacional Estratégico:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    <li>• Auditoria detalhada de informações e documentos;</li>
                    <li>• Análise jurídica especializada e profiling de riscos;</li>
                    <li>• Mapeamento de vulnerabilidades operacionais;</li>
                    <li>• Implantação de soluções estratégicas personalizadas.</li>
                  </ul>
                </div>
              )}

              {selectedSolution.id === 'academia-leao-ferreira' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#071122] border border-[#D4AF37]/30">
                    <img
                      src="/img/academia-leao.png"
                      alt="Logo Academia Leão"
                      className="w-12 h-12 object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/img/academia-leao.jpg';
                      }}
                    />
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-[#F6E27A] uppercase">
                        Centro de Estudos Jurídicos Superiores
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Órgão cultural dedicado à alta capacitação, palestras magnas e difusão doutrinária.
                      </p>
                    </div>
                  </div>
                  <a
                    href="#academia-leao"
                    onClick={() => setSelectedSolution(null)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#F6E27A] hover:underline font-bold"
                  >
                    <span>Ver Seção Completa da Academia Leão & Palestras</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-3 items-center">
              <button
                onClick={() => {
                  handleWhatsAppSolution(selectedSolution.title);
                  setSelectedSolution(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </button>

              <button
                onClick={() => setSelectedSolution(null)}
                className="w-full sm:w-auto px-6 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
