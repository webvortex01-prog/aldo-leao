import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingDown, Scale, Building, Users } from 'lucide-react';

interface HoldingFamiliarSectionProps {
  onGoToLandingPage: () => void;
}

export const HoldingFamiliarSection: React.FC<HoldingFamiliarSectionProps> = ({
  onGoToLandingPage
}) => {
  return (
    <section id="holding-familiar" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            HOLDING <span className="gold-text-gradient">FAMILIAR</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-4">
            O Planejamento Patrimonial e Empresarial 4.0 via Holding Familiar representa uma nova geração de soluções jurídicas
            voltadas à proteção patrimonial, organização societária, governança familiar e sucessão empresarial.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans-body">
            Muito além da constituição de uma empresa, trata-se de uma modelagem jurídica personalizada, desenvolvida para proteger
            o patrimônio, fortalecer a gestão dos ativos e assegurar sua perpetuação para as futuras gerações sem os custos e conflitos do inventário.
          </p>
        </div>

        {/* What is and Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          <div className="p-8 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E5C158] font-bold block mb-2">
                O QUE É O PLANEJAMENTO 4.0?
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-4">
                Metodologia Jurídica Estratégica Multidisciplinar
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6">
                Desenvolvida para organizar, proteger e perpetuar patrimônios e empresas por meio de soluções preventivas,
                reduzindo riscos jurídicos, sucessórios e tributários. Sua estrutura integra instrumentos de Direito Societário,
                Direito Empresarial, Direito Civil, Direito Imobiliário e Governança Familiar.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/20">
              <h4 className="font-cinzel text-xs font-bold text-[#F6E27A] mb-2 uppercase">
                Por Que Planejar em Vida?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Permite que decisões patrimoniais sejam tomadas com serenidade e segurança jurídica, eliminando brigas entre herdeiros,
                bloqueios judiciais de contas e a venda forçada de imóveis com deságio para custear o inventário.
              </p>
            </div>
          </div>

          {/* Benefits Checkmarks */}
          <div className="p-8 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E5C158] font-bold block mb-2">
                VANTAGENS EXCLUSIVAS
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-4">
                Principais Benefícios da Holding Familiar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Proteção Jurídica Patrimonial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Planejamento Sucessório Corporativo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Governança Familiar Estruturada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Redução Expressiva da Carga Tributária</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Evita a Perda Financeira do Inventário</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Segurança e Continuidade dos Negócios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Gestão Estratégica dos Ativos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Harmonia e Preservação da Paz Familiar</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <span className="text-xs text-slate-400">Estruturação personalizada para cada família.</span>
              <button
                onClick={onGoToLandingPage}
                className="text-xs font-bold text-[#F6E27A] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Estudo Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* TABELA COMPARATIVA DE CUSTOS (Inventário x Holding Familiar 4.0 - PDF Page 32) */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#09152B] to-[#071122] p-6 sm:p-10 shadow-2xl mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-1">
              ESTUDO COMPARATIVO DE CUSTOS
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase">
              PROCESSO DE INVENTÁRIO × HOLDING FAMILIAR 4.0
            </h3>
            <p className="text-xs text-slate-300 mt-2">
              Cenário hipotético considerando um patrimônio adquirido por R$ 1.000.000,00 com valor de mercado atual de R$ 1.500.000,00 (Ganho de capital de R$ 500.000,00).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4AF37]/30 text-white font-cinzel">
                  <th className="py-3 px-4 uppercase tracking-wider text-slate-300">Despesa Sucessória</th>
                  <th className="py-3 px-4 text-center bg-red-950/40 border-x border-[#D4AF37]/20 uppercase tracking-wider text-red-300">
                    Processo de Inventário
                  </th>
                  <th className="py-3 px-4 text-center bg-[#D4AF37]/20 uppercase tracking-wider text-[#F6E27A] font-bold">
                    Holding Familiar 4.0
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans-body">
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
                  <td className="py-3 px-4 text-slate-200">Certidões Forenses</td>
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
                <tr className="border-t-2 border-[#D4AF37]/40 font-bold text-sm">
                  <td className="py-3.5 px-4 text-white uppercase font-cinzel">Custo Total</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-red-400 bg-red-950/40 border-x border-[#D4AF37]/20">
                    R$ 297.000,00
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-[#F6E27A] bg-[#D4AF37]/25 text-base">
                    R$ 133.000,00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Destaque Gigante de Economia */}
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#0E1F3D] via-[#0B1A35] to-[#0E1F3D] border border-[#D4AF37] text-center shadow-lg">
            <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-1">
              ECONOMIA REAL COM A HOLDING FAMILIAR 4.0:
            </p>
            <p className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-[#25D366] tabular-nums">
              R$ 164.000,00
            </p>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold uppercase tracking-wider">
              Redução de 55,21% em custos e despesas sucessórias
            </p>
          </div>

          {/* Single CTA to Landing Page (as requested in PDF Page 33) */}
          <div className="text-center mt-8">
            <button
              onClick={onGoToLandingPage}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              <span>AGENDAR DIAGNÓSTICO DE VIABILIDADE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              Acesse a Landing Page exclusiva com todos os comparativos e agende no WhatsApp oficial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
