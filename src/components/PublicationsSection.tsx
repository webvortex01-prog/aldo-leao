import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, X, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import { Publication } from '../types';
import { useSite } from '../context/SiteContext';
import { ArticleSignature } from './ArticleSignature';

export const PublicationsSection: React.FC = () => {
  const { siteConfig } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePubModal, setActivePubModal] = useState<Publication | null>(null);

  // Filtra exclusivamente os Artigos Jurídicos (Doutrina, Análises Técnicas e Pareceres do Dr. Aldo Leão)
  const articlesList = useMemo(() => {
    return (siteConfig.publications || []).filter((p) => p.type === 'artigo');
  }, [siteConfig.publications]);

  const normalize = (str: string) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredArticles = useMemo(() => {
    const raw = searchTerm.trim();
    const tokens = raw ? normalize(raw).split(/\s+/).filter(Boolean) : [];

    return articlesList.filter((item) => {
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
  }, [articlesList, searchTerm, areaFilter]);

  const availableAreas = useMemo(() => {
    const set = new Set<string>();
    articlesList.forEach((p) => {
      if (p.area) set.add(p.area);
    });
    return Array.from(set).sort();
  }, [articlesList]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="artigos" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      {/* Anchor de compatibilidade para #publicacoes */}
      <span id="publicacoes" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Background ambient luxury lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#0E1F3D]/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>DOUTRINA & ANÁLISES TÉCNICAS ESTRATÉGICAS</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance] animate-title-reveal">
            ARTIGOS <span className="gold-text-gradient">JURÍDICOS</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            A produção intelectual e doutrinária assinada pelo <strong className="text-white font-medium">Dr. Aldo Leão Ferreira Filho</strong>. 
            Estudos aprofundados sobre Planejamento Patrimonial 4.0, Holding Familiar, Blindagem Patrimonial Lícita, Direito Imobiliário e Sucessão Empresarial.
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
                placeholder="Pesquisar artigos jurídicos (ex: holding, ITCMD, imóveis, sucessão, cotas)..."
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
            {/* Area Filter */}
            <select
              value={areaFilter}
              onChange={(e) => {
                setAreaFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="todas">Todas as Áreas ({articlesList.length} Artigos)</option>
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
          {currentArticles.length === 0 ? (
            <div className="col-span-3 py-16 text-center text-slate-400">
              Nenhum artigo jurídico encontrado para os critérios selecionados.
            </div>
          ) : (
            currentArticles.map((pub) => {
              return (
                <article
                  key={pub.id}
                  className="rounded-xl overflow-hidden bg-[#071122] border border-[#D4AF37]/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 shadow-lg group hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
                >
                  <div>
                    {/* Header Banner */}
                    <div className="p-3.5 bg-gradient-to-r from-[#0B1A35] to-[#071122] border-b border-[#D4AF37]/20 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black font-black shadow-sm">
                        ARTIGO JURÍDICO
                      </span>

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

                  {/* Card Footer: LER ARTIGO COMPLETO */}
                  <div className="p-5 pt-0 border-t-0">
                    <button
                      onClick={() => setActivePubModal(pub)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider text-[#F6E27A] group-hover:bg-[#0E1F3D] group-hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>LER ARTIGO COMPLETO</span>
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

      {/* Reader Modal para Artigo Jurídico */}
      {activePubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[88vh] overflow-y-auto text-slate-100">
            <button
              onClick={() => setActivePubModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#D4AF37]/25 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#E5C158] font-semibold mb-2">
                <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-black font-black text-[10px]">
                  Artigo Jurídico
                </span>
                <span>·</span>
                <span>{activePubModal.area}</span>
                <span>·</span>
                <span>{activePubModal.date}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white leading-tight">
                {activePubModal.title}
              </h3>
              <p className="text-xs text-[#D4AF37] mt-1.5 font-medium">
                Autoria: Dr. Aldo Leão Ferreira Filho · Head Jurídico ALDO LEÃO ADVOCACIA ESTRATÉGICA
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              {activePubModal.content.split('\n\n').map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>

            {/* Assinatura Oficial com Botão de Consulta */}
            <ArticleSignature 
              publicationTitle={activePubModal.title} 
            />

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
