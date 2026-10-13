import React, { useState } from 'react';
import { Scale, ArrowRight, X, Phone, MessageSquare } from 'lucide-react';
import { PracticeArea } from '../types';
import { useSite } from '../context/SiteContext';

interface PracticeAreasProps {
  onGoToLandingPage: () => void;
  onOpenConsultation: () => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({
  onGoToLandingPage
}) => {
  const { siteConfig } = useSite();
  const [selectedAreaModal, setSelectedAreaModal] = useState<PracticeArea | null>(null);

  const defaultAreas: PracticeArea[] = [
    {
      id: 'holding-40',
      number: '01',
      title: 'Planejamento Patrimonial 4.0',
      subtitle: 'Proteção Patrimonial e Empresarial',
      description: 'Estruturamos soluções jurídicas avançadas e personalizadas para proteger, organizar e perpetuar patrimônios e empresas por meio do ecossistema de Holding Familiar, governança, planejamento sucessório e inteligência jurídica estratégica.',
      badge: '01',
      isHoldingLandingLink: true
    },
    {
      id: 'imobiliario',
      number: '02',
      title: 'Direito Imobiliário',
      subtitle: 'Gestão Jurídica de Imóveis',
      description: 'Atuação especializada e estratégica em due diligence, contratos, distratos, investimentos imobiliários, regularização de imóveis, incorporação e proteção patrimonial, proporcionando máxima segurança às operações.',
      badge: 'Imóveis'
    },
    {
      id: 'empresarial',
      number: '03',
      title: 'Direito Empresarial',
      subtitle: 'EMPRESARIAL',
      description: 'Soluções jurídicas empresariais estratégicas voltadas à governança corporativa, estruturação societária, prevenção de riscos, compliance, conformidade normativa e fortalecimento da segurança jurídica dos negócios.',
      badge: 'EMPRESARIAL'
    },
    {
      id: 'civil',
      number: '04',
      title: 'Direito Civil',
      subtitle: 'Contratos Estratégicos, Família e Sucessões.',
      description: 'Assessoria jurídica e advocacia estratégica em contratos de alta complexidade, distratos, responsabilidade civil, obrigações, Direito de Família e Sucessões, com foco na prevenção, segurança jurídica e perpetuação patrimonial.',
      badge: 'Direito Civil'
    },
    {
      id: 'consumo',
      number: '05',
      title: 'Relações de Consumo',
      subtitle: 'Consumidor',
      description: 'Desenvolvimento de estratégias preventivas em compliance consumerista, mitigação de riscos, prevenção de prejuízos financeiros (multas, indenizações) e adequação rigorosa das relações de consumo para empresas.',
      badge: 'Consumidor'
    }
  ];

  const practiceAreas: PracticeArea[] = siteConfig.practiceAreas && siteConfig.practiceAreas.length > 0 
    ? siteConfig.practiceAreas 
    : defaultAreas;

  const handleAreaClick = (area: PracticeArea) => {
    if (area.id === 'holding-40') {
      // Item 36: No card Planejamento Patrimonial 4.0 ao clicar em Saiba Mais abre a página Holding Familiar
      const el = document.getElementById('holding-familiar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onGoToLandingPage();
      }
    } else {
      setSelectedAreaModal(area);
    }
  };

  const handleWhatsApp = (areaTitle: string) => {
    const phone = '5551998088998';
    const text = encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de falar sobre ${areaTitle}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="areas-atuacao" className="py-20 md:py-28 bg-[#050B14] relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>SOLUÇÕES JURÍDICAS DE ALTA PERFORMANCE</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            ÁREAS DE <span className="gold-text-gradient">ATUAÇÃO</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            Com a solidez de um legado jurídico iniciado em 1908 e a experiência de mais de quatro décadas da terceira geração
            da família na advocacia, a <strong className="text-white font-medium">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong> desenvolve
            soluções jurídicas avançadas e personalizadas, unindo inteligência estratégica, prevenção de riscos e excelência
            técnica para proteger patrimônios, fortalecer empresas e preservar legados. Nossa atuação concentra-se nas seguintes áreas:
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => {
            return (
              <div
                key={area.id || index}
                onClick={() => handleAreaClick(area)}
                className="group relative rounded-xl p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer border bg-[#071122] border-[#D4AF37]/25 hover:border-[#D4AF37]/70 hover:bg-[#0B1A35] hover:-translate-y-1.5 shadow-xl text-left"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/15 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <Scale className="w-5 h-5 text-[#E5C158]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5C158]">
                      {area.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-[#F6E27A] transition-colors mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#E5C158] mb-3 uppercase tracking-wide">
                    {area.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
                    {area.description}
                  </p>
                </div>

                {/* Bottom Action: SAIBA MAIS (Item 7) */}
                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F6E27A] group-hover:underline inline-flex items-center gap-1.5">
                    <span>SAIBA MAIS</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Area Modal (Item 36: Sem "Especialidade jurídica estratégica", CENTRAL DE ATENDIMENTO, Telefones, Horário e botão "Fale Conosco") */}
      {selectedAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setSelectedAreaModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho sem "Especialidade jurídica estratégica" conforme Item 36 */}
            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">
                {selectedAreaModal.title}
              </h3>
              <p className="text-xs text-[#E5C158] mt-1 uppercase font-semibold">
                {selectedAreaModal.subtitle}
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body font-light">
              <p>{selectedAreaModal.description}</p>

              {/* Box CENTRAL DE ATENDIMENTO conforme Item 36 */}
              <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-cinzel">
                  <Phone className="w-4 h-4 text-[#E5C158]" />
                  <span>CENTRAL DE ATENDIMENTO</span>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <p>
                    <strong className="text-white">Telefones:</strong> (51) 99808-8998 e (51) 99807-8998
                  </p>
                  <p>
                    <strong className="text-[#E5C158]">Atendimento Digital Brasil:</strong> De 2ª a 6ª Feira das 08:30/11:30hs e das 13:30/18:30hs
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleWhatsApp(selectedAreaModal.title)}
                    className="px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Fale Conosco</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
