import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ArrowRight, X, ChevronRight, ChevronLeft, BookOpen, Scale, MessageSquare } from 'lucide-react';
import { Publication } from '../types';
import { useSite } from '../context/SiteContext';
import { ArticleSignature } from './ArticleSignature';

export const PublicationsSection: React.FC = () => {
  const { siteConfig } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'todas' | 'artigo' | 'noticia'>('todas');
  const [areaFilter, setAreaFilter] = useState('todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [activePubModal, setActivePubModal] = useState<Publication | null>(null);

  const publications = siteConfig.publications || [];

  const normalize = (str: string) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const artigosCount = useMemo(() => publications.filter((p) => p.type === 'artigo').length, [publications]);
  const noticiasCount = useMemo(() => publications.filter((p) => p.type === 'noticia').length, [publications]);

  const filteredPublications = useMemo(() => {
    const raw = searchTerm.trim();
    const tokens = raw ? normalize(raw).split(/\s+/).filter(Boolean) : [];

    return publications.filter((item) => {
      let matchesSearch = true;
      if (tokens.length > 0) {
        const searchable = normalize(
          `${item.title} ${item.excerpt} ${item.area} ${item.content || ''} ${item.date || ''}`
        );
        matchesSearch = tokens.every((token) => searchable.includes(token));
      }

      const matchesType = typeFilter === 'todas' || item.type === typeFilter;
      const matchesArea =
        areaFilter === 'todas' ||
        item.area === areaFilter ||
        (areaFilter.includes('Planejamento') && (item.area?.includes('Planejamento') || item.area?.includes('Holding'))) ||
        (areaFilter.includes('Imobiliário') && item.area?.includes('Imobiliário')) ||
        (areaFilter.includes('Empresarial') && item.area?.includes('Empresarial')) ||
        (areaFilter.includes('Civil') && item.area?.includes('Civil')) ||
        (areaFilter === 'Relações de Consumo' && (item.area?.includes('Consumo') || item.area?.includes('Consumidor'))) ||
        (areaFilter === 'Direito' && (item.area === 'Direito' || item.area?.includes('Direito')));

      return matchesSearch && matchesType && matchesArea;
    });
  }, [publications, searchTerm, typeFilter, areaFilter]);

  const availableAreas = useMemo(() => {
    const set = new Set<string>();
    publications.forEach((p) => {
      if (p.area) set.add(p.area);
    });
    return Array.from(set).sort();
  }, [publications]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage) || 1;
  const currentPublications = filteredPublications.slice(
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
    <section id="publicacoes" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20 overflow-hidden w-full max-w-full">
      {/* Âncoras de compatibilidade para links externos e atalhos rápidos */}
      <span id="artigos" className="absolute -top-24 left-0 pointer-events-none" />
      <span id="noticias" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Background ambient luxury lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#0E1F3D]/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal-fade-up">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E5C158] font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{siteConfig.publicationsSection?.kicker || 'NOTÍCIAS E ARTIGOS JURÍDICOS'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 [text-wrap:balance] animate-title-reveal">
            {siteConfig.publicationsSection?.titleWhite || 'PUBLICAÇÕES'}{' '}
            <span className="gold-text-gradient">{siteConfig.publicationsSection?.titleGold || 'JURÍDICAS'}</span>
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans-body font-light">
            <p>
              {siteConfig.publicationsSection?.paragraph1 || 'A produção de conhecimento jurídico faz parte da tradição centenária da ALDO LEÃO ADVOCACIA ESTRATÉGICA.'}
            </p>
            <p>
              {siteConfig.publicationsSection?.paragraph2 || 'Aqui você encontra as notícias importantes e os artigos jurídicos de especialistas em linguagem clara e acessível.'}
            </p>
            <p>
              {siteConfig.publicationsSection?.paragraph3 || 'Nosso compromisso é compartilhar o conhecimento especializado para que você fique atualizado com as novas tendências do cenário jurídico nacional, que impactam a sua vida e o seu legado.'}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071122] border border-[#D4AF37]/30 shadow-xl mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 reveal-fade-up">
          {/* Search Box com Botão PESQUISAR */}
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Pesquisar publicações (ex: holding, ITCMD, STJ, reforma, inventário, imóveis)..."
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
            {/* Type Filter: Todas, Artigos ou Notícias */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="todas">Todas as Publicações ({publications.length})</option>
              <option value="artigo">Artigos Jurídicos ({artigosCount})</option>
              <option value="noticia">Notícias Jurídicas ({noticiasCount})</option>
            </select>

            {/* Area Filter com as 6 opções oficiais (Item de 26/10) */}
            <select
              value={areaFilter}
              onChange={(e) => {
                setAreaFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="todas">Todas as Áreas</option>
              <option value="Planejamento Patrimonial 4.0 (Holding Familiar)">Planejamento Patrimonial 4.0 (Holding Familiar)</option>
              <option value="Direito Imobiliário">Direito Imobiliário</option>
              <option value="Direito Empresarial">Direito Empresarial</option>
              <option value="Direito Civil">Direito Civil</option>
              <option value="Relações de Consumo">Relações de Consumo</option>
              <option value="Direito">Direito</option>
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
            currentPublications.map((pub, index) => {
              const isArtigo = pub.type === 'artigo';
              const staggerClasses = ['delay-75', 'delay-150', 'delay-200', 'delay-250', 'delay-300'];
              const delayClass = staggerClasses[index % staggerClasses.length];

              return (
                <article
                  key={pub.id}
                  className={`reveal-fade-up ${delayClass} rounded-2xl overflow-hidden bg-[#071122] border border-[#D4AF37]/25 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 shadow-lg group hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] card-hover-interactive`}
                >
                  <div>
                    {/* Header Banner com diferenciação clara entre Artigo e Notícia */}
                    <div className="p-3.5 bg-gradient-to-r from-[#0B1A35] to-[#071122] border-b border-[#D4AF37]/20 flex items-center justify-between">
                      {isArtigo ? (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black font-black shadow-sm flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-black" />
                          <span>ARTIGO JURÍDICO</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#102347] text-[#F6E27A] border border-[#D4AF37]/40 shadow-sm flex items-center gap-1">
                          <Scale className="w-3 h-3 text-[#E5C158]" />
                          <span>NOTÍCIA JURÍDICA</span>
                        </span>
                      )}

                      <span className="text-[10px] font-semibold text-[#E5C158] uppercase truncate max-w-[170px]">
                        {pub.area}
                      </span>
                    </div>

                    <div className="p-6">
                      {/* Meta Date & Autor / Sem Relógio nem Tempo de Leitura (Itens 16 e 39) */}
                      <div className="flex items-center justify-between text-[11px] mb-3">
                        {isArtigo ? (
                          <>
                            <span className="text-[#E5C158] font-bold uppercase tracking-wider">AUTOR: Dr. ALDO LEÃO</span>
                            <span className="text-[#E5C158] font-semibold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#E5C158]" />
                              <span>{pub.date}</span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-400 font-semibold uppercase tracking-wider">NOTÍCIA</span>
                            <span className="text-[#E5C158] font-semibold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#E5C158]" />
                              <span>{pub.date}</span>
                            </span>
                          </>
                        )}
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

                  {/* Card Footer com Botão Específico (Item 19: LER ARTIGO) */}
                  <div className="p-5 pt-0 border-t-0">
                    <button
                      onClick={() => setActivePubModal(pub)}
                      className="w-full py-2.5 px-4 rounded-lg bg-[#050B14] border border-[#D4AF37]/35 text-xs font-bold uppercase tracking-wider text-[#F6E27A] group-hover:bg-[#0E1F3D] group-hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>{isArtigo ? 'LER ARTIGO' : 'LER NOTÍCIA COMPLETA'}</span>
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

      {/* Reader Modal: Abre tanto Artigo quanto Notícia */}
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
              {/* Primeira frase dourada: Tipo à esquerda e Área da publicação alinhada à direita */}
              <div className="flex items-center justify-between text-xs text-[#E5C158] font-semibold mb-3">
                {activePubModal.type === 'artigo' ? (
                  <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black font-black text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-black" />
                    <span>ARTIGO JURÍDICO</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded bg-[#102347] text-[#F6E27A] border border-[#D4AF37]/40 text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Scale className="w-3 h-3 text-[#E5C158]" />
                    <span>NOTÍCIA JURÍDICA</span>
                  </span>
                )}
                <span className="text-right text-[#E5C158] font-semibold text-xs sm:text-sm">
                  {activePubModal.area}
                </span>
              </div>

              {/* Título da publicação (branco) */}
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white leading-tight mb-3">
                {activePubModal.title}
              </h3>

              {/* Segunda frase dourada: AUTOR: Dr. ALDO LEÃO à esquerda e Data alinhada à direita na mesma linha */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#E5C158] font-bold uppercase tracking-wider pt-1">
                <span className="text-left">
                  {activePubModal.type === 'artigo'
                    ? 'AUTOR: Dr. ALDO LEÃO'
                    : 'Fonte: Tribunais Superiores (STF/STJ) & Seleção Editorial'}
                </span>
                <span className="text-right text-[#E5C158] font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E5C158]" />
                  <span>{activePubModal.date}</span>
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body">
              {activePubModal.content.split('\n\n').map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>

            {/* Assinatura Oficial Automatizada tanto em Artigo quanto em Notícia Jurídica (Itens 4 e 40) */}
            <ArticleSignature 
              publicationTitle={activePubModal.title} 
            />

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
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
