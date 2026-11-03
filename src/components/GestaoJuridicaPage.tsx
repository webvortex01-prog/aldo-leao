import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Briefcase, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingDown, 
  Award, 
  Cpu, 
  Building2, 
  MessageSquare, 
  PhoneCall, 
  Lock,
  Send,
  ChevronRight,
  X
} from 'lucide-react';
import { UrgentHotlineFloat } from './UrgentHotlineFloat';
import { useSite } from '../context/SiteContext';

interface GestaoJuridicaPageProps {
  onBackToSite: () => void;
  onOpenConsultation?: () => void;
}

export const GestaoJuridicaPage: React.FC<GestaoJuridicaPageProps> = ({
  onBackToSite,
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();
  const { contact } = siteConfig;
  const gj = siteConfig.gestaoJuridica;

  // Estado do Modal de Consulta Digital com os 6 campos solicitados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Garante que a página sempre abra no topo
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Gestão Jurídica 4.0 | Aldo Leão Advocacia Estratégica';
    return () => {
      document.title = 'Aldo Leão Advocacia Estratégica';
    };
  }, []);

  const handleWhatsAppClick = (customMsg?: string) => {
    const targetPhone = contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      customMsg || 'Olá Dr. Aldo Leão, gostaria de agendar uma Consulta Digital sobre Gestão Jurídica 4.0 para a minha empresa.'
    );
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !whatsapp) return;
    setSubmitting(true);

    const targetPhone = contact.whatsappNumber || '5551998088998';
    const msg = encodeURIComponent(
      `🏛️ *CONSULTA DIGITAL - GESTÃO JURÍDICA 4.0*\n` +
      `*Aldo Leão Advocacia Estratégica (Desde 1908)*\n\n` +
      `🏢 *Empresa:* ${companyName || 'Não informada'}\n` +
      `👤 *Consulente:* ${contactName}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n` +
      `📊 *Segmento de Atuação:* ${segment || 'Não informado'}\n` +
      (message ? `📝 *Mensagem:* ${message}\n\n` : '\n') +
      `Solicito o agendamento de Consulta Digital Estratégica sobre Gestão Jurídica 4.0.`
    );

    window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
    setTimeout(() => {
      setSubmitting(false);
      setIsModalOpen(false);
      setCompanyName('');
      setContactName('');
      setWhatsapp('');
      setEmail('');
      setSegment('');
      setMessage('');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans-body selection:bg-[#D4AF37]/30 selection:text-[#F6E27A]">
      {/* Top Header Navegação Nobre */}
      <header className="sticky top-0 z-50 bg-[#050B14]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Botão Voltar (Item 66: texto "Voltar") */}
          <button
            onClick={onBackToSite}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-slate-300 hover:text-[#F6E27A] transition-all duration-300 text-xs sm:text-sm font-semibold cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
            <span>{gj?.btnVoltarText || 'Voltar'}</span>
          </button>

          <div className="flex items-center gap-3">
            <img 
              src="/img/logo.jpg" 
              alt="Aldo Leão Advocacia Estratégica" 
              className="w-10 h-10 object-contain rounded-md hidden sm:block border border-[#D4AF37]/30"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/logo.png';
              }}
            />
            <div className="text-right hidden md:block">
              <span className="block font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                Aldo Leão Advocacia Estratégica
              </span>
              <span className="block text-[10px] text-[#E5C158] uppercase font-bold tracking-widest">
                Gestão Jurídica 4.0 · Desde 1908
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold-luxury inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-[0_0_18px_rgba(212,175,55,0.35)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Fale Conosco</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION CINEMATOGRÁFICA GESTÃO JURÍDICA 4.0 */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-24 border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src="/img/gestao-juridica-hero.jpg" 
            alt="Ambiente Corporativo de Gestão Jurídica 4.0" 
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/80 to-[#050B14]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl text-left">
            {/* Kicker Superior: Balança da Justiça + ALDO LEÃO ADVOCACIA ESTRATÉGICA (Item 66) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1F3D]/80 border border-[#D4AF37]/40 mb-6 backdrop-blur-sm shadow-md">
              <Scale className="w-4 h-4 text-[#E5C158]" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#E5C158]">
                {gj?.kickerBadge || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA'}
              </span>
            </div>

            {/* Título Principal Conforme Especificação */}
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#D4AF37] leading-[1.1] mb-4">
              {gj?.heroTitle || 'GESTÃO JURÍDICA 4.0'}
            </h1>

            {/* Subtítulo Conforme Especificação */}
            <h2 className="font-cinzel text-sm sm:text-lg md:text-xl font-bold text-[#F6E27A] tracking-wider uppercase mb-8 leading-snug">
              {gj?.heroSubtitle || 'ADVOCACIA ESTRATÉGICA, INTELIGÊNCIA JURÍDICA E GESTÃO DE VANGUARDA'}
            </h2>

            {/* Texto Introdutório e Vertentes (Item 66) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#040914]/75 border border-[#D4AF37]/35 backdrop-blur-md shadow-2xl mb-8 space-y-4">
              <p className="text-base sm:text-lg text-slate-100 font-sans-body font-normal leading-relaxed">
                {gj?.introParagraph1 || 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções avançadas em Gestão Jurídica 4.0 direcionadas para empresas de variados portes e segmentos. Unimos a experiência de mais de quatro décadas da terceira geração à solidez de um legado jurídico centenário (1908). Nossa atuação disponibiliza o suporte jurídico estratégico integral ou setorizado, voltado à segurança jurídica empresarial e patrimonial, reduzindo a carga tributária, mitigando os riscos e vulnerabilidades, proporcionando a conformidade legal necessária para a otimização de resultados.'}
              </p>
              <div className="border-t border-[#D4AF37]/25 pt-4 space-y-2">
                <p className="text-sm sm:text-base text-slate-200 font-sans-body font-light leading-relaxed">
                  Este serviço especializado e estratégico, possui duas vertentes de alta performance: <strong className="text-[#F6E27A] font-semibold">ORGANIZACIONAL</strong> e/ou <strong className="text-[#F6E27A] font-semibold">JUDICIAL</strong>.
                </p>
                <div className="pt-2">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#E5C158] uppercase mb-1">
                    ► GESTÃO JURÍDICA ORGANIZACIONAL
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans-body font-light leading-relaxed">
                    Com atuação jurídica de forma preventiva e estratégica na identificação de riscos, vulnerabilidades e inconformidades legais operacionais, reduzimos ou evitamos prejuízos financeiros e passivos futuros, além de proteger patrimônios e empresas.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de Ação do Hero */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-gold-luxury group inline-flex items-center justify-center gap-3 px-8 py-4 rounded text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:scale-[1.02] transition-all duration-300"
              >
                <span>{gj?.btnCtaHeroText || 'AGENDAR CONSULTA DIGITAL'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <a
                href="#frentes-estrategicas"
                className="btn-secondary-luxury inline-flex items-center justify-center gap-2 px-6 py-4 rounded text-xs sm:text-sm font-semibold tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730]/90 hover:bg-[#0E1F3D] cursor-pointer transition-all"
              >
                <span>CONHECER AS DUAS FRENTES DE ATUAÇÃO</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO PRINCIPAL DAS DUAS FRENTES DE ATUAÇÃO */}
      <section id="frentes-estrategicas" className="py-20 bg-gradient-to-b from-[#050B14] via-[#071122] to-[#050B14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Cabeçalho da Seção */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#E5C158] block mb-2">
              ARQUITETURA JURÍDICA CORPORATIVA
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-4">
              Duas Vertentes de Alta Performance para o Seu Negócio
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
            <p className="text-sm sm:text-base text-slate-300 font-light">
              Soluções completas e customizadas desenhadas sob medida para blindar, potencializar e perpetuar o patrimônio corporativo da sua empresa.
            </p>
          </div>

          <div className="space-y-16">
            {/* ========================================================
                FRENTE 1: GESTÃO JURÍDICA ORGANIZACIONAL (Prevenção e Compliance)
               ======================================================== */}
            <div className="relative rounded-2xl bg-[#071122]/90 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden p-6 sm:p-10 card-hover-interactive">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Badge e Título */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[11px] font-bold text-[#F6E27A] uppercase tracking-wider">
                    {gj?.frente1Badge || 'Frente Estratégica I'}
                  </span>
                  <span className="text-xs font-semibold text-[#E5C158] uppercase tracking-wider">
                    {gj?.frente1Subtitle || 'Blindagem Preventiva & Governança Corporativa'}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#D4AF37]">►</span> {gj?.frente1Title || 'GESTÃO JURÍDICA ORGANIZACIONAL'}
                  <span className="text-sm sm:text-lg font-normal text-[#E5C158] block sm:inline ml-0 sm:ml-2">
                    (Prevenção e Compliance)
                  </span>
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans-body mb-8 max-w-4xl">
                  {gj?.frente1Desc || 'Com atuação jurídica de forma preventiva e estratégica na identificação de riscos, vulnerabilidades e inconformidades legais operacionais, reduzimos ou evitamos prejuízos financeiros e passivos futuros, além de proteger patrimônios e empresas.'}
                </p>

                {/* Box azul-marinho: Diagnóstico Situacional Estratégico (Item 66) */}
                <div className="mb-6 p-5 rounded-xl bg-[#09152B] border-2 border-[#D4AF37]/45 shadow-lg">
                  <p className="text-xs sm:text-sm font-semibold text-[#F6E27A] uppercase tracking-wide leading-relaxed">
                    {gj?.frente1BoxTitle || 'O Gerenciamento Jurídico é estruturado por meio de um Diagnóstico Situacional Estratégico, que contempla:'}
                  </p>
                </div>

                {/* 4 Cards do Diagnóstico Estratégico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {/* Item 1 */}
                  <div className="p-5 rounded-xl bg-[#0A1730] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 flex items-start gap-4 shadow-lg group">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-[#E5C158]" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase mb-1">
                        {gj?.frente1Card1Title || 'Auditoria Preventiva'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {gj?.frente1Card1Desc || 'Auditoria preventiva da situação atual, contratos e fluxos corporativos;'}
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-5 rounded-xl bg-[#0A1730] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 flex items-start gap-4 shadow-lg group">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <Briefcase className="w-5 h-5 text-[#E5C158]" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase mb-1">
                        {gj?.frente1Card2Title || 'Análise Jurídica Especializada'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {gj?.frente1Card2Desc || 'Análise jurídica especializada alinhada ao modelo de negócios e setor de atuação;'}
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-5 rounded-xl bg-[#0A1730] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 flex items-start gap-4 shadow-lg group">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <ShieldAlert className="w-5 h-5 text-[#E5C158]" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase mb-1">
                        {gj?.frente1Card3Title || 'Mapeamento de Riscos e Vulnerabilidades'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {gj?.frente1Card3Desc || 'Mapeamento detalhado de riscos operacionais, tributários e inconformidades legais;'}
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="p-5 rounded-xl bg-[#0A1730] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 flex items-start gap-4 shadow-lg group">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <Cpu className="w-5 h-5 text-[#E5C158]" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white uppercase mb-1">
                        {gj?.frente1Card4Title || 'Soluções Jurídicas Estratégicas'}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {gj?.frente1Card4Desc || 'Desenvolvimento e implantação de soluções preventivas e estruturantes personalizadas;'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Box de Conclusão da Frente 1 (Item 66) */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-[#0E1F3D] to-[#0A1424] border border-[#D4AF37]/45 flex items-center gap-4">
                  <ShieldCheck className="w-7 h-7 text-[#F6E27A] shrink-0 hidden sm:block" />
                  <p className="text-xs sm:text-sm text-slate-100 font-sans-body font-normal leading-relaxed">
                    {gj?.frente1Conclusion || 'Transformamos a estrutura administrativa da sua empresa e do seu patrimônio em um ambiente juridicamente mais seguro, protegido, eficiente, preparado para o crescimento e a perpetuação sustentável do seu legado.'}
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================
                FRENTE 2: GESTÃO JURÍDICA JUDICIAL (Resiliência e Vantagem Competitiva)
               ======================================================== */}
            <div className="relative rounded-2xl bg-[#071122]/90 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden p-6 sm:p-10 card-hover-interactive">
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#0B1E3D]/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Badge e Título */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[11px] font-bold text-[#F6E27A] uppercase tracking-wider">
                    {gj?.frente2Badge || 'Frente Estratégica II'}
                  </span>
                  <span className="text-xs font-semibold text-[#E5C158] uppercase tracking-wider">
                    {gj?.frente2Subtitle || 'Contencioso Estratégico & Eficiência Decisória'}
                  </span>
                </div>

                <h3 className="font-cinzel text-xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#D4AF37]">►</span> {gj?.frente2Title || 'GESTÃO JURÍDICA JUDICIAL'}
                  <span className="text-sm sm:text-lg font-normal text-[#E5C158] block sm:inline ml-0 sm:ml-2">
                    (Resiliência e Vantagem Competitiva)
                  </span>
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans-body mb-8 max-w-4xl">
                  {gj?.frente2Desc || 'Nossa atuação estratégica no contencioso judicial é voltada à construção de empresas mais resilientes, competitivas e juridicamente mais protegidas num ecossistema societário inteligente e legal, através de três pilares essenciais:'}
                </p>

                {/* 3 Pilares Essenciais (Item 66) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  {/* Pilar 1 */}
                  <div className="p-6 rounded-xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/45 hover:border-[#D4AF37] transition-all duration-300 shadow-xl group">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-110 transition-transform">
                      <Scale className="w-6 h-6 text-[#E5C158]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C158] block mb-1">
                      Pilar 01 · Decisões
                    </span>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-white uppercase mb-2">
                      {gj?.frente2Pilar1Title || 'DECISÕES ASSERTIVAS'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {gj?.frente2Pilar1Desc || 'Segurança jurídica avançada para a tomada de decisões empresariais e patrimoniais mais assertivas;'}
                    </p>
                  </div>

                  {/* Pilar 2 */}
                  <div className="p-6 rounded-xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/45 hover:border-[#D4AF37] transition-all duration-300 shadow-xl group">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-110 transition-transform">
                      <TrendingDown className="w-6 h-6 text-[#E5C158]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C158] block mb-1">
                      Pilar 02 · Resultados
                    </span>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-white uppercase mb-2">
                      {gj?.frente2Pilar2Title || 'GESTÃO DE RESULTADOS'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {gj?.frente2Pilar2Desc || 'Otimização da gestão de litígios com foco na redução de riscos, vulnerabilidades e custos;'}
                    </p>
                  </div>

                  {/* Pilar 3 */}
                  <div className="p-6 rounded-xl bg-gradient-to-b from-[#0B1A35] to-[#071122] border-2 border-[#D4AF37]/45 hover:border-[#D4AF37] transition-all duration-300 shadow-xl group">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#F6E27A] mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-[#E5C158]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5C158] block mb-1">
                      Pilar 03 · Mercado
                    </span>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-white uppercase mb-2">
                      {gj?.frente2Pilar3Title || 'COMPETITIVIDADE'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {gj?.frente2Pilar3Desc || 'Fortalecimento da competitividade de mercado aliado à proteção jurídica patrimonial corporativa;'}
                    </p>
                  </div>
                </div>

                {/* Box de Impacto da Frente 2 (Item 66) */}
                <div className="p-5 sm:p-6 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 shadow-inner">
                  <p className="text-sm sm:text-base text-slate-200 font-sans-body font-light leading-relaxed">
                    {gj?.frente2Impact || 'A integração da experiência centenária, da inteligência jurídica de advogados especialistas ao cotidiano de empresas e patrimônios, proporciona proteção, estabilidade, eficiência e uma vantagem competitiva decisiva para o sucesso do seu negócio e do seu patrimônio familiar.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CONVERSÃO / AGENDAMENTO DIRETO (Item 66: Destaques + Botão com Modal) */}
      <section className="py-20 bg-[#050B14] relative border-t border-[#D4AF37]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 3 Destaques Mantidos Conforme Item 66 */}
          <div className="space-y-4 mb-10 max-w-2xl mx-auto text-left">
            <div className="flex items-start sm:items-center gap-3.5 p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-xs sm:text-sm text-slate-100 font-medium">
                {gj?.ctaHighlight1 || 'Atendimento Brasil 100% digital e confidencial com a mesma excelência jurídica do presencial.'}
              </span>
            </div>
            <div className="flex items-start sm:items-center gap-3.5 p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-xs sm:text-sm text-slate-100 font-medium">
                {gj?.ctaHighlight2 || 'Diagnóstico Estratégico Personalizado para o tamanho do seu negócio e patrimônio.'}
              </span>
            </div>
            <div className="flex items-start sm:items-center gap-3.5 p-4 rounded-xl bg-[#071122] border border-[#D4AF37]/35 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-[#E5C158] shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-xs sm:text-sm text-slate-100 font-medium">
                {gj?.ctaHighlight3 || 'Três Gerações de Excelência Jurídica dedicadas à perpetuação do seu legado.'}
              </span>
            </div>
          </div>

          {/* Botão AGENDAR CONSULTA DIGITAL (Abre o Formulário Modal - Item 66) */}
          <div className="inline-block">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-gold-luxury inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] cursor-pointer shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>{gj?.ctaButtonText || 'AGENDAR CONSULTA DIGITAL'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* MODAL COM OS 6 CAMPOS CONFORME ITEM 66 (Empresa, Consulente, WhatsApp, E-mail, Segmento de Atuação, Mensagem) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider block mb-1">
                AGENDAMENTO DE CONSULTA
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Gestão Jurídica 4.0
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Preencha os dados abaixo para direcionar seu atendimento ao WhatsApp institucional do Dr. Aldo Leão.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Campo 1: Empresa */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nome da sua empresa"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm"
                />
              </div>

              {/* Campo 2: Consulente (Nome) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Consulente (Seu Nome) <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm"
                />
              </div>

              {/* Campo 3 & 4: WhatsApp & E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    WhatsApp (com DDD) <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato@empresa.com.br"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Campo 5: Segmento de Atuação */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Segmento de Atuação
                </label>
                <input
                  type="text"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  placeholder="Ex: Indústria, Agronegócio, Tecnologia, Serviços..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm"
                />
              </div>

              {/* Campo 6: Mensagem */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descreva brevemente o momento corporativo ou os riscos que deseja mitigar..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] text-xs sm:text-sm resize-none"
                />
              </div>

              {/* Botão ENVIAR (Item 66) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold-luxury w-full py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{submitting ? 'ENVIANDO...' : 'ENVIAR'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>Sigilo Absoluto & Conformidade Ética OAB</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER DA PÁGINA */}
      <footer className="bg-[#03070E] border-t border-[#D4AF37]/30 py-10 text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-[#E5C158]" />
            <span className="font-cinzel text-xs font-bold text-white tracking-wider">
              ALDO LEÃO ADVOCACIA ESTRATÉGICA · DESDE 1908
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            © 1908 – 2026 ALDO LEÃO ADVOCACIA ESTRATÉGICA. TODOS OS DIREITOS RESERVADOS.
          </p>

          <button
            onClick={onBackToSite}
            className="text-[#E5C158] hover:text-white transition-colors underline text-xs font-semibold cursor-pointer"
          >
            Retornar ao Início
          </button>
        </div>
      </footer>

      {/* Botão Flutuante de Emergência WhatsApp */}
      <UrgentHotlineFloat onOpenConsultation={() => handleWhatsAppClick()} />
    </div>
  );
};
