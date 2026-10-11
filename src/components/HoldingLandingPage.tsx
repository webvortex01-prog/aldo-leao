import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingDown, 
  Scale, 
  Building, 
  Users, 
  ChevronDown, 
  PhoneCall, 
  MessageSquare, 
  Clock, 
  FileCheck2, 
  Award, 
  Lock,
  Sparkles
} from 'lucide-react';
import { Logo } from './Logo';
import { useSite } from '../context/SiteContext';
import realPartnerImg from '../assets/images/aldo_leao_portrait_real_1791572566625.jpg';

interface HoldingLandingPageProps {
  onBackToSite: () => void;
  onOpenAdmin: () => void;
}

export const HoldingLandingPage: React.FC<HoldingLandingPageProps> = ({
  onBackToSite,
  onOpenAdmin,
}) => {
  const { siteConfig, addLead } = useSite();
  const { contact } = siteConfig;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    patrimonyRange: 'R$ 2M a R$ 5M',
    numHeirs: '2 herdeiros',
    hasCompanies: 'Sim, possuo empresas operacionais',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) return;

    addLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      area: 'Planejamento Patrimonial 4.0',
      urgency: 'imediata',
      estimatedValue: formData.patrimonyRange,
      summary: `Diagnóstico de Viabilidade Holding 4.0 solicitado via Landing Page.\nHerdeiros: ${formData.numHeirs}\nEmpresas: ${formData.hasCompanies}\nObservações: ${formData.message || 'Sem notas adicionais'}`,
      ndaAccepted: true,
      source: 'Landing Page Holding Familiar 4.0'
    });

    setFormSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá Dr. Aldo Leão, gostaria de agendar meu Diagnóstico de Viabilidade para Planejamento Patrimonial 4.0 (Holding Familiar).\n\n*Nome:* ${formData.fullName || 'Interessado'}\n*Patrimônio aproximado:* ${formData.patrimonyRange}\n*Herdeiros:* ${formData.numHeirs}`
    );
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'Os pais perdem o controle dos seus bens ao transferi-los para a Holding?',
      a: 'Não. Na modelagem 4.0 do Dr. Aldo Leão, a doação de quotas para os filhos é realizada com Reserva de Usufruto Vitalício e Cláusula de Administração Exclusiva aos pais. Os patriarcas mantêm 100% da gestão, voto qualificado (Golden Share), poder irrestrito de compra, venda ou locação e a totalidade dos rendimentos (aluguéis e dividendos) até o fim da vida.'
    },
    {
      q: 'Os herdeiros podem vender os imóveis sem a autorização expressa dos pais?',
      a: 'De forma alguma. Os atos constitutivos e os acordos parassociais são blindados com cláusulas de inalienabilidade e impenhorabilidade. Nenhum imóvel ou quota societária pode ser transferido ou gravado sem a concordância unânime dos patriarcas.'
    },
    {
      q: 'Em caso de divórcio de um dos filhos, a nora ou o genro têm direito aos bens da família?',
      a: 'Não. Todas as doações contam com Cláusula de Incomunicabilidade rígida. Os bens e quotas permanecem de propriedade exclusiva da linhagem sanguínea do herdeiro, independentemente do regime de bens do casamento ou união estável.'
    },
    {
      q: 'Qual é o momento ideal para iniciar o planejamento via Holding Familiar?',
      a: 'O planejamento deve ser realizado em vida e com serenidade. Esperar o falecimento transfere a decisão para o processo de inventário, sujeitando a família a despesas de até 20% do patrimônio, bloqueio de contas, descompasso empresarial e eventuais litígios desgastantes entre herdeiros.'
    },
    {
      q: 'A Holding Familiar serve apenas para patrimônios multimilionários?',
      a: 'Não. A partir de patrimônios compostos por dois ou mais imóveis, ativos rurais ou pequenas empresas familiares, a economia tributária e de custas cartorárias do inventário já compensa amplamente a estruturação preventiva.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* Top Bar for Landing Page */}
      <header className="sticky top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#050B14]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="p-2.5 rounded-lg bg-[#071122] border border-[#D4AF37]/35 text-[#F6E27A] hover:bg-[#0E1F3D] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao Portal Principal</span>
            </button>
            <Logo size="sm" variant="symbol" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[#E5C158] hover:text-[#F6E27A] bg-[#0A1730] border border-[#D4AF37]/30 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Gabinete Dr. Aldo</span>
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Falar com o Dr. Aldo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section of Landing Page */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-4">
              <span>PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0</span>
              <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
              <span>VIA HOLDING FAMILIAR</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-5.5xl font-black text-white leading-[1.12] mb-6 tracking-tight [text-wrap:balance]">
              O ECOSSISTEMA SOCIETÁRIO QUE{' '}
              <span className="gold-text-gradient">PROTEGE E PERPETUA</span> O SEU LEGADO
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-body max-w-3xl mx-auto font-light mb-8">
              Proteja, organize e perpetue o seu patrimônio e as suas empresas com inteligência jurídica centenária.
              A Holding Familiar 4.0 é a modelagem de vanguarda que elimina em vida os custos desastrosos, os bloqueios
              e as brigas do processo de inventário.
            </p>

            {/* Quick CTA anchor */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#formulario-viabilidade"
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SOLICITAR DIAGNÓSTICO DE VIABILIDADE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#tabela-comparativa"
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Comparativo de Custos</span>
              </a>
            </div>
          </div>

          {/* Key Metric Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0E1F3D] via-[#09152B] to-[#0E1F3D] border-2 border-[#D4AF37]/50 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="border-b md:border-b-0 md:border-r border-[#D4AF37]/25 pb-4 md:pb-0">
              <p className="font-cinzel text-3xl sm:text-4xl font-black text-[#25D366] tabular-nums">
                55,21%
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">
                Economia Média em Custos Sucessórios
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-[#D4AF37]/25 pb-4 md:pb-0">
              <p className="font-cinzel text-3xl sm:text-4xl font-black text-white tabular-nums">
                100%
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">
                Controle Vitalício nas Mãos dos Pais
              </p>
            </div>
            <div>
              <p className="font-cinzel text-3xl sm:text-4xl font-black text-[#F6E27A] tabular-nums">
                0 Dias
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold mt-1">
                Paralisação dos Negócios da Família
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Que É e Os 8 Benefícios */}
      <section className="py-20 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              ARQUITETURA JURÍDICA ESTRATÉGICA
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Por Que a Holding Familiar 4.0 é Superior ao Inventário?
            </h2>
            <p className="text-sm text-slate-300 font-sans-body leading-relaxed">
              Desenvolvida com base em 118 anos de tradição jurídica e na liderança do Dr. Aldo Leão,
              a metodologia integra Direito Societário, Imobiliário, Tributário e Governança Familiar
              para blindar o patrimônio antes que litígios ou imprevistos aconteçam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Proteção Jurídica Patrimonial',
                desc: 'Segregação efetiva de riscos civis, trabalhistas e empresariais dos bens familiares e imóveis.'
              },
              {
                title: 'Sucessão Sem Inventário',
                desc: 'Transição jurídica imediata sem necessidade de ingressar na morosidade do Judiciário ou cartórios.'
              },
              {
                title: 'Redução Expressiva de ITCMD',
                desc: 'Aproveitamento de bases legais e alíquotas reduzidas antes da progressividade tributária obrigatória.'
              },
              {
                title: 'Governança e Harmonia',
                desc: 'Regras claras e pactuadas em vida, eliminando qualquer espaço para conflitos entre herdeiros.'
              },
              {
                title: 'Usufruto e Golden Share',
                desc: 'Poder de veto e voto vitalício que mantém os patriarcas no comando de 100% das decisões patrimoniais.'
              },
              {
                title: 'Incomunicabilidade Total',
                desc: 'Garante que os bens familiares não se comuniquem com cônjuges ou futuros genros/noras dos herdeiros.'
              },
              {
                title: 'Continuidade dos Negócios',
                desc: 'As empresas operacionais seguem operando normalmente sem bloqueio de contas ou dependência de alvarás.'
              },
              {
                title: 'Economia em Venda de Imóveis',
                desc: 'Tributação de locação e alienação de imóveis na pessoa jurídica substancialmente inferior à pessoa física.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#071122] border border-[#D4AF37]/30 flex flex-col justify-between hover:border-[#D4AF37] hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] mb-4">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela Comparativa de Custos (Exact PDF Spec) */}
      <section id="tabela-comparativa" className="py-20 bg-[#050B14] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#09152B] to-[#071122] p-6 sm:p-12 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
                ESTUDO COMPARATIVO REAL DE CUSTOS
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                PROCESSO DE INVENTÁRIO × HOLDING FAMILIAR 4.0
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans-body">
                Cenário hipotético considerando um patrimônio adquirido por R$ 1.000.000,00 com valor de mercado atual de R$ 1.500.000,00 (Ganho de capital de R$ 500.000,00).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D4AF37]/40 text-white font-cinzel">
                    <th className="py-3.5 px-4 uppercase tracking-wider text-slate-300">Despesa Sucessória</th>
                    <th className="py-3.5 px-4 text-center bg-red-950/40 border-x border-[#D4AF37]/20 uppercase tracking-wider text-red-300">
                      Processo de Inventário
                    </th>
                    <th className="py-3.5 px-4 text-center bg-[#D4AF37]/20 uppercase tracking-wider text-[#F6E27A] font-bold">
                      Holding Familiar 4.0
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans-body">
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
                    <td className="py-3.5 px-4 text-slate-200">Certidões Forenses</td>
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
                  <tr className="border-t-2 border-[#D4AF37]/50 font-bold text-sm">
                    <td className="py-4 px-4 text-white uppercase font-cinzel text-base">Custo Total</td>
                    <td className="py-4 px-4 text-center tabular-nums text-red-400 bg-red-950/40 border-x border-[#D4AF37]/20 text-base">
                      R$ 297.000,00
                    </td>
                    <td className="py-4 px-4 text-center tabular-nums text-[#F6E27A] bg-[#D4AF37]/25 text-lg">
                      R$ 133.000,00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Banner Gigante de Economia */}
            <div className="mt-8 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#0E1F3D] via-[#0B1A35] to-[#0E1F3D] border border-[#D4AF37] text-center shadow-xl">
              <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-1">
                ECONOMIA REAL COM A HOLDING FAMILIAR 4.0:
              </p>
              <p className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-[#25D366] tabular-nums">
                R$ 164.000,00
              </p>
              <p className="text-xs sm:text-base text-slate-200 mt-2 font-semibold uppercase tracking-wider">
                Redução comprovada de 55,21% em despesas que ficariam nas mãos de terceiros
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Processo em 4 Etapas */}
      <section className="py-20 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              PASSO A PASSO METODOLÓGICO
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Como Estruturamos o Seu Planejamento 4.0
            </h2>
            <p className="text-sm text-slate-300 font-sans-body">
              Procedimento seguro, 100% digital e sob sigilo fiduciário OAB, com acompanhamento direto do Head Jurídico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Diagnóstico Situacional',
                desc: 'Mapeamento minucioso de imóveis, empresas operacionais, perfil familiar e riscos fiscais existentes.'
              },
              {
                step: '02',
                title: 'Arquitetura Societária',
                desc: 'Desenho da estrutura jurídica ideal (Holding Pura, Imobiliária ou Mista) com cálculo da economia de ITCMD.'
              },
              {
                step: '03',
                title: 'Integralização e Doação',
                desc: 'Transferência dos bens e doação de quotas com Reserva de Usufruto, Inalienabilidade e Incomunicabilidade.'
              },
              {
                step: '04',
                title: 'Governança & Acordo de Sócios',
                desc: 'Elaboração das regras de voto, sucessão de gestão, Golden Share e proteção perpétua do patrimônio.'
              }
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#071122] border border-[#D4AF37]/30 flex flex-col justify-between">
                <div>
                  <span className="font-cinzel text-2xl font-black text-[#F6E27A] tabular-nums block mb-3">
                    {st.step}.
                  </span>
                  <h3 className="font-cinzel text-base font-bold text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sanfona */}
      <section className="py-20 bg-[#050B14] border-b border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Perguntas e Respostas sobre Holding Familiar
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#D4AF37]/30 bg-[#071122] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#0B1A35] transition-colors"
                  >
                    <span className="font-cinzel text-sm sm:text-base font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#E5C158] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#D4AF37]/15 bg-[#050B14]/60">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulário de Diagnóstico de Viabilidade */}
      <section id="formulario-viabilidade" className="py-20 md:py-28 bg-[#060D1A] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Dr. Aldo Profile */}
            <div className="lg:col-span-5 text-left">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#071122] shadow-2xl mb-6">
                <img
                  src="/img/dr-aldo-portrait.jpg"
                  alt="Dr. Aldo Leão - Especialista em Holding Familiar"
                  className="w-full aspect-[4/3] object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/draldo6.jpg.jpeg';
                  }}
                />
                <div className="p-4 bg-[#050B14] border-t border-[#D4AF37]/30 text-center">
                  <p className="font-cinzel text-base font-bold text-white">Dr. Aldo Leão Ferreira Filho</p>
                  <p className="text-xs text-[#E5C158] uppercase tracking-wider font-semibold mt-0.5">
                    Head Jurídico · 40 Anos de Advocacia (1986–2026)
                  </p>
                  <div className="mt-2 flex justify-center">
                    <img
                      src="/img/assinatura-gold.png"
                      alt="Assinatura Dr. Aldo Leão"
                      className="h-8 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)] opacity-95"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Autor dos livros de referência em Planejamento Patrimonial 4.0
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                  <span>Sigilo profissional integral assegurado pela OAB.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E5C158]" />
                  <span>Atendimento virtual agendado para todo o Brasil.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E5C158]" />
                  <span>Sede em Porto Alegre com infraestrutura 100% digital.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-[#071122] border-2 border-[#D4AF37]/50 shadow-2xl">
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                    AGENDAMENTO DIRETO COM O GABINETE
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                    Solicite o seu Diagnóstico de Viabilidade
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Preencha os dados preliminares para que o Dr. Aldo Leão analise a estrutura patrimonial da sua família.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="font-cinzel text-lg font-bold text-white">
                      Diagnóstico Solicitado com Sucesso!
                    </h4>
                    <p className="text-xs text-emerald-200 leading-relaxed">
                      Seus dados foram transmitidos em segurança para o gabinete do Dr. Aldo Leão. Você já pode iniciar o contato imediatamente no WhatsApp oficial.
                    </p>
                    <button
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20ba59] transition-all cursor-pointer shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Abrir Conversa no WhatsApp Oficial</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ex: João Carlos da Silva"
                        className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(51) 99999-9999"
                          className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                          E-mail Corporativo ou Pessoal *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu.email@exemplo.com.br"
                          className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                          Patrimônio Estimado
                        </label>
                        <select
                          value={formData.patrimonyRange}
                          onChange={(e) => setFormData({ ...formData, patrimonyRange: e.target.value })}
                          className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="R$ 1M a R$ 2M">R$ 1.000.000 a R$ 2.000.000</option>
                          <option value="R$ 2M a R$ 5M">R$ 2.000.000 a R$ 5.000.000</option>
                          <option value="R$ 5M a R$ 15M">R$ 5.000.000 a R$ 15.000.000</option>
                          <option value="R$ 15M a R$ 50M">R$ 15.000.000 a R$ 50.000.000</option>
                          <option value="Acima de R$ 50M">Acima de R$ 50.000.000</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                          Número de Herdeiros
                        </label>
                        <select
                          value={formData.numHeirs}
                          onChange={(e) => setFormData({ ...formData, numHeirs: e.target.value })}
                          className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="1 herdeiro">1 herdeiro</option>
                          <option value="2 herdeiros">2 herdeiros</option>
                          <option value="3 herdeiros">3 herdeiros</option>
                          <option value="4 ou mais herdeiros">4 ou mais herdeiros</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                        Resumo Confidencial do Caso (Opcional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ex: Possuímos 4 imóveis urbanos e 1 empresa que gostaríamos de organizar para evitar o inventário..."
                        className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>SOLICITAR DIAGNÓSTICO DE VIABILIDADE</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer of Landing Page */}
      <footer className="bg-[#040810] border-t border-[#D4AF37]/20 py-10 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <Logo size="sm" />
          <p className="max-w-xl mx-auto text-slate-400 text-xs">
            ALDO LEÃO ADVOCACIA ESTRATÉGICA · Tradição Jurídica Centenária Desde 1908
            <br />
            {contact.addressPortoAlegre}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-[#E5C158]">
            <span>WhatsApp: {contact.whatsappNumber}</span>
            <span>·</span>
            <span>Telefone: {contact.phonePrimary}</span>
            <span>·</span>
            <span>E-mail: {contact.emailHolding}</span>
          </div>
          <div className="pt-4">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              ← Retornar à Página Inicial do Escritório
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
