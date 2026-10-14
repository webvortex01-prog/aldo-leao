import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  ChevronDown, 
  PhoneCall, 
  MessageSquare, 
  Clock, 
  Lock
} from 'lucide-react';
import { Logo } from './Logo';
import { UrgentHotlineFloat } from './UrgentHotlineFloat';
import { useSite } from '../context/SiteContext';

interface HoldingLandingPageProps {
  onBackToSite: () => void;
  onOpenAdmin: () => void;
  onOpenConsultation?: () => void;
}

export const HoldingLandingPage: React.FC<HoldingLandingPageProps> = ({
  onBackToSite,
  onOpenAdmin,
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();
  const { contact } = siteConfig;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de agendar uma consulta sobre Planejamento Patrimonial 4.0 (Holding Familiar).'
    );
    window.open(`https://wa.me/${contact.whatsappNumber || '5551998088998'}?text=${text}`, '_blank');
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
      a: 'O planejamento deve ser realizado em vida e com serenidade. Esperar o falecimento transfere a decisão para o processo de inventário, sujeitando a família a despesas de até 40% do patrimônio, bloqueio de contas, descompasso empresarial e eventuais litígios desgastantes entre herdeiros.'
    },
    {
      q: 'A Holding Familiar serve apenas para patrimônios multimilionários?',
      a: 'Não. A partir de patrimônios compostos por imóveis, ativos rurais ou pequenas empresas familiares, a economia tributária e de custas cartorárias do inventário já compensa amplamente a estruturação preventiva.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* Top Bar for Landing Page */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#050B14]/95 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="p-2.5 rounded-lg bg-[#071122] border border-[#D4AF37]/35 text-[#F6E27A] hover:bg-[#0E1F3D] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <Logo size="sm" variant="symbol" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[#E5C158] hover:text-[#F6E27A] bg-[#0A1730] border border-[#D4AF37]/30 transition-colors cursor-pointer"
              title="Editor de Sites (Acesso Restrito)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Falar com o Dr. Aldo</span>
            </button>
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="h-20 w-full shrink-0" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-4">
              <span>PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0</span>
              <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
              <span>VIA HOLDING FAMILIAR</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-5.5xl font-black text-white leading-[1.12] mb-6 tracking-tight [text-wrap:balance]">
              PLANEJAMENTO PATRIMONIAL <span className="gold-text-gradient">4.0</span>
            </h1>

            {/* Texto exato solicitado no Item 15 */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans-body max-w-3xl mx-auto font-light mb-8">
              O Planejamento Patrimonial 4.0, através da Holding Familiar, é um sistema moderno de proteção patrimonial que organiza a sucessão em vida, reduz expressivamente a carga tributária e evita os desgastes emocionais e financeiros de um inventário.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CONSULTA JURÍDICA DIGITAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#tabela-comparativa"
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Comparativo de Custos</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Os Benefícios da Holding Familiar 4.0 */}
      <section className="py-20 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              ARQUITETURA JURÍDICA ESTRATÉGICA
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Benefícios da Holding Familiar 4.0
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

      {/* ESTUDO COMPARATIVO DE CUSTOS (Inventário x Holding Familiar) */}
      <section id="tabela-comparativa" className="py-20 bg-[#050B14] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#09152B] to-[#071122] p-6 sm:p-12 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
                ESTUDO COMPARATIVO DE CUSTOS
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                INVENTÁRIO x HOLDING FAMILIAR
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans-body">
                A título de exemplo, consideramos um patrimônio adquirido por R$ 1.000.000,00, com valor de mercado atual de R$ 1.500.000,00, tem um ganho de capital de R$ 500.000,00.
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

            {/* Banner de Economia */}
            <div className="mt-8 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#0E1F3D] via-[#0B1A35] to-[#0E1F3D] border border-[#D4AF37] text-center shadow-xl">
              <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-1">
                Economia com a Holding Familiar
              </p>
              <p className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-[#25D366] tabular-nums">
                R$ 164.000,00
              </p>
              <p className="text-xs sm:text-base text-slate-200 mt-2 font-semibold uppercase tracking-wider">
                correspondente a 55,21%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Box: Agende a sua proteção patrimonial hoje mesmo */}
      <section className="py-16 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#071122] via-[#0E1F3D] to-[#071122] border-2 border-[#D4AF37]/50 shadow-2xl text-center">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-3">
              Agende a sua proteção patrimonial hoje mesmo
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8 font-light">
              Converse diretamente com o Dr. Aldo Leão e planeje com total segurança a perpetuação dos bens da sua família.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <span>CONSULTA JURÍDICA DIGITAL</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>AGENDAR PELO WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sanfona com Botões Solicitados */}
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

          <div className="space-y-4 mb-12">
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

          {/* CTA Box de Perguntas Frequentes conforme solicitado no Item 15 */}
          <div className="p-6 rounded-xl bg-[#071122] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-cinzel text-sm font-bold text-white">Ainda tem dúvidas sobre o seu caso específico?</p>
              <p className="text-xs text-slate-400">Atendimento privativo e sob sigilo com o Dr. Aldo Leão.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleWhatsApp}
                className="px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer whitespace-nowrap"
              >
                <span>AGENDE A SUA CONSULTA DIGITAL</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>AGENDAR PELO WHATSAPP</span>
              </button>
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#E5C158]">
            <span>WhatsApp: (51) 99808-8998</span>
            <span>·</span>
            <span>Telefones: (51) 99808-8998 e (51) 99807-8998</span>
            <span>·</span>
            <span>E-mail: aldoleaoadvocacia@gmail.com</span>
          </div>
          <div className="pt-4">
            <button
              onClick={onBackToSite}
              className="text-xs text-[#F6E27A] hover:underline cursor-pointer font-semibold"
            >
              ← Retornar à Página Inicial do Escritório
            </button>
          </div>
        </div>
      </footer>

      {/* Rodapé Fixo WhatsApp (Item 43) */}
      <UrgentHotlineFloat onOpenConsultation={onOpenConsultation} />
    </div>
  );
};
