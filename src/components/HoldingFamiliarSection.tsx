import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface HoldingFamiliarSectionProps {
  onGoToLandingPage: () => void;
}

export const HoldingFamiliarSection: React.FC<HoldingFamiliarSectionProps> = ({
  onGoToLandingPage
}) => {
  const { siteConfig } = useSite();
  const hf = siteConfig.holdingFamiliar;
  const s2 = siteConfig.slide2;

  const benefitsList = hf?.benefits && hf.benefits.length > 0 ? hf.benefits : [
    'Proteção Jurídica Patrimonial',
    'Planejamento Sucessório Corporativo',
    'Governança Familiar Estruturada',
    'Redução Expressiva da Carga Tributária',
    'Evita a Perda Financeira do Inventário',
    'Segurança e Continuidade dos Negócios',
    'Gestão Estratégica dos Ativos',
    'Harmonia e Preservação da Paz Familiar'
  ];

  return (
    <section id="holding-familiar" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>{hf?.sectionKicker || 'PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5 [text-wrap:balance]">
            {hf?.sectionTitle || 'HOLDING'} <span className="gold-text-gradient">{hf?.sectionHighlight || 'FAMILIAR'}</span>
          </h2>

          {/* Texto abaixo do título conforme Item 40 */}
          <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            <p>
              {hf?.paragraph1 || 'O Planejamento Patrimonial e Empresarial 4.0 via Holding Familiar representa uma nova geração de soluções jurídicas avançadas e especializadas voltadas à proteção patrimonial, estruturação e organização societária, governança familiar e sucessão empresarial.'}
            </p>
            <p>
              {hf?.paragraph2 || 'Muito além da constituição de uma empresa, trata-se de uma modelagem jurídica personalizada, desenvolvida por advogados especialistas, para proteger o patrimônio, fortalecer a gestão dos ativos e assegurar sua perpetuação para as futuras gerações.'}
            </p>
            <p>
              {hf?.paragraph3 || 'Cada modelagem estrutural é concebida de forma individualizada, considerando as características do patrimônio, da empresa, da família e dos objetivos do cliente (família).'}
            </p>
          </div>
        </div>

        {/* What is and Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-16">
          <div className="p-8 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 flex flex-col justify-between shadow-xl text-left card-hover-interactive">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E5C158] font-bold block mb-2">
                {hf?.boxWhatIsTitle || 'O QUE É O PLANEJAMENTO 4.0?'}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-4">
                {hf?.boxWhatIsHeading || 'Metodologia Jurídica Estratégica Multidisciplinar'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
                {hf?.boxWhatIsText || 'Desenvolvida para organizar, proteger e perpetuar patrimônios e empresas por meio de soluções preventivas, reduzindo riscos jurídicos, sucessórios e tributários. Sua estrutura integra instrumentos de Direito Societário, Direito Empresarial, Direito Civil, Direito Imobiliário e Governança Familiar.'}
              </p>
            </div>

            {/* Porque Planejar em Vida conforme Item 40 */}
            <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/25">
              <h4 className="font-cinzel text-xs font-bold text-[#F6E27A] mb-2 uppercase">
                {hf?.boxWhyTitle || 'Por Que Planejar em Vida?'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {hf?.boxWhyText || 'Permite que decisões patrimoniais e empresariais sejam tomadas de forma organizada, estratégica e com segurança jurídica, eliminando brigas entre herdeiros, a alta perda patrimonial e financeira do inventário (média 40% do patrimônio inventariado), partilha das cotas sociais em divórcios e dissoluções de uniões estáveis, a venda forçada e rápida de bens com deságio para quitar o inventário.'}
              </p>
            </div>
          </div>

          {/* Benefits Checkmarks */}
          <div className="p-8 rounded-2xl bg-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col justify-between text-left card-hover-interactive">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E5C158] font-bold block mb-2">
                VANTAGENS EXCLUSIVAS
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-4">
                {hf?.benefitsTitle || 'Principais Benefícios da Holding Familiar'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                {benefitsList.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link Saiba Mais conforme Item 10 */}
            <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <span className="text-xs text-slate-400">Estruturação personalizada para cada família.</span>
              <button
                onClick={onGoToLandingPage}
                className="text-xs font-bold text-[#F6E27A] hover:underline inline-flex items-center gap-1 cursor-pointer group"
              >
                <span>Saiba mais</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Showcase - Holding Familiar */}
        <div className="max-w-2xl lg:max-w-3xl mx-auto mb-16">
          <div className="group relative rounded-2xl overflow-hidden border border-[#D4AF37]/45 bg-[#070F1E] shadow-2xl text-left card-hover-interactive">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden relative">
              <img
                src="/img/holding-familiar-1.jpg"
                alt="Estruturação e Proteção Patrimonial - Holding Familiar"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent opacity-80" />
              <div className="absolute top-3 left-3 bg-[#050B14]/85 border border-[#D4AF37]/50 backdrop-blur-md px-3.5 py-1 rounded-full">
                <span className="text-[10px] uppercase tracking-wider text-[#F6E27A] font-bold">
                  Patrimônio & Ativos
                </span>
              </div>
            </div>
            <div className="p-5 sm:p-6 border-t border-[#D4AF37]/25 bg-[#071122]">
              <h4 className="font-cinzel text-sm sm:text-base font-bold text-white mb-1.5 uppercase">
                Estruturação e Proteção dos Bens Familiares
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Organização societária e governança para blindar ativos, empresas e patrimônio com máxima segurança jurídica e eficiência tributária.
              </p>
            </div>
          </div>
        </div>

        {/* TABELA COMPARATIVA DE CUSTOS (INVENTÁRIO x HOLDING FAMILIAR) - Item 10 e Item 40 (coluna direita não cortada) */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#09152B] to-[#071122] p-5 sm:p-8 md:p-10 shadow-2xl mb-12 card-hover-interactive">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase">
              CUSTOS: INVENTÁRIO X HOLDING FAMILIAR
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light">
              {hf?.tableSubtitle || `A título de exemplo, consideramos um patrimônio adquirido por ${s2?.sampleAcquisition || 'R$ 1.000.000,00'}, com valor de mercado atual de ${s2?.sampleMarket || 'R$ 1.500.000,00'}, tem um ganho de capital de ${s2?.sampleCapitalGain || 'R$ 500.000,00'}.`}
            </p>
          </div>

          {/* Tabela com overflow suave e colunas perfeitamente distribuídas sem corte */}
          <div className="w-full overflow-x-auto rounded-xl border border-[#D4AF37]/35 shadow-inner">
            <table className="w-full min-w-[540px] text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4AF37]/40 text-white font-cinzel bg-[#0E1F3D]">
                  <th className="py-3.5 px-4 uppercase tracking-wider text-slate-300">DESPESA</th>
                  <th className="py-3.5 px-4 text-center bg-red-950/40 border-x border-[#D4AF37]/20 uppercase tracking-wider text-red-300">
                    Processo de Inventário
                  </th>
                  <th className="py-3.5 px-4 text-center bg-[#D4AF37]/20 uppercase tracking-wider text-[#F6E27A] font-bold">
                    Holding Familiar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans-body bg-[#050B14]">
                <tr>
                  <td className="py-3.5 px-4 text-slate-200">ITCD / ITCMD</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                    R$ 75.000,00 (5%)
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-white bg-[#D4AF37]/10">
                    R$ 60.000,00 (4%)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200">Honorários Advocatícios</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                    R$ 120.000,00 (8%)
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-white bg-[#D4AF37]/10">
                    R$ 70.000,00
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200">Custas de Cartório</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                    R$ 12.000,00
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-[#25D366] bg-[#D4AF37]/10">
                    R$ 0,00
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200">Certidões</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                    R$ 3.000,00
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-[#25D366] bg-[#D4AF37]/10">
                    R$ 0,00
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200">I.R. Ganho de Capital</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                    R$ 75.000,00
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-[#25D366] bg-[#D4AF37]/10">
                    R$ 0,00
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-200">Registro de Imóveis</td>
                  <td className="py-3.5 px-4 text-center tabular-nums text-slate-300 bg-red-950/20 border-x border-[#D4AF37]/15">
                    R$ 12.000,00
                  </td>
                  <td className="py-3.5 px-4 text-center tabular-nums font-semibold text-white bg-[#D4AF37]/10">
                    R$ 3.000,00
                  </td>
                </tr>
                <tr className="border-t-2 border-[#D4AF37]/50 font-bold text-sm bg-[#0E1F3D]/80">
                  <td className="py-4 px-4 text-white uppercase font-cinzel text-xs sm:text-sm">
                    Custo Total
                  </td>
                  <td className="py-4 px-4 text-center tabular-nums text-red-400 bg-red-950/40 border-x border-[#D4AF37]/20 text-sm sm:text-base">
                    R$ 297.000,00
                  </td>
                  <td className="py-4 px-4 text-center tabular-nums text-[#F6E27A] bg-[#D4AF37]/25 text-base sm:text-lg">
                    R$ 133.000,00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Economia com a Holding Familiar conforme Item 10 */}
          <div className="mt-6 p-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-white text-xs sm:text-sm font-bold uppercase font-cinzel">
                Economia com a Holding Familiar
              </p>
              <p className="text-[11px] text-emerald-300">
                Preservação imediata de patrimônio e liquidez para as próximas gerações.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[#25D366] font-cinzel font-black text-xl sm:text-2xl block">
                {s2?.savingsAmount || 'R$ 164.000,00'}
              </span>
              <span className="text-xs text-white font-semibold block">
                correspondente a {s2?.savingsPercentage || '55,21%'}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onGoToLandingPage}
              className="btn-gold-luxury group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-lg"
            >
              <span>Saiba mais</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
