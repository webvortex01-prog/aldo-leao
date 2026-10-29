import React, { useState } from 'react';
import { Scale, ArrowRight, X, PhoneCall, GraduationCap, CheckCircle2 } from 'lucide-react';
import { ExcellenceSolution } from '../types';
import { useSite } from '../context/SiteContext';

interface ExcellenceSolutionsProps {
  onGoToLandingPage: () => void;
  onOpenConsultation: () => void;
  onGoToAcademia?: () => void;
  onGoToGestaoJuridica?: () => void;
}

export const ExcellenceSolutions: React.FC<ExcellenceSolutionsProps> = ({
  onGoToLandingPage,
  onGoToAcademia,
  onGoToGestaoJuridica
}) => {
  const { siteConfig } = useSite();
  const [selectedSolution, setSelectedSolution] = useState<ExcellenceSolution | null>(null);
  const [isAcademiaModalOpen, setIsAcademiaModalOpen] = useState(false);

  const solutions = siteConfig.excellenceSolutions;

  const handleSolutionClick = (sol: ExcellenceSolution) => {
    if (sol.id === 'planejamento-patrimonial-40') {
      const el = document.getElementById('holding-familiar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onGoToLandingPage();
      }
    } else if (
      sol.id === 'gestao-juridica-40' || 
      sol.title.toLowerCase().includes('gestão jurídica 4.0') || 
      sol.number === '08'
    ) {
      // Ao ser clicado no card ou botão da GESTÃO JURÍDICA 4.0, abre a página oficial dedicada
      if (onGoToGestaoJuridica) {
        onGoToGestaoJuridica();
      } else {
        setSelectedSolution(sol);
      }
    } else if (sol.id === 'academia-leao-ferreira' || sol.title.toLowerCase().includes('academia') || sol.number === '14') {
      // Item VIII: ao ser clicado em "QUERO SABER MAIS" abre a página da ACADEMIA LEÃO FERREIRA
      if (onGoToAcademia) {
        onGoToAcademia();
      } else {
        setIsAcademiaModalOpen(true);
      }
    } else {
      setSelectedSolution(sol);
    }
  };

  const handleWhatsAppSolution = (solutionTitle: string) => {
    const phone = '5551998088998';
    const text = encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de saber mais sobre ${solutionTitle}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleWhatsAppPalestra = () => {
    const phone = '5551998088998';
    const text = encodeURIComponent(
      'Olá Dr. Aldo Leão, gostaria de SOLICITAR PALESTRA com a Academia Leão Ferreira.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="solucoes-excelencia" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-fade-up">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>{siteConfig.excellenceSolutionsHeader?.kicker || 'INTELIGÊNCIA JURÍDICA, ESTRATÉGIA E INOVAÇÃO'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            {siteConfig.excellenceSolutionsHeader?.title || 'SOLUÇÕES DE'}{' '}
            <span className="gold-text-gradient">{siteConfig.excellenceSolutionsHeader?.titleHighlight || 'EXCELÊNCIA'}</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-3 font-light">
            {siteConfig.excellenceSolutionsHeader?.description1 || 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas inovadoras que integram tradição jurídica centenária, inteligência estratégica e gestão, proporcionando proteção patrimonial e empresarial, segurança jurídica, eficiência organizacional e perpetuação de patrimônios, empresas e legados familiares.'}
          </p>

          {/* Item 24 & Item 26: Parágrafo 2 com a mesma fonte e o mesmo destaque do parágrafo 1 */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            {siteConfig.excellenceSolutionsHeader?.description2 || 'A excelência jurídica resulta da combinação entre o conhecimento técnico centenário, experiência profissional e visão estratégica.'}
          </p>
        </div>

        {/* 14 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, index) => {
            const staggerClasses = ['delay-75', 'delay-150', 'delay-200', 'delay-250', 'delay-300'];
            const delayClass = staggerClasses[index % staggerClasses.length];
            return (
              <div
                key={sol.id || index}
                onClick={() => handleSolutionClick(sol)}
                className={`reveal-fade-up ${delayClass} group rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border bg-[#071122] border-[#D4AF37]/25 hover:border-[#D4AF37]/65 hover:bg-[#0B1A35] hover:-translate-y-1.5 shadow-lg text-left card-hover-interactive`}
              >
                <div>
                  {/* Top Bar of Box */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/15 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] group-hover:scale-105 transition-transform">
                      <Scale className="w-4 h-4 text-[#E5C158]" />
                    </div>
                    <span className="font-cinzel text-xs font-bold text-[#E5C158] tabular-nums">
                      {sol.number}.
                    </span>
                  </div>

                  {/* Title & Subtitle com animação de abertura que fica fixa (Item 6) */}
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#F6E27A] transition-colors mb-1 animate-title-reveal">
                    {sol.title}
                  </h3>
                  {sol.subtitle && (
                    <p className="text-[11px] font-semibold text-[#E5C158] mb-3 uppercase tracking-wide">
                      {sol.subtitle}
                    </p>
                  )}

                  {/* Description com caixa escura/preta conforme Item 37 */}
                  <div className="p-3 rounded-lg bg-[#050B14] border border-[#D4AF37]/20 mb-4">
                    <p className="text-xs text-slate-300 leading-relaxed font-sans-body font-light">
                      {sol.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action: QUERO SABER MAIS */}
                <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F6E27A] group-hover:underline inline-flex items-center gap-1.5">
                    <span>QUERO SABER MAIS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solution Detail Modal com box preto para o texto (Item 37) */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                Solução Jurídica de Excelência #{selectedSolution.number}
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

            {/* Box preto para o texto conforme Item 37 e Item 26 */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 mb-6">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
                {selectedSolution.description}
              </p>
              {selectedSolution.extendedText && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mt-3 pt-3 border-t border-slate-800">
                  {selectedSolution.extendedText}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
              {(selectedSolution.number === '08' || selectedSolution.id === 'gestao-juridica-40') && onGoToGestaoJuridica && (
                <button
                  onClick={() => {
                    setSelectedSolution(null);
                    onGoToGestaoJuridica();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/50 text-[#F6E27A] text-xs font-bold uppercase tracking-wider hover:bg-[#132A52] cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Acessar Página Completa 4.0</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5C158]" />
                </button>
              )}
              <button
                onClick={() => handleWhatsAppSolution(selectedSolution.title)}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Consultar Especialista</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tela ACADEMIA LEÃO FERREIRA (Item 37 e Item 38) */}
      {isAcademiaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border-2 border-[#D4AF37]/60 shadow-2xl p-6 sm:p-10 max-h-[88vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setIsAcademiaModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-1">
                <GraduationCap className="w-4 h-4 text-[#F6E27A]" />
                <span>Centro de Produção do Conhecimento Jurídico</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                ACADEMIA LEÃO FERREIRA
              </h3>
            </div>

            {/* Texto exato solicitado no Item 37:
                "Centro de produção e difusão do conhecimento jurídico especializado de vanguarda, que reúne palestras de especialistas, a publicação de artigos e livros jurídicos digitais com o propósito de compartilhar a cultura e o conhecimento jurídico."
                Excluído "Formação, Doutrina e Liderança" */}
            <div className="p-6 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 mb-6 space-y-4">
              <p className="text-sm text-slate-200 leading-relaxed font-sans-body">
                Centro de produção e difusão do conhecimento jurídico especializado de vanguarda, que reúne palestras de especialistas, a publicação de artigos e livros jurídicos digitais com o propósito de compartilhar a cultura e o conhecimento jurídico.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed font-sans-body">
                Com base no legado centenário iniciado em 1908 e nas mais de quatro décadas de atuação do Dr. Aldo Leão, a Academia Leão Ferreira articula pesquisa doutrinária, prática forense de alto escalão e inteligência estratégica na estruturação de palestras corporativas, obras digitais e conferências magnas.
              </p>
            </div>

            {/* Diferenciais e Conteúdo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-[#0A1730] border border-[#D4AF37]/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Palestras de Especialistas e Workshops Corporativos</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0A1730] border border-[#D4AF37]/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Publicação de Artigos Jurídicos Especializados</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0A1730] border border-[#D4AF37]/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Produção de Livros Jurídicos Digitais Gratuitos</span>
              </div>
              <div className="p-4 rounded-lg bg-[#0A1730] border border-[#D4AF37]/20 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Difusão de Cultura e Inteligência Estratégica</span>
              </div>
            </div>

            {/* Botão SOLICITAR PALESTRA conforme Item 37 */}
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleWhatsAppPalestra}
                className="btn-gold-luxury group px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>SOLICITAR PALESTRA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
