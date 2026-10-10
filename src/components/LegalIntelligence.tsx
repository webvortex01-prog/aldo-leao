import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, X, Clock, Calendar, Share2 } from 'lucide-react';
import { Article } from '../types';

export const LegalIntelligence: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'art-1',
      title: 'A Nova Disciplina do ITCMD e o Impacto Imediato na Estruturação de Holdings Familiares',
      category: 'Planejamento Patrimonial',
      date: 'Outubro de 2026',
      readTime: '6 min de leitura',
      excerpt: 'Com a progressividade obrigatória de alíquotas do ITCMD de até 16% em diversos estados, o custo da inércia sucessória tornou-se exponencial. Como antecipar a doação com segurança jurídica.',
      content: `A recente evolução da legislação tributária estadual e os entendimentos firmados no Supremo Tribunal Federal impuseram uma nova realidade às famílias de alto patrimônio no Brasil. A elevação das alíquotas de ITCMD e a taxação de heranças e doações exigem que patriarcas e matriarcas abandonem a postura passiva.

Ao estruturar uma Holding Familiar com cisão patrimonial e governança antecipada, é possível não apenas mitigar o impacto tributário direto de inventários conturbados, mas assegurar a perpetuidade dos ativos operacionais e imobiliários contra litígios sucessórios e contingências conjugais de herdeiros.

Pontos críticos avaliados pelo Dr. Aldo Leão:
1. Cláusulas de incomunicabilidade e inalienabilidade com eficácia reforçada.
2. Reserva vitalícia de usufruto com poderes irrestritos de administração.
3. Acordo parassocial de quotistas regulando direito de preferência e resolução de impasses.

A inércia não é prudência; é exposição desnecessária de um legado construído ao longo de décadas.`
    },
    {
      id: 'art-2',
      title: 'Responsabilidade Pessoal de Sócios e Administradores em Execuções Fiscais: Limites do Art. 135 do CTN',
      category: 'Defesa Tributária',
      date: 'Setembro de 2026',
      readTime: '8 min de leitura',
      excerpt: 'O mero inadimplemento de tributos não autoriza o redirecionamento da execução contra o patrimônio pessoal de sócios e diretores. Conheça as balizas fixadas pelo STJ.',
      content: `A Fazenda Pública tem reiteradamente buscado atingir contas bancárias e imóveis particulares de administradores quando a pessoa jurídica enfrenta dificuldades fiscais. Contudo, o Superior Tribunal de Justiça, sob o rito dos recursos repetitivos (Tema 962 e 981), fixou teses inegociáveis.

O art. 135, III do Código Tributário Nacional exige comprovação inequívoca de dolo, fraude ou excesso de poderes cometidos no exato momento da ocorrência do fato gerador ou da dissolução irregular.

A bancada de Aldo Leão tem atuado com rigor na apresentação de Exceções de Pré-Executividade, obtendo a desconstituição de bloqueios judiciais e livrando executivos de constrangimentos patrimoniais indevidos.`
    },
    {
      id: 'art-3',
      title: 'O Uso de Medidas Cautelares Assecuratórias em Inquéritos Econômicos: Estratégias de Desbloqueio',
      category: 'Direito Penal Econômico',
      date: 'Agosto de 2026',
      readTime: '5 min de leitura',
      excerpt: 'Como enfrentar decisões judiciais de indisponibilidade de ativos que asfixiam a operação regular de empresas antes mesmo do oferecimento de denúncia formal.',
      content: `As medidas de sequestro e arresto de bens previstas no Código de Processo Penal têm sido decretadas com excesso de generalidade, desconsiderando a distinção entre patrimônio lícito e suposto produto de infração penal.

A resposta da defesa deve ser fulminante: comprovação documental da origem hígida dos ativos, impetração de mandados de segurança ou agravos de instrumento, e demonstração do risco de dano irreparável à folha de pagamento e à higidez das operações da empresa.

Em casos conduzidos por Aldo Leão, a atuação técnica rápida evitou a paralisação de plantas industriais e restabeleceu a liquidez dos constituídos.`
    }
  ];

  return (
    <section id="artigos" className="py-20 md:py-28 bg-[#060D1A] relative border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#E5C158] font-semibold mb-3">
              <span>Publicações & Análises Técnicas</span>
              <span className="text-[#D4AF37]/50" aria-hidden="true">·</span>
              <span>Inteligência Estratégica</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Artigos & Teses de <span className="gold-text-gradient">Vanguarda</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-md font-sans-body">
            Análises jurídicas aprofundadas elaboradas diretamente por nossa equipe
            para orientar decisões de conselhos, diretores jurídicos e investidores.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-xl p-7 gold-hairline-card flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Clean unboxed metadata with typographic separators (anti-slop zero-pill) */}
                <div className="flex items-center gap-2 text-xs text-[#E5C158] mb-4 font-medium">
                  <span>{article.category}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-slate-400">{article.date}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-slate-400">{article.readTime}</span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-[#F6E27A] transition-colors leading-snug mb-4">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-body mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/15">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#F6E27A] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Ler Parecer Completo</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar artigo"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pb-4 border-b border-[#D4AF37]/25">
              <div className="flex items-center gap-2 text-xs text-[#E5C158] font-semibold mb-2">
                <span>{activeArticle.category}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">{activeArticle.date}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300">{activeArticle.readTime}</span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white leading-tight">
                {activeArticle.title}
              </h3>
              <p className="text-xs text-[#D4AF37] mt-2 font-medium">
                Por Dr. Aldo Leão · Aldo Leão Advocacia Estratégica
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-sans-body">
              {activeArticle.content.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Gostaria de discutir a aplicação desta tese ao seu caso concreto?
              </span>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  const el = document.getElementById('contato');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 px-6 rounded text-xs font-semibold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 cursor-pointer"
              >
                Consultar Nossos Especialistas
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
