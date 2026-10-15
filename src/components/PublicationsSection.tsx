import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, X, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import { Publication } from '../types';
import { useSite } from '../context/SiteContext';

export const PublicationsSection: React.FC = () => {
  const { siteConfig } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'todos' | 'artigo' | 'noticia'>('todos');
  const [areaFilter, setAreaFilter] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePubModal, setActivePubModal] = useState<Publication | null>(null);

  const publications = siteConfig.publications;

  const normalize = (str: string) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredPublications = useMemo(() => {
    const raw = searchTerm.trim();
    const tokens = raw ? normalize(raw).split(/\s+/).filter(Boolean) : [];

    return publications.filter(pub => {
      let matchesSearch = true;
      if (tokens.length > 0) {
        const searchable = normalize(
          `${pub.title} ${pub.excerpt} ${pub.area} ${pub.content || ''} ${pub.date || ''}`
        );
        matchesSearch = tokens.every(token => searchable.includes(token));
      }

      const matchesType = typeFilter === 'todos' || pub.type === typeFilter;
      const matchesArea = areaFilter === 'todas' || pub.area === areaFilter;

      return matchesSearch && matchesType && matchesArea;
    });
  }, [publications, searchTerm, typeFilter, areaFilter]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage) || 1;
  const currentPublications = filteredPublications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="publicacoes" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>ARTIGOS JURÍDICOS E NOTÍCIAS</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            PUBLICAÇÕES <span className="gold-text-gradient">JURÍDICAS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            A produção de conhecimento jurídico faz parte da tradição da <strong className="text-white font-medium">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong>.
            Nesta página você encontra artigos técnicos, análises jurídicas e notícias selecionadas sobre temas relevantes do cenário
            nacional, elaborados com linguagem clara e acessível.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/30 shadow-xl mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box com Botão PESQUISAR (Item VI) */}
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Pesquisar publicações (ex: holding, ITCMD, imóveis, sucessão, STJ)..."
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
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="todos">Todas as Publicações</option>
              <option value="artigo">Artigos Jurídicos</option>
              <option value="noticia">Notícias Jurídicas</option>
            </select>

            {/* Area Filter */}
            <select
              value={areaFilter}
              onChange={(e) => {
                setAreaFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="todas">Todas as Áreas</option>
              <option value="Planejamento Patrimonial">Planejamento Patrimonial</option>
              <option value="Direito Imobiliário">Direito Imobiliário</option>
              <option value="Direito Empresarial">Direito Empresarial</option>
              <option value="Direito Civil">Direito Civil</option>
              <option value="Relações de Consumo">Relações de Consumo</option>
            </select>
          </div>
        </div>

        {/* 6 Cards Grid (Item 11) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {currentPublications.length === 0 ? (
            <div className="col-span-3 py-16 text-center text-slate-400">
              Nenhuma publicação encontrada para os critérios selecionados.
            </div>
          ) : (
            currentPublications.map((pub) => {
              const isArtigo = pub.type === 'artigo';

              return (
                <article
                  key={pub.id}
                  className="rounded-xl overflow-hidden bg-[#071122] border border-[#D4AF37]/25 flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/60 shadow-lg group text-left card-hover-interactive"
                >
                  <div>
                    {/* Header Banner */}
                    <div className="p-3.5 bg-gradient-to-r from-[#0B1A35] to-[#071122] border-b border-[#D4AF37]/20 flex items-center justify-between">
                      {/* Rótulo: Artigo Jurídico (dourado) ou Notícia Jurídica (cinza claro com azul-marinho conforme Item 11) */}
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded ${
                          isArtigo
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-slate-200 text-[#071122]'
                        }`}
                      >
                        {isArtigo ? 'ARTIGO JURÍDICO' : 'NOTÍCIA JURÍDICA'}
                      </span>

                      {/* Área de Atuação */}
                      <span className="text-[10px] font-semibold text-[#E5C158] uppercase truncate max-w-[170px]">
                        {pub.area}
                      </span>
                    </div>

                    <div className="p-5">
                      {/* Title */}
                      <h3
                        onClick={() => setActivePubModal(pub)}
                        className="font-cinzel text-base font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-3 cursor-pointer"
                      >
                        {pub.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-300 leading-relaxed font-sans-body mb-4 font-light">
                        {pub.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Meta e Autor conforme Item 11 */}
                  <div className="p-4 bg-[#050B14]/70 border-t border-[#D4AF37]/15 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{pub.date}</span>
                      {/* Item 11: Em Artigos Jurídicos deixar Dr. Aldo Leão (sem 'Aldo Leão Advocacia Estratégica') */}
                      {isArtigo && (
                        <span className="text-slate-300 font-medium">· Por Dr. Aldo Leão</span>
                      )}
                    </div>

                    <button
                      onClick={() => setActivePubModal(pub)}
                      className="text-xs font-bold text-[#F6E27A] group-hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ler</span>
                      <ArrowRight className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Paginação com botão e seta para a direita para ver as outras 6 publicações (Item 11) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-6 border-t border-[#D4AF37]/20">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[#071122] border border-[#D4AF37]/35 text-slate-300 hover:text-white hover:border-[#D4AF37] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-1.5 px-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] text-black shadow-md'
                      : 'bg-[#071122] text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
            >
              <span>Próximas Publicações</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Publication Reading Modal */}
      {activePubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[88vh] overflow-y-auto text-slate-100 text-left">
            <button
              onClick={() => setActivePubModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded inline-block mb-3 ${
                  activePubModal.type === 'artigo'
                    ? 'bg-[#D4AF37] text-black'
                    : 'bg-slate-200 text-[#071122]'
                }`}
              >
                {activePubModal.type === 'artigo' ? 'ARTIGO JURÍDICO' : 'NOTÍCIA JURÍDICA'}
              </span>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                {activePubModal.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                <span>{activePubModal.date}</span>
                <span>·</span>
                <span className="text-[#E5C158]">{activePubModal.area}</span>
                {activePubModal.type === 'artigo' && (
                  <>
                    <span>·</span>
                    <span className="text-white font-medium">Por Dr. Aldo Leão</span>
                  </>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body space-y-4 font-light whitespace-pre-line">
              {activePubModal.content || activePubModal.excerpt}
            </div>

            <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 flex justify-end">
              <button
                onClick={() => setActivePubModal(null)}
                className="px-6 py-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/40 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer"
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
