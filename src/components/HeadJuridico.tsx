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
    const duration = 900;
    const stepTime = Math.max(16, Math.floor(duration / targetYears));
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
        {/* Header da Seção: GESTÃO JURÍDICA DE VANGUARDA (Item 50) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-2">
            <span>{f?.sectionKicker || 'GESTÃO JURÍDICA DE VANGUARDA'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
            {f?.sectionTitle || 'HEAD'} <span className="gold-text-gradient">{f?.sectionHighlight || 'JURÍDICO'}</span>
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
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/dr-aldo-foco.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/20 to-transparent opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Conteúdo Oficial Conforme Item 35 */}
          <div className="lg:col-span-7 text-left">
            {/* Título: Dr. ALDO LEÃO com ADVOCACIA ESTRATÉGICA em dourado logo abaixo (Item 35) */}
            <div className="mb-4">
              <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {f?.name || 'Dr. ALDO LEÃO'}
              </h3>
              <p className="font-cinzel text-sm sm:text-base font-bold text-[#E5C158] tracking-widest uppercase mt-1">
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

            {/* Assinatura em tamanho maior, legível e centralizada (Item 35) */}
            <div className="my-6 py-4 border-y border-[#D4AF37]/25 flex flex-col items-center justify-center">
              <img
                src={f?.signatureImageUrl || '/img/assinatura-gold.png'}
                alt="Assinatura Dr. Aldo Leão"
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)] opacity-95"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                }}
              />
              <button
                onClick={() => setCurriculumModalOpen(true)}
                className="mt-3 px-5 py-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/50 text-[#F6E27A] hover:bg-[#162D58] hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                {f?.saibaMaisBtn || 'SAIBA MAIS'}
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
                  DESDE 1986 NUM LEGADO JURÍDICO CENTENÁRIO.
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

      {/* Modal de Currículo (Item 35): Título Dr. ALDO LEÃO, sem 'Currículo institucional completo', botão 'Livros Digitais Publicados' */}
      {curriculumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setCurriculumModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">
                {f?.name || 'Dr. ALDO LEÃO'}
              </h3>
              <p className="font-cinzel text-xs text-[#E5C158] uppercase font-bold tracking-wider mt-1">
                {f?.title || 'ADVOCACIA ESTRATÉGICA'}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              <p>
                {f?.modalBio1 || 'Advogado atuante há mais de quatro décadas, líder da terceira geração da advocacia familiar iniciada em 1908. Especialista em Planejamento Patrimonial 4.0 via Holding Familiar, Proteção Patrimonial e Sucessão Empresarial.'}
              </p>
              <p>
                {f?.modalBio2 || 'Possui ampla experiência acadêmica e forense, tendo publicado mais de 100 artigos jurídicos especializados e 6 livros jurídicos digitais com foco em proteção patrimonial e segurança jurídica.'}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={scrollToLivros}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md"
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
