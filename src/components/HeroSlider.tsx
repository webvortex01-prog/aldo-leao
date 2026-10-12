import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import heroLionImg from '../assets/images/hero_lion_gold_law_1791570163709.jpg';
import { useSite } from '../context/SiteContext';

interface HeroSliderProps {
  onOpenConsultation: () => void;
  onGoToLandingPage: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenConsultation,
  onGoToLandingPage
}) => {
  const { siteConfig } = useSite();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);

  // Auto advance slide every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppSlide1 = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      'Olá Dr. Aldo Leão, gostaria de agendar uma Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-10 md:py-16 bg-[#050B14]">
      {/* Background ambient luxury lighting & fine gold grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-10 w-[650px] h-[650px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-10 w-[550px] h-[550px] bg-[#0E1F3D]/40 rounded-full blur-[160px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Slider Navigation Dots & Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(0)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === 0
                  ? 'w-10 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37]'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label="Slide 1 - Tradição Jurídica Desde 1908"
            />
            <button
              onClick={() => setCurrentSlide(1)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === 1
                  ? 'w-10 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37]'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label="Slide 2 - Planejamento Patrimonial 4.0"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="p-2 rounded-full bg-[#0A1730] border border-[#D4AF37]/35 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37] transition-all cursor-pointer"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="p-2 rounded-full bg-[#0A1730] border border-[#D4AF37]/35 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37] transition-all cursor-pointer"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SLIDE 1: Tradição Jurídica Desde 1908 */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-4">
                <span>ALDO LEÃO ADVOCACIA ESTRATÉGICA</span>
                <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
                <span>DESDE 1908</span>
              </div>

              {/* Title */}
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-bold tracking-tight text-white leading-[1.12] mb-5 [text-wrap:balance]">
                TRADIÇÃO JURÍDICA{' '}
                <span className="gold-text-gradient">DESDE 1908</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5 font-light">
                Desde 1908, o escritório de advocacia mais antigo do Brasil une tradição jurídica,
                experiência e inovação na proteção e perpetuação de legados familiares.
                Com sede em Porto Alegre e atuação digital em todo o território nacional, o{' '}
                <strong className="text-white font-medium">Dr. Aldo Leão</strong> representa a
                terceira geração da família na Advocacia Estratégica (1986), sendo referência em{' '}
                <strong className="text-[#F6E27A] font-medium">
                  Planejamento Patrimonial 4.0 via Holding Familiar, Proteção Patrimonial e Sucessão Empresarial
                </strong>.
              </p>

              <div className="p-3.5 rounded-lg bg-[#0E1F3D]/60 border border-[#D4AF37]/30 mb-6">
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                  EXCELÊNCIA JURÍDICA CENTENÁRIA EM TRÊS GERAÇÕES
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <button
                  onClick={handleWhatsAppSlide1}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <span>AGENDAR CONSULTA DIGITAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onGoToLandingPage}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs font-semibold tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <span>CONHEÇA O PLANEJAMENTO 4.0</span>
                </button>
              </div>

              {/* Box 1 (Box 2 excluído conforme item 3) */}
              <div className="w-full">
                <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#E5C158] font-bold block mb-1">
                    Excelência Jurídica Centenária
                  </span>
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white mb-1.5 uppercase">
                    ADVOCACIA ESTRATÉGICA
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                    Um legado jurídico familiar construído desde 1908, que atravessa três gerações e se traduz em
                    uma Advocacia Estratégica que integra conhecimentos multidisciplinares, planejamento e inteligência jurídica.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Visual (The Gold Lion & Lady Justice) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/40 via-[#F6E27A]/20 to-transparent rounded-2xl blur-lg opacity-70" />
                <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-[#070F1E] shadow-2xl">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#0A1424] relative">
                    <img
                      src={heroLionImg}
                      alt="Leão de Ouro e Balança da Justiça - Aldo Leão Advocacia Estratégica"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded bg-[#070F1E]/90 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Scale className="w-5 h-5 text-[#E5C158]" />
                        <div>
                          <p className="font-cinzel text-xs font-bold text-white">
                            O Escritório Mais Antigo do Brasil
                          </p>
                          <p className="text-[10px] text-slate-300">
                            1908 – 2026 · Três Gerações de Excelência
                          </p>
                        </div>
                      </div>
                      <span className="font-cinzel text-xs text-[#E5C158] font-bold tabular-nums">
                        118 Anos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: Planejamento Patrimonial 4.0 (via Holding Familiar) */}
        {currentSlide === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-fadeIn">
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-4">
                <span>{siteConfig.slide2?.eyebrow || 'HOLDING FAMILIAR'}</span>
              </div>

              {/* Title */}
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-bold tracking-tight text-white leading-[1.12] mb-5 [text-wrap:balance]">
                {siteConfig.slide2?.title || 'PLANEJAMENTO PATRIMONIAL 4.0'}
              </h1>

              {/* Callout Box 1 */}
              <div className="p-3.5 rounded-lg bg-[#0E1F3D]/80 border border-[#D4AF37]/40 mb-4">
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                  {siteConfig.slide2?.callout1 || 'QUE LEGADO VOCÊ VAI DEIXAR AOS SEUS HERDEIROS? A Alta Perda Patrimonial do Inventário ou o Planejamento Patrimonial 4.0 que evita o Inventário?'}
                </p>
              </div>

              {/* Callout Box 2 */}
              <div className="p-3 rounded-lg bg-[#071122] border border-[#D4AF37]/25 mb-6">
                <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                  {siteConfig.slide2?.callout2 || 'EVITE A ALTA PERDA PATRIMONIAL E FINANCEIRA DOS SEUS FILHOS NO INVENTÁRIO.'}
                </p>
              </div>

              {/* CTA: Only the requested PLANEJAMENTO PATRIMONIAL 4.0 button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <button
                  onClick={onGoToLandingPage}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer"
                >
                  <span>PLANEJAMENTO PATRIMONIAL 4.0</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide 2 Single Box (Box "Controle total nas mãos dos pais" excluído) */}
              <div className="w-full">
                <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 text-left">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] mb-2 uppercase">
                    {siteConfig.slide2?.boxTitle || 'O INVENTÁRIO GERA UMA ALTA PERDA PATRIMONIAL DOS HERDEIROS NO INVENTÁRIO'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                    {siteConfig.slide2?.boxText || 'O inventário gera uma Alta Perda Patrimonial e Financeira dos herdeiros em média de 40% do Patrimônio Inventário, em média, que é evitada pelo Planejamento Patrimonial 4.0, que vai aumentar por causa do aumento do ITCMD.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Slide 2 */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/60 shadow-2xl">
                  <div className="border-b border-[#D4AF37]/30 pb-3 mb-4">
                    <span className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider block">
                      {siteConfig.slide2?.rightCardTitle || 'PERDA PATRIMONIAL E FINANCEIRA DOS HERDEIROS NO INVENTÁRIO'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                    {siteConfig.slide2?.rightCardText || 'Em média a Perda Patrimonial e Financeira dos herdeiros é de 40% do Patrimônio Inventariado, a qual vai aumentar com a majoração da alíquota do ITCMD de 8% para 16% (Projeto de Resolução do Senado Federal N. 57/19), 20% (Confaz) ou 30% (Governo Federal).'}
                  </p>

                  <button
                    onClick={() => setIsCostModalOpen(true)}
                    className="w-full py-3.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer shadow-lg"
                  >
                    CUSTOS INVENTÁRIO X HOLDING FAMILIAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Tabela Comparativa de Custos (Inventário x Holding Familiar) */}
      {isCostModalOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsCostModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#071122] border border-[#D4AF37]/60 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#D4AF37]/30 flex items-center justify-between bg-gradient-to-r from-[#0E1F3D] to-[#071122]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#F6E27A]">
                  <Scale className="w-5 h-5 text-[#E5C158]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-cinzel">
                    INVENTÁRIO x HOLDING FAMILIAR
                  </h3>
                  <p className="text-[11px] text-[#E5C158]">
                    Estudo Comparativo de Custos Patrimoniais
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#050B14] border border-[#D4AF37]/40 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                A título de exemplo, consideramos um patrimônio adquirido por <strong>{siteConfig.slide2?.sampleAcquisition || 'R$ 1.000.000,00'}</strong>, com valor de mercado atual de <strong>{siteConfig.slide2?.sampleMarket || 'R$ 1.500.000,00'}</strong> (ganho de capital de {siteConfig.slide2?.sampleCapitalGain || 'R$ 500.000,00'}):
              </p>

              <div className="overflow-x-auto rounded-lg border border-[#D4AF37]/30">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0E1F3D] text-[#F6E27A] border-b border-[#D4AF37]/30">
                    <tr>
                      <th className="p-3">Etapa de Despesa</th>
                      <th className="p-3 text-red-400">Inventário Judicial</th>
                      <th className="p-3 text-[#25D366]">Holding Familiar 4.0</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D4AF37]/15 text-slate-300 bg-[#050B14]">
                    <tr>
                      <td className="p-3 font-medium">ITCMD (Alíquota Tributária)</td>
                      <td className="p-3 text-red-300">R$ 120.000,00 (8% mercado)</td>
                      <td className="p-3 text-[#25D366]">R$ 40.000,00 (4% histórico)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Custas Judiciais / Cartorárias</td>
                      <td className="p-3 text-red-300">R$ 27.000,00</td>
                      <td className="p-3 text-[#25D366]">R$ 8.000,00</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Honorários Advocatícios</td>
                      <td className="p-3 text-red-300">R$ 150.000,00 (10%)</td>
                      <td className="p-3 text-[#25D366]">R$ 85.000,00 (Planejamento)</td>
                    </tr>
                    <tr className="bg-[#0E1F3D]/60 font-bold">
                      <td className="p-3 text-white">Custo Total Estimado</td>
                      <td className="p-3 text-red-400">{siteConfig.slide2?.inventoryTotal || 'R$ 297.000,00'}</td>
                      <td className="p-3 text-[#25D366]">{siteConfig.slide2?.holdingTotal || 'R$ 133.000,00'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-between text-xs">
                <span className="text-white font-medium">Economia com a Holding Familiar:</span>
                <span className="text-[#25D366] font-bold text-sm">{siteConfig.slide2?.savingsAmount || 'R$ 164.000,00'} (correspondente a {siteConfig.slide2?.savingsPercentage || '55,21%'})</span>
              </div>
            </div>

            <div className="p-4 bg-[#050B14] border-t border-[#D4AF37]/30 flex justify-end gap-3">
              <button
                onClick={() => setIsCostModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  setIsCostModalOpen(false);
                  onGoToLandingPage();
                }}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md"
              >
                SAIBA MAIS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
