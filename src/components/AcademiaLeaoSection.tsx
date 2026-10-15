import React, { useState } from 'react';
import { 
  GraduationCap, 
  Presentation, 
  Users, 
  BookOpen, 
  Award, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  MessageSquare, 
  Eye, 
  X, 
  CheckCircle2, 
  Mic2,
  Building2,
  TrendingUp
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface AcademiaLeaoSectionProps {
  onOpenConsultation?: (topic?: string) => void;
  onBackToSite?: () => void;
}

interface LecturePhoto {
  id: string;
  url: string;
  title: string;
  event: string;
  audience: string;
  topic: string;
  badge: string;
}

export const AcademiaLeaoSection: React.FC<AcademiaLeaoSectionProps> = ({ onOpenConsultation, onBackToSite }) => {
  const { siteConfig } = useSite();
  const [selectedPhoto, setSelectedPhoto] = useState<LecturePhoto | null>(null);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleWhatsAppLecture = (topic?: string) => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const msg = encodeURIComponent(
      `Olá Dr. Aldo Leão, gostaria de obter informações e agendar uma Palestra / Workshop Corporativo da Academia Leão Ferreira${topic ? ` sobre "${topic}"` : ''}.`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  const lecturePhotos: LecturePhoto[] = [
    {
      id: 'palestra-1',
      url: '/img/palestra-1.jpg',
      title: 'Holding Familiar 4.0 & O Risco da Omissão',
      event: 'Conferência Magna de Planejamento Patrimonial',
      audience: 'Empresários, Patriarcas e Operadores do Direito',
      topic: 'Estruturação societária, blindagem patrimonial preventiva e anulação das perdas de até 20% do inventário.',
      badge: 'Conferência Magna'
    },
    {
      id: 'palestra-2',
      url: '/img/palestra-2.jpg',
      title: 'A Nova Disciplina do ITCMD e a Reforma Tributária',
      event: 'Simpósio Nacional de Direito Sucessório & Tributário',
      audience: 'Líderes Corporativos e Gestores de Family Offices',
      topic: 'Impactos práticos da progressividade de alíquotas do ITCMD de até 16% e a urgência do planejamento sucessório em vida.',
      badge: 'Painel Executivo'
    },
    {
      id: 'palestra-3',
      url: '/img/palestra-3.jpg',
      title: 'Governança Corporativa e Sucessão Empresarial',
      event: 'Fórum de Gestão Estratégica & Longevidade Familiar',
      audience: 'Diretorias de Grupos Econômicos e Famílias Centenárias',
      topic: 'Mecanismos parassociais, Golden Shares, conselhos consultivos e transferência do controle familiar sem ruptura.',
      badge: 'Keynote Speaker'
    }
  ];

  const lectureTopics = [
    {
      title: 'Planejamento Patrimonial 4.0 via Holding Familiar',
      desc: 'Como proteger e perenizar o patrimônio familiar sem incorrer nas pesadas perdas financeiras e emocionais de um inventário judicial.',
      duration: '1h30 a 2h00',
      target: 'Empresários, Famílias e Produtores Rurais'
    },
    {
      title: 'O Impacto Imediato da Reforma Tributária nas Heranças',
      desc: 'Análise técnica da EC 132/2023, o aumento do ITCMD nos estados brasileiros e o custo exponencial da inércia patrimonial.',
      duration: '1h00 a 1h30',
      target: 'Gestores de Ativos, Contadores e Advogados'
    },
    {
      title: 'Governança e Proteção de Ativos da 1ª à 3ª Geração',
      desc: 'Lições práticas de mais de um século de história jurídica na preservação de empresas familiares e blindagem contra litígios.',
      duration: '1h30 a 2h00',
      target: 'Holdings, Famílias Empresárias e Associações'
    },
    {
      title: 'Gestão Estratégica de Riscos & Precedentes Superiores',
      desc: 'Como decisões judiciais de vanguarda no STJ e STF podem mitigar passivos milionários e reestruturar estratégias corporativas.',
      duration: '1h00 a 1h30',
      target: 'Departamentos Jurídicos e Diretorias'
    }
  ];

  const academiaPillars = [
    {
      icon: BookOpen,
      title: 'Produção Doutrinária & Obras',
      desc: 'Publicação contínua de livros jurídicos, e-books autorais do Dr. Aldo Leão e artigos de inteligência aplicados.'
    },
    {
      icon: Presentation,
      title: 'Palestras & Workshops In Company',
      desc: 'Apresentações de alto impacto para grupos empresariais, associações comerciais, cooperativas e eventos setoriais.'
    },
    {
      icon: Users,
      title: 'Mentorias e Formação Executiva',
      desc: 'Capacitação customizada para herdeiros, fundadores e advogados em estratégias avançadas de sucessão e holding.'
    },
    {
      icon: GraduationCap,
      title: 'Centro de Estudos Superiores',
      desc: 'Articulação entre a tradição jurídica iniciada em 1908 e as mais modernas teses contemporâneas do Direito 4.0.'
    }
  ];

  return (
    <section id="academia-leao" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 right-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Voltar button */}
        <div className="mb-8">
          <button
            onClick={() => {
              if (onBackToSite) {
                onBackToSite();
                window.scrollTo({ top: 0, behavior: 'instant' });
              } else {
                const el = document.getElementById('solucoes-excelencia');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-xs font-semibold text-[#F6E27A] hover:bg-[#1A365D] hover:text-white transition-all cursor-pointer shadow"
          >
            <span>← Voltar</span>
          </button>
        </div>

        {/* Section Header with Logo Showcase */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1F3D]/80 border border-[#D4AF37]/40 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-bold mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <GraduationCap className="w-4 h-4 text-[#F6E27A]" />
            <span>Centro de Estudos Jurídicos Superiores</span>
            <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
            <span>Órgão Cultural</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            ACADEMIA <span className="gold-text-gradient">LEÃO FERREIRA</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            O braço cultural, acadêmico e de formação da <strong className="text-white">Aldo Leão Advocacia Estratégica</strong>.
            Dedicado à difusão da alta cultura jurídica, publicação de obras de vanguarda e conferências de alto nível em todo o Brasil.
          </p>
        </div>

        {/* Feature Presentation Box: The Official Logo + Mission Statement */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/45 bg-gradient-to-r from-[#071122] via-[#0B1A35] to-[#071122] p-8 sm:p-12 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: The Official Logo of Academia Leão */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/50 to-[#F6E27A]/30 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl border-2 border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.35)] bg-gradient-to-b from-[#0E1F3D]/80 to-[#071122]/90 backdrop-blur-sm p-4 flex items-center justify-center">
                  <img
                    src="/img/academia-leao.png"
                    alt="Logo Oficial - Academia Leão Ferreira"
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_20px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/academia-leao.jpg';
                    }}
                  />
                </div>
              </div>

              <div className="mt-4">
                <span className="font-cinzel text-lg font-bold text-white tracking-wider block">
                  ACADEMIA LEÃO
                </span>
                <span className="text-[11px] font-semibold text-[#E5C158] uppercase tracking-[0.24em] block mt-0.5">
                  Estudos Jurídicos Superiores
                </span>
              </div>
            </div>

            {/* Right: The Core Mission & What is Academia Leão */}
            <div className="lg:col-span-8 text-left">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-bold mb-2">
                <span>FORMAÇÃO, DOUTRINA E LIDERANÇA</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                Conectando a Tradição Forense Centenária à Vanguarda da Gestão Jurídica 4.0
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6 font-light">
                <p>
                  Criada sob a inspiração dos 118 anos de história jurídica do escritório e das quatro décadas de atuação do
                  <strong className="text-white font-medium"> Dr. Aldo Leão Ferreira Filho</strong>, a
                  <strong className="text-[#F6E27A] font-medium"> Academia Leão Ferreira</strong> atua como um núcleo de excelência
                  intelectual focado em capacitar patriarcas, matriarcas, empresários, executivos e advogados para os desafios do patrimônio e da sucessão no século XXI.
                </p>
                <p>
                  Através de conferências, livros digitais, cursos in company e artigos de inteligência, a Academia Leão
                  desmistifica temas complexos do Direito — como a blindagem patrimonial preventiva, a governança corporativa e os
                  impactos da Reforma Tributária — transformando a ciência jurídica em proteção concreta e perene para famílias brasileiras.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleWhatsAppLecture()}
                  className="px-6 py-3 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contratar Palestra / Mentoria</span>
                </button>

                <a
                  href="#livros"
                  className="px-5 py-3 rounded text-xs font-semibold uppercase tracking-wider text-slate-200 border border-[#D4AF37]/50 hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#F6E27A]" />
                  <span>Ver Livros Publicados</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section Sub-Header: Dr. Aldo Leão como Palestrante */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-2">
            <Mic2 className="w-4 h-4 text-[#F6E27A]" />
            <span>CONFERENCISTA & PALESTRANTE NACIONAL</span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            DR. ALDO LEÃO <span className="gold-text-gradient">NOS PALCOS DO BRASIL</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 font-sans-body">
            Com presença marcante em congressos jurídicos, fóruns empresariais e encontros corporativos,
            o Dr. Aldo Leão leva clareza, autoridade e soluções práticas para audiências qualificadas.
          </p>
        </div>

        {/* Gallery of Lecture Photos (Real photos: palestra, palestra3, palestra4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {lecturePhotos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 bg-[#071122] shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0A1424]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback
                      if (photo.id === 'palestra-1') (e.currentTarget as HTMLImageElement).src = '/img/palestra.jpg.jpeg';
                      if (photo.id === 'palestra-2') (e.currentTarget as HTMLImageElement).src = '/img/palestra3.jpg.jpeg';
                      if (photo.id === 'palestra-3') (e.currentTarget as HTMLImageElement).src = '/img/palestra4.jpg.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071122] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#071122]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] font-bold uppercase tracking-wider text-[#F6E27A] flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#F6E27A]" />
                    <span>{photo.badge}</span>
                  </div>

                  {/* Zoom button */}
                  <button
                    onClick={() => setSelectedPhoto(photo)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#071122]/90 hover:bg-[#0E1F3D] backdrop-blur-md border border-[#D4AF37]/50 text-white transition-all cursor-pointer shadow-lg hover:border-[#F6E27A]"
                    title="Ampliar foto"
                  >
                    <Eye className="w-4 h-4 text-[#F6E27A]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#E5C158] block mb-1">
                    {photo.event}
                  </span>
                  <h4 className="font-cinzel text-base font-bold text-white mb-2 leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans-body mb-3 font-light">
                    {photo.topic}
                  </p>
                  <div className="p-2.5 rounded-lg bg-[#050B14] border border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-200">Público:</strong> {photo.audience}
                  </div>
                </div>
              </div>

              {/* Bottom CTA on card */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleWhatsAppLecture(photo.title)}
                  className="w-full py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#F6E27A] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Solicitar Tema Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Topics Box: Keynote Catalog */}
        <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#071122] p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-6 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold block mb-1">
                GRADE DE TEMAS
              </span>
              <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Palestras Disponíveis para Eventos e Workshops Corporativos
              </h4>
            </div>

            <button
              onClick={() => handleWhatsAppLecture()}
              className="px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer shadow-md shrink-0 self-start sm:self-auto"
            >
              Consultar Disponibilidade de Agenda
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lectureTopics.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6E27A] px-2.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                      Duração: {item.duration}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Módulo Presencial / Digital
                    </span>
                  </div>
                  <h5 className="font-cinzel text-sm sm:text-base font-bold text-white mb-2">
                    {item.title}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans-body mb-3">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    <strong>Indicado para:</strong> {item.target}
                  </span>
                  <button
                    onClick={() => handleWhatsAppLecture(item.title)}
                    className="text-[#F6E27A] hover:underline font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Contratar</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Lecture Photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#071122] rounded-2xl border-2 border-[#D4AF37]/70 shadow-2xl p-6 max-h-[90vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                {selectedPhoto.event}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                {selectedPhoto.title}
              </h3>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/50 mb-6 bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full max-h-[500px] object-contain"
              />
            </div>

            <div className="p-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/25 text-xs text-slate-300 leading-relaxed mb-6 space-y-2">
              <p>
                <strong className="text-white">Descrição do Módulo:</strong> {selectedPhoto.topic}
              </p>
              <p>
                <strong className="text-white">Público-alvo atendido:</strong> {selectedPhoto.audience}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  handleWhatsAppLecture(selectedPhoto.title);
                  setSelectedPhoto(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Solicitar Proposta desta Palestra</span>
              </button>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-full sm:w-auto px-6 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
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
