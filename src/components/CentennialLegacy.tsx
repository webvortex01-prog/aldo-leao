import React, { useState } from 'react';
import { Landmark, Calendar, Award, BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { TimelineEvent } from '../types';

export const CentennialLegacy: React.FC = () => {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const timelineEvents: TimelineEvent[] = [
    {
      year: '1908',
      generation: 'Primeira Geração',
      title: 'Fundação do Escritório',
      description: 'Prof. Dr. Arnaldo da Silva Ferreira inicia o legado jurídico familiar como precursor da advocacia empresarial no RS e fundador do escritório mais antigo do Brasil.',
      badge: 'Origem Histórica'
    },
    {
      year: '1935',
      generation: 'Segunda Geração',
      title: 'Continuidade da Tradição',
      description: 'Dr. Mario de Castilhos Ferreira e Dr. Aldo Leão Ferreira expandem a atuação no cenário jurídico estadual com excelência técnica e docência superior.',
      badge: 'Expansão Estadual'
    },
    {
      year: '1951',
      generation: 'Segunda Geração',
      title: 'Consolidação Institucional',
      description: 'Dr. Ney de Castilhos Ferreira assume como Procurador da Fazenda Nacional e Diretor Jurídico da VARIG/RJ, consolidando a projeção jurídica nacional da família.',
      badge: 'Projeção Nacional'
    },
    {
      year: '1986',
      generation: 'Terceira Geração',
      title: 'Advocacia Estratégica',
      description: 'Dr. Aldo Leão Ferreira Filho inaugura a terceira geração familiar, estruturando a moderna Advocacia Estratégica, Gestão Patrimonial e Procuradoria Pública.',
      badge: 'Advocacia 4.0'
    },
    {
      year: '2020',
      generation: 'Escritório Digital',
      title: 'Transformação Digital',
      description: 'Migração integral para o atendimento jurídico 100% digital em todo o território nacional, com alta tecnologia, segurança e a mesma excelência centenária.',
      badge: 'Presença Nacional'
    }
  ];

  return (
    <section id="legado" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>Legado Jurídico Centenário</span>
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

        {/* 3 Generations Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {/* Primeira Geração */}
          <div className="p-7 rounded-xl bg-[#071122] border border-[#D4AF37]/30 flex flex-col justify-between gold-hairline-card">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20 mb-4">
                <span className="font-cinzel text-xl font-bold text-[#F6E27A] tabular-nums">1908</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E5C158]">1ª Geração</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                O Início de uma Referência Jurídica
              </h3>
              <p className="text-xs font-semibold text-[#E5C158] mb-3">Prof. Dr. Arnaldo da Silva Ferreira</p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Fundador do escritório de advocacia mais antigo do Brasil e precursor da advocacia empresarial no Rio Grande do Sul.
                Exerceu funções como Advogado, Professor, Juiz Federal, Juiz Municipal e Delegado. Idealizador, fundador e único
                Presidente de Honra do Instituto dos Advogados do Rio Grande do Sul (IARGS).
              </p>
            </div>
          </div>

          {/* Segunda Geração */}
          <div className="p-7 rounded-xl bg-[#071122] border border-[#D4AF37]/30 flex flex-col justify-between gold-hairline-card">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20 mb-4">
                <span className="font-cinzel text-xl font-bold text-[#F6E27A] tabular-nums">1935 & 1951</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E5C158]">2ª Geração</span>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                A Expansão da Advocacia Familiar
              </h3>
              <p className="text-xs font-semibold text-[#E5C158] mb-3">Dr. Aldo, Dr. Mario e Dr. Ney de Castilhos Ferreira</p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Consolidação no cenário estadual e nacional. Dr. Ney de Castilhos Ferreira atuou como Procurador da Fazenda Nacional
                e Diretor Jurídico da VARIG/RJ. Dr. Aldo Leão Ferreira exerceu as funções de Advogado, Procurador do Estado do RS e
                Professor Universitário, aliando a academia à prática jurídica.
              </p>
            </div>
          </div>

          {/* Terceira Geração */}
          <div className="p-7 rounded-xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/50 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/30 mb-4">
                <span className="font-cinzel text-xl font-bold text-[#F6E27A] tabular-nums">1986 – 2026</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F6E27A]">3ª Geração · 40 Anos</span>
              </div>
              
              {/* Photo of Dr. Aldo */}
              <div className="mb-4 rounded-lg overflow-hidden border border-[#D4AF37]/40 aspect-[16/9] relative bg-[#060D1A]">
                <img
                  src="/img/dr-aldo-1.jpg"
                  alt="Dr. Aldo Leão Ferreira Filho - 3ª Geração (1986-2026)"
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/DrAldo.jpg.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071122] via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#071122]/90 border border-[#D4AF37]/50 text-[10px] font-bold text-[#F6E27A]">
                  40 Anos de Advocacia
                </span>
              </div>

              <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                Advocacia Estratégica 4.0
              </h3>
              <p className="text-xs font-semibold text-[#E5C158] mb-3">Dr. Aldo Leão Ferreira Filho</p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                Unindo tradição iniciada em 1908 à gestão jurídica estratégica e às modernas soluções multidisciplinares.
                Especialista nacional em Planejamento Patrimonial e Empresarial 4.0 via Holding Familiar, Procurador Municipal de 20
                municípios gaúchos, escritor e professor universitário.
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE SECTION (Template History do Decision) */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-[#071122] p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              NOSSA HISTÓRIA
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
              UMA TRAJETÓRIA DE TRÊS GERAÇÕES DEDICADAS À EXCELÊNCIA JURÍDICA
            </h3>
          </div>

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

                  {/* Generation */}
                  <span className="text-xs font-bold text-[#F6E27A] uppercase tracking-wider font-cinzel mb-1">
                    {evt.generation}
                  </span>

                  {/* Institutional Phrase */}
                  <h4 className="text-xs font-bold text-white mb-2 leading-tight">
                    {evt.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans-body">
                    {evt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Signature & Modal Trigger */}
          <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setHistoryModalOpen(true)}
                className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer"
              >
                Ler História Completa (1908 – 2026)
              </button>
            </div>

            {/* Stylized Dr. Aldo Leão Signature */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
              <img
                src="/img/assinatura-gold.png"
                alt="Assinatura Dr. Aldo Leão Ferreira Filho"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] opacity-95"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                }}
              />
              <div>
                <div className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] tracking-wider">
                  Dr. Aldo Leão Ferreira Filho
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                  Head Jurídico · Terceira Geração Familiar (1986–2026)
                </p>
              </div>
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
