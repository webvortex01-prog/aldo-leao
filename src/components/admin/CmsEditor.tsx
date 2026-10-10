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
  Download
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { PracticeArea, CaseStudy, DigitalBook } from '../../types';
import realPortraitImg from '../../assets/images/aldo_leao_portrait_real_1791572566625.jpg';
import classicPortraitImg from '../../assets/images/partner_aldo_leao_1791570173885.jpg';

export const CmsEditor: React.FC = () => {
  const { siteConfig, updateSiteConfig, resetSiteConfigToDefault } = useSite();
  const [formData, setFormData] = useState(siteConfig);
  const [activeTab, setActiveTab] = useState<'hero' | 'founder' | 'services' | 'cases' | 'books' | 'contact'>('hero');
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
      number: String(formData.practiceAreas.length + 1).padStart(2, '0'),
      title: 'Nova Área Estratégica',
      subtitle: 'Assessoria Especializada e Contencioso',
      description: 'Descrição do escopo técnico, procedimentos e teses de defesa.',
      keyPoints: ['Análise de riscos e precedentes vinculantes', 'Atuação preventiva e contenciosa especializada'],
      casesSummary: 'Histórico de casos exitosos e atuação perante órgãos reguladores.',
      badge: 'Direito Especializado'
    };
    setFormData({
      ...formData,
      practiceAreas: [...formData.practiceAreas, newArea]
    });
  };

  const handleRemovePracticeArea = (index: number) => {
    const updated = formData.practiceAreas.filter((_, i) => i !== index);
    setFormData({ ...formData, practiceAreas: updated });
  };

  const handleAddCase = () => {
    const newCase: CaseStudy = {
      id: `case-${Date.now()}`,
      value: 'R$ 50.000.000',
      category: 'tributario',
      title: 'Nova Decisão Paradigma',
      tribunal: 'Tribunal Superior',
      challenge: 'Descrição do desafio jurídico de alta repercussão enfrentado pela empresa.',
      solution: 'Estratégia jurídica exclusiva elaborada pela banca de Aldo Leão.',
      result: 'Decisão favorável com trânsito em julgado e cancelamento dos passivos.'
    };
    setFormData({
      ...formData,
      caseStudies: [...formData.caseStudies, newCase]
    });
  };

  const handleAddBook = () => {
    const newBook: DigitalBook = {
      id: `livro-${Date.now()}`,
      title: 'Novo Livro / E-Book Jurídico',
      author: 'Dr. Aldo Leão Ferreira Filho',
      area: 'Planejamento Patrimonial 4.0',
      description: 'Sinopse e descrição da obra jurídica para download ou aquisição.',
      pages: '120 páginas',
      year: '2026',
      isbn: '978-65-89412-00-0',
      format: 'E-Book Digital (PDF)',
      downloadAvailable: true,
      downloadCount: 'Novo Lançamento',
      badge: 'Disponível para Download'
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

  return (
    <div className="space-y-6">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#071122] rounded-xl border border-[#D4AF37]/35 shadow-xl">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <span>Editor Visual do Site</span>
            <span className="text-xs font-sans text-[#E5C158] font-normal uppercase tracking-wider bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              CMS Sem Manutenção Externa
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Altere textos, telefones, fotos e serviços. Tudo reflete instantaneamente no site público.
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
          { id: 'hero', label: '1. Textos do Topo & OAB', icon: FileText },
          { id: 'founder', label: '2. Foto & Perfil do Dr. Aldo', icon: Image },
          { id: 'services', label: '3. Áreas de Atuação (Serviços)', icon: Briefcase },
          { id: 'cases', label: '4. Vitórias & Casos Reais', icon: Trophy },
          { id: 'books', label: '5. Livros & Obras do Dr. Aldo', icon: BookOpen },
          { id: 'contact', label: '6. Telefones & WhatsApp', icon: PhoneCall },
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

      {/* Tab 1: Hero & OAB */}
      {activeTab === 'hero' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
            Textos Principais da Página Inicial
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Inscrição da OAB
              </label>
              <input
                type="text"
                value={formData.hero.oabNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, oabNumber: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Tempo de Cortes Superiores
              </label>
              <input
                type="text"
                value={formData.hero.yearsExperience}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, yearsExperience: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Patrimônio Preservado
              </label>
              <input
                type="text"
                value={formData.hero.assetsPreserved}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, assetsPreserved: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Etiqueta de Abertura (Kicker)
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                Texto em Destaque Ouro
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

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Título Parte 2
              </label>
              <input
                type="text"
                value={formData.hero.titlePart2}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, titlePart2: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Descrição / Proposta de Valor
            </label>
            <textarea
              rows={3}
              value={formData.hero.description}
              onChange={(e) => setFormData({
                ...formData,
                hero: { ...formData.hero, description: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Founder Photo & Profile */}
      {activeTab === 'founder' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
            Perfil e Fotografia do Dr. Aldo Leão
          </h3>

          {/* Photo Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Selecione o Retrato do Advogado Fundador:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Photo matching screenshot */}
              <div
                onClick={() => setFormData({
                  ...formData,
                  founder: { ...formData.founder, photoUrl: realPortraitImg }
                })}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                  formData.founder.photoUrl === realPortraitImg
                    ? 'border-[#D4AF37] bg-[#0E1F3D] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'border-slate-800 bg-[#050B14] hover:border-slate-700'
                }`}
              >
                <img
                  src={realPortraitImg}
                  alt="Dr. Aldo Leão Real"
                  className="w-16 h-20 object-cover rounded-lg border border-[#D4AF37]/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Retrato Fiel ao GetNinjas</span>
                    {formData.founder.photoUrl === realPortraitImg && (
                      <span className="text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.2 rounded font-bold">Ativo</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Com óculos, terno clássico e gravata azul royal, conferindo máxima autenticidade ao perfil real.
                  </p>
                </div>
              </div>

              {/* Option B: Classic portrait */}
              <div
                onClick={() => setFormData({
                  ...formData,
                  founder: { ...formData.founder, photoUrl: classicPortraitImg }
                })}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                  formData.founder.photoUrl === classicPortraitImg
                    ? 'border-[#D4AF37] bg-[#0E1F3D] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'border-slate-800 bg-[#050B14] hover:border-slate-700'
                }`}
              >
                <img
                  src={classicPortraitImg}
                  alt="Dr. Aldo Leão Clássico"
                  className="w-16 h-20 object-cover rounded-lg border border-[#D4AF37]/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Retrato em Biblioteca Clássica</span>
                    {formData.founder.photoUrl === classicPortraitImg && (
                      <span className="text-[10px] bg-[#D4AF37] text-black px-1.5 py-0.2 rounded font-bold">Ativo</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Visual cinematográfico com estantes de livros em mogno e iluminação âmbar.
                  </p>
                </div>
              </div>
            </div>

            {/* Custom URL Option */}
            <div className="mt-4">
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                Ou insira a URL direta de uma foto personalizada do Dr. Aldo:
              </label>
              <input
                type="text"
                value={formData.founder.photoUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, photoUrl: e.target.value }
                })}
                placeholder="https://exemplo.com/foto-aldo-leao.jpg"
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Nome do Advogado
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
                Cargo / Título
              </label>
              <input
                type="text"
                value={formData.founder.title}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, title: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Credenciais Acadêmicas & OAB
            </label>
            <input
              type="text"
              value={formData.founder.credentials}
              onChange={(e) => setFormData({
                ...formData,
                founder: { ...formData.founder, credentials: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
            />
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
              Biografia Institucional — Parágrafo 2 (Planejamento Patrimonial & Filosofia)
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

      {/* Tab 3: Practice Areas */}
      {activeTab === 'services' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Áreas de Atuação & Serviços Jurídicos
              </h3>
              <p className="text-xs text-slate-400">
                Edite os serviços prestados ou adicione novas áreas de especialidade.
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
            {formData.practiceAreas.map((area, idx) => (
              <div key={area.id || idx} className="p-4 rounded-lg bg-[#050B14] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel text-xs font-bold text-[#E5C158]">
                    {area.number || `0${idx + 1}`}. Especialidade
                  </span>
                  {formData.practiceAreas.length > 1 && (
                    <button
                      onClick={() => handleRemovePracticeArea(idx)}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover</span>
                    </button>
                  )}
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
                        const updated = [...formData.practiceAreas];
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
                        const updated = [...formData.practiceAreas];
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
                      const updated = [...formData.practiceAreas];
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

      {/* Tab 4: Cases & Victories */}
      {activeTab === 'cases' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Casos Emblemáticos & Resultados
              </h3>
              <p className="text-xs text-slate-400">
                Atualize os números e vitórias expressivas do escritório.
              </p>
            </div>
            <button
              onClick={handleAddCase}
              className="px-3.5 py-1.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-semibold text-[#F6E27A] hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Vitória</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.caseStudies.map((cs, idx) => (
              <div key={cs.id || idx} className="p-4 rounded-lg bg-[#050B14] border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold mb-1">
                      Valor / Destaque
                    </label>
                    <input
                      type="text"
                      value={cs.value}
                      onChange={(e) => {
                        const updated = [...formData.caseStudies];
                        updated[idx].value = e.target.value;
                        setFormData({ ...formData, caseStudies: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-xs text-[#F6E27A] font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título do Caso
                    </label>
                    <input
                      type="text"
                      value={cs.title}
                      onChange={(e) => {
                        const updated = [...formData.caseStudies];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, caseStudies: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Tribunal / Órgão
                    </label>
                    <input
                      type="text"
                      value={cs.tribunal}
                      onChange={(e) => {
                        const updated = [...formData.caseStudies];
                        updated[idx].tribunal = e.target.value;
                        setFormData({ ...formData, caseStudies: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Desfecho / Resultado Favorável
                  </label>
                  <input
                    type="text"
                    value={cs.result}
                    onChange={(e) => {
                      const updated = [...formData.caseStudies];
                      updated[idx].result = e.target.value;
                      setFormData({ ...formData, caseStudies: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Books & E-Books */}
      {activeTab === 'books' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F6E27A]" />
                <span>Obras e Livros do Dr. Aldo Leão</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Gerencie os 6 livros exibidos no site. Ative ou desative o download gratuito em PDF para cada obra.
              </p>
            </div>

            <button
              onClick={handleAddBook}
              className="px-4 py-2 rounded-lg bg-[#0E1F3D] border border-[#D4AF37]/50 text-xs font-semibold text-[#F6E27A] hover:bg-[#1A3F5D] transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Livro</span>
            </button>
          </div>

          <div className="space-y-5">
            {(formData.digitalBooks || []).map((book, idx) => (
              <div key={book.id || idx} className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xs font-bold text-[#E5C158] bg-[#0E1F3D] px-2.5 py-1 rounded border border-[#D4AF37]/40">
                      Livro 0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      book.downloadAvailable ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {book.downloadAvailable ? 'Download PDF Liberado' : 'Apenas Aquisição'}
                    </span>
                  </div>

                  {(formData.digitalBooks || []).length > 1 && (
                    <button
                      onClick={() => handleRemoveBook(idx)}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título da Obra
                    </label>
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Área Jurídica / Categoria
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Páginas / Edição
                    </label>
                    <input
                      type="text"
                      value={book.pages || ''}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].pages = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      placeholder="Ex: 168 páginas"
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Ano de Publicação
                    </label>
                    <input
                      type="text"
                      value={book.year || ''}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].year = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      placeholder="Ex: 2026"
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Sinopse & Apresentação da Obra
                  </label>
                  <textarea
                    rows={3}
                    value={book.description}
                    onChange={(e) => {
                      const updated = [...(formData.digitalBooks || [])];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, digitalBooks: updated });
                    }}
                    className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#0E1F3D]/60 border border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                    <input
                      type="checkbox"
                      checked={Boolean(book.downloadAvailable)}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].downloadAvailable = e.target.checked;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] border-slate-600 bg-slate-900"
                    />
                    <span>Disponibilizar este livro para Download Gratuito em PDF</span>
                  </label>

                  <div className="text-[11px] text-[#E5C158] font-cinzel">
                    {book.downloadCount || 'Circulação Nacional'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Contacts & WhatsApp */}
      {activeTab === 'contact' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3">
            Canais de Comunicação & WhatsApp Plantão
          </h3>

          <div className="p-4 rounded-xl bg-[#0E1F3D] border border-[#D4AF37]/50">
            <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1.5 flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Número do WhatsApp do Plantão (onde os clientes chamam):</span>
            </label>
            <input
              type="text"
              value={formData.contact.whatsappNumber}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, whatsappNumber: e.target.value.replace(/\D/g, '') }
              })}
              placeholder="Ex: 5511999887766 (com DDI e DDD, apenas números)"
              className="w-full p-3 rounded-lg bg-[#050B14] border border-[#D4AF37] text-sm text-[#F6E27A] font-bold tabular-nums"
            />
            <p className="text-[11px] text-slate-300 mt-2">
              Ao alterar este número, todos os botões "WhatsApp" e chamadas urgentes do site direcionam diretamente para este WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                E-mail Institucional
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Telefone Sede São Paulo
              </label>
              <input
                type="text"
                value={formData.contact.spPhone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, spPhone: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Telefone Unidade Brasília
              </label>
              <input
                type="text"
                value={formData.contact.bsbPhone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, bsbPhone: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Telefone Unidade Curitiba
              </label>
              <input
                type="text"
                value={formData.contact.cwbPhone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, cwbPhone: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
