import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  X, 
  Bookmark, 
  ChevronRight, 
  Share2, 
  Phone,
  Eye,
  Award,
  Hash,
  Calendar,
  Layers,
  ArrowDownToLine,
  MessageSquare
} from 'lucide-react';
import { DigitalBook } from '../types';
import { useSite } from '../context/SiteContext';

interface DigitalBooksSectionProps {
  onOpenConsultation?: (area?: string) => void;
}

export const DigitalBooksSection: React.FC<DigitalBooksSectionProps> = ({ onOpenConsultation }) => {
  const { siteConfig } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<DigitalBook | null>(null);
  const [downloadModalBook, setDownloadModalBook] = useState<DigitalBook | null>(null);
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const books = siteConfig.digitalBooks || [];

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.area.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [books, searchTerm]);

  // Handle direct file download generation
  const triggerPdfDownload = (book: DigitalBook) => {
    const content = `================================================================================
ALDO LEÃO ADVOCACIA ESTRATÉGICA · FUNDADA EM 1908
BIBLIOTECA JURÍDICA E OBRAS DIGITAIS DO DR. ALDO LEÃO
================================================================================

TÍTULO DA OBRA: ${book.title}
AUTOR: ${book.author}
ÁREA DE ESPECIALIDADE: ${book.area}
ANO: ${book.year || '2026'} | PÁGINAS: ${book.pages || 'N/A'} | ISBN: ${book.isbn || 'N/A'}
FORMATO: ${book.format || 'E-Book Digital'}

--------------------------------------------------------------------------------
SÍNTESE EXECUTIVA & APRESENTAÇÃO DA OBRA
--------------------------------------------------------------------------------
${book.description}

--------------------------------------------------------------------------------
EXCERTO / INTRODUÇÃO DA OBRA
--------------------------------------------------------------------------------
"${book.sampleExcerpt || 'Obra técnica voltada para proteção patrimonial, direito societário e governança familiar 4.0.'}"

--------------------------------------------------------------------------------
ESTRUTURA CAPITULAR (SUMÁRIO DA OBRA)
--------------------------------------------------------------------------------
${book.chapters ? book.chapters.map((ch, idx) => `[Capítulo ${idx + 1}] ${ch}`).join('\n') : 'Sumário disponível sob consulta.'}

--------------------------------------------------------------------------------
EXPEDIENTE JURÍDICO & ATENDIMENTO
--------------------------------------------------------------------------------
Aldo Leão Advocacia Estratégica
Sede: Av. Cel. Lucas de Oliveira, 1255/502, Bairro Bela Vista, Porto Alegre - RS
Telefones Oficiais: (51) 998.088.998 / (51) 998.078.998
E-mail: aldoleao.adv@gmail.com / holdingfamiliarbr@gmail.com
Atendimento Nacional 100% Digital em todos os 27 estados e tribunais superiores.
================================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedTitle = book.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_');
    link.download = `Livro_Dr_Aldo_Leao_${sanitizedTitle}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleStartDownloadFlow = (book: DigitalBook) => {
    setDownloadModalBook(book);
    setDownloadSuccess(false);
  };

  const handleConfirmDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadModalBook) return;

    // Trigger local download
    triggerPdfDownload(downloadModalBook);
    setDownloadSuccess(true);
  };

  const handleAcquireFreeViaWhatsApp = (bookTitle: string) => {
    const rawPhone = siteConfig.contact?.whatsappNumber || '5551998088998';
    const message = encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de receber gratuitamente o livro digital "${bookTitle}".`
    );
    window.open(`https://wa.me/${rawPhone}?text=${message}`, '_blank');
  };

  const handleDownloadViaWhatsApp = (bookTitle: string) => {
    const rawPhone = siteConfig.contact?.whatsappNumber || '5551998088998';
    const message = encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, gostaria de baixar o livro digital gratuito "${bookTitle}".`
    );
    window.open(`https://wa.me/${rawPhone}?text=${message}`, '_blank');
  };

  return (
    <section id="livros" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#D4AF37]/10 via-[#0E1F3D]/20 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1F3D] border border-[#D4AF37]/40 text-[11px] uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3 shadow-inner">
            <BookOpen className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>BIBLIOTECA JURÍDICA GRATUITA</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            LIVROS <span className="gold-text-gradient">DIGITAIS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            A produção intelectual e bibliográfica é um dos pilares da excelência da Aldo Leão Advocacia Estratégica. Todas as obras são 100% gratuitas e disponibilizadas pelo Dr. Aldo Leão para orientação jurídica e planejamento patrimonial.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-3">
          <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shrink-0 w-full sm:w-auto text-center">
            TODOS OS LIVROS DIGITAIS (GRÁTIS)
          </div>

          <div className="flex-1 w-full relative">
            <input
              type="text"
              placeholder="Buscar livro por título ou tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl bg-[#071122] border border-[#D4AF37]/40 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F6E27A] transition-all shadow-inner"
            />
            <BookOpen className="w-4 h-4 text-[#E5C158] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="group relative rounded-2xl bg-[#071122] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Book Card Top Banner */}
                <div className="relative p-6 bg-gradient-to-b from-[#0B1A35] via-[#071122] to-transparent border-b border-[#D4AF37]/20">
                  <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-[#D4AF37] via-[#AA771C] to-[#8C6218]" />

                  <div className="flex items-center justify-between gap-2 mb-4 pl-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm bg-[#D4AF37] text-slate-950">
                      <BookOpen className="w-3 h-3 text-slate-950" />
                      <span>LIVRO DIGITAL GRATUITO</span>
                    </span>

                    <span className="text-[11px] font-cinzel text-slate-400 font-semibold">
                      {book.year || '2026'}
                    </span>
                  </div>

                  {/* Book Title */}
                  <div className="pl-2">
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#E5C158] font-bold tracking-wide">
                      Dr. Aldo Leão
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {book.area}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 pt-4 flex-grow flex flex-col justify-between space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#050B14] p-3 rounded-lg border border-slate-800">
                    <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{book.pages || 'Edição Digital Completa'}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[#F6E27A] font-semibold">Livro Digital (PDF Gratuito)</span>
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="p-6 pt-2 bg-[#050B14]/60 border-t border-slate-800/80 space-y-2.5">
                  <button
                    onClick={() => handleAcquireFreeViaWhatsApp(book.title)}
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F6E27A] to-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>Adquirir Livro Grátis</span>
                  </button>

                  <button
                    onClick={() => handleDownloadViaWhatsApp(book.title)}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-[#F6E27A] hover:bg-[#1A365D] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Livro Digital</span>
                  </button>

                  <button
                    onClick={() => setSelectedBook(book)}
                    className="w-full py-1.5 px-3 rounded-lg bg-transparent text-slate-400 hover:text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Sumário</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Institutional Guarantee */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#071122] via-[#0E1F3D] to-[#071122] border border-[#D4AF37]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#F6E27A]" />
            </div>
            <div>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
                Deseja um exemplar autografado ou mentoria jurídica executiva?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-sans-body mt-1">
                O Dr. Aldo Leão realiza mentorias fechadas e palestras para grupos familiares, cooperativas do agronegócio e associações empresariais.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onOpenConsultation && onOpenConsultation('Planejamento Patrimonial 4.0')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer"
            >
              Agendar com o Autor
            </button>
            <a
              href={`https://wa.me/${siteConfig.contact?.whatsappNumber || '5551998088998'}?text=${encodeURIComponent('Olá Dr. Aldo Leão! Tenho interesse em receber seus livros digitais gratuitos e saber sobre palestras/mentorias.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#25D366] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Oficial</span>
            </a>
          </div>
        </div>
      </div>

      {/* Book Details & Full Table of Contents Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-2xl border border-[#D4AF37]/60 shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-[#D4AF37]/30 pb-5 mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#D4AF37] text-slate-950 font-black">
                  LIVRO DIGITAL GRATUITO (DOWNLOAD LIBERADO)
                </span>
                <span className="text-xs text-[#E5C158] font-semibold">
                  · {selectedBook.area} · Ano {selectedBook.year || '2026'}
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
                {selectedBook.title}
              </h3>
              <p className="text-sm text-[#D4AF37] mt-1 font-semibold">
                Autor: {selectedBook.author} (OAB/RS 22.418)
              </p>
            </div>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#050B14] border border-slate-800 text-xs mb-6">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Formato:</span>
                <span className="text-white font-medium">Livro Digital (PDF)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Páginas:</span>
                <span className="text-white font-medium">{selectedBook.pages || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Valor:</span>
                <span className="text-emerald-400 font-bold">100% Gratuito</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Disponibilidade:</span>
                <span className="text-[#F6E27A] font-bold">Livre Acesso</span>
              </div>
            </div>

            {/* Synopsis */}
            <div className="space-y-4 mb-6">
              <h4 className="font-cinzel text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                Sinopse da Obra
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
                {selectedBook.description}
              </p>

              {selectedBook.sampleExcerpt && (
                <div className="p-4 rounded-xl bg-[#0B1A35]/60 border-l-4 border-[#D4AF37] italic text-xs sm:text-sm text-slate-200">
                  "{selectedBook.sampleExcerpt}"
                </div>
              )}
            </div>

            {/* Chapters / Table of Contents */}
            {selectedBook.chapters && selectedBook.chapters.length > 0 && (
              <div className="space-y-3 mb-8">
                <h4 className="font-cinzel text-sm font-bold text-[#F6E27A] uppercase tracking-wider">
                  Sumário Capitular da Obra
                </h4>
                <div className="space-y-2">
                  {selectedBook.chapters.map((chapter, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg bg-[#050B14] border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#F6E27A] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{chapter}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const b = selectedBook;
                    setSelectedBook(null);
                    handleStartDownloadFlow(b);
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Livro Grátis (PDF)</span>
                </button>

                <button
                  onClick={() => handleAcquireFreeViaWhatsApp(selectedBook.title)}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/60 text-[#F6E27A] font-bold text-xs uppercase tracking-wider hover:bg-[#1A3F5D] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Adquirir Livro Grátis</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedBook(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instant Download Modal */}
      {downloadModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#071122] rounded-2xl border border-[#D4AF37] shadow-2xl p-6 sm:p-8 text-slate-100">
            <button
              onClick={() => {
                setDownloadModalBook(null);
                setDownloadSuccess(false);
              }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {!downloadSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center mb-3">
                    <ArrowDownToLine className="w-6 h-6 text-[#F6E27A]" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-white">
                    Download Imediato do E-Book
                  </h3>
                  <p className="text-xs text-[#E5C158] mt-1 font-semibold">
                    "{downloadModalBook.title}"
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Insira seus dados para liberar o arquivo completo e receber atualizações jurídicas do Dr. Aldo Leão.
                  </p>
                </div>

                <form onSubmit={handleConfirmDownload} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Silveira"
                      value={downloadName}
                      onChange={(e) => setDownloadName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seu E-mail Corporativo ou Pessoal *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: carlos@empresa.com.br"
                      value={downloadEmail}
                      onChange={(e) => setDownloadEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp para Envio (Opcional)
                    </label>
                    <input
                      type="tel"
                      placeholder="Ex: (51) 99999-9999"
                      value={downloadPhone}
                      onChange={(e) => setDownloadPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F6E27A] to-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-slate-950" />
                      <span>Baixar E-Book Gratuito Agora</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Download Concluído com Sucesso!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans-body">
                  O material de <strong className="text-white">{downloadModalBook.title}</strong> foi baixado no seu dispositivo.
                </p>

                <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 text-xs text-slate-300 space-y-2">
                  <p className="text-[#E5C158] font-bold">
                    Deseja conversar diretamente com o Dr. Aldo Leão sobre o tema do livro?
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Nossa equipe pode analisar o seu caso patrimonial ou empresarial de forma personalizada.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setDownloadModalBook(null);
                      setDownloadSuccess(false);
                      if (onOpenConsultation) {
                        onOpenConsultation(downloadModalBook.area);
                      }
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                  >
                    Agendar Consulta
                  </button>
                  <button
                    onClick={() => {
                      setDownloadModalBook(null);
                      setDownloadSuccess(false);
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
