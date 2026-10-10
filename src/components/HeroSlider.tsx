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

  // Auto advance slide every 10 seconds
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
                  EXCELÊNCIA JURÍDICA CENTENÁRIA NA PROTEÇÃO E PERPETUAÇÃO DO SEU LEGADO.
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

              {/* 2 Decision Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/25 text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#E5C158] font-bold block mb-1">
                    Box 1: Excelência Jurídica Centenária
                  </span>
                  <h4 className="font-cinzel text-xs font-bold text-white mb-1.5 uppercase">
                    ADVOCACIA ESTRATÉGICA
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Um legado jurídico familiar construído desde 1908, que atravessa três gerações e se traduz em
                    uma Advocacia Estratégica que integra conhecimentos multidisciplinares, planejamento e inteligência jurídica.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/25 text-left">
                  <span className="text-[10px] uppercase tracking-wider text-[#E5C158] font-bold block mb-1">
                    Box 2: Planejamento Patrimonial 4.0
                  </span>
                  <h4 className="font-cinzel text-xs font-bold text-white mb-1.5 uppercase">
                    PROTEJA E PERPETUE O SEU LEGADO
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Planejamento 4.0 é uma solução jurídica estratégica que integra patrimônio, família e empresas,
                    para estruturar, em vida, soluções personalizadas de proteção patrimonial e arquitetura empresarial.
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
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-4">
                <span>PLANEJAMENTO PATRIMONIAL 4.0 (via Holding Familiar)</span>
              </div>

              {/* Title */}
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-bold tracking-tight text-white leading-[1.12] mb-5 [text-wrap:balance]">
                O ECOSSISTEMA SOCIETÁRIO QUE{' '}
                <span className="gold-text-gradient">PROTEGE E PERPETUA</span> O SEU LEGADO
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5 font-light">
                Proteja, organize e perpetue o seu legado patrimonial e empresarial com inteligência jurídica e segurança estratégica.
                A Holding Familiar é a solução jurídica de vanguarda para proteção patrimonial, sucessão empresarial e eliminação
                da elevada perda patrimonial e financeira dos herdeiros causada pelo inventário.
              </p>

              <div className="p-3.5 rounded-lg bg-[#0E1F3D]/60 border border-[#D4AF37]/30 mb-6">
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                  AGENDE HOJE A PROTEÇÃO (JURÍDICA) E A PERPETUAÇÃO DO SEU LEGADO.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                <button
                  onClick={onGoToLandingPage}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
                >
                  <span>AGENDAR DIAGNÓSTICO DE VIABILIDADE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs font-semibold tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <span>CONSULTA JURÍDICA DIGITAL</span>
                </button>
              </div>

              {/* Slide 2 Quick Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/25 text-left">
                  <h4 className="font-cinzel text-xs font-bold text-[#E5C158] mb-1 uppercase">
                    Evita Perdas de até 20% no Inventário
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Elimine a venda forçada de bens com deságio e a alta tributação do ITCMD através da transição jurídica planejada em vida.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/25 text-left">
                  <h4 className="font-cinzel text-xs font-bold text-[#E5C158] mb-1 uppercase">
                    Controle Total nas Mãos dos Pais
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Doação de cotas com usufruto vitalício, cláusulas de inalienabilidade, incomunicabilidade e voto qualificado (Golden Share).
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Slide 2 */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/50 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3 mb-4">
                    <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                      Holding Familiar 4.0
                    </span>
                    <span className="text-[11px] text-[#25D366] font-bold">
                      Economia Comprovada
                    </span>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Custo Médio do Inventário:</span>
                      <span className="text-red-400 font-bold tabular-nums">R$ 297.000,00</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Custo da Holding 4.0:</span>
                      <span className="text-[#F6E27A] font-bold tabular-nums">R$ 133.000,00</span>
                    </div>
                    <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-bold">
                      <span className="text-white">Economia Real para Herdeiros:</span>
                      <span className="text-[#25D366] text-sm tabular-nums">R$ 164.000,00 (55,21%)</span>
                    </div>
                  </div>

                  <button
                    onClick={onGoToLandingPage}
                    className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all text-center cursor-pointer shadow-lg"
                  >
                    Ver Estudo Comparativo Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
