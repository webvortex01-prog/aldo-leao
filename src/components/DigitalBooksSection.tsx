import React, { useState, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Layers, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Send,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Download
} from 'lucide-react';
import { DigitalBook } from '../types';
import { useSite } from '../context/SiteContext';

interface DigitalBooksSectionProps {
  onOpenConsultation?: (area?: string) => void;
}

export const DigitalBooksSection: React.FC<DigitalBooksSectionProps> = () => {
  const { siteConfig } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [summaryBook, setSummaryBook] = useState<DigitalBook | null>(null);
  const [formBook, setFormBook] = useState<DigitalBook | null>(null);
  
  // Form State com os campos obrigatórios solicitados: Nome, WhatsApp, Cidade
  const [fullName, setFullName] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Ordenação garantida do último publicado (mais novo) para o primeiro (mais antigo)
  const books = useMemo(() => {
    const list = [...(siteConfig.digitalBooks || [])];
    return list.sort((a, b) => (a.publicationOrder || 0) - (b.publicationOrder || 0));
  }, [siteConfig.digitalBooks]);

  const normalize = (str: string) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredBooks = useMemo(() => {
    const raw = searchTerm.trim();
    if (!raw) return books;
    const tokens = normalize(raw).split(/\s+/).filter(Boolean);

    return books.filter((b) => {
      const chaptersText = (b.chapters || []).join(' ');
      const searchable = normalize(
        `${b.title} ${b.area} ${b.author} ${b.year || ''} ${b.description || ''} ${b.sampleExcerpt || ''} ${chaptersText}`
      );
      return tokens.every((token) => searchable.includes(token));
    });
  }, [books, searchTerm]);

  // Paginação com exatamente 3 livros por página conforme solicitação
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;

  // Ajusta a página atual se a busca reduzir o total de páginas
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const currentBooks = filteredBooks.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (safeCurrentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1); // Volta para a primeira página
    }
    // Scroll suave até o topo da seção
    const el = document.getElementById('livros');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPage = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById('livros');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenForm = (book: DigitalBook) => {
    setFormBook(book);
    setSubmitSuccess(false);
    setFullName('');
    setWhatsApp('');
    setCity('');
    setEmail('');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsApp || !city) return;
    setSubmitting(true);

    // Envio para WhatsApp com mensagem oficial contendo os dados obrigatórios
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const message = encodeURIComponent(
      `*SOLICITAÇÃO DE LIVRO DIGITAL - ALDO LEÃO ADVOCACIA*\n\n` +
      `📖 *Livro Solicitado:* ${formBook?.title}\n` +
      `👤 *Nome Completo:* ${fullName}\n` +
      `📱 *WhatsApp:* ${whatsApp}\n` +
      `📍 *Cidade:* ${city}\n` +
      (email ? `✉️ *E-mail:* ${email}\n` : '') +
      `\nOlá Dr. Aldo Leão, preenchi os dados no portal e gostaria de receber gratuitamente o meu exemplar em PDF.`
    );
    try {
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    } catch (err) {
      console.warn(err);
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
    }, 400);
  };

  const handleNaoRecebi = () => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const message = encodeURIComponent(
      `Olá Dr. Aldo Leão, NÃO RECEBI O LIVRO DIGITAL solicitado no portal:\n\n` +
      `📖 *Livro:* ${formBook?.title}\n` +
      `👤 *Nome:* ${fullName || 'Solicitante'}\n` +
      `📱 *WhatsApp:* ${whatsApp}\n` +
      `📍 *Cidade:* ${city}\n\n` +
      `Poderia por gentileza me encaminhar por este WhatsApp? Obrigado!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      id="livros" 
      className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Frase em dourado acima do título */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1F3D]/80 border border-[#D4AF37]/40 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#E5C158] font-bold mb-4 shadow-inner">
            <BookOpen className="w-4 h-4 text-[#F6E27A]" />
            <span>{siteConfig.booksSection?.goldKicker || 'Acervo de Livros Digitais Publicados'}</span>
          </div>

          {/* Título da página: LIVROS (em branco) DIGITAIS (em dourado) */}
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5 [text-wrap:balance] animate-title-reveal">
            {siteConfig.booksSection?.titleWhite || 'LIVROS'}{' '}
            <span className="gold-text-gradient">{siteConfig.booksSection?.titleGold || 'DIGITAIS'}</span>
          </h2>

          {/* Texto oficial da página */}
          <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            <p>
              {siteConfig.booksSection?.paragraph1 || 'A produção intelectual sempre fez parte da tradição da ALDO LEÃO ADVOCACIA ESTRATÉGICA.'}
            </p>
            <p>
              {siteConfig.booksSection?.paragraph2 || 'Nesta página reunimos os livros digitais publicados por especialistas, para compartilhar GRATUITAMENTE o conhecimento jurídico com soluções estratégicas e boas práticas.'}
            </p>
            <p>
              {siteConfig.booksSection?.paragraph3 ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: siteConfig.booksSection.paragraph3.replace(
                      /Academia Le[ãa]o Ferreira/gi,
                      '<strong class="text-[#F6E27A] font-semibold">Academia Leão Ferreira</strong>'
                    )
                  }}
                />
              ) : (
                <>
                  Cada obra publicada pela{' '}
                  <strong className="text-[#F6E27A] font-semibold">Academia Leão Ferreira</strong>{' '}
                  representa nosso compromisso permanente com a excelência jurídica, a inovação e a difusão do conhecimento especializado.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Barra de Busca rápida */}
        <div className="max-w-3xl mx-auto mb-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar livro por título, área jurídica ou ano..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-20 py-3 rounded-xl bg-[#071122] border border-[#D4AF37]/40 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="btn-secondary-luxury px-5 py-3 rounded-xl bg-[#0A1730] border border-[#D4AF37]/45 text-[#F6E27A] font-bold text-xs uppercase tracking-wider shadow-md shrink-0 text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Ver Todos ({books.length})</span>
            </button>
          )}
        </div>

        {/* Grade de Livros (3 capas por página com transição) */}
        {filteredBooks.length === 0 ? (
          <div className="py-16 text-center text-slate-400 p-8 rounded-2xl bg-[#071122] border border-slate-800 max-w-2xl mx-auto">
            <p className="text-sm">Nenhum livro digital encontrado para "{searchTerm}".</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="mt-4 px-5 py-2.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-semibold text-[#F6E27A] hover:bg-[#D4AF37]/30 transition-colors cursor-pointer"
            >
              Ver todos os livros ({books.length})
            </button>
          </div>
        ) : (
          <div 
            key={`page-${safeCurrentPage}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-fade-in"
          >
            {currentBooks.map((book) => {
              return (
                <div
                  key={book.id}
                  className="rounded-2xl overflow-hidden bg-[#071122] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-300 shadow-2xl flex flex-col justify-between group text-left hover:-translate-y-1.5"
                >
                  <div>
                    {/* Capa do Livro Digital (Itens 13, 18, 41: Exibição integral sem cortes via object-contain em fundo escuro nobre, sem selos sobre a capa) */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#030710] border-b border-[#D4AF37]/30 flex items-center justify-center p-3">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={`Capa do livro: ${book.title}`}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0A1730] to-[#050B14]">
                          <BookOpen className="w-16 h-16 text-[#D4AF37] mb-3 opacity-60" />
                          <h4 className="font-cinzel text-lg text-white font-bold">{book.title}</h4>
                        </div>
                      )}
                    </div>

                    {/* Dados do Livro: Título, Autor, Ano da Edição e Área Jurídica */}
                    <div className="p-6">
                      {/* Área Jurídica */}
                      <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider block mb-2">
                        {book.area}
                      </span>

                      {/* Título do Livro Digital */}
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-3 line-clamp-2 min-h-[3.25rem]">
                        {book.title}
                      </h3>

                      {/* Autor e Ano da Edição (Apenas o ano, conforme solicitado) */}
                      <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-slate-300">
                        <p className="text-slate-200 font-medium">
                          Autor: <strong className="text-white font-bold">{book.author || 'Dr. Aldo Leão'}</strong>
                        </p>
                        <div className="flex items-center gap-1.5 text-[#E5C158] font-bold">
                          <Calendar className="w-3.5 h-3.5 text-[#F6E27A]" />
                          <span>{book.year || '2026'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ações: Botão BAIXAR e Botão VER SUMÁRIO */}
                  <div className="p-6 pt-0 flex flex-col gap-2.5">
                    <button
                      onClick={() => handleOpenForm(book)}
                      className="btn-gold-luxury w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-98 text-slate-950 font-black text-xs uppercase tracking-wider text-center cursor-pointer shadow-lg flex items-center justify-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4 text-black" />
                      <span>BAIXAR</span>
                    </button>

                    <button
                      onClick={() => setSummaryBook(book)}
                      className="btn-secondary-luxury w-full py-2.5 px-3 rounded-xl bg-[#0A1730] hover:bg-[#0E1F3D] border border-[#D4AF37]/35 text-[#F6E27A] text-xs font-semibold uppercase tracking-wider text-center cursor-pointer transition-all"
                    >
                      VER SUMÁRIO
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rodapé da Grade com Botão "MAIS LIVROS" e Paginação localizada à direita */}
        {filteredBooks.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#071122] border border-[#D4AF37]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Botão MAIS LIVROS central/esquerdo em destaque */}
            <div className="w-full sm:w-auto">
              <button
                type="button"
                onClick={handleNextPage}
                className="btn-gold-luxury w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg text-center cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
              >
                <span>{safeCurrentPage < totalPages ? 'MAIS LIVROS' : 'VOLTAR AO INÍCIO'}</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Paginação localizada à direita para mostrar que tem outras páginas */}
            <div className="flex items-center gap-2 self-center sm:self-auto">
              <span className="text-xs text-slate-400 mr-2 font-medium">
                Página <strong className="text-white">{safeCurrentPage}</strong> de <strong className="text-white">{totalPages}</strong>
              </span>

              {/* Botão Anterior */}
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() => handleSelectPage(safeCurrentPage - 1)}
                className="p-2 rounded-lg bg-[#0A1730] border border-[#D4AF37]/30 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Pílulas de Páginas 1, 2, 3... */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = pageNum === safeCurrentPage;
                return (
                  <button
                    key={`page-pill-${pageNum}`}
                    type="button"
                    onClick={() => handleSelectPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-slate-950 shadow-md font-black scale-105'
                        : 'bg-[#0A1730] border border-[#D4AF37]/25 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Botão Próximo */}
              <button
                type="button"
                disabled={safeCurrentPage === totalPages}
                onClick={() => handleSelectPage(safeCurrentPage + 1)}
                className="p-2 rounded-lg bg-[#0A1730] border border-[#D4AF37]/30 text-slate-300 hover:text-[#F6E27A] hover:border-[#D4AF37] disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal 1: VER SUMÁRIO */}
      {summaryBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[88vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setSummaryBook(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabeçalho do Sumário */}
            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider block mb-1">
                LIVRO DIGITAL (PDF)
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {summaryBook.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Autor: <strong className="text-white">Dr. Aldo Leão</strong> | Edição: <strong className="text-[#F6E27A]">{summaryBook.year || '2026'}</strong>
              </p>
            </div>

            {/* Sumário */}
            <div className="mb-6">
              <h4 className="font-cinzel text-xs font-bold text-[#F6E27A] uppercase tracking-wider mb-4">
                Conteúdo & Capítulos da Obra
              </h4>

              <div className="space-y-2.5">
                {(summaryBook.chapters || []).map((chapter, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-lg bg-[#050B14] border border-[#D4AF37]/20 text-xs text-slate-200"
                  >
                    {chapter}
                  </div>
                ))}
              </div>

              {summaryBook.sampleExcerpt && (
                <div className="mt-5 p-4 rounded-xl bg-[#0E1F3D]/40 border border-[#D4AF37]/25 text-xs text-slate-300 italic">
                  "{summaryBook.sampleExcerpt}"
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const b = summaryBook;
                  setSummaryBook(null);
                  handleOpenForm(b);
                }}
                className="btn-gold-luxury flex-1 py-3 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-slate-950 text-xs font-bold uppercase tracking-wider text-center cursor-pointer shadow-md"
              >
                BAIXAR ESTE LIVRO DIGITAL
              </button>

              <button
                onClick={() => setSummaryBook(null)}
                className="py-3 px-5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: FORMULÁRIO BAIXAR LIVRO DIGITAL (Com os campos obrigatórios solicitados) */}
      {formBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#071122] rounded-xl border border-[#D4AF37]/60 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setFormBook(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              /* Tela ENVIO CONCLUÍDO COM SUCESSO com botão NÃO RECEBI O LIVRO DIGITAL */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white uppercase">
                  ENVIO CONCLUÍDO COM SUCESSO
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Sua solicitação do livro digital <strong>"{formBook.title}"</strong> foi recebida e encaminhada ao WhatsApp da Aldo Leão Advocacia.
                </p>
                <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 my-4 text-xs text-slate-300">
                  Em caso de dúvida ou se desejar receber o arquivo imediatamente pelo WhatsApp, clique no botão abaixo.
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleNaoRecebi}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>NÃO RECEBI O LIVRO DIGITAL</span>
                  </button>
                </div>
                <button
                  onClick={() => setFormBook(null)}
                  className="mt-3 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Fechar janela
                </button>
              </div>
            ) : (
              <div>
                <div className="border-b border-[#D4AF37]/25 pb-4 mb-5">
                  <h3 className="font-cinzel text-xl font-bold text-white uppercase">
                    BAIXAR LIVRO DIGITAL
                  </h3>
                  {/* Título do Livro Digital exibido automaticamente */}
                  <div className="mt-2 p-3 rounded-lg bg-[#050B14] border border-[#D4AF37]/30">
                    <span className="text-[10px] uppercase font-bold text-[#E5C158] block mb-0.5">Livro Solicitado:</span>
                    <p className="text-xs text-white font-semibold leading-snug">
                      {formBook.title}
                    </p>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 font-light">
                    Preencha os campos obrigatórios abaixo para receber gratuitamente seu exemplar em PDF.
                  </p>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-4">
                  {/* Campo Nome Completo */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Nome Completo <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo de Oliveira"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Campo WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      WhatsApp <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsApp}
                      onChange={(e) => setWhatsApp(e.target.value)}
                      placeholder="Ex: (51) 99808-8998"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Campo Cidade (Novo campo solicitado) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Cidade <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Porto Alegre / RS"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Campo E-mail (Opcional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      E-mail (opcional)
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
                      className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#050B14] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                    >
                      <Send className="w-4 h-4 text-black" />
                      <span>{submitting ? 'ENVIANDO...' : 'ENVIAR SOLICITAÇÃO'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
