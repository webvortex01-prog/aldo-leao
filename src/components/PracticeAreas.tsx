import React, { useState } from 'react';
import { Scale, ArrowRight, X, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { PracticeArea } from '../types';
import { useSite } from '../context/SiteContext';

interface PracticeAreasProps {
  onGoToLandingPage: () => void;
  onOpenConsultation: () => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({
  onGoToLandingPage,
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();
  const [selectedAreaModal, setSelectedAreaModal] = useState<PracticeArea | null>(null);

  const practiceAreas = siteConfig.practiceAreas;

  const handleAreaClick = (area: PracticeArea) => {
    if (area.isHoldingLandingLink) {
      onGoToLandingPage();
    } else {
      setSelectedAreaModal(area);
    }
  };

  const handleWhatsAppArea = (areaTitle: string) => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      `Olá Dr. Aldo Leão, gostaria de agendar uma consulta sobre ${areaTitle} com a ALDO LEÃO ADVOCACIA ESTRATÉGICA.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="areas-atuacao" className="py-20 md:py-28 bg-[#050B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>SOLUÇÕES JURÍDICAS DE ALTA PERFORMANCE</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            ÁREAS DE <span className="gold-text-gradient">ATUAÇÃO</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            Com a solidez de um legado jurídico iniciado em 1908 e a experiência de mais de quatro décadas da terceira geração
            da família na advocacia, a <strong className="text-white">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong> desenvolve
            soluções jurídicas avançadas e personalizadas, unindo inteligência estratégica, prevenção de riscos e excelência
            técnica para proteger patrimônios, fortalecer empresas e preservar legados. Nossa atuação concentra-se nas seguintes áreas:
          </p>
        </div>

        {/* 5 Cards Grid (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => {
            const isFeatured = area.isHoldingLandingLink;

            return (
              <div
                key={area.id || index}
                onClick={() => handleAreaClick(area)}
                className={`group relative rounded-xl p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer border hover:-translate-y-1.5 shadow-xl ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#0E1F3D] to-[#071122] border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]'
                    : 'bg-[#071122] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:bg-[#0B1A35]'
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/15 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <Scale className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5C158]">
                      {area.badge || `0${index + 1}`}
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
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6">
                    {area.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F6E27A] group-hover:underline inline-flex items-center gap-1.5">
                    <span>{isFeatured ? 'CONHEÇA A HOLDING 4.0' : 'SAIBA MAIS'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </span>

                  {isFeatured && (
                    <span className="text-[10px] bg-[#D4AF37] text-black px-2 py-0.5 rounded font-extrabold uppercase">
                      Destaque
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Area Modal */}
      {selectedAreaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setSelectedAreaModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                Especialidade Jurídica Estratégica
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                {selectedAreaModal.title}
              </h3>
              <p className="text-xs text-[#E5C158] mt-1 uppercase font-semibold">
                {selectedAreaModal.subtitle}
              </p>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              <p>{selectedAreaModal.description}</p>

              {/* Direct Office Contacts Box (from PDF Page 23) */}
              <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-xs uppercase font-cinzel">
                  <Phone className="w-4 h-4 text-[#E5C158]" />
                  <span>Central de Atendimento Privativo</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>Telefone Principal: <strong className="text-white">+55 (51) 998.088.998</strong></p>
                  <p>Telefone Secundário: <strong className="text-white">+55 (51) 998.078.998</strong></p>
                  <p>Atendimento Digital: <strong className="text-[#F6E27A]">Segunda a Sexta-feira em todo o Brasil</strong></p>
                </div>

                <button
                  onClick={() => {
                    handleWhatsAppArea(selectedAreaModal.title);
                    setSelectedAreaModal(null);
                  }}
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Agendar Consulta sobre {selectedAreaModal.title} no WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedAreaModal(null)}
                className="px-5 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
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
