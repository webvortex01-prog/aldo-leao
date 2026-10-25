import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, X, ChevronRight, ChevronLeft, Newspaper, Scale, MessageSquare } from 'lucide-react';
import { Publication } from '../types';
import { useSite } from '../context/SiteContext';

export const LegalNewsSection: React.FC = () => {
  const { siteConfig } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeNewsModal, setActiveNewsModal] = useState<Publication | null>(null);

  // Filtrar estritamente as notícias jurídicas (STF, STJ, Reforma Tributária, Tribunais)
  const newsList = useMemo(() => {
    return (siteConfig.publications || []).filter((p) => p.type === 'noticia');
  }, [siteConfig.publications]);

  const normalize = (str: string) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredNews = useMemo(() => {
    const raw = searchTerm.trim();
    const tokens = raw ? normalize(raw).split(/\s+/).filter(Boolean) : [];

    return newsList.filter((item) => {
      let matchesSearch = true;
      if (tokens.length > 0) {
        const searchable = normalize(
          `${item.title} ${item.excerpt} ${item.area} ${item.content || ''} ${item.date || ''}`
        );
        matchesSearch = tokens.every((token) => searchable.includes(token));
      }

      const matchesArea = areaFilter === 'todas' || item.area === areaFilter;

      return matchesSearch && matchesArea;
    });
  }, [newsList, searchTerm, areaFilter]);

  const availableAreas = useMemo(() => {
    const set = new Set<string>();
    newsList.forEach((n) => {
      if (n.area) set.add(n.area);
    });
    return Array.from(set).sort();
  }, [newsList]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage) || 1;
  const currentNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleConsultAboutNews = (title: string) => {
    const phone = siteConfig.contact.whatsappNumber || '5551998088998';
    const text = encodeURIComponent(
      `Olá ALDO LEÃO ADVOCACIA ESTRATÉGICA, li a notícia "${title}" no portal e gostaria de consultar sobre o impacto disso no meu patrimônio/empresa.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="noticias" className="py-20 md:py-28 bg-[#050B14] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      {/* Background ambient luxury lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#0E1F3D]/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <Newspaper className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>TRIBUNAIS SUPERIORES & PRECEDENTES</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance] animate-title-reveal">
            NOTÍCIAS <span className="gold-text-gradient">JURÍDICAS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            Acompanhe as decisões judiciais mais recentes do <strong className="text-white font-medium">Supremo Tribunal Federal (STF)</strong>, <strong className="text-white font-medium">Superior Tribunal de Justiça (STJ)</strong>, 
            Reforma Tributária e precedentes estratégicos que impactam diretamente a proteção do patrimônio familiar e os negócios no Brasil.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/30 shadow-xl mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box com Botão PESQUISAR */}
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Pesquisar notícias jurídicas (ex: STJ, STF, ITCMD, reforma, tributos)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1);
                  }
                }}
                className="w-full pl-10 pr-20 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className="btn-gold-luxury group px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] font-black text-xs uppercase tracking-wider shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
              <span>PESQUISAR</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Area / Tribunal Filter */}
            <select
              value={areaFilter}
              onChange={(e) => {
                setAreaFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="todas">Todas as Áreas e Tribunais ({newsList.length})</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 6 Cards Grid (3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {currentNews.length === 0 ? (
            <div className="col-span-3 py-16 text-center text-slate-400">
              Nenhuma notícia jurídica encontrada para os critérios selecionados.
            </div>
          ) : (
            currentNews.map((news) => {
              return (
                <article
                  key={news.id}
                  className="rounded-xl overflow-hidden bg-[#071122] border border-[#D4AF37]/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 shadow-lg group hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                >
                  <div>
                    {/* Header Banner com Badge de Notícia */}
                    <div className="p-3.5 bg-gradient-to-r from-[#0B1A35] to-[#071122] border-b border-[#D4AF37]/20 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#102347] text-[#F6E27A] border border-[#D4AF37]/40 shadow-sm flex items-center gap-1">
                        <Scale className="w-3 h-3 text-[#E5C158]" />
                        <span>NOTÍCIA JURÍDICA</span>
                      </span>

                      <span className="text-[10px] font-semibold text-[#E5C158] uppercase truncate max-w-[170px]">
                        {news.area}
                      </span>
                    </div>

                    <div className="p-6">
                      {/* Meta Date & Read Time */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>{news.date}</span>
                        <span>·</span>
                        <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>{news.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-3 line-clamp-2">
                        {news.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-300 leading-relaxed font-sans-body line-clamp-3">
                        {news.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: LER NOTÍCIA COMPLETA */}
                  <div className="p-5 pt-0 border-t-0">
                    <button
                      onClick={() => setActiveNewsModal(news)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider text-[#F6E27A] group-hover:bg-[#0E1F3D] group-hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>LER NOTÍCIA COMPLETA</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Pagination Controls com Números em Cima e Botões ANTERIORES e PRÓXIMAS Embaixo */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 pt-6 border-t border-[#D4AF37]/20">
            {/* Números das Páginas Centralizados Acima dos Botões */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[36px] h-9 px-3 rounded-lg text-xs font-bold font-cinzel transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105'
                        : 'bg-[#071122] border border-slate-700 text-slate-300 hover:text-white hover:border-[#D4AF37]/60'
                    }`}
                    aria-label={`Ir para a página ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Botões Dourados ANTERIORES (Esquerda) e PRÓXIMAS (Direita) Logo Abaixo dos Números */}
            <div className="flex items-center justify-between w-full max-w-md gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-gold-luxury flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider shadow-md disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>ANTERIORES</span>
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-gold-luxury flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider shadow-md disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>PRÓXIMAS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reader Modal para Notícia Jurídica */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[88vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setActiveNewsModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#E5C158] font-semibold mb-2">
                <span className="px-2 py-0.5 rounded bg-[#102347] text-[#F6E27A] border border-[#D4AF37]/40">
                  Notícia Jurídica
                </span>
                <span>·</span>
                <span>{activeNewsModal.area}</span>
                <span>·</span>
                <span>{activeNewsModal.date}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white leading-tight">
                {activeNewsModal.title}
              </h3>
              <p className="text-xs text-[#D4AF37] mt-2 font-medium flex items-center gap-2">
                <span>Fonte: Tribunais Superiores (STF/STJ) & Cenário Jurídico Nacional</span>
                <span>·</span>
                <span>Seleção Editorial Aldo Leão Advocacia Estratégica</span>
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              {activeNewsModal.content.split('\n\n').map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => handleConsultAboutNews(activeNewsModal.title)}
                className="btn-gold-luxury px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONSULTAR ADVOGADO SOBRE ESTA NOTÍCIA</span>
              </button>

              <button
                onClick={() => setActiveNewsModal(null)}
                className="px-6 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
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
