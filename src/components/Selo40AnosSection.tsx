import React, { useState } from 'react';
import { Award, ShieldCheck, Scale, Sparkles, CheckCircle2, Calendar, FileText, ArrowRight, Eye, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface Selo40AnosSectionProps {
  onOpenConsultation?: () => void;
}

export const Selo40AnosSection: React.FC<Selo40AnosSectionProps> = ({ onOpenConsultation }) => {
  const { siteConfig } = useSite();
  const [modalOpen, setModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      'Olá Dr. Aldo Leão, parabéns pelo marco dos 40 Anos de Advocacia! Gostaria de agendar uma Consulta Digital com o escritório.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const pillars = [
    {
      icon: Scale,
      title: 'Solidez e Precedentes Notórios',
      desc: 'Quatro décadas de prática forense ininterrupta perante os mais elevados tribunais do país (TJRS, TRF4, STJ e STF), construindo precedentes com segurança jurídica irretocável.'
    },
    {
      icon: ShieldCheck,
      title: 'Segurança & Perpetuidade Patrimonial',
      desc: 'Mais de 40 anos protegendo famílias patriarcais e grupos empresariais contra deságios de inventário, litígios sucessórios e oscilações do cenário tributário nacional.'
    },
    {
      icon: Award,
      title: 'Tradição Familiar da 3ª Geração',
      desc: 'Iniciada em 1986 pelo Dr. Aldo Leão Ferreira Filho, dando continuidade direta à história inaugurada em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira (118 anos de legado).'
    },
    {
      icon: Sparkles,
      title: 'Inovação e Advocacia Estratégica 4.0',
      desc: 'Da advocacia tradicional em 1986 à vanguarda da Holding Familiar e atendimento 100% digital com alcance em todo o Brasil e total confidencialidade.'
    }
  ];

  return (
    <section id="selo-40-anos" className="py-20 md:py-28 bg-[#040810] relative border-t border-[#D4AF37]/30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0E1F3D]/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1F3D]/80 border border-[#D4AF37]/40 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-bold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Award className="w-4 h-4 text-[#F6E27A]" />
            <span>Marco Histórico Institucional</span>
            <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
            <span>1986 – 2026</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            O SELO DE <span className="gold-text-gradient">40 ANOS</span> DE ADVOCACIA
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            Uma chancela comemorativa que celebra quatro décadas de liderança jurídica ininterrupta,
            ética inabalável e dedicação integral à defesa de patrimônios e famílias no Brasil.
          </p>
        </div>

        {/* Hero Banner Grid: The Official Seal & The Meaning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Official 40 Years Seal Visual Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none group">
              {/* Gold Ambient Glow behind seal */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/40 via-[#F6E27A]/20 to-[#D4AF37]/40 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_15px_50px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#0B1A35] via-[#071122] to-[#040A14]">
                {/* Official 40 Years Seal Image (Clean Transparent PNG) */}
                <div className="relative aspect-[16/10] sm:aspect-[1.8/1] flex items-center justify-center p-6 sm:p-8 bg-radial from-[#152544]/60 via-[#071122] to-[#040810] overflow-hidden">
                  {/* Ambient gold glow halo */}
                  <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none" />

                  <img
                    src={siteConfig.centennialLegacy?.sealImageUrl || '/img/selo-40-anos.png'}
                    alt="Selo Comemorativo de 40 Anos de Advocacia - Dr. Aldo Leão (1986-2026)"
                    className="relative max-h-full max-w-full object-contain filter drop-shadow-[0_12px_30px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/selo-40-anos.jpg';
                    }}
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#071122]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider text-[#F6E27A] flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
                    <span>Chancela Exclusiva 1986–2026</span>
                  </div>

                  {/* Button to inspect seal */}
                  <button
                    onClick={() => setModalOpen(true)}
                    className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-lg bg-[#071122]/90 hover:bg-[#0E1F3D] backdrop-blur-md border border-[#D4AF37]/50 text-[11px] font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-lg hover:border-[#F6E27A]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#F6E27A]" />
                    <span>Ampliar Selo</span>
                  </button>
                </div>

                {/* Sub-bar below the seal */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#071122] via-[#091528] to-[#071122] border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div>
                    <p className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                      DR. ALDO LEÃO FERREIRA FILHO
                    </p>
                    <p className="text-[11px] text-[#E5C158] font-semibold uppercase tracking-wider">
                      40 Anos de Advocacia Estratégica (1986 – 2026)
                    </p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-xs font-bold text-[#F6E27A] font-cinzel">
                    4 Décadas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative on the Meaning and Importance of the Seal */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              A IMPORTÂNCIA DESTE MARCO
            </span>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
              Por que o Selo de 40 Anos Representa a <span className="text-[#F6E27A]">Máxima Segurança</span> para o seu Patrimônio?
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
              <p>
                No universo jurídico, <strong className="text-white font-medium">tempo de carreira não é apenas um número: é o mais rigoroso teste de solidez e reputação</strong>.
                Ao longo de quatro décadas (1986–2026), o Dr. Aldo Leão atravessou as maiores transformações econômicas e institucionais da história contemporânea do Brasil —
                da redemocratização e promulgação da Constituição de 1988 ao Código Civil de 2002 e à recente Reforma Tributária (EC 132/2023).
              </p>
              <p>
                Este selo comemorativo simboliza a certeza de que a governança da sua família e a blindagem dos seus negócios
                estão sob a tutela de quem <strong className="text-[#F6E27A] font-medium">já vivenciou e superou todas as variações de jurisprudência nos tribunais superiores</strong>,
                assegurando que nenhuma estrutura patrimonial seja vulnerável a experimentos jurídicos ou teses frágeis.
              </p>
            </div>

            {/* Signature lockup */}
            <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-between gap-4">
              <div>
                <img
                  src="/img/assinatura-gold.png"
                  alt="Assinatura Oficial Dr. Aldo Leão"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] opacity-95"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                  }}
                />
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                  Chancela Autêntica · Dr. Aldo Leão Ferreira Filho
                </p>
              </div>

              <button
                onClick={handleWhatsApp}
                className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer shadow-md shrink-0 flex items-center gap-1.5"
              >
                <span>Falar com o Jurista</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of the 40-Year Seal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#071122] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal to view Seal in Full Details */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/70 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold">
                1986 – 2026 · QUATRO DÉCADAS DE ADVOCACIA
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                Selo Oficial Comemorativo dos 40 Anos
              </h3>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/50 mb-6 bg-radial from-[#152544] via-[#0A1424] to-[#040810] p-6 flex items-center justify-center">
              <img
                src="/img/selo-40-anos.png"
                alt="Selo Comemorativo dos 40 Anos de Advocacia do Dr. Aldo Leão"
                className="max-h-[500px] max-w-full object-contain filter drop-shadow-[0_15px_40px_rgba(212,175,55,0.5)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/selo-40-anos.jpg';
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed font-sans-body mb-6">
              <div className="p-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/25">
                <h5 className="font-cinzel font-bold text-[#F6E27A] mb-1.5 uppercase">
                  O Significado das Quatro Décadas
                </h5>
                <p>
                  Representa a maturidade institucional que somente 40 anos de causas complexas, defesas tributárias
                  e planejamento de holdings familiares podem outorgar a um jurista.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/25">
                <h5 className="font-cinzel font-bold text-[#F6E27A] mb-1.5 uppercase">
                  A Continuidade Geracional
                </h5>
                <p>
                  A união da tradição centenária iniciada em 1908 com a agilidade, sigilo absoluto e alta tecnologia
                  da advocacia digital exercida em todo o Brasil.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src="/img/assinatura-gold.png"
                  alt="Assinatura Dr. Aldo Leão"
                  className="h-8 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                  }}
                />
                <span className="text-[11px] text-slate-400">
                  Dr. Aldo Leão Ferreira Filho · OAB/RS
                </span>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2 rounded text-xs font-medium text-slate-200 border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
