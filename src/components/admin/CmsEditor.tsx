import React, { useState } from 'react';
import { 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Image, 
  FileText, 
  Briefcase, 
  Trophy, 
  PhoneCall, 
  Plus, 
  Trash2,
  Sparkles,
  BookOpen,
  Scale,
  Compass,
  Building,
  GraduationCap,
  Layers,
  Calendar
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { PracticeArea, CaseStudy, DigitalBook, Publication } from '../../types';

export const CmsEditor: React.FC = () => {
  const { siteConfig, updateSiteConfig, resetSiteConfigToDefault } = useSite();
  const [formData, setFormData] = useState(siteConfig);
  const [activeTab, setActiveTab] = useState<
    'hero' | 'digital_legacy' | 'founder' | 'services' | 'solutions' | 'publications' | 'books' | 'contact'
  >('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    updateSiteConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Deseja restaurar todos os textos e fotos para a configuração padrão original?')) {
      resetSiteConfigToDefault();
      setFormData(siteConfig);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleAddPracticeArea = () => {
    const newArea: PracticeArea = {
      id: `area-${Date.now()}`,
      number: String((formData.practiceAreas || []).length + 1).padStart(2, '0'),
      title: 'Nova Área Estratégica',
      subtitle: 'Assessoria Especializada e Contencioso',
      description: 'Descrição do escopo técnico, procedimentos e teses de defesa.',
      keyPoints: ['Análise de riscos e precedentes vinculantes', 'Atuação preventiva e contenciosa especializada'],
      casesSummary: 'Histórico de casos exitosos e atuação perante órgãos reguladores.',
      badge: 'Direito Especializado'
    };
    setFormData({
      ...formData,
      practiceAreas: [...(formData.practiceAreas || []), newArea]
    });
  };

  const handleRemovePracticeArea = (index: number) => {
    const updated = (formData.practiceAreas || []).filter((_, i) => i !== index);
    setFormData({ ...formData, practiceAreas: updated });
  };

  const handleAddBook = () => {
    const newBook: DigitalBook = {
      id: `livro-${Date.now()}`,
      title: 'Novo Livro / E-Book Jurídico',
      author: 'Dr. Aldo Leão',
      area: 'Planejamento Patrimonial 4.0',
      description: 'Sinopse e descrição da obra jurídica para download gratuito.',
      pages: '120 páginas',
      year: '2026',
      isbn: 'Oficial',
      format: 'Livro Digital (PDF Gratuito)',
      downloadAvailable: true,
      downloadCount: '1.200 downloads',
      badge: 'Download Gratuito'
    };
    setFormData({
      ...formData,
      digitalBooks: [...(formData.digitalBooks || []), newBook]
    });
  };

  const handleRemoveBook = (index: number) => {
    const updated = (formData.digitalBooks || []).filter((_, i) => i !== index);
    setFormData({ ...formData, digitalBooks: updated });
  };

  const handleAddPublication = () => {
    const newPub: Publication = {
      id: `pub-${Date.now()}`,
      type: 'artigo',
      title: 'Novo Artigo / Parecer Jurídico',
      area: 'Planejamento Patrimonial',
      date: 'Data Atual',
      readTime: '5 min de leitura',
      slug: `novo-artigo-${Date.now()}`,
      excerpt: 'Resumo da publicação para exibição no portal.',
      content: 'Conteúdo completo do artigo ou parecer.'
    };
    setFormData({
      ...formData,
      publications: [...(formData.publications || []), newPub]
    });
  };

  const handleRemovePublication = (index: number) => {
    const updated = (formData.publications || []).filter((_, i) => i !== index);
    setFormData({ ...formData, publications: updated });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#071122] rounded-xl border border-[#D4AF37]/35 shadow-xl">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <span>Editor Visual Completo do Site</span>
            <span className="text-xs font-sans text-[#E5C158] font-normal uppercase tracking-wider bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              CMS Live 100% Editável
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Altere textos, slides, telefones, números da holding, fotos e livros. Todas as alterações refletem instantaneamente no site público.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar no Site</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Alterações salvas com sucesso!</strong> O site público já foi atualizado com as novas informações.
          </span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'hero', label: '1. Topo & Slides (1 e 2)', icon: FileText },
          { id: 'digital_legacy', label: '2. Presença Digital & Legado', icon: Compass },
          { id: 'founder', label: '3. Dr. Aldo & 40 Anos', icon: Image },
          { id: 'services', label: '4. Áreas de Atuação (6)', icon: Briefcase },
          { id: 'solutions', label: '5. Soluções & Academia', icon: GraduationCap },
          { id: 'publications', label: '6. Publicações & Artigos', icon: Trophy },
          { id: 'books', label: '7. Livros Digitais (6)', icon: BookOpen },
          { id: 'contact', label: '8. Telefones & WhatsApp', icon: PhoneCall },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0E1F3D] text-[#F6E27A] border border-[#D4AF37]/50 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO & SLIDES 1 E 2 */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          {/* SLIDE 1 */}
          <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="text-[#E5C158]">SLIDE 1</span> · Tradição Jurídica Desde 1908
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Etiqueta Superior (Kicker)
                </label>
                <input
                  type="text"
                  value={formData.hero.kicker}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, kicker: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                  Destaque do Box (Slide 1)
                </label>
                <input
                  type="text"
                  value={formData.hero.tagline || 'EXCELÊNCIA JURÍDICA CENTENÁRIA EM TRÊS GERAÇÕES'}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, tagline: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/60 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Título Parte 1
                </label>
                <input
                  type="text"
                  value={formData.hero.titlePart1}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, titlePart1: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                  Título em Destaque Dourado
                </label>
                <input
                  type="text"
                  value={formData.hero.titleHighlight}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, titleHighlight: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/60 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Texto Principal da Tradição
              </label>
              <textarea
                rows={3}
                value={formData.hero.description}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, description: e.target.value }
                })}
                className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="text-[#E5C158]">SLIDE 2</span> · Holding Familiar & Planejamento Patrimonial 4.0
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Texto acima do Título (Eyebrow)
                </label>
                <input
                  type="text"
                  value={formData.slide2?.eyebrow || 'HOLDING FAMILIAR'}
                  onChange={(e) => setFormData({
                    ...formData,
                    slide2: { ...(formData.slide2 || {}), eyebrow: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                  Título do Slide 2
                </label>
                <input
                  type="text"
                  value={formData.slide2?.title || 'PLANEJAMENTO PATRIMONIAL 4.0'}
                  onChange={(e) => setFormData({
                    ...formData,
                    slide2: { ...(formData.slide2 || {}), title: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/60 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Box de Chamada 1: Que Legado Você Vai Deixar?
              </label>
              <input
                type="text"
                value={formData.slide2?.callout1 || 'QUE LEGADO VOCÊ VAI DEIXAR AOS SEUS HERDEIROS? A Alta Perda Patrimonial do Inventário ou o Planejamento Patrimonial 4.0 que evita o Inventário?'}
                onChange={(e) => setFormData({
                  ...formData,
                  slide2: { ...(formData.slide2 || {}), callout1: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Box de Chamada 2: Evite a Alta Perda Patrimonial
              </label>
              <input
                type="text"
                value={formData.slide2?.callout2 || 'EVITE A ALTA PERDA PATRIMONIAL E FINANCEIRA DOS SEUS FILHOS NO INVENTÁRIO.'}
                onChange={(e) => setFormData({
                  ...formData,
                  slide2: { ...(formData.slide2 || {}), callout2: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Título Box Inferior
                </label>
                <input
                  type="text"
                  value={formData.slide2?.boxTitle || 'O INVENTÁRIO GERA UMA ALTA PERDA PATRIMONIAL DOS HERDEIROS NO INVENTÁRIO'}
                  onChange={(e) => setFormData({
                    ...formData,
                    slide2: { ...(formData.slide2 || {}), boxTitle: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                  Título Card Direita
                </label>
                <input
                  type="text"
                  value={formData.slide2?.rightCardTitle || 'PERDA PATRIMONIAL E FINANCEIRA DOS HERDEIROS NO INVENTÁRIO'}
                  onChange={(e) => setFormData({
                    ...formData,
                    slide2: { ...(formData.slide2 || {}), rightCardTitle: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Texto do Card Direita (Alíquotas ITCMD 8%, 16%, 20%, 30%)
              </label>
              <textarea
                rows={2}
                value={formData.slide2?.rightCardText || 'Em média a Perda Patrimonial e Financeira dos herdeiros é de 40% do Patrimônio Inventariado, a qual vai aumentar com a majoração da alíquota do ITCMD de 8% para 16% (Projeto de Resolução do Senado Federal N. 57/19), 20% (Confaz) ou 30% (Governo Federal).'}
                onChange={(e) => setFormData({
                  ...formData,
                  slide2: { ...(formData.slide2 || {}), rightCardText: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            {/* TABELA COMPARATIVA DE CUSTOS */}
            <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                Parâmetros do Estudo Comparativo de Custos (Modal e Tabela)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1">Valor Aquisição</label>
                  <input
                    type="text"
                    value={formData.slide2?.sampleAcquisition || 'R$ 1.000.000,00'}
                    onChange={(e) => setFormData({
                      ...formData,
                      slide2: { ...(formData.slide2 || {}), sampleAcquisition: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1">Valor de Mercado</label>
                  <input
                    type="text"
                    value={formData.slide2?.sampleMarket || 'R$ 1.500.000,00'}
                    onChange={(e) => setFormData({
                      ...formData,
                      slide2: { ...(formData.slide2 || {}), sampleMarket: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1">Economia em Reais</label>
                  <input
                    type="text"
                    value={formData.slide2?.savingsAmount || 'R$ 164.000,00'}
                    onChange={(e) => setFormData({
                      ...formData,
                      slide2: { ...(formData.slide2 || {}), savingsAmount: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-[#25D366]/50 text-xs text-[#25D366] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-slate-400 block mb-1">Economia (%)</label>
                  <input
                    type="text"
                    value={formData.slide2?.savingsPercentage || '55,21%'}
                    onChange={(e) => setFormData({
                      ...formData,
                      slide2: { ...(formData.slide2 || {}), savingsPercentage: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-[#25D366]/50 text-xs text-[#25D366] font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRESENÇA DIGITAL & LEGADO */}
      {activeTab === 'digital_legacy' && (
        <div className="space-y-6">
          <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
              Presença Nacional Digital (3 Cards com Balança Dourada)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Card 1: Atuação Digital
                </label>
                <input
                  type="text"
                  value={formData.nationalPresence?.card1Text || 'Atuação Digital no Brasil'}
                  onChange={(e) => setFormData({
                    ...formData,
                    nationalPresence: { ...(formData.nationalPresence || {}), card1Text: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Card 2: Infraestrutura
                </label>
                <input
                  type="text"
                  value={formData.nationalPresence?.card2Text || 'Infraestrutura Tecnológica de última geração'}
                  onChange={(e) => setFormData({
                    ...formData,
                    nationalPresence: { ...(formData.nationalPresence || {}), card2Text: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Card 3: Comodidade e Sigilo
                </label>
                <input
                  type="text"
                  value={formData.nationalPresence?.card3Text || 'Comodidade, Segurança, Confidencialidade, Sigilo e Economia para cada cliente.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    nationalPresence: { ...(formData.nationalPresence || {}), card3Text: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
              O Legado Centenário & Linha do Tempo
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                  Frase em Dourado Superior
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.goldKicker || 'EXCELÊNCIA JURÍDICA FAMILIAR'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), goldKicker: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Título da Página
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.title || 'O LEGADO CENTENÁRIO'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), title: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E5C158] font-semibold mb-1">
                  Subtítulo Dourado
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.subtitle || 'Desde 1908'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), subtitle: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#E5C158] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  1908 · Fundação do Escritório
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.sub1908 || 'Prof. Dr. Arnaldo da Silva Ferreira'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), sub1908: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  1935 · Continuidade da Tradição
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.sub1935 || 'Dr. Mário de Castilhos Ferreira e Dr. Ney de Castilhos Ferreira'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), sub1935: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  1915 · Consolidação Institucional
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.sub1915 || 'Prof. Dr. Aldo Leão Ferreira'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), sub1915: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  1986 · Advocacia Estratégica (3ª Geração)
                </label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.sub1986 || 'Prof. Dr. Aldo Leão Ferreira Filho'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), sub1986: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FOUNDER PROFILE & 40 ANOS */}
      {activeTab === 'founder' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
            Perfil do Dr. Aldo Leão & 40 Anos de Advocacia
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Retrato do Advogado Head Jurídico:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { url: '/img/dr-aldo-portrait.jpg', title: 'Retrato Oficial HD', desc: 'Retrato formal direto com gravata' },
                { url: '/img/dr-aldo-1.jpg', title: 'Dr. Aldo Forense', desc: 'Atuação profissional em tribunal' },
                { url: '/img/dr-aldo-2.jpg', title: 'Dr. Aldo Escritório', desc: 'Ambiente executivo' },
                { url: '/img/dr-aldo-3.jpg', title: 'Dr. Aldo Reunião', desc: 'Consultoria estratégica' },
                { url: '/img/dr-aldo-4.jpg', title: 'Dr. Aldo Gabinete', desc: 'Gabinete e biblioteca jurídica' },
                { url: '/img/dr-aldo-foco.jpg', title: 'Dr. Aldo Foco', desc: 'Alta definição' },
              ].map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({
                    ...formData,
                    founder: { ...formData.founder, photoUrl: p.url }
                  })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    formData.founder.photoUrl === p.url
                      ? 'border-[#D4AF37] bg-[#0E1F3D] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'border-slate-800 bg-[#050B14] hover:border-slate-700'
                  }`}
                >
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-12 h-14 object-cover rounded-lg border border-[#D4AF37]/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">{p.title}</span>
                      {formData.founder.photoUrl === p.url && (
                        <span className="text-[9px] bg-[#D4AF37] text-black px-1.5 py-0.2 rounded font-bold shrink-0">Ativo</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Nome de Apresentação
              </label>
              <input
                type="text"
                value={formData.founder.name}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, name: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Nome Completo Oficial
              </label>
              <input
                type="text"
                value={formData.founder.fullName}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, fullName: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Biografia Institucional — Parágrafo 1
            </label>
            <textarea
              rows={3}
              value={formData.founder.bioParagraph1}
              onChange={(e) => setFormData({
                ...formData,
                founder: { ...formData.founder, bioParagraph1: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Biografia Institucional — Parágrafo 2
            </label>
            <textarea
              rows={3}
              value={formData.founder.bioParagraph2}
              onChange={(e) => setFormData({
                ...formData,
                founder: { ...formData.founder, bioParagraph2: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
            />
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE AREAS */}
      {activeTab === 'services' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Áreas de Atuação Especializadas
              </h3>
              <p className="text-xs text-slate-400">
                Gerencie títulos, subtítulos e descrições dos serviços jurídicos.
              </p>
            </div>
            <button
              onClick={handleAddPracticeArea}
              className="px-3.5 py-1.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-semibold text-[#F6E27A] hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Área</span>
            </button>
          </div>

          <div className="space-y-4">
            {(formData.practiceAreas || []).map((area, idx) => (
              <div key={area.id || idx} className="p-4 rounded-lg bg-[#050B14] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E5C158] uppercase">
                    Área 0{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemovePracticeArea(idx)}
                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título da Área
                    </label>
                    <input
                      type="text"
                      value={area.title}
                      onChange={(e) => {
                        const updated = [...(formData.practiceAreas || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, practiceAreas: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Subtítulo / Selo
                    </label>
                    <input
                      type="text"
                      value={area.subtitle}
                      onChange={(e) => {
                        const updated = [...(formData.practiceAreas || [])];
                        updated[idx].subtitle = e.target.value;
                        setFormData({ ...formData, practiceAreas: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Descrição do Escopo
                  </label>
                  <textarea
                    rows={2}
                    value={area.description}
                    onChange={(e) => {
                      const updated = [...(formData.practiceAreas || [])];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, practiceAreas: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SOLUTIONS & ACADEMIA */}
      {activeTab === 'solutions' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
            Soluções de Excelência & Academia Leão Ferreira
          </h3>
          <div className="space-y-4">
            {(formData.excellenceSolutions || []).map((sol, idx) => (
              <div key={sol.id || idx} className="p-4 rounded-lg bg-[#050B14] border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-[#E5C158] uppercase">
                  Solução 0{idx + 1}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={sol.title}
                      onChange={(e) => {
                        const updated = [...(formData.excellenceSolutions || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, excellenceSolutions: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={sol.subtitle || ''}
                      onChange={(e) => {
                        const updated = [...(formData.excellenceSolutions || [])];
                        updated[idx].subtitle = e.target.value;
                        setFormData({ ...formData, excellenceSolutions: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={2}
                    value={sol.description}
                    onChange={(e) => {
                      const updated = [...(formData.excellenceSolutions || [])];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, excellenceSolutions: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PUBLICATIONS */}
      {activeTab === 'publications' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Publicações, Artigos & Notícias Jurídicas
              </h3>
              <p className="text-xs text-slate-400">
                Gerencie todos os artigos e notícias exibidos na seção de publicações.
              </p>
            </div>
            <button
              onClick={handleAddPublication}
              className="px-3.5 py-1.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-semibold text-[#F6E27A] hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Publicação</span>
            </button>
          </div>

          <div className="space-y-4">
            {(formData.publications || []).map((pub, idx) => (
              <div key={pub.id || idx} className="p-4 rounded-lg bg-[#050B14] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E5C158] uppercase">
                    {pub.type === 'artigo' ? 'Artigo Jurídico' : 'Notícia Jurídica'} #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemovePublication(idx)}
                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título da Publicação
                    </label>
                    <input
                      type="text"
                      value={pub.title}
                      onChange={(e) => {
                        const updated = [...(formData.publications || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, publications: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Área Jurídica
                    </label>
                    <input
                      type="text"
                      value={pub.area}
                      onChange={(e) => {
                        const updated = [...(formData.publications || [])];
                        updated[idx].area = e.target.value;
                        setFormData({ ...formData, publications: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Resumo / Excerpt
                  </label>
                  <textarea
                    rows={2}
                    value={pub.excerpt}
                    onChange={(e) => {
                      const updated = [...(formData.publications || [])];
                      updated[idx].excerpt = e.target.value;
                      setFormData({ ...formData, publications: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: DIGITAL BOOKS */}
      {activeTab === 'books' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F6E27A]" />
                <span>Obras e Livros Digitais do Dr. Aldo Leão</span>
              </h3>
              <p className="text-xs text-slate-400">
                Todos os 6 livros são disponibilizados gratuitamente em PDF e download digital.
              </p>
            </div>
            <button
              onClick={handleAddBook}
              className="px-3.5 py-1.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-semibold text-[#F6E27A] hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Livro</span>
            </button>
          </div>

          <div className="space-y-4">
            {(formData.digitalBooks || []).map((book, idx) => (
              <div key={book.id || idx} className="p-4 rounded-xl bg-[#050B14] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E5C158] uppercase">
                    Livro Digital #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveBook(idx)}
                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título do Livro
                    </label>
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Área Jurídica
                    </label>
                    <input
                      type="text"
                      value={book.area}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].area = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Autor
                    </label>
                    <input
                      type="text"
                      value={book.author}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].author = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Páginas / Formato
                    </label>
                    <input
                      type="text"
                      value={book.pages || 'Edição Digital Completa'}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].pages = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Sinopse da Obra
                  </label>
                  <textarea
                    rows={2}
                    value={book.description}
                    onChange={(e) => {
                      const updated = [...(formData.digitalBooks || [])];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, digitalBooks: updated });
                    }}
                    className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: CONTACTS & WHATSAPP */}
      {activeTab === 'contact' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
            Canais de Comunicação, WhatsApp Oficial & Localização
          </h3>

          <div className="p-4 rounded-xl bg-[#0E1F3D] border border-[#D4AF37]/50">
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1.5 flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Número Oficial do WhatsApp do Escritório:</span>
            </label>
            <input
              type="text"
              value={formData.contact.whatsappNumber}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, whatsappNumber: e.target.value.replace(/\D/g, '') }
              })}
              placeholder="Ex: 5551998088998 (com DDI e DDD)"
              className="w-full p-3 rounded-lg bg-[#050B14] border border-[#D4AF37] text-sm text-[#F6E27A] font-bold tabular-nums"
            />
            <p className="text-[11px] text-slate-300 mt-2">
              Ao alterar este número, todos os botões do WhatsApp e formulários do site direcionam diretamente para este WhatsApp oficial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Telefone Celular / WhatsApp 1
              </label>
              <input
                type="text"
                value={formData.contact.phonePrimary}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phonePrimary: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Telefone Celular / WhatsApp 2
              </label>
              <input
                type="text"
                value={formData.contact.phoneSecondary}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phoneSecondary: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                E-mail Principal do Dr. Aldo
              </label>
              <input
                type="email"
                value={formData.contact.emailPrimary}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, emailPrimary: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                E-mail Secundário
              </label>
              <input
                type="email"
                value={formData.contact.emailSecondary}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, emailSecondary: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Endereço Completo em Porto Alegre - RS
            </label>
            <input
              type="text"
              value={formData.contact.addressPortoAlegre}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, addressPortoAlegre: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Horário de Atendimento
            </label>
            <input
              type="text"
              value={formData.contact.officeHours}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, officeHours: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};
