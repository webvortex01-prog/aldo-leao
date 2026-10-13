import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Layers, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  Send 
} from 'lucide-react';
import { DigitalBook } from '../types';
import { useSite } from '../context/SiteContext';

interface DigitalBooksSectionProps {
  onOpenConsultation?: (area?: string) => void;
}

export const DigitalBooksSection: React.FC<DigitalBooksSectionProps> = () => {
  const { siteConfig } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [summaryBook, setSummaryBook] = useState<DigitalBook | null>(null);
  const [formBook, setFormBook] = useState<DigitalBook | null>(null);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const books = siteConfig.digitalBooks || [];

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const match = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.area.toLowerCase().includes(searchTerm.toLowerCase());
      return match;
    });
  }, [books, searchTerm]);

  const handleOpenForm = (book: DigitalBook) => {
    setFormBook(book);
    setSubmitSuccess(false);
    setFullName('');
    setWhatsApp('');
    setEmail('');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsApp) return;
    setSubmitting(true);

    // Envio para WhatsApp automaticamente
    const phone = '5551998088998';
    const message = encodeURIComponent(
      `Olá Dr. Aldo Leão, solicito o envio do Livro Digital gratuito:\n\n` +
      `📖 *LIVRO:* ${formBook?.title}\n` +
      `👤 *Nome Completo:* ${fullName}\n` +
      `📱 *WhatsApp:* ${whatsApp}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}`
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
    const phone = '5551998088998';
    const message = encodeURIComponent(
      `Olá Dr. Aldo Leão, NÃO RECEBI O LIVRO DIGITAL solicitado no site:\n\n` +
      `📖 *Livro:* ${formBook?.title}\n` +
      `👤 *Nome:* ${fullName || 'Solicitante'}\n` +
      `📱 *WhatsApp:* ${whatsApp}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n\n` +
      `Poderia por gentileza me encaminhar por este WhatsApp? Obrigado!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section id="livros" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: BIBLIOTECA JURÍDICA e LIVROS JURÍDICOS DIGITAIS (Item 12 e Item 41) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E1F3D] border border-[#D4AF37]/40 text-[11px] uppercase tracking-[0.24em] text-[#E5C158] font-bold mb-3 shadow-inner">
            <BookOpen className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>BIBLIOTECA JURÍDICA</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            LIVROS <span className="gold-text-gradient">JURÍDICOS DIGITAIS</span>
          </h2>

          {/* Texto exato solicitado no Item 41 */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            A produção intelectual e bibliográfica é um dos pilares da excelência da ALDO LEÃO ADVOCACIA ESTRATÉGICA, através da ACADEMIA LEÃO FERREIRA. Os livros digitais publicados são de distribuição gratuita.
          </p>
        </div>

        {/* Campo de Busca e Botão Todos os Livros Digitais sem número (Item 12 e 41) */}
        <div className="max-w-3xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-4">
          <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shrink-0 w-full sm:w-auto text-center">
            TODOS OS LIVROS DIGITAIS
          </div>

          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar livro por título ou área (ex: holding, imóvel, proteção)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071122] border border-[#D4AF37]/35 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* 6 Livros Digitais Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => {
            return (
              <div
                key={book.id}
                className="rounded-2xl overflow-hidden bg-[#071122] border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 transition-all duration-300 shadow-xl flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Top Header do Box com ícone 'Livro Digital' alinhado à esquerda (Item 41) */}
                  <div className="p-4 bg-gradient-to-r from-[#0B1A35] to-[#071122] border-b border-[#D4AF37]/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F6E27A]">
                        <BookOpen className="w-3.5 h-3.5 text-[#E5C158]" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                        Livro Digital
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-[#E5C158] uppercase">
                      {book.area}
                    </span>
                  </div>

                  <div className="p-6">
                    {book.coverImage && (
                      <div className="mb-4 aspect-[16/10] rounded-lg overflow-hidden border border-[#D4AF37]/35 bg-[#050B14] shadow-md">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    {/* Title */}
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-2">
                      {book.title}
                    </h3>

                    {/* Autor Dr. Aldo Leão (Item 12 e 41) */}
                    <p className="text-xs text-[#E5C158] font-medium mb-4">
                      Dr. Aldo Leão
                    </p>

                    {/* Box preto com Ano e Páginas conforme Item 41 */}
                    <div className="p-3 rounded-lg bg-[#050B14] border border-[#D4AF37]/20 flex items-center justify-between text-xs text-slate-300 mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span className="font-semibold">{book.year || '2026'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Layers className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>{book.pages || '144 páginas'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Botão Baixar Livro Digital centralizado e Botão Ver Sumário (Item 12 e 41) */}
                <div className="p-5 pt-0 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleOpenForm(book)}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#050B14] text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer shadow-md"
                  >
                    Baixar Livro Digital
                  </button>

                  <button
                    onClick={() => setSummaryBook(book)}
                    className="w-full py-2.5 rounded-lg bg-[#0A1730] hover:bg-[#0E1F3D] border border-[#D4AF37]/35 text-[#F6E27A] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all text-center cursor-pointer"
                  >
                    VER SUMÁRIO
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal 1: VER SUMÁRIO (Item 12 e Item 41) */}
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

            {/* Cabeçalho do Sumário: Formato Livro Digital (PDF), Autor Dr. Aldo Leão, sem ISBN nem sinopse (Item 41) */}
            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider block mb-1">
                LIVRO DIGITAL (PDF)
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {summaryBook.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Autor: <strong className="text-white">Dr. Aldo Leão</strong>
              </p>
            </div>

            {/* Seção Sumário (Item 12 e 41) */}
            <div className="mb-6">
              <h4 className="font-cinzel text-xs font-bold text-[#F6E27A] uppercase tracking-wider mb-3">
                Sumário
              </h4>
              <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/25 space-y-2.5 text-xs text-slate-300 leading-relaxed font-sans-body">
                {summaryBook.chapters && summaryBook.chapters.length > 0 ? (
                  summaryBook.chapters.map((ch, idx) => (
                    <div key={idx} className="flex items-start gap-2 border-b border-slate-900 pb-2 last:border-0 last:pb-0">
                      <span className="text-[#E5C158] font-bold shrink-0">{idx + 1}.</span>
                      <span>{ch.replace(/^Capítulo \d+:\s*/i, '')}</span>
                    </div>
                  ))
                ) : (
                  <p>Sumário estruturado em 6 capítulos práticos para orientação patrimonial.</p>
                )}
              </div>
            </div>

            {/* Primeiro botão dourado: BAIXAR LIVRO DIGITAL (Item 41) */}
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => {
                  const b = summaryBook;
                  setSummaryBook(null);
                  handleOpenForm(b);
                }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                BAIXAR LIVRO DIGITAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: FORMULÁRIO BAIXAR LIVRO DIGITAL (Item 41) */}
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
              /* Tela ENVIO CONCLUÍDO COM SUCESSO com botão NÃO RECEBI O LIVRO DIGITAL (Item 41) */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center text-[#25D366] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-cinzel text-xl font-bold text-white uppercase">
                  ENVIO CONCLUÍDO COM SUCESSO
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Sua solicitação do livro digital <strong>"{formBook.title}"</strong> foi recebida e encaminhada ao Dr. Aldo Leão.
                </p>
                <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 my-4 text-xs text-slate-300">
                  Em caso de dúvida ou não recebimento do seu livro digital clique no botão abaixo.
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
                  <p className="text-xs text-[#E5C158] mt-1 font-medium">
                    {formBook.title}
                  </p>
                  <p className="text-xs text-slate-300 mt-2 font-light">
                    Insira os dados solicitados e clique no botão ENVIAR para receber gratuitamente o seu Livro Digital.
                  </p>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-4">
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

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      WhatsApp <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsApp}
                      onChange={(e) => setWhatsApp(e.target.value)}
                      placeholder="(DDD) 99999-9999"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                    />
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
                      className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#050B14] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'ENVIANDO...' : 'ENVIAR'}</span>
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
