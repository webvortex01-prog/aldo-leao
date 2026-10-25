import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import heroLionImg from '../assets/images/hero_lion_gold_law_1791570163709.jpg';
import heroLionMobileImg from '../assets/images/hero_lion_gold_law_mobile.jpg';
import holdingFamilyHeroBg from '../assets/images/holding_family_hero_bg.jpg';
import holdingFamilyMobileBg from '../assets/images/holding_family_mobile.jpg';
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

  // Auto advance slide every 18 seconds (Item d do dia 15/10/26)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 18000);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppSlide1 = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de agendar uma Consulta Jurídica Digital.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-14 bg-[#050B14]">
      {/* Background Images ajustadas com versões dedicadas para Mobile (9:16) e Desktop (16:9) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Slide 1: Imagem do Leão e Balança da Justiça otimizada para Mobile e Desktop */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 0 ? 'opacity-85 sm:opacity-75' : 'opacity-0'
          }`}
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet={heroLionMobileImg} />
            <img
              src={heroLionImg}
              alt="Ambiente Jurídico Centenário"
              className="w-full h-full object-cover object-center md:object-contain md:object-right md:pr-8 filter brightness-105 contrast-105"
            />
          </picture>
        </div>

        {/* Slide 2: Imagem da Família Multigeracional com versão Mobile 9:16 e Desktop 16:9 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 1 ? 'opacity-75 sm:opacity-65' : 'opacity-0'
          }`}
        >
          <picture className="w-full h-full block">
            <source media="(max-width: 768px)" srcSet={holdingFamilyMobileBg} />
            <img
              src={holdingFamilyHeroBg}
              alt="Holding Familiar - Perpetuação do Patrimônio Familiar"
              className="w-full h-full object-cover object-center md:object-[center_20%] filter brightness-90 contrast-105"
            />
          </picture>
          {/* Película sutil para escurecer suavemente o fundo conforme pedido do RD */}
          <div className="absolute inset-0 bg-[#050B14]/35 pointer-events-none" />
        </div>

        {/* Overlays cinematográficos suaves para garantir legibilidade dos textos e máxima visibilidade das artes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/40 via-[#050B14]/80 to-[#050B14] md:bg-gradient-to-r md:from-[#050B14] md:via-[#050B14]/75 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-[#050B14]/25" />
      </div>

      {/* Background ambient luxury lighting - brilho dourado e azul nobre vibrante */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-[#0E1F3D]/60 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Slider Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide(0)}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlide === 0
                  ? 'w-12 bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                  : 'w-3 bg-slate-700/80 hover:bg-slate-500'
              }`}
              aria-label="Slide 1 - Tradição Jurídica Desde 1908"
            />
            <button
              onClick={() => setCurrentSlide(1)}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlide === 1
                  ? 'w-12 bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]'
                  : 'w-3 bg-slate-700/80 hover:bg-slate-500'
              }`}
              aria-label="Slide 2 - Planejamento Patrimonial 4.0"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="p-2.5 rounded-full bg-[#0A1730] border border-[#D4AF37]/40 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37] hover:scale-110 active:scale-95 transition-all duration-300 shadow-md cursor-pointer group"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="p-2.5 rounded-full bg-[#0A1730] border border-[#D4AF37]/40 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37] hover:scale-110 active:scale-95 transition-all duration-300 shadow-md cursor-pointer group"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Animated Slides Container */}
        <div className="relative min-h-[580px] sm:min-h-[520px] lg:min-h-[460px]">
          {/* SLIDE 1: Tradição Jurídica Desde 1908 */}
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-700 ease-in-out ${
              currentSlide === 0
                ? 'opacity-100 translate-y-0 scale-100 relative z-10 pointer-events-auto'
                : 'opacity-0 translate-y-4 scale-[0.99] absolute inset-0 pointer-events-none z-0'
            }`}
          >
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                  {/* Item 2 e 46: "ALDO LEÃO ADVOCACIA ESTRATÉGICA" em negrito e numa só linha */}
                  <div className="mb-4">
                    <span className="inline-block font-cinzel text-xs sm:text-sm font-bold tracking-[0.16em] sm:tracking-[0.24em] text-[#E5C158] uppercase">
                      ALDO LEÃO <strong className="font-black text-white">ADVOCACIA ESTRATÉGICA</strong>
                    </span>
                  </div>

                  {/* Título: TRADIÇÃO JURÍDICA DESDE 1908 (Item 3) */}
                  <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-5 [text-wrap:balance]">
                    {siteConfig.hero.titlePart1 || 'TRADIÇÃO JURÍDICA'}{' '}
                    <span className="gold-text-gradient">{siteConfig.hero.titleHighlight || 'DESDE 1908'}</span>
                  </h1>

                  {/* Descrição */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5 font-light whitespace-pre-line">
                    {siteConfig.hero.description || 'Desde 1908, o escritório de advocacia mais antigo do Brasil une tradição jurídica, experiência e inovação na proteção e perpetuação de legados familiares. Com sede em Porto Alegre e atuação digital em todo o território nacional, o Dr. Aldo Leão representa a terceira geração da família na Advocacia Estratégica (1986), sendo referência em Planejamento Patrimonial 4.0 via Holding Familiar, Proteção Patrimonial e Sucessão Empresarial.'}
                  </p>

                  {/* Box: EXCELÊNCIA JURÍDICA CENTENÁRIA EM TRÊS GERAÇÕES (Item 3) */}
                  <div className="p-3.5 rounded-lg bg-[#0E1F3D]/80 border border-[#D4AF37]/40 mb-6 shadow-md card-hover-interactive">
                    <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                      {siteConfig.hero.tagline || 'EXCELÊNCIA JURÍDICA CENTENÁRIA EM TRÊS GERAÇÕES'}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                    <button
                      onClick={handleWhatsAppSlide1}
                      className="btn-gold-luxury group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                    >
                      <span>{siteConfig.hero.cta1Text || 'AGENDAR CONSULTA DIGITAL'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    <button
                      onClick={onGoToLandingPage}
                      className="btn-secondary-luxury inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded text-xs font-semibold tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] cursor-pointer"
                    >
                      <span>{siteConfig.hero.cta2Text || 'CONHEÇA O PLANEJAMENTO 4.0'}</span>
                    </button>
                  </div>

                  {/* Box 1: ADVOCACIA ESTRATÉGICA (Box 2 excluído conforme Item 3) */}
                  <div className="w-full">
                    <div className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 text-left card-hover-interactive">
                      <span className="text-[10px] uppercase tracking-wider text-[#E5C158] font-bold block mb-1">
                        Excelência Jurídica Centenária
                      </span>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white mb-1.5 uppercase">
                        ADVOCACIA ESTRATÉGICA
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed font-sans-body">
                        Um legado jurídico familiar construído desde 1908, que atravessa três gerações e se traduz em
                        uma Advocacia Estratégica que integra conhecimentos multidisciplinares, planejamento e inteligência jurídica.
                      </p>
                    </div>
                  </div>
                </div>

            {/* Right Column Visual (Logomarca Oficial do Leão - Item b do dia 15/10/26: card abaixo do box da imagem para total visibilidade) */}
            <div className="lg:col-span-5 relative flex flex-col justify-center">
              <div className="relative w-full max-w-md lg:max-w-none mx-auto">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/60 via-[#F6E27A]/30 to-[#D4AF37]/15 rounded-2xl blur-xl opacity-85" />
                <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-[#070F1E] shadow-2xl">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#0A1424] relative flex items-center justify-center p-6">
                    <img
                      src="/img/logo.jpg"
                      alt="Aldo Leão Advocacia Estratégica"
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_14px_rgba(212,175,55,0.4)] animate-lion-breath"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/img/logo.png';
                      }}
                    />
                  </div>
                </div>

                {/* Card logo abaixo do box da logomarca totalmente visível (Item b) */}
                <div className="mt-3.5 p-3.5 rounded-xl bg-[#070F1E] border border-[#D4AF37]/45 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] shrink-0">
                      <Scale className="w-4 h-4 text-[#E5C158]" />
                    </div>
                    <div>
                      <p className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                        ALDO LEÃO ADVOCACIA ESTRATÉGICA
                      </p>
                      <p className="text-[10px] text-[#E5C158] font-bold">
                        Excelência Jurídica Desde 1908
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2: Planejamento Patrimonial 4.0 */}
          <div
            className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-700 ease-in-out ${
              currentSlide === 1
                ? 'opacity-100 translate-y-0 scale-100 relative z-10 pointer-events-auto'
                : 'opacity-0 translate-y-4 scale-[0.99] absolute inset-0 pointer-events-none z-0'
            }`}
          >
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
                  {/* Texto acima do título: HOLDING FAMILIAR em dourado sem a letra 'A' (Item c do dia 15/10/26) */}
                  <div className="text-xs uppercase tracking-[0.24em] font-bold mb-3 text-[#E5C158]">
                    {siteConfig.slide2?.eyebrow || 'HOLDING FAMILIAR'}
                  </div>

                  {/* Título: PLANEJAMENTO em branco e PATRIMONIAL 4.0 em dourado (Itens 3 e I) */}
                  <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] mb-4 [text-wrap:balance]">
                    <span className="text-white">PLANEJAMENTO </span>
                    <span className="gold-text-gradient">PATRIMONIAL 4.0</span>
                  </h1>

                  {/* Texto principal do Slide 2 conforme Item 27 */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-5 font-light">
                    <p>
                      {siteConfig.slide2?.paragraph1 || 'Proteja, organize e perpetue o seu legado com a inteligência jurídica e a segurança estratégica de nossos especialistas.'}
                    </p>
                    <p>
                      <strong className="text-[#F6E27A] font-semibold">A Holding Familiar</strong> é a solução jurídica de vanguarda para a proteção do patrimônio e da/s empresa/s, com vistas à sua perpetuação.
                    </p>
                    <p>
                      {siteConfig.slide2?.paragraph3 || 'Com expertise centenária, a ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve avançadas modelagens empresariais e patrimoniais personalizadas para você e sua família.'}
                    </p>
                    <p>
                      {siteConfig.slide2?.paragraph4 || 'Agende hoje, o seu Diagnóstico de Viabilidade e saiba porque o Planejamento Patrimonial 4.0 via Holding Familiar é a solução jurídica inteligente e eficaz para a perpetuação do seu legado.'}
                    </p>
                  </div>

                  {/* Box do Slide 2 conforme Item 3 e 27 */}
                  <div className="p-3.5 rounded-lg bg-[#0E1F3D]/80 border border-[#D4AF37]/40 mb-6 shadow-md card-hover-interactive">
                    <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] tracking-wider uppercase">
                      {siteConfig.slide2?.callout1 || 'QUE LEGADO VOCÊ VAI DEIXAR AOS SEUS HERDEIROS? A Alta Perda Patrimonial do Inventário ou o Planejamento Patrimonial 4.0 que evita o Inventário?'}
                    </p>
                  </div>

                  {/* Botão "Planejamento Patrimonial 4.0" que abre a landing page (Item 3 & 27) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                    <button
                      onClick={onGoToLandingPage}
                      className="btn-gold-luxury group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                    >
                      <span>{siteConfig.slide2?.buttonText || 'Planejamento Patrimonial 4.0'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Right Column Slide 2: Card de Custos e Foto de Dr. Aldo com 2 pessoas com card abaixo (Item c do dia 15/10/26) */}
                <div className="lg:col-span-5 relative flex flex-col gap-4 justify-center">
                  {/* Card Comparativo de Custos */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/60 shadow-2xl text-left card-hover-interactive">
                    <div className="border-b border-[#D4AF37]/30 pb-3 mb-3">
                      <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider leading-snug">
                        COMPARATIVO DE CUSTOS: INVENTÁRIO X HOLDING FAMILIAR
                      </h3>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed mb-4 font-normal">
                      Você sabia que o processo de Inventário acarreta aos seus herdeiros uma Alta Perda Patrimonial e Financeira que é evitada pelo PLANEJAMENTO PATRIMONIAL 4.0?
                    </p>

                    <button
                      onClick={() => setIsCostModalOpen(true)}
                      className="btn-gold-luxury w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-center cursor-pointer shadow-lg"
                    >
                      VER OS CUSTOS
                    </button>
                  </div>

                  {/* Foto Holding Familiar - Planejamento Patrimonial 4.0 (Aparece integralmente) */}
                  <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-[#070F1E] shadow-2xl card-hover-interactive">
                    <div className="aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden bg-[#0A1424] relative flex items-center justify-center p-2">
                      <img
                        src="/img/holding-familiar-1.jpg"
                        alt="Holding Familiar - Planejamento Patrimonial 4.0"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/img/holding-familiar-1.jpg';
                        }}
                      />
                    </div>
                  </div>

                  {/* Card com a balança e os textos logo abaixo do box da foto (Item c) */}
                  <div className="p-3.5 rounded-xl bg-[#070F1E] border border-[#D4AF37]/50 flex items-center gap-3 text-left shadow-xl">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] shrink-0">
                      <Scale className="w-4 h-4 text-[#E5C158]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-cinzel text-[11px] sm:text-xs font-bold text-white uppercase leading-snug">
                        O PLANEJAMENTO 4.0 EVITA A PERDA PATRIMONIAL DOS HERDEIROS NO INVENTÁRIO
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#E5C158] font-bold mt-0.5">
                        VOCÊ JÁ FEZ O SEU PLANEJAMENTO PATRIMONIAL 4.0?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

      {/* Modal Tabela Comparativa de Custos Completa (Inventário x Holding Familiar) */}
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
                  <h3 className="text-sm sm:text-base font-bold text-white font-cinzel">
                    INVENTÁRIO x HOLDING FAMILIAR
                  </h3>
                  <p className="text-[11px] text-[#E5C158]">
                    Tabela Comparativa de Custos Patrimoniais
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCostModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#050B14] border border-[#D4AF37]/40 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-left">
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                A título de exemplo, consideramos um patrimônio adquirido por <strong>{siteConfig.slide2?.sampleAcquisition || 'R$ 1.000.000,00'}</strong>, com valor de mercado atual de <strong>{siteConfig.slide2?.sampleMarket || 'R$ 1.500.000,00'}</strong>, tem um ganho de capital de <strong>{siteConfig.slide2?.sampleCapitalGain || 'R$ 500.000,00'}</strong>:
              </p>

              <div className="overflow-x-auto rounded-lg border border-[#D4AF37]/35">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead className="bg-[#0E1F3D] text-white font-cinzel border-b border-[#D4AF37]/30">
                    <tr>
                      <th className="py-3 px-4 uppercase tracking-wider text-slate-300">DESPESA</th>
                      <th className="py-3 px-4 text-center bg-red-950/40 border-x border-[#D4AF37]/20 uppercase tracking-wider text-red-300">
                        Processo de Inventário
                      </th>
                      <th className="py-3 px-4 text-center bg-[#D4AF37]/20 uppercase tracking-wider text-[#F6E27A] font-bold">
                        Holding Familiar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-sans-body bg-[#050B14]">
                    <tr>
                      <td className="py-3 px-4 text-slate-200">ITCD / ITCMD</td>
                      <td className="py-3 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                        R$ 75.000,00 (5%)
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold text-white bg-[#D4AF37]/10">
                        R$ 60.000,00 (4%)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-200">Honorários Advocatícios</td>
                      <td className="py-3 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                        R$ 120.000,00 (8%)
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold text-white bg-[#D4AF37]/10">
                        R$ 70.000,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-200">Custas de Cartório</td>
                      <td className="py-3 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                        R$ 12.000,00
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold text-[#25D366] bg-[#D4AF37]/10">
                        R$ 0,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-200">Certidões</td>
                      <td className="py-3 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                        R$ 3.000,00
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold text-[#25D366] bg-[#D4AF37]/10">
                        R$ 0,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-200">I.R. Ganho de Capital</td>
                      <td className="py-3 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                        R$ 75.000,00
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold text-[#25D366] bg-[#D4AF37]/10">
                        R$ 0,00
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-200">Registro de Imóveis</td>
                      <td className="py-3 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                        R$ 12.000,00
                      </td>
                      <td className="py-3 px-4 text-center tabular-nums font-semibold text-white bg-[#D4AF37]/10">
                        R$ 3.000,00
                      </td>
                    </tr>
                    <tr className="border-t-2 border-[#D4AF37]/50 font-bold text-sm bg-[#0E1F3D]/70">
                      <td className="py-3.5 px-4 text-white uppercase font-cinzel text-sm">Custo Total</td>
                      <td className="py-3.5 px-4 text-center tabular-nums text-red-400 bg-red-950/40 border-x border-[#D4AF37]/20 text-sm sm:text-base">
                        R$ 297.000,00
                      </td>
                      <td className="py-3.5 px-4 text-center tabular-nums text-[#F6E27A] bg-[#D4AF37]/25 text-base sm:text-lg">
                        R$ 133.000,00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0E1F3D] to-[#071122] border border-[#D4AF37]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#E5C158] font-bold block">
                    Economia com a Holding Familiar
                  </span>
                  <span className="text-[11px] text-slate-300">Preservação patrimonial e liquidez garantida</span>
                </div>
                <div className="text-right">
                  <span className="font-cinzel text-xl sm:text-2xl font-black text-[#25D366] block tabular-nums">
                    R$ 164.000,00
                  </span>
                  <span className="text-xs text-white font-semibold block">
                    correspondente a 55,21%
                  </span>
                </div>
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
