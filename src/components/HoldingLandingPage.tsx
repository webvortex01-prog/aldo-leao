import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  ChevronDown, 
  PhoneCall, 
  MessageSquare, 
  AlertTriangle,
  FileText,
  UserCheck,
  Send,
  X,
  Lock
} from 'lucide-react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCurriculoModalOpen, setIsCurriculoModalOpen] = useState(false);

  // Form State para Sessão de Viabilidade
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Garante que a landing page sempre abre no início (topo) conforme Itens 9, v e i
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleOpenViabilidadeModal = () => {
    setIsModalOpen(true);
  };

  const handleDirectWhatsApp = (customMsg?: string) => {
    const targetPhone = contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      customMsg || 'Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de agendar uma Sessão de Viabilidade sobre Planejamento Patrimonial 4.0 via Holding Familiar.'
    );
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  const handleSubmitViabilidade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp) return;
    setSubmitting(true);

    const targetPhone = contact.whatsappNumber || '5551998088998';
    const msg = encodeURIComponent(
      `🏛️ *AGENDAMENTO - SESSÃO / DIAGNÓSTICO DE VIABILIDADE*\n` +
      `*Aldo Leão Advocacia Estratégica - Holding Familiar 4.0*\n\n` +
      `👤 *Nome Completo:* ${fullName}\n` +
      `📄 *CPF:* ${cpf || 'Não informado'}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n` +
      `📞 *Telefone:* ${phone || 'Não informado'}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n` +
      `🏙️ *Cidade/UF:* ${cidade || 'Não informada'}\n\n` +
      `Solicito o agendamento do meu Diagnóstico de Viabilidade para Planejamento Patrimonial 4.0.`
    );

    window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
    setTimeout(() => {
      setSubmitting(false);
      setIsModalOpen(false);
    }, 400);
  };

  // As 8 Perguntas Frequentes Exatas do Projeto (Página 16 do documento)
  const faqs = [
    {
      q: 'Como ocorre o atendimento da ALDO LEÃO ADVOCACIA ESTRATÉGICA?',
      a: 'Rompendo as fronteiras geográficas de um país continental, para levar a Excelência Jurídica Centenária a clientes de todo o território nacional, desde 2020 o nosso atendimento é realizado 100% digital, para clientes de todo o território nacional, com a mesma excelência jurídica, confidencialidade e segurança do atendimento presencial.'
    },
    {
      q: 'O que é a Holding Familiar (Planejamento Patrimonial 4.0)?',
      a: 'É uma estrutura societária e patrimonial especializada, avançada e inteligente utilizada para proteger juridicamente, organizar e bem administrar o patrimônio e o negócio familiar, planejando em vida para evitar a alta perda patrimonial e financeira dos herdeiros no inventário (em média 40%).'
    },
    {
      q: 'Quem pode fazer o Planejamento Patrimonial 4.0?',
      a: 'Em tese, qualquer pessoa física ou jurídica, que possui ou pretende adquirir patrimônio, já tem ou pretende ter filhos, já tem ou pretende casar ou ter uma união estável, Startups e etc., dependendo do resultado do Diagnóstico de Viabilidade.'
    },
    {
      q: 'A Holding Familiar (Planejamento Patrimonial 4.0) elimina o inventário?',
      a: 'Sim, a estruturação do ecossistema societário e patrimonial da Holding Familiar, feita por advogados especialistas, evita a alta perda patrimonial e financeira dos herdeiros no inventário (em média 40% do patrimônio).'
    },
    {
      q: 'O Planejamento Patrimonial 4.0 é exclusividade dos ricos?',
      a: 'Não. Qualquer pessoa que possua ou pretenda adquirir patrimônio e ter herdeiros, deve realizar, hoje e em vida, o seu Planejamento Patrimonial 4.0, dadas as vantagens exclusivas desta modelagem societária e patrimonial avançada e inteligente, que evita o aumento do ITCMD de 8% para 16% (Projeto de Resolução do Senado Federal N. 57/19), 20% (CONFAZ) ou 30% (Governo Federal). Cada projeto é desenvolvido de forma personalizada, considerando as características e os objetivos específicos de cada cliente e família.'
    },
    {
      q: 'Como saber se o Planejamento Patrimonial 4.0 é indicado para mim?',
      a: 'Agendando, agora mesmo, o seu Diagnóstico de Viabilidade com um especialista da ALDO LEÃO ADVOCACIA ESTRATÉGICA para evitar o aumento da carga tributária provocado pela reforma.'
    },
    {
      q: 'Há algum suporte após a entrega do ecossistema Holding Familiar?',
      a: 'Sim. O Escritório disponibiliza a contratação do serviço de Suporte Jurídico e Administrativo Profissional para assegurar a tranquilidade e a perpetuação do legado familiar.'
    },
    {
      q: 'Como ocorre o Planejamento Patrimonial 4.0 via Holding Familiar?',
      a: 'O planejamento, a estruturação e a implantação do ecossistema Holding Familiar é feito em três fases obrigatórias e sequenciais:\n\n1. DIAGNÓSTICO DE VIABILIDADE: Coleta de informações e documentos com análise completa e confidencial da situação familiar, patrimonial, jurídica, financeira e empresarial. É o ponto de partida do Planejamento Patrimonial 4.0.\n\n2. MODELAGENS ESTRUTURAIS: A seguir, são apresentadas as três melhores opções estruturais do sistema Holding Familiar, para a escolha pelo cliente (família) da modelagem que melhor atende as suas necessidades e objetivos.\n\n3. IMPLANTAÇÃO DA MODELAGEM: É a última fase do Planejamento Patrimonial 4.0, que culmina com a entrega do ecossistema societário e patrimonial (Holding Familiar).\n\nSUPORTE JURÍDICO-ADMINISTRATIVO: Opcionalmente, após a entrega do sistema Holding Familiar, disponibilizamos a contratação da solução de excelência relativa ao suporte jurídico-administrativo.'
    }
  ];

  // As 18 Vantagens Exclusivas Exatas (Página 21 do documento)
  const vantagensExclusivas = [
    'Proteção jurídica patrimonial e empresarial',
    'Planejamento sucessório empresarial',
    'Planejamento patrimonial e empresarial',
    'Expressiva economia tributária',
    'Evita os problemas do inventário',
    'Governança profissional',
    'Otimização da gestão',
    'Facilita a internacionalização patrimonial',
    'Conformidade legal',
    'Segurança jurídica',
    'Gestão estratégica de ativos',
    'Estruturação e captação de investimentos',
    'Harmonia e paz familiar',
    'Otimização de investimento (taxas maiores)',
    'Pleno controle do doador (pais) das cotas sociais aos filhos',
    'Cláusulas protetivas na doação das cotas aos filhos',
    'Acordo de sócios',
    'Captação de recursos para a empresa com investidores'
  ];

  // Alguns Problemas do Inventário (Página 20/21 do documento)
  const problemasInventario = [
    'Morosidade judicial do processo',
    'Alta perda patrimonial e financeira dos herdeiros',
    'Elevado custo do processo',
    'Venda rápida de bens, com deságio médio 20% para quitar o inventário',
    'Conflitos entre os herdeiros e familiares',
    'Aumento iminente do ITCMD de 8% para até 30%',
    'Indisponibilidade de bens até a partilha no final do inventário'
  ];

  // Público-alvo (Página 22 do documento)
  const publicoAlvo = [
    'Empresários',
    'Proprietários de bens (ativos)',
    'Pais',
    'Famílias empresárias',
    'Investidores imobiliários',
    'Autônomos',
    'Profissionais de atividades de risco',
    'Agronegócio (Produtores Rurais)'
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* 1. Top Bar / Cabeçalho da Landing Page conforme Item 63, Item XIV e Item i */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#D4AF37]/20 bg-[#050B14]/95 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Esquerda: Botão Voltar */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2.5 rounded-lg bg-[#071122] border border-[#D4AF37]/35 text-[#F6E27A] hover:bg-[#0E1F3D] hover:border-[#D4AF37] transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          </div>

          {/* Direita: Botão Admin e Texto ALDO LEÃO ADVOCACIA ESTRATÉGICA em duas linhas (Item 63 / XIV) */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-[#E5C158] hover:text-[#F6E27A] bg-[#0A1730] border border-[#D4AF37]/30 transition-colors cursor-pointer"
              title="Editor de Sites (Acesso Restrito)"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <div className="flex flex-col text-right">
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] uppercase tracking-wider">
                ALDO LEÃO
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs font-black text-white uppercase tracking-wider">
                ADVOCACIA ESTRATÉGICA
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="h-20 w-full shrink-0" aria-hidden="true" />

      {/* 2. Hero Section da Landing Page (Item 63, XIV e Item i) */}
      <section className="relative py-14 md:py-20 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Texto em dourado centralizado antes do título: HOLDING FAMILIAR (Item i) */}
            <div className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#E5C158] font-bold mb-3">
              HOLDING FAMILIAR
            </div>

            {/* Título: PLANEJAMENTO PATRIMONIAL 4.0 com PATRIMONIAL em dourado (Item i) */}
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-5.5xl font-black text-white leading-[1.14] mb-4 tracking-tight [text-wrap:balance]">
              PLANEJAMENTO <span className="gold-text-gradient">PATRIMONIAL</span> 4.0
            </h1>

            {/* Subtítulo em dourado: O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA AOS HERDEIROS (Item i) */}
            <h2 className="font-cinzel text-base sm:text-xl md:text-2xl font-bold text-[#F6E27A] uppercase tracking-wide mb-6">
              O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA AOS HERDEIROS
            </h2>

            {/* Texto do projeto conforme Item i do dia 15/10/26 */}
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-sans-body max-w-3xl mx-auto font-light mb-8 text-justify sm:text-center">
              <p>
                Muitas famílias somente descobrem a elevada perda patrimonial e o alto custo do processo de inventário quando já é tarde.
              </p>
              <p>
                Além dos tributos, honorários, despesas cartorárias, registros imobiliários e demais custos sucessórios, o inventário frequentemente fomenta conflitos familiares, disputas pelo patrimônio e divergências entre os herdeiros.
              </p>
              <p>
                A prática forense demonstra que, em muitos inventários, a necessidade de liquidez imediata leva os herdeiros à venda acelerada de bens, com deságio médio de 20% em relação ao respectivo valor de mercado, o que só faz aumentar a alta perda dos herdeiros.
              </p>
              <p>
                Além disso, o ITCMD – Imposto de Transmissão Causa Mortis e Doação terá a sua alíquota máxima de 8%, majorada para 18% (Projeto de Resolução do Senado Federal N. 57/19) ou 20% (CONFAZ) ou 30% (Governo Federal) onerando ainda mais o inventário para os herdeiros.
              </p>
              <p className="font-medium text-white">
                O resultado prático é a elevada perda patrimonial e financeira dos herdeiros, causada pelo inventário, justamente no momento mais delicado para a família, quando ela mais necessita de tranquilidade, segurança jurídica, estabilidade, paz e organização.
              </p>
            </div>

            {/* Botões do Hero: AGENDAR SESSÃO DE VIABILIDADE e CUSTOS: INVENTÁRIO X PLANEJAMENTO 4.0 (Item i) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={handleOpenViabilidadeModal}
                className="btn-gold-luxury group w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>AGENDAR SESSÃO DE VIABILIDADE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <a
                href="#tabela-comparativa"
                className="btn-secondary-luxury w-full sm:w-auto px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CUSTOS: INVENTÁRIO X PLANEJAMENTO 4.0</span>
              </a>
            </div>

            {/* Showcase Visual - Holding Familiar */}
            <div className="max-w-2xl lg:max-w-3xl mx-auto text-left">
              <div className="group relative rounded-2xl overflow-hidden border border-[#D4AF37]/50 bg-[#070F1E] shadow-[0_12px_40px_rgba(0,0,0,0.8)] card-hover-interactive">
                <div className="aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] w-full overflow-hidden relative">
                  <img
                    src="/img/holding-familiar-1.jpg"
                    alt="Estruturação, Proteção Patrimonial e Sucessão - Holding Familiar"
                    className="w-full h-full object-cover object-[center_28%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent opacity-85" />
                  <div className="absolute top-3 left-3 bg-[#050B14]/85 border border-[#D4AF37]/50 backdrop-blur-md px-3.5 py-1 rounded-full shadow-md">
                    <span className="text-[10px] uppercase tracking-wider text-[#F6E27A] font-bold">
                      Patrimônio, Empresas & Família
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border-t border-[#D4AF37]/25 bg-[#071122]">
                  <h3 className="font-cinzel text-sm sm:text-base md:text-lg font-bold text-white mb-1.5 uppercase">
                    Estruturação e Proteção do Patrimônio Familiar
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Blindagem preventiva de ativos, governança societária e planejamento sucessório em vida, garantindo a perpetuação do legado e evitando a perda de até 40% do patrimônio no inventário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Seção ALGUNS PROBLEMAS DO INVENTÁRIO (Item i do dia 15/10/26) */}
      <section className="py-16 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              DIAGNÓSTICO PREVENTIVO
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-tight">
              ALGUNS PROBLEMAS DO INVENTÁRIO
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problemasInventario.map((problema, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#071122] border border-red-500/30 flex items-start gap-3 hover:border-red-500/60 transition-all card-hover-interactive text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-red-950/40 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                  {problema}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Seção: O PLANEJAMENTO PATRIMONIAL 4.0 EVITA O INVENTÁRIO E PERPETUA O SEU LEGADO (Item i) */}
      <section className="py-20 bg-[#050B14] border-b border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              ARQUITETURA JURÍDICA ESTRATÉGICA
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-5 leading-snug">
              O PLANEJAMENTO PATRIMONIAL 4.0 EVITA O INVENTÁRIO E PERPETUA O SEU LEGADO
            </h2>
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-slate-300 font-sans-body leading-relaxed text-justify sm:text-center font-light">
              <p>
                O Planejamento Patrimonial 4.0 via Holding Familiar consiste na engenharia jurídica societária (empresas) e patrimonial avançada e legal, voltada à estruturação, organização e proteção, realizada em vida e extrajudicialmente, que proporciona a perpetuação do seu legado, através do planejamento estratégico, que evita o inventário e seus prejuízos aos herdeiros.
              </p>
              <p>
                A Holding Familiar possibilita centralizar e profissionalizar a gestão dos bens e empresas; planejar e executar a sucessão empresarial; reduzir os tributos; proteger o patrimônio e as empresas; planejar em vida, a perpetuação do seu legado, para as futuras gerações.
              </p>
              <p className="font-medium text-white">
                Cada estrutura societária e patrimonial é minuciosamente planejada e executada de forma personalizada, conforme os objetivos, as necessidades e as situações existentes (família, patrimônio, empresas, ativos, passivos e etc.).
              </p>
            </div>
          </div>

          {/* VANTAGENS EXCLUSIVAS DO PLANEJAMENTO 4.0 (HOLDING FAMILIAR) - Os 18 Cards Exatos (Item i) */}
          <div className="mb-10 text-center">
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6E27A] uppercase tracking-wider mb-8">
              VANTAGENS EXCLUSIVAS DO PLANEJAMENTO 4.0 (HOLDING FAMILIAR)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {vantagensExclusivas.map((vantagem, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/30 flex items-start gap-3 hover:border-[#D4AF37] transition-all card-hover-interactive"
                >
                  <div className="w-6 h-6 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#F6E27A] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                    {vantagem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tabela Completa de Custos: CUSTOS: INVENTÁRIO X HOLDING FAMILIAR (Item i) */}
      <section id="tabela-comparativa" className="py-20 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 bg-gradient-to-b from-[#09152B] to-[#071122] p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              {/* Frase dourada antes do título em branco (Item i) */}
              <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
                ESTUDO COMPARATIVO
              </span>
              {/* Título em branco (Item i) */}
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                CUSTOS: INVENTÁRIO X HOLDING FAMILIAR
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-sans-body">
                A título de exemplo, consideramos um patrimônio adquirido por R$ 1.000.000,00, com valor de mercado atual de R$ 1.500.000,00, tem um ganho de capital de R$ 500.000,00.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#D4AF37]/35 shadow-inner">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
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

            {/* Box: ECONOMIA COM A HOLDING FAMILIAR (Item i) */}
            <div className="mt-8 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#0E1F3D] via-[#0B1A35] to-[#0E1F3D] border border-[#D4AF37] text-center shadow-xl">
              <p className="text-xs uppercase tracking-widest text-[#E5C158] font-bold mb-1">
                ECONOMIA COM A HOLDING FAMILIAR
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

      {/* 6. Box: FAÇA O SEU PLANEJAMENTO 4.0 (Item i) */}
      <section className="py-16 bg-[#050B14] border-b border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#071122] via-[#0E1F3D] to-[#071122] border-2 border-[#D4AF37]/50 shadow-2xl text-center">
            {/* Título: FAÇA O SEU PLANEJAMENTO 4.0 em vez de "Agende a sua proteção patrimonial hoje mesmo" (Item i) */}
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-3">
              FAÇA O SEU PLANEJAMENTO 4.0
            </h3>
            {/* Texto exato do Item i */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8 font-light">
              Agende, hoje mesmo, o seu Diagnóstico de Viabilidade e saiba porque o PLANEJAMENTO PATRIMONIAL 4.0 VIA HOLDING FAMILIAR é a sua melhor opção para perpetuar o seu legado.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleOpenViabilidadeModal}
                className="btn-gold-luxury group w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>AGENDAR DIAGNÓSTICO DE VIABILIDADE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleDirectWhatsApp()}
                className="btn-secondary-luxury group w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>AGENDAR PELO WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Seção: PARA QUEM É A HOLDING FAMILIAR? (Item i) */}
      <section className="py-16 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
            PERFIL E ABRANGÊNCIA
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4">
            PARA QUEM É A HOLDING FAMILIAR?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8 font-light">
            O PLANEJAMENTO PATRIMONIAL 4.0 foi desenvolvido para quem já tem ou pretende adquirir patrimônio, já tem ou pretende ter filhos e para:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {publicoAlvo.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/30 flex items-center justify-center text-center card-hover-interactive"
              >
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Seção: HEAD JURÍDICO (Item i) */}
      <section className="py-20 bg-[#050B14] border-b border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Frase inicial em dourado: ADVOCACIA ESTRATÉGICA DESDE 1986 (Item i) */}
          <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
            ADVOCACIA ESTRATÉGICA DESDE 1986
          </span>
          {/* Título: HEAD (branca) JURÍDICO (dourada) (Item i) */}
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-white">HEAD </span>
            <span className="gold-text-gradient">JURÍDICO</span>
          </h2>
          {/* Subtítulo: DR. ALDO LEÃO (Item i) */}
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F6E27A] uppercase tracking-wider mb-6">
            DR. ALDO LEÃO
          </h3>

          {/* Texto exato da página Head Jurídico conforme Item i */}
          <div className="space-y-4 text-xs sm:text-sm md:text-base text-slate-300 font-sans-body leading-relaxed text-justify sm:text-center font-light mb-8 max-w-3xl mx-auto">
            <p>
              Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar iniciado em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira.
            </p>
            <p>
              A ALDO LEÃO ADVOCACIA ESTRATÉGICA representa a convergência entre a tradição jurídica centenária de três gerações e a inovação tecnológica da advocacia estratégica.
            </p>
            <p>
              Com uma trajetória de mais de 40 anos de Excelência Jurídica, unimos o rigor técnico do Direito à inteligência jurídica na gestão patrimonial e empresarial para a perpetuação do seu legado.
            </p>
            <p>
              O Dr. Aldo Leão possui extensa produção jurídica, com mais de uma centena de Artigos Jurídicos e Livros Digitais publicados, com uma reconhecida trajetória profissional, liderança jurídica e docência superior, que lhe rendeu convites para realização de palestras sobre temas jurídicos importantes.
            </p>
          </div>

          {/* Foto de palestra do Dr. Aldo Leão (Item 2 do dia 23/10/26: foto exclusiva sem repetir com o site) */}
          <div className="max-w-md mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#070F1E] group">
            <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden relative">
              <img
                src="/img/palestra-1.jpg"
                alt="Dr. Aldo Leão em Palestra sobre Planejamento Patrimonial 4.0"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/palestra-2.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-3 bg-[#071122] border-t border-[#D4AF37]/25 text-center">
              <p className="font-cinzel text-xs font-bold text-[#F6E27A] tracking-wider uppercase">
                ALDO LEÃO · DESDE 1986 ADVOCACIA ESTRATÉGICA
              </p>
              <p className="text-[10px] text-slate-300 font-light mt-0.5">
                Conferência e Liderança em Planejamento Patrimonial 4.0
              </p>
            </div>
          </div>

          {/* Assinatura do Dr. Aldo Leão centralizada e maior com animação iluminada (Item i e Item 6) */}
          <div className="flex justify-center mb-8">
            <img
              src="/img/assinatura-gold.png"
              alt="Assinatura Dr. Aldo Leão"
              className="h-20 sm:h-24 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(212,175,55,0.6)] animate-signature-glow"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
              }}
            />
          </div>

          {/* Botão azul-marinho com texto dourado SAIBA MAIS e Botão dourado AGENDAR DIAGNÓSTICO (Item 2 do dia 23/10/26) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsCurriculoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#071122] hover:bg-[#0B1A35] text-[#F6E27A] border-2 border-[#D4AF37] hover:border-[#F6E27A] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center"
            >
              SAIBA MAIS
            </button>

            <button
              onClick={handleOpenViabilidadeModal}
              className="btn-gold-luxury group w-full sm:w-auto px-7 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>AGENDAR DIAGNÓSTICO DE VIABILIDADE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Seção DÚVIDAS / PERGUNTAS FREQUENTES (Item i) */}
      <section className="py-20 bg-[#060D1A] border-b border-[#D4AF37]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Primeira frase em dourado: DÚVIDAS (Item i) */}
            <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-2">
              DÚVIDAS
            </span>
            {/* Título em branco: PERGUNTAS FREQUENTES (Item i) */}
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-tight">
              PERGUNTAS FREQUENTES
            </h2>
          </div>

          {/* Sanfona interativa com as 8 perguntas completas */}
          <div className="space-y-4 mb-14">
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
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#D4AF37]/15 bg-[#050B14]/60 whitespace-pre-line">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 10. Box final: AINDA TEM ALGUMA DÚVIDA? (Item i) */}
          {/* 10. Box final: ALGUMA DÚVIDA? (Item IV) */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-[#071122] via-[#0E1F3D] to-[#071122] border-2 border-[#D4AF37]/50 shadow-2xl text-center">
            {/* ALGUMA DÚVIDA? em dourado (Item IV) */}
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6E27A] mb-2 uppercase">
              ALGUMA DÚVIDA?
            </h3>
            {/* Texto em branco: Se tiver dúvida, entre em contato... (Item i e IV) */}
            <p className="text-xs sm:text-sm text-white mb-6 font-light max-w-xl mx-auto">
              Se tiver dúvida, entre em contato com um especialista da ALDO LEÃO ADVOCACIA ESTRATÉGICA.
            </p>
            <div className="flex items-center justify-center">
              {/* Botão dourado: FALAR COM O ESPECIALISTA (Item IV: único botão no card) */}
              <button
                onClick={() => handleDirectWhatsApp('Olá, gostaria de falar com um especialista sobre o Planejamento Patrimonial 4.0.')}
                className="btn-gold-luxury group w-full sm:w-auto px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>FALAR COM O ESPECIALISTA</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Rodapé exclusivo da Landing Page conforme Item i: só fica o texto de direitos autorais */}
      <footer className="bg-[#040810] border-t border-[#D4AF37]/20 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            © ALDO LEÃO ADVOCACIA ESTRATÉGICA – TODOS OS DIREITOS RESERVADOS
          </p>
          <div className="pt-3">
            <button
              onClick={onBackToSite}
              className="text-xs text-[#F6E27A] hover:underline cursor-pointer font-semibold"
            >
              ← Retornar à Página Inicial do Escritório
            </button>
          </div>
        </div>
      </footer>

      {/* Modal: Formulário de Agendamento da Sessão / Diagnóstico de Viabilidade */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/30 pb-4 mb-5">
              <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-bold block mb-1">
                HOLDING FAMILIAR 4.0
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white uppercase">
                DIAGNÓSTICO DE VIABILIDADE
              </h3>
            </div>

            <form onSubmit={handleSubmitViabilidade} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Nome Completo <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    WhatsApp <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(DDD) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(DDD) 0000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Cidade / UF
                  </label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    placeholder="Sua cidade / estado"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold-luxury w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'ENVIANDO...' : 'ENVIAR PARA O WHATSAPP'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Currículo do Dr. Aldo Leão (Botão SAIBA MAIS do Head Jurídico) */}
      {isCurriculoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setIsCurriculoModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/30 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold block mb-1">
                TERCEIRA GERAÇÃO FAMILIAR DESDE 1986
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase">
                Dr. ALDO LEÃO
              </h3>
              <p className="text-xs text-[#F6E27A] mt-1 font-semibold uppercase tracking-wider">
                ADVOCACIA ESTRATÉGICA · 40 ANOS DE EXPERIÊNCIA JURÍDICA
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-8">
              <p>
                Iniciada em 1986, a atuação do <strong className="text-white">Dr. Aldo Leão</strong> na terceira geração de advogados da família consolidou uma das trajetórias mais respeitadas na proteção patrimonial e empresarial no país.
              </p>
              <p>
                Unindo o rigor acadêmico, a experiência forense de quatro décadas e a inteligência jurídica na prestação de serviços de vanguarda, o Dr. Aldo Leão é o criador da metodologia de <strong>Planejamento Patrimonial 4.0 via Holding Familiar</strong>.
              </p>
              <p>
                Autor de mais de uma centena de artigos jurídicos e de 8 livros jurídicos digitais publicados pela Academia Leão Ferreira, conferencista nacional e consultor estratégico de famílias empresárias em todo o Brasil.
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setIsCurriculoModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                ← Voltar para a Landing Page
              </button>

              <button
                onClick={() => {
                  setIsCurriculoModalOpen(false);
                  handleOpenViabilidadeModal();
                }}
                className="btn-gold-luxury w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-md"
              >
                AGENDAR SESSÃO DE VIABILIDADE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé Fixo WhatsApp */}
      <UrgentHotlineFloat onOpenConsultation={onOpenConsultation} />
    </div>
  );
};
