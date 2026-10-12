import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, X, Filter, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
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

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.area.toLowerCase().includes(searchTerm.toLowerCase());

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
    <section id="publicacoes" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <span>ARTIGOS JURÍDICOS E NOTÍCIAS</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
            PUBLICAÇÕES <span className="gold-text-gradient">JURÍDICAS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body">
            A produção de conhecimento jurídico faz parte da tradição da <strong className="text-white">ALDO LEÃO ADVOCACIA ESTRATÉGICA</strong>.
            Nesta página você encontra artigos técnicos, análises jurídicas e notícias selecionadas sobre temas relevantes do cenário
            nacional, elaborados com linguagem clara e acessível.
          </p>
        </div>

        {/* Filter and Search Bar (from PDF Page 35-36) */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/30 shadow-xl mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar publicações (ex: holding, ITCMD, imóveis)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
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
              <option value="Planejamento 4.0 (Holding Familiar)">Planejamento 4.0</option>
              <option value="Direito Imobiliário">Direito Imobiliário</option>
              <option value="Direito Empresarial">Direito Empresarial</option>
              <option value="Direito Civil">Direito Civil</option>
              <option value="Relações de Consumo">Relações de Consumo</option>
            </select>
          </div>
        </div>

        {/* 6 Cards Grid (3 Columns x 2 Rows) */}
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
                  className="rounded-xl overflow-hidden bg-[#071122] border border-[#D4AF37]/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 shadow-lg group"
                >
                  <div>
                    {/* Header Banner (Layout from PDF Page 36) */}
                    <div className="p-3.5 bg-gradient-to-r from-[#0B1A35] to-[#071122] border-b border-[#D4AF37]/20 flex items-center justify-between">
                      {/* Categoria Badge */}
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded ${
                          isArtigo
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-slate-200 text-[#071122] font-black'
                        }`}
                      >
                        {isArtigo ? 'ARTIGO JURÍDICO' : 'NOTÍCIA JURÍDICA'}
                      </span>

                      {/* Area Badge */}
                      <span className="text-[10px] font-semibold text-[#E5C158] uppercase truncate max-w-[170px]">
                        {pub.area}
                      </span>
                    </div>

                    <div className="p-6">
                      {/* Meta Date & Read Time */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
                        <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>{pub.date}</span>
                        <span>·</span>
                        <Clock className="w-3.5 h-3.5 text-[#E5C158]" />
                        <span>{pub.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-3 line-clamp-2">
                        {pub.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-slate-300 leading-relaxed font-sans-body line-clamp-3">
                        {pub.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: LER MAIS */}
                  <div className="p-5 pt-0 border-t-0">
                    <button
                      onClick={() => setActivePubModal(pub)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider text-[#F6E27A] group-hover:bg-[#0E1F3D] group-hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>LER MAIS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-8 border-t border-[#D4AF37]/20">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 rounded-lg bg-[#071122] border border-[#D4AF37]/40 text-slate-300 hover:text-white hover:border-[#D4AF37] disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#F6E27A]" />
              <span>Anterior</span>
            </button>
            <span className="text-xs text-[#F6E27A] font-bold font-cinzel px-3 py-1 rounded bg-[#0A1730] border border-[#D4AF37]/30">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-[#050B14] hover:brightness-110 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              title="Ver as outras seis publicações"
            >
              <span>Ver mais publicações</span>
              <ChevronRight className="w-4 h-4 text-[#050B14]" />
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {activePubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[88vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setActivePubModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#E5C158] font-semibold mb-2">
                <span>{activePubModal.type === 'artigo' ? 'Artigo Jurídico' : 'Notícia Jurídica'}</span>
                <span>·</span>
                <span>{activePubModal.area}</span>
                <span>·</span>
                <span>{activePubModal.date}</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white leading-tight">
                {activePubModal.title}
              </h3>
              {activePubModal.type === 'artigo' && (
                <p className="text-xs text-[#D4AF37] mt-1.5 font-medium">
                  Publicado por Dr. Aldo Leão
                </p>
              )}
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              {activePubModal.content.split('\n\n').map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActivePubModal(null)}
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
