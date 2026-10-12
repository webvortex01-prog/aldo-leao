import React, { useState } from 'react';
import { Award, BookOpen, Scale, Shield, CheckCircle2, FileText, ArrowRight, X, PhoneCall } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface HeadJuridicoProps {
  onOpenConsultation: () => void;
  onGoToLandingPage: () => void;
}

export const HeadJuridico: React.FC<HeadJuridicoProps> = ({
  onOpenConsultation,
  onGoToLandingPage
}) => {
  const { siteConfig } = useSite();
  const { founder } = siteConfig;
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);

  const aldoPhotos = [
    { url: '/img/dr-aldo-portrait.jpg', label: 'Retrato Oficial' },
    { url: '/img/dr-aldo-1.jpg', label: 'Dr. Aldo Forense' },
    { url: '/img/dr-aldo-2.jpg', label: 'Dr. Aldo Escritório' },
    { url: '/img/dr-aldo-3.jpg', label: 'Dr. Aldo Reunião' },
    { url: '/img/dr-aldo-4.jpg', label: 'Dr. Aldo Estratégico' },
    { url: '/img/dr-aldo-foco.jpg', label: 'Dr. Aldo Foco' },
    { url: '/img/apresentacao-dr-aldo.jpg', label: 'Apresentação Corporativa' }
  ];

  const [currentPhoto, setCurrentPhoto] = useState<string>(founder.photoUrl || '/img/dr-aldo-portrait.jpg');

  const handleWhatsApp = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      'Olá Dr. Aldo Leão, gostaria de agendar uma Consulta Digital com o Head Jurídico da ALDO LEÃO ADVOCACIA ESTRATÉGICA.'
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="head-juridico" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-2">
            <span>TERCEIRA GERAÇÃO DESDE 1986</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
            HEAD <span className="gold-text-gradient">JURÍDICO</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Badge with Real Photos Switcher */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/30 to-transparent rounded-2xl blur-md" />

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#091528]">
                <div className="aspect-[3/4] relative overflow-hidden bg-[#0A1424]">
                  <img
                    src={currentPhoto}
                    alt={`${founder.name} - Head Jurídico`}
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/img/dr-aldo-portrait.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/30 to-transparent opacity-90" />

                  {/* 40 Anos Badge overlay */}
                  <a
                    href="#selo-40-anos"
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#071122]/90 border border-[#D4AF37]/60 text-[10px] font-bold text-[#F6E27A] flex items-center gap-1.5 shadow-md hover:bg-[#0E1F3D] transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-[#F6E27A]" />
                    <span>40 Anos (1986–2026)</span>
                  </a>

                  {/* Name Tag on Portrait (Excluído PUCRS, Unisinos, OABRS, Procurador de 20 Municípios conforme Item 6) */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#070F1E]/95 backdrop-blur-md border border-[#D4AF37]/35 text-center">
                    <p className="font-cinzel text-xl font-bold text-white">
                      {founder.name}
                    </p>
                    <p className="text-xs text-[#E5C158] font-semibold tracking-wider uppercase mt-0.5">
                      Advocacia Estratégica
                    </p>
                  </div>
                </div>

                {/* Thumbnails of Dr. Aldo's photos */}
                <div className="p-3 bg-[#060D1A] border-t border-[#D4AF37]/20 flex items-center justify-center gap-2 overflow-x-auto">
                  {aldoPhotos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhoto(p.url)}
                      className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        currentPhoto === p.url
                          ? 'border-[#F6E27A] scale-105 shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                          : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                      }`}
                      title={p.label}
                    >
                      <img
                        src={p.url}
                        alt={p.label}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Specialties */}
          <div className="lg:col-span-7 text-left">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                DR. ALDO LEÃO
              </h3>
              <a
                href="#selo-40-anos"
                className="px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] font-bold text-[#F6E27A] uppercase tracking-wider"
              >
                Selo 40 Anos
              </a>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-4 font-light">
              {founder.bioParagraph1}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body mb-5 font-light">
              {founder.bioParagraph2}
            </p>

            {/* Diferenciais List (from PDF Page 22) */}
            <div className="space-y-2 mb-6">
              <h4 className="font-cinzel text-xs font-bold text-white uppercase tracking-wider mb-2">
                Diferenciais Estratégicos:
              </h4>
              {founder.differences.map((diff, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                  <span>{diff}</span>
                </div>
              ))}
            </div>

            {/* Signature & CTAs */}
            <div className="mb-6 pb-4 border-b border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <img
                  src="/img/assinatura-gold.png"
                  alt="Assinatura Dr. Aldo Leão"
                  className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] opacity-95"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/img/assinatura.png';
                  }}
                />
                <span className="text-[11px] text-slate-400">
                  Dr. Aldo Leão Ferreira Filho · OAB/RS
                </span>
              </div>

              <a
                href="#academia-leao"
                className="text-xs text-[#F6E27A] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Academia Leão & Palestras</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto text-center px-6 py-3 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                AGENDAR CONSULTA DIGITAL
              </button>

              <a
                href="#livros"
                className="w-full sm:w-auto justify-center px-5 py-3 rounded text-xs font-bold uppercase tracking-wider text-[#F6E27A] border border-[#D4AF37]/50 bg-[#0E1F3D] hover:bg-[#1A3F5D] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4 text-[#F6E27A]" />
                <span>LIVROS DIGITAIS</span>
              </a>

              <button
                onClick={() => setCurriculumModalOpen(true)}
                className="w-full sm:w-auto text-center px-5 py-3 rounded text-xs font-semibold uppercase tracking-wider text-slate-200 border border-slate-700 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-white transition-colors cursor-pointer"
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum & Specialties Modal */}
      {curriculumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[88vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setCurriculumModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                Currículo Institucional Completo
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
                Dr. Aldo Leão Ferreira Filho · Trajetória Profissional
              </h3>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              <div>
                <h4 className="font-cinzel text-base font-bold text-[#F6E27A] mb-2 uppercase">
                  Especialidades Jurídicas de Alta Performance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {founder.specialties.map((spec, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#050B14] border border-slate-800">
                      <p className="font-semibold text-white">{spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-cinzel text-base font-bold text-[#F6E27A] mb-2 uppercase">
                  Trajetória Profissional & Atuação Pública
                </h4>
                <p>
                  Graduado pela <strong>Pontifícia Universidade Católica do Rio Grande do Sul (PUC-RS)</strong>, com formação complementar
                  e atuação multidisciplinar nas áreas patrimonial, empresarial, societária, imobiliária, civil e relações de consumo.
                </p>
                <p className="mt-2">
                  Atuou com destacada relevância como <strong>Procurador Municipal de 20 Municípios no Rio Grande do Sul</strong>,
                  <strong>Procurador do Banco do Brasil S/A</strong>, Consultor e Assessor Jurídico de conselhos empresariais,
                  palestrante e membro do Instituto dos Advogados do Rio Grande do Sul (IARGS) e da OAB/RS.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-base font-bold text-[#F6E27A] mb-2 uppercase">
                  Liderança Acadêmica & Docência Superior
                </h4>
                <p>
                  Na vida acadêmica, atuou como <strong>Professor Universitário</strong>, orientador e examinador de monografias em instituições
                  de ensino superior, incluindo a conceituada Faculdade de Direito da <strong>Universidade do Vale do Rio dos Sinos (Unisinos)</strong>,
                  contribuindo para a formação de novas gerações de juristas.
                </p>
              </div>

              <div>
                <h4 className="font-cinzel text-base font-bold text-[#F6E27A] mb-2 uppercase">
                  Literatura Jurídica Produzida & Livros Publicados
                </h4>
                <p className="mb-3">
                  Autor de mais de uma centena de artigos jurídicos e livros digitais de ampla circulação, com destaque para
                  <em>"Planejamento Patrimonial 4.0 & o Alto Risco da Omissão"</em>, <em>"Holding Familiar e Imobiliária"</em>,
                  <em>"Você tem Patrimônio e deseja protegê-lo juridicamente?"</em> e <em>"Os Sete Cuidados na Compra do Imóvel"</em>.
                </p>
                <a
                  href="#livros"
                  onClick={() => setCurriculumModalOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#0E1F3D] border border-[#D4AF37]/50 text-xs font-bold text-[#F6E27A] hover:bg-[#1A3F5D] transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Acessar as 6 Obras & Baixar E-Books em PDF</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-4 items-center">
              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-[#050B14] bg-[#25D366] hover:bg-[#20ba59] transition-colors"
              >
                Chamar Dr. Aldo no WhatsApp Oficial
              </button>

              <button
                onClick={() => setCurriculumModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
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
