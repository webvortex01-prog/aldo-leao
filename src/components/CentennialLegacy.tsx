import React, { useState } from 'react';
import { Landmark, Calendar, Award, BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { TimelineEvent } from '../types';

export const CentennialLegacy: React.FC = () => {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const timelineEvents = [
    {
      year: '1908',
      title: 'Fundação do Escritório',
      lawyers: ['Prof. Dr. Arnaldo da Silva Ferreira'],
      description: 'Precursor da advocacia empresarial no RS e fundador do escritório de advocacia mais antigo do Brasil.',
    },
    {
      year: '1935',
      title: 'Continuidade da Tradição',
      lawyers: ['Dr. Mário de Castilhos Ferreira', 'Dr. Ney de Castilhos Ferreira'],
      description: 'Expansão da atuação jurídica de excelência técnica e docência superior no cenário estadual.',
    },
    {
      year: '1915',
      title: 'Consolidação Institucional',
      lawyers: ['Prof. Dr. Aldo Leão Ferreira'],
      description: 'Procurador do Estado do RS e Professor Universitário, unindo a academia à prática jurídica.',
    },
    {
      year: '1986',
      title: 'Advocacia Estratégica',
      lawyers: ['Prof. Dr. Aldo Leão Ferreira Filho'],
      description: 'Início da terceira geração familiar, estruturando a moderna Advocacia Estratégica e Planejamento Patrimonial 4.0.',
    },
    {
      year: '2020',
      title: 'Presença Nacional Digital',
      lawyers: ['Aldo Leão Advocacia Estratégica'],
      description: 'Atuação 100% digital em todo o território nacional, com alta tecnologia, segurança e a mesma excelência centenária.',
    }
  ];

  return (
    <section id="legado" className="py-20 md:py-24 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3">
            <span>EXCELÊNCIA JURÍDICA FAMILIAR</span>
            <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
            <span>Desde 1908</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            O LEGADO <span className="gold-text-gradient">CENTENÁRIO</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            A história da <strong className="text-white">Aldo Leão Advocacia Estratégica</strong> começou em 1908 e atravessa
            mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente
            com a proteção dos interesses de seus clientes. Desde 1986, esse legado é conduzido pela terceira geração.
          </p>
        </div>

        {/* TIMELINE SECTION (Os 3 boxes foram excluídos conforme solicitado, mantendo a linha do tempo) */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-[#071122] p-6 sm:p-10 lg:p-12 shadow-2xl">
          {/* Timeline Milestones */}
          <div className="relative">
            {/* Horizontal Line on Desktop */}
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  {/* Year Ball */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F6E27A] via-[#E5C158] to-[#D4AF37] border-2 border-white flex items-center justify-center text-[#050B14] font-cinzel font-black text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-4 shrink-0 tabular-nums">
                    {evt.year}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-white mb-2 leading-tight uppercase font-cinzel">
                    {evt.title}
                  </h4>

                  {/* Lawyers in Bold */}
                  <div className="mb-2 space-y-0.5">
                    {evt.lawyers.map((name, i) => (
                      <p key={i} className="text-xs font-black text-[#F6E27A] tracking-tight">
                        {name}
                      </p>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans-body">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Modal Trigger */}
          <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => setHistoryModalOpen(true)}
              className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              Ler História Completa (1908 – 2026)
            </button>

            {/* Stylized Dr. Aldo Leão Signature */}
            <div className="flex items-center gap-3">
              <img
                src="/img/assinatura-gold.png"
                alt="Assinatura Dr. Aldo Leão Ferreira Filho"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] opacity-95"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Complete History Modal */}
      {historyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setHistoryModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
                Jurista de reconhecido prestígio, exerceu relevantes funções públicas e jurídicas como Advogado, Professor, Juiz Federal,
                Juiz Municipal e Delegado de Polícia, sendo o único Presidente de Honra do IARGS.
              </p>
              <p>
                <strong>Segunda Geração (1935 e 1951):</strong> Ampliou a atuação do escritório para todo o Brasil. Destacam-se o <em>Dr. Mario de Castilhos Ferreira</em>,
                o <em>Dr. Ney de Castilhos Ferreira</em> (Procurador da Fazenda Nacional e Diretor Jurídico da VARIG/RJ) e o <em>Dr. Aldo Leão Ferreira</em>
                (Procurador do Estado do RS e Professor Universitário).
              </p>
              <p>
                <strong>Terceira Geração (1986 em diante):</strong> Conduzida pelo <em>Dr. Aldo Leão Ferreira Filho</em>, unindo tradição centenária
                à inovação tecnológica da Advocacia Estratégica 4.0, especializando-se em Planejamento Patrimonial e Sucessório via Holding Familiar,
                atuando em todo o território nacional.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="px-6 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
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
