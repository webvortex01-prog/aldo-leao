import React from 'react';
import { 
  GraduationCap, 
  MessageSquare, 
  Mic2,
  ArrowLeft
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface AcademiaLeaoSectionProps {
  onOpenConsultation?: (topic?: string) => void;
  onBackToSite?: () => void;
}

export const AcademiaLeaoSection: React.FC<AcademiaLeaoSectionProps> = ({ onOpenConsultation, onBackToSite }) => {
  const { siteConfig } = useSite();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleWhatsAppAcademia = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const msg = encodeURIComponent(
      'Olá Dr. Aldo Leão, gostaria de falar com a ACADEMIA LEÃO FERREIRA sobre palestras, cursos e publicações jurídicas.'
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <section id="academia-leao" className="py-16 md:py-24 bg-[#050B14] relative border-t border-[#D4AF37]/30 overflow-hidden min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="btn-secondary-luxury inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-xs font-semibold text-[#F6E27A] hover:bg-[#1A365D] hover:text-white transition-all cursor-pointer shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </div>

        {/* 1. Card inicial em dourado: apenas "CENTRO DE ESTUDOS JURÍDICOS SUPERIORES" (Item k) */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1F3D]/90 border border-[#D4AF37]/60 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <GraduationCap className="w-4 h-4 text-[#F6E27A]" />
            <span>CENTRO DE ESTUDOS JURÍDICOS SUPERIORES</span>
          </div>

          {/* 2. Título da página sem alteração: ACADEMIA LEÃO FERREIRA (Item k) */}
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mt-5 mb-6 [text-wrap:balance]">
            ACADEMIA <span className="gold-text-gradient">LEÃO FERREIRA</span>
          </h1>

          {/* 3. Texto que consta do projeto conforme Item k */}
          <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light text-center sm:text-justify mb-8">
            <p>
              Centro de Estudos Jurídicos Superiores da Aldo Leão Advocacia Estratégica, dedicado à produção e difusão do conhecimento jurídico especializado.
            </p>
            <p>
              A Academia realiza a publicação de artigos jurídicos, de livros digitais, promove a realização de palestras, cursos, treinamentos, mentorias, workshops e seminários especializados.
            </p>
            <p className="font-normal text-white">
              Nossa missão é transformar o conhecimento jurídico especializado em uma ferramenta de evolução pessoal e transformação.
            </p>
          </div>

          {/* 4. Frase em dourado com microfone: CONFERENCISTA E PALESTRANTE NACIONAL (Item k) */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mt-4 mb-3">
            <Mic2 className="w-4 h-4 text-[#F6E27A]" />
            <span>CONFERENCISTA E PALESTRANTE NACIONAL</span>
          </div>

          {/* 5. Texto em branco (Item k) */}
          <p className="text-sm sm:text-base text-white font-sans-body max-w-2xl mx-auto mb-6 leading-relaxed">
            O Dr. Aldo Leão é presença marcante em congressos, seminários, mentorias, workshops, fóruns empresariais e imobiliários e palestras.
          </p>

          {/* 6. Botão dourado "FALAR COM A ACADEMIA" (whatsapp) (Item k) */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleWhatsAppAcademia}
              className="btn-gold-luxury group px-8 py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>FALAR COM A ACADEMIA</span>
            </button>
          </div>
        </div>

        {/* 7. Imagem do box com o título "holding familiar & o risco da omissão" em que o Dr. Aldo está fazendo uma palestra com uma plateia (Item k) */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#071122] shadow-2xl">
          <div className="p-4 bg-gradient-to-r from-[#0E1F3D] to-[#071122] border-b border-[#D4AF37]/30 flex items-center justify-between">
            <span className="font-cinzel text-xs sm:text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
              Holding Familiar & o Risco da Omissão
            </span>
            <span className="text-[10px] text-[#E5C158] font-semibold uppercase tracking-wider">
              Palestra Magna com Plateia
            </span>
          </div>
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src="/img/palestra-1.jpg"
              alt="Dr. Aldo Leão - Palestra Holding Familiar & O Risco da Omissão"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/img/palestra.jpg.jpeg';
              }}
            />
          </div>
          <div className="p-4 bg-[#070F1E] text-center text-xs text-slate-300">
            Dr. Aldo Leão em conferência presencial ministrando sobre Planejamento Patrimonial 4.0 e Governança Familiar.
          </div>
        </div>
      </div>
    </section>
  );
};
