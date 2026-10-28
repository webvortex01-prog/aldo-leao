import React, { useState, useEffect, useRef } from 'react';
import { Scale, CheckCircle2, X, PhoneCall, BookOpen, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface HeadJuridicoProps {
  onOpenConsultation: () => void;
  onGoToLandingPage?: () => void;
}

export const HeadJuridico: React.FC<HeadJuridicoProps> = ({
  onOpenConsultation
}) => {
  const { siteConfig } = useSite();
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);

  // Contador de 40 anos animado (Item 21)
  const currentYear = 2026;
  const targetYears = currentYear - 1986; // 40
  const [count, setCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const duration = 2800; // Item 8: velocidade reduzida do contador para leitura suave
    const stepTime = Math.max(30, Math.floor(duration / targetYears));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= targetYears) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, targetYears]);

  const scrollToLivros = () => {
    setCurriculumModalOpen(false);
    const el = document.getElementById('livros');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const f = siteConfig.founder;

  return (
    <section id="head-juridico" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header da Seção: ADVOCACIA ESTRATÉGICA DESDE 1986 e Dr. ALDO LEÃO (Item IV) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-2">
            <span>ADVOCACIA ESTRATÉGICA DESDE 1986</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
            <span className="text-white">Dr. ALDO</span> <span className="gold-text-gradient">LEÃO</span>
          </h2>
        </div>

        {/* Main Grid: Foto do escritório e Bio oficial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Coluna Esquerda: Imagem no escritório sem miniaturas, sem badge sobreposta, limpa e elegante (Item 35) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/30 to-transparent rounded-2xl blur-md" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#071122]">
                <div className="aspect-[3/4] relative overflow-hidden bg-[#0A1424]">
                  <img
                    src={f?.photoUrl || '/img/dr-aldo-reuniao.jpg'}
                    alt={`${f?.name || 'Dr. Aldo Leão'} no Escritório`}
                    className="w-full h-full object-cover object-top animate-photo-soft-zoom hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/dr-aldo-foco.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/20 to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Conteúdo Oficial Conforme Item 35 e Item IV (Sem repetição do nome) */}
          <div className="lg:col-span-7 text-left">
            <div className="mb-4">
              <p className="font-cinzel text-sm sm:text-base font-bold text-[#E5C158] tracking-widest uppercase">
                {f?.title || 'ADVOCACIA ESTRATÉGICA'}
              </p>
            </div>

            {/* Texto exato da página conforme Item 35 */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
              <p>
                {f?.bioParagraph1 || 'Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar iniciado em 1908 pelo Prof. Dr. Arnaldo da Silva Ferreira.'}
              </p>
              <p>
                {f?.bioParagraph2 || 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA representa a convergência entre a tradição jurídica centenária de três gerações e a inovação tecnológica da advocacia estratégica.'}
              </p>
              <p>
                {f?.bioParagraph3 || 'Com uma trajetória de mais de 40 anos de Excelência Jurídica, unimos o rigor técnico do Direito à inteligência jurídica na gestão patrimonial e empresarial para a perpetuação do seu legado.'}
              </p>
              <p>
                {f?.bioParagraph4 || 'O Dr. Aldo Leão possui extensa produção jurídica, com mais de uma centena de Artigos Jurídicos e Livros Digitais publicados, com uma reconhecida trajetória profissional, liderança jurídica e docência superior, que lhe rendeu convites para realização de palestras sobre temas jurídicos importantes.'}
              </p>
            </div>

            {/* Assinatura em tamanho maior com animação iluminada que surge e fica fixa (Item 35 e Item 6) */}
            <div className="my-6 py-4 border-y border-[#D4AF37]/25 flex flex-col items-center justify-center">
              <img
                src={f?.signatureImageUrl || '/img/assinatura-gold.png'}
                alt="Assinatura Dr. Aldo Leão"
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)] opacity-95 animate-signature-glow"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                }}
              />
              <button
                onClick={() => setCurriculumModalOpen(true)}
                className="mt-3 px-6 py-2.5 rounded-lg bg-[#060D1A] border-2 border-[#D4AF37] text-[#F6E27A] hover:bg-[#0E1F3D] hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                SAIBA MAIS
              </button>
            </div>

            {/* Diferenciais Estratégicos Conforme Item 50 */}
            <div className="space-y-2 mb-6">
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">
                Diferenciais Estratégicos:
              </h4>
              <div className="space-y-2 text-xs text-slate-200">
                {[
                  '40 + Anos de Advocacia Estratégica num legado jurídico centenário',
                  'Autor de Livros e Artigos Jurídicos Publicados',
                  'Referência nacional em Planejamento Patrimonial via Holding Familiar',
                  'Atendimento e processos 100% digitais no Brasil'
                ].map((diff, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botões mantidos conforme Item 35: AGENDAR CONSULTA DIGITAL e LIVROS DIGITAIS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{f?.btnConsultation || 'AGENDAR CONSULTA DIGITAL'}</span>
              </button>

              <button
                onClick={scrollToLivros}
                className="px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider text-slate-200 border border-[#D4AF37]/40 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] hover:border-[#D4AF37] transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#E5C158]" />
                <span>{f?.btnLivros || 'LIVROS DIGITAIS'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Item 21 e 53: Contador no final da página Head Jurídico, com a balança da justiça na cor azul-marinho e ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA */}
        <div ref={counterRef} className="pt-8 border-t border-[#D4AF37]/25">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#071122] via-[#0E1F3D] to-[#071122] border border-[#D4AF37]/35 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              {/* Ícone da balança da justiça na cor azul-marinho (fundo claro/dourado suave para contraste) */}
              <div className="w-14 h-14 rounded-full bg-[#E5C158] flex items-center justify-center text-[#071122] shadow-[0_0_15px_rgba(212,175,55,0.4)] shrink-0">
                <Scale className="w-7 h-7 text-[#071122]" />
              </div>
              <div>
                <p className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                  ADVOCACIA ESTRATÉGICA DE EXCELÊNCIA
                </p>
                <p className="text-xs text-white font-medium">
                  DESDE 1986 NUM LEGADO JURÍDICO CENTENÁRIO
                </p>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-cinzel text-4xl sm:text-5xl font-black text-[#F6E27A] tabular-nums">
                {count}
              </span>
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-white uppercase">
                {f?.counterSuffix || 'Anos+'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Currículo Completo do Dr. Aldo Leão (Item 20) */}
      {curriculumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/60 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setCurriculumModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do Modal (Item 20: Título Dr. ALDO LEÃO em branco e Frase dourada ADVOCACIA ESTRATÉGICA DESDE 1986) */}
            <div className="border-b border-[#D4AF37]/30 pb-5 mb-6">
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Dr. ALDO LEÃO
              </h3>
              <p className="font-cinzel text-xs sm:text-sm text-[#E5C158] uppercase font-bold tracking-widest mt-1">
                ADVOCACIA ESTRATÉGICA DESDE 1986
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              {/* Box/Card: TRAJETÓRIA PROFISSIONAL (Texto 1) */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#F6E27A] uppercase tracking-wider">
                  TRAJETÓRIA PROFISSIONAL
                </h4>
                <div className="space-y-3 text-slate-200 font-light">
                  <p>
                    A ALDO LEÃO ADVOCACIA ESTRATÉGICA representa a convergência entre a tradição jurídica centenária de três gerações e a inovação da Advocacia Estratégica.
                  </p>
                  <p>
                    Desde 1986, o Dr. Aldo Leão dá continuidade a um legado jurídico familiar iniciado em 1908 por seu avô paterno, o Prof. Dr. Arnaldo da Silva Ferreira, construindo uma trajetória de mais de quatro décadas de reconhecida relevância jurídica nacional.
                  </p>
                  <p>
                    Com rigor técnico, excelência e inteligência jurídica, o escritório atua na estruturação de soluções jurídicas estratégicas e personalizadas, especialmente voltadas à proteção e gestão do patrimônio e da empresa, com visão de longo prazo e foco na perpetuação de legados.
                  </p>
                  <p>
                    A trajetória do Dr. Aldo Leão reúne ainda extensa produção jurídica, com mais de uma centena de artigos publicados, além de livros digitais publicados, docência superior e destacada atuação em palestras, congressos, seminários, mentorias e workshops, além do exercício de funções de relevância jurídica, acadêmica e institucional.
                  </p>
                  <p className="text-[#F6E27A] font-semibold">
                    Tradição, inteligência jurídica e estratégia para proteger e perpetuar o seu patrimônio e empresa para as futuras gerações.
                  </p>
                </div>
              </div>

              {/* Grid: Especialização & Cargos e Funções */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Box/Card ESPECIALIZAÇÃO E EXCELÊNCIA JURÍDICA */}
                <div className="p-5 rounded-xl bg-[#0A1424] border border-[#D4AF37]/25 space-y-3">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                    ESPECIALIZAÇÃO E EXCELÊNCIA JURÍDICA
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>40 + Anos de Advocacia Estratégica (1986)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Escritório de Advocacia mais antigo do Brasil (3ª Geração)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Referência em Planejamento Patrimonial e Empresarial 4.0 (Holding Familiar)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Proteção Jurídica Patrimonial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Direito Imobiliário & Ativos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Direito Empresarial & Sucessão Corporativa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Direito Civil</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold">◙</span>
                      <span>Relações de Consumo</span>
                    </li>
                  </ul>
                </div>

                {/* Box/Card TRAJETÓRIA PROFISSIONAL (Item 57) */}
                <div className="p-5 rounded-xl bg-[#0A1424] border border-[#D4AF37]/25 space-y-3">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                    TRAJETÓRIA PROFISSIONAL
                  </h4>
                  <ul className="space-y-1.5 text-slate-300 text-xs">
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Advogado Estratégico</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Gestor Jurídico Patrimonial</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Gestor Jurídico Empresarial</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Palestrante e Coach Jurídico</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Procurador Municipal (20 Municípios no RS)</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Procurador do Banco do Brasil S/A</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Membro da Associação Nacional dos Gestores Ambientais</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Membro do Instituto dos Advogados do RS</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Presidente da Associação Brasileira do Meio Ambiente</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Assessor Jurídico da Assembleia Legislativa do RS</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Conselheiro do DMAE (Águas e Esgotos de POA)</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Diretor do Depto. de Direito Empresarial do IARGS</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Conselheiro do CONDECON POA (Defesa do Consumidor)</span></li>
                    <li className="flex items-start gap-2"><span className="text-[#D4AF37]">◙</span><span>Membro da 3ª Comissão de Ética e Disciplina da OABRS</span></li>
                  </ul>
                </div>
              </div>

              {/* Grid: Literatura Jurídica & Docência */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Box/Card LITERATURA JURÍDICA & PALESTRAS */}
                <div className="p-5 rounded-xl bg-[#0A1424] border border-[#D4AF37]/25 space-y-3">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                    LITERATURA JURÍDICA & PALESTRAS
                  </h4>
                  <p className="text-slate-200 font-medium">
                    ◙ Autor de mais de uma centena de Artigos Jurídicos Publicados
                  </p>
                  <p className="text-[#F6E27A] font-semibold mt-1">
                    ◙ Autor de Livros Digitais Publicados:
                  </p>
                  <ul className="space-y-1 text-slate-300 text-xs pl-2">
                    <li>► Planejamento Patrimonial 4.0 & o Alto Risco da Omissão</li>
                    <li>► Holding Familiar e Imobiliária</li>
                    <li>► Você tem Patrimônio e deseja protegê-lo juridicamente?</li>
                    <li>► Os Sete Cuidados na Compra do Imóvel</li>
                    <li>► Síndico Próspero: Administrando o Condomínio em Alta Performance</li>
                    <li>► Mercado de Carbono: Construindo um Futuro Sustentável</li>
                    <li>► LGPD: A Primeira Condenação no Brasil por Compartilhamento Ilegal de Dados</li>
                    <li>► Como Resolver as Dívidas Bancárias em Tempos de COVID-19?</li>
                  </ul>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs text-[#E5C158] font-bold">
                    <span>◙ Palestras</span>
                    <span>·</span>
                    <span>◙ Cursos</span>
                    <span>·</span>
                    <span>◙ Mentorias</span>
                    <span>·</span>
                    <span>◙ Workshops</span>
                  </div>
                </div>

                {/* Box/Card DOCÊNCIA (Item 58) */}
                <div className="p-5 rounded-xl bg-[#0A1424] border border-[#D4AF37]/25 space-y-3">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                    DOCÊNCIA
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">◙</span>
                      <span>Prof. da Faculdade de Direito da UNISINOS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">◙</span>
                      <span>Prof. da Escola Superior de Estudos Jurídicos do IARGS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">◙</span>
                      <span>Prof. da Escola Superior de Advocacia da OABRS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">◙</span>
                      <span>Prof. do Centro de Estudos do Trabalho – CETRA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">◙</span>
                      <span>Prof. da Faculdade de Direito das Faculdades Reunidas São Judas Tadeu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">◙</span>
                      <span>Prof. da Academia Leão Ferreira</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Texto 2: Síntese de Encerramento Oficial */}
              <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 text-slate-300 text-xs sm:text-sm space-y-2.5">
                <p>
                  "Desde 1986, o Dr. Aldo Leão conduz a terceira geração do legado jurídico familiar centenário, que teve início em 1908 com o seu Avô Paterno o Prof. Dr. Arnaldo da Silva Ferreira, no Escritório de Advocacia mais antigo do Brasil, consolidando a convergência entre a tradição jurídica centenária de três gerações, a inteligência jurídica e a inovação da Advocacia Estratégica."
                </p>
                <p>
                  "Atuando na Advocacia Estratégica desde 1986, com uma trajetória profissional de relevância jurídica nacional, pautada pelo rigor técnico, excelência e especialização na estruturação de soluções jurídicas avançadas, estratégicas e protetivas do patrimônio e da empresa para perpetuar o seu legado."
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={scrollToLivros}
                className="btn-gold-luxury px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md"
              >
                Livros Digitais Publicados
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
