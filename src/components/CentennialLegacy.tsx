import React, { useState } from 'react';
import { X, Scale } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const CentennialLegacy: React.FC = () => {
  const { siteConfig } = useSite();
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const cl = siteConfig.centennialLegacy;

  const rawEvents = cl?.events && cl.events.length > 0 ? cl.events : [
    {
      year: '1908',
      title: 'Fundação do Escritório',
      lawyers: [cl?.sub1908 || 'Prof. Dr. Arnaldo da Silva Ferreira'],
      description: 'Precursor da advocacia empresarial no RS e fundador do escritório de advocacia mais antigo do Brasil.',
    },
    {
      year: '1935',
      title: 'CONTINUIDADE DO LEGADO JURÍDICO',
      lawyers: [cl?.sub1935 || 'Dr. Mário de Castilhos Ferreira e Dr. Ney de Castilhos Ferreira'],
      description: 'Expansão da atuação jurídica de excelência técnica no cenário nacional.',
    },
    {
      year: '1951',
      title: 'Consolidação Institucional',
      lawyers: [cl?.sub1951 || 'Prof. Dr. Aldo Leão Ferreira'],
      description: 'Procurador do Estado do RS e Professor Universitário, unindo a academia à prática jurídica.',
    },
    {
      year: '1986',
      title: 'Advocacia Estratégica',
      lawyers: [cl?.sub1986 || 'Prof. Dr. Aldo Leão Ferreira Filho'],
      description: 'Início da terceira geração familiar, inovando ao estruturar a moderna Advocacia Estratégica e o Planejamento Patrimonial 4.0 (Holding Familiar).',
    },
    {
      year: '2020',
      title: 'Presença Nacional Digital',
      lawyers: [cl?.sub2026 || 'Aldo Leão Advocacia Estratégica'],
      description: 'Atuação 100% digital em todo o território nacional, com alta tecnologia, segurança e a mesma excelência centenária.',
    }
  ];

  // Garante que o último marco SEMPRE seja 2020 (Item f do dia 15/10/26)
  const timelineEvents = rawEvents.map((evt, idx) => 
    (idx === rawEvents.length - 1 || evt.title === 'Presença Nacional Digital' || evt.year === '2026')
      ? { ...evt, year: '2020' }
      : evt
  );

  return (
    <section id="legado" className="py-20 md:py-24 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: O ESCRITÓRIO DE ADVOCACIA MAIS ANTIGO DO BRASIL · DESDE 1908 (Item 31) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.24em] text-[#E5C158] font-bold mb-3 text-center">
            <span>{cl?.goldKicker || 'O ESCRITÓRIO DE ADVOCACIA MAIS ANTIGO DO BRASIL'}</span>
            <span className="text-[#D4AF37]/50 hidden sm:inline" aria-hidden="true">·</span>
            <span>{cl?.subtitle || 'DESDE 1908'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5 [text-wrap:balance]">
            <span className="text-white">O LEGADO</span>{' '}
            <span className="gold-text-gradient">CENTENÁRIO</span>
          </h2>

          {/* Texto do projeto conforme Item 31 */}
          <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            <p>
              {cl?.paragraph1 || 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.'}
            </p>
            <p>
              {cl?.paragraph2 || 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.'}
            </p>
          </div>
        </div>

        {/* TIMELINE SECTION (Item 5, 32 e 48) */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-[#071122] p-6 sm:p-10 lg:p-12 shadow-2xl mb-16">
          <div className="relative">
            {/* Horizontal Line on Desktop */}
            <div className="hidden lg:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {timelineEvents.map((evt, idx) => {
                const displayYear = (idx === 4 || evt.title?.toLowerCase().includes('presença nacional digital') || evt.year === '2026') ? '2020' : evt.year;
                return (
                <div key={idx} className="flex flex-col items-center text-center">
                  {/* Year Ball (Item f do dia 15/10/26: 2020) */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F6E27A] via-[#E5C158] to-[#D4AF37] border-2 border-white flex items-center justify-center text-[#050B14] font-cinzel font-black text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-4 shrink-0 tabular-nums">
                    {displayYear}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-white mb-2 leading-tight uppercase font-cinzel">
                    {evt.title}
                  </h4>

                  {/* Lawyers in Bold (Item 5 e 32) */}
                  <div className="mb-2 space-y-0.5">
                    {evt.lawyers.map((name, i) => (
                      <p key={i} className="text-xs font-black text-[#F6E27A] tracking-tight">
                        {name}
                      </p>
                    ))}
                  </div>

                  {/* Description em Negrito (Item 48) */}
                  <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed font-sans-body font-bold">
                    {evt.description}
                  </p>
                </div>
              );
            })}
            </div>
          </div>

          {/* Footer da Timeline: Botão Saiba Mais e Assinatura Legível Ampliada (Item 32 e 48) */}
          <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => setHistoryModalOpen(true)}
              className="btn-gold-luxury px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-md"
            >
              {cl?.buttonText || 'Saiba Mais'}
            </button>

            {/* Assinatura do Dr. Aldo Leão ampliada e centralizada (Item 32 e 48) */}
            <div className="flex items-center justify-center">
              <img
                src={cl?.signatureImageUrl || '/img/assinatura-gold.png'}
                alt="Assinatura Dr. Aldo Leão"
                className="h-20 sm:h-24 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(212,175,55,0.6)] opacity-95"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* 40 ANOS + DE EXCELÊNCIA JURÍDICA NA ADVOCACIA ESTRATÉGICA (Item 33, 34 e 49) */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-gradient-to-r from-[#071122] via-[#0B1A35] to-[#071122] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3">
              <span>{cl?.card40Kicker || 'ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA'}</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 leading-snug">
              40 ANOS + DE EXCELÊNCIA JURÍDICA NA ADVOCACIA ESTRATÉGICA
            </h3>

            {/* Texto exato conforme Item 49 */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans-body mb-8 font-normal max-w-3xl mx-auto">
              A terceira geração de advogados do escritório jurídico mais antigo do Brasil, teve início em 1986, através do <strong className="text-white font-bold">Dr. ALDO LEÃO</strong>, que consolidou a Advocacia Estratégica direcionada para a proteção patrimonial e empresarial no país, com o intuito de perpetuar legados com experiência, inteligência jurídica e serviços de vanguarda.
            </p>

            {/* Selo inserido no lugar dos dois boxes removidos (Item 34) */}
            <div className="pt-6 border-t border-[#D4AF37]/25 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-[#D4AF37] p-2 bg-[#050B14]/80 shadow-[0_0_35px_rgba(212,175,55,0.35)] flex items-center justify-center">
                <img
                  src={cl?.sealImageUrl || '/img/selo-40-anos.png'}
                  alt="Selo 40 Anos Dr. Aldo Leão"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/selode40anos.jpg.jpeg';
                  }}
                />
              </div>

              {/* Texto abaixo do selo: Dr. ALDO LEÃO · 40 ANOS DE ADVOCACIA ESTRATÉGICA (Item 34) */}
              <div className="mt-4 text-center">
                <p className="font-cinzel text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
                  Dr. ALDO LEÃO
                </p>
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] tracking-widest uppercase mt-0.5">
                  40 ANOS DE ADVOCACIA ESTRATÉGICA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete History Modal (Saiba Mais) */}
      {historyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setHistoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                Memória Histórica Centenária
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                A Trajetória da Família Leão Ferreira no Direito Brasileiro
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              <p>
                A história da <strong>Aldo Leão Advocacia Estratégica</strong> começou em 1908 e atravessa mais de um século de dedicação
                ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.
              </p>
              <p>
                <strong>Primeira Geração (1908):</strong> O legado teve início com o <em>Prof. Dr. Arnaldo da Silva Ferreira</em>,
                fundador do escritório de advocacia mais antigo do Brasil e precursor da advocacia empresarial no Rio Grande do Sul.
              </p>
              <p>
                <strong>Segunda Geração (1935 e 1951):</strong> Continuidade do legado com o <em>Dr. Mario de Castilhos Ferreira</em>,
                o <em>Dr. Ney de Castilhos Ferreira</em> e o <em>Prof. Dr. Aldo Leão Ferreira</em> (Procurador do Estado do RS e Professor Universitário).
              </p>
              <p>
                <strong>Terceira Geração (desde 1986):</strong> Conduzida pelo <em>Prof. Dr. Aldo Leão Ferreira Filho</em>, unindo tradição jurídica,
                inovação e inteligência estratégica no Planejamento Patrimonial 4.0 via Holding Familiar e advocacia de alta performance.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
