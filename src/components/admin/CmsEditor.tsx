import React, { useState, useMemo, useRef } from 'react';
import { 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Image as ImageIcon, 
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
  GraduationCap, 
  Layers, 
  Search, 
  Upload, 
  FolderOpen, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { PracticeArea, DigitalBook, Publication } from '../../types';
import { cleanAndFormatPhone, getCleanWhatsAppDigits } from '../../utils/phoneUtils';
import { ArticleSignature } from '../ArticleSignature';

// Componente Especializado para Upload e Gerenciamento de Imagens
interface ImageUploadFieldProps {
  label: string;
  description?: string;
  currentValue?: string;
  defaultValue?: string;
  onChange: (newVal: string) => void;
  presetOptions?: { label: string; url: string }[];
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  description,
  currentValue,
  defaultValue,
  onChange,
  presetOptions,
  aspectRatio = 'auto'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const activeImage = currentValue || defaultValue || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('A imagem é muito pesada (máximo 8MB). Por favor escolha uma imagem mais leve.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onChange(result);
      setSuccessNotice(`Imagem "${file.name}" carregada com sucesso!`);
      setTimeout(() => setSuccessNotice(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'portrait':
        return 'w-28 h-36 sm:w-32 sm:h-44';
      case 'square':
        return 'w-24 h-24 sm:w-28 sm:h-28';
      case 'video':
        return 'w-44 h-28 sm:w-56 sm:h-36';
      default:
        return 'w-32 h-24 sm:w-40 sm:h-28';
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold">
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Preview Box */}
        <div className={`relative ${getAspectClass()} rounded-xl border-2 border-[#D4AF37]/50 overflow-hidden bg-[#071122] shrink-0 shadow-lg flex items-center justify-center group`}>
          {activeImage ? (
            <img
              src={activeImage}
              alt={label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                if (defaultValue && (e.currentTarget as HTMLImageElement).src !== defaultValue) {
                  (e.currentTarget as HTMLImageElement).src = defaultValue;
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500 p-2 text-center">
              <ImageIcon className="w-6 h-6 mb-1 text-[#D4AF37]/60" />
              <span className="text-[9px]">Sem Imagem</span>
            </div>
          )}
          <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[9px] text-[#F6E27A] font-bold">
            Prévia
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex-1 w-full space-y-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Carregar do Computador / Celular</span>
            </button>

            {defaultValue && currentValue && currentValue !== defaultValue && (
              <button
                type="button"
                onClick={() => onChange(defaultValue)}
                className="px-3 py-2 rounded-lg border border-slate-700 hover:border-[#D4AF37] text-slate-300 hover:text-[#F6E27A] text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer bg-[#0A1730]"
                title="Voltar para a imagem padrão original"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restaurar Imagem Padrão</span>
              </button>
            )}
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">
              Ou digite/cole a URL externa da imagem ou caminho de arquivo:
            </label>
            <input
              type="text"
              value={currentValue || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Ex: /presencadigital.jpeg ou https://site.com/foto.jpg"
              className="w-full p-2 rounded-lg bg-[#071122] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {successNotice && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold animate-in fade-in duration-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{successNotice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Opções Pré-definidas / Galeria se disponível */}
      {presetOptions && presetOptions.length > 0 && (
        <div className="pt-2 border-t border-slate-800/80">
          <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
            Ou escolha uma opção da galeria oficial do escritório:
          </span>
          <div className="flex flex-wrap gap-2">
            {presetOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange(opt.url)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                  activeImage === opt.url
                    ? 'border-[#D4AF37] bg-[#0E1F3D] text-[#F6E27A] font-bold shadow-sm'
                    : 'border-slate-800 bg-[#071122] text-slate-300 hover:border-slate-700'
                }`}
              >
                <img
                  src={opt.url}
                  alt={opt.label}
                  className="w-5 h-6 object-cover rounded shrink-0 border border-[#D4AF37]/40"
                />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CmsEditorProps {
  onSwitchToCanvasMode?: () => void;
}

export const CmsEditor: React.FC<CmsEditorProps> = ({ onSwitchToCanvasMode }) => {
  const { siteConfig, updateSiteConfig, resetSiteConfigToDefault } = useSite();
  const [formData, setFormData] = useState(siteConfig);
  const [activeTab, setActiveTab] = useState<
    | 'identidade'
    | 'hero'
    | 'digital_presence'
    | 'legacy'
    | 'founder'
    | 'services'
    | 'solutions'
    | 'consultation'
    | 'holding'
    | 'publications'
    | 'books'
    | 'contact'
    | 'footer'
    | 'all_images'
  >('identidade');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sincroniza caso o context inicial mude
  React.useEffect(() => {
    setFormData(siteConfig);
  }, [siteConfig]);

  const handleSave = () => {
    updateSiteConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar todo o conteúdo do site para o padrão oficial do Dr. Aldo Leão?')) {
      resetSiteConfigToDefault();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Helper para adicionar área de atuação
  const handleAddPracticeArea = () => {
    const newArea: PracticeArea = {
      id: `area-${Date.now()}`,
      number: String((formData.practiceAreas || []).length + 1).padStart(2, '0'),
      title: 'Nova Especialidade Jurídica',
      subtitle: 'Atuação Estratégica e Preventiva',
      description: 'Descrição detalhada dos serviços jurídicos de alta complexidade prestados aos clientes.',
      badge: 'Especializada'
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

  // Helper para adicionar livro digital
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

  // Helper para adicionar publicação
  const handleAddPublication = () => {
    const newPub: Publication = {
      id: `pub-${Date.now()}`,
      type: 'artigo',
      title: 'Novo Artigo / Parecer Jurídico',
      area: 'Planejamento Patrimonial',
      date: '13/10/2026',
      readTime: '5 min de leitura',
      slug: `artigo-${Date.now()}`,
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

  // Linha do tempo: Adicionar ou editar eventos
  const handleAddTimelineEvent = () => {
    const events = formData.centennialLegacy?.events || [];
    const newEvent = {
      year: '2026',
      title: 'Novo Marco Histórico',
      lawyers: ['Dr. Aldo Leão'],
      description: 'Descrição da conquista institucional ou consolidação jurídica do escritório.'
    };
    setFormData({
      ...formData,
      centennialLegacy: {
        ...(formData.centennialLegacy || {}),
        events: [...events, newEvent]
      }
    });
  };

  const handleRemoveTimelineEvent = (index: number) => {
    const events = (formData.centennialLegacy?.events || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      centennialLegacy: {
        ...(formData.centennialLegacy || {}),
        events
      }
    });
  };

  // Helper para normalizar texto (ignora maiúsculas, minúsculas e acentos)
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Sistema de busca global por qualquer termo (ativo a partir de 1 caractere)
  const searchResults = useMemo(() => {
    const raw = searchQuery.trim();
    if (!raw) return [];
    const q = normalize(raw);
    const results: { label: string; tab: typeof activeTab; hint: string }[] = [];

    const check = (text: string | undefined | null, label: string, tab: typeof activeTab) => {
      if (!text) return;
      const normText = normalize(text);
      if (normText.includes(q)) {
        const idx = normText.indexOf(q);
        const start = Math.max(0, idx - 20);
        const end = Math.min(text.length, idx + raw.length + 35);
        const snippet = (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '');
        results.push({ label, tab, hint: snippet });
      }
    };

    // Imagens
    check(formData.navbar?.logoImageUrl, 'Imagem do Logo', 'all_images');
    check(formData.hero?.heroImageUrl, 'Imagem do Slide 1 (Desktop)', 'all_images');
    check(formData.hero?.heroImageMobileUrl, 'Imagem do Slide 1 (Mobile)', 'all_images');
    check(formData.hero?.heroSlide2ImageUrl, 'Imagem do Slide 2 (Holding Desktop)', 'all_images');
    check(formData.hero?.heroSlide2ImageMobileUrl, 'Imagem do Slide 2 (Holding Mobile)', 'all_images');
    check(formData.holdingFamiliar?.cardImageUrl, 'Foto Card Estruturação Holding', 'all_images');
    check(formData.nationalPresence?.mapImageUrl, 'Imagem do Mapa Presença Digital', 'all_images');
    check(formData.founder.photoUrl, 'Foto do Dr. Aldo Leão', 'all_images');
    check(formData.centennialLegacy?.sealImageUrl, 'Selo 40 Anos de Advocacia', 'all_images');
    check(formData.founder.signatureImageUrl, 'Assinatura Dr. Aldo Leão', 'all_images');
    check(formData.digitalConsultation?.bgImageUrl, 'Fundo Consulta Digital', 'all_images');

    // Identidade
    check(formData.navbar?.logoTitle, 'Logo · Nome do Escritório', 'identidade');
    check(formData.navbar?.logoSubtitle, 'Logo · Slogan', 'identidade');
    check(formData.navbar?.btnConsultation, 'Navbar · Botão Consulta', 'identidade');
    check(formData.navbar?.oabNumber, 'Navbar · Inscrição OAB', 'identidade');

    // Slide 1 & 2
    check(formData.hero.kicker, 'Slide 1 · Kicker 1', 'hero');
    check(formData.hero.kickerSub, 'Slide 1 · Kicker 2', 'hero');
    check(formData.hero.titlePart1, 'Slide 1 · Título 1', 'hero');
    check(formData.hero.titleHighlight, 'Slide 1 · Destaque Dourado', 'hero');
    check(formData.hero.titlePart2, 'Slide 1 · Título 2', 'hero');
    check(formData.hero.description, 'Slide 1 · Texto da Tradição', 'hero');
    check(formData.hero.tagline, 'Slide 1 · Destaque Box', 'hero');
    check(formData.hero.cta1Text, 'Slide 1 · Botão Agendar', 'hero');
    check(formData.hero.cta2Text, 'Slide 1 · Botão Holding', 'hero');
    check(formData.slide2?.eyebrow, 'Slide 2 · Eyebrow', 'hero');
    check(formData.slide2?.title, 'Slide 2 · Título Holding', 'hero');
    check(formData.slide2?.callout1, 'Slide 2 · Chamada Legado Herdeiros', 'hero');
    check(formData.slide2?.callout2, 'Slide 2 · Evite Alta Perda', 'hero');
    check(formData.slide2?.boxTitle, 'Slide 2 · Box Inventário Perda', 'hero');
    check(formData.slide2?.rightCardTitle, 'Slide 2 · Título Card Direita', 'hero');
    check(formData.slide2?.rightCardText, 'Slide 2 · Alíquotas ITCMD', 'hero');
    check(formData.slide2?.sampleAcquisition, 'Slide 2 · Valor de Aquisição', 'hero');
    check(formData.slide2?.sampleMarket, 'Slide 2 · Valor de Mercado', 'hero');
    check(formData.slide2?.inventoryTotal, 'Slide 2 · Custo no Inventário', 'hero');
    check(formData.slide2?.savingsPercentage, 'Slide 2 · Percentual Economia', 'hero');

    // Presença Digital
    check(formData.nationalPresence?.kicker, 'Presença Digital · Kicker', 'digital_presence');
    check(formData.nationalPresence?.title, 'Presença Digital · Título', 'digital_presence');
    check(formData.nationalPresence?.paragraph1, 'Presença Digital · Sede Porto Alegre', 'digital_presence');
    check(formData.nationalPresence?.paragraph2, 'Presença Digital · Advocacia Digital', 'digital_presence');
    check(formData.nationalPresence?.card1Text, 'Presença Digital · Destaque 1', 'digital_presence');
    check(formData.nationalPresence?.card2Text, 'Presença Digital · Destaque 2', 'digital_presence');
    check(formData.nationalPresence?.card3Text, 'Presença Digital · Destaque 3', 'digital_presence');
    check(formData.nationalPresence?.mapImageUrl, 'Presença Digital · Imagem Mapa', 'digital_presence');

    // Legado Centenário
    check(formData.centennialLegacy?.goldKicker, 'Legado · Frase Dourada Superior', 'legacy');
    check(formData.centennialLegacy?.title, 'Legado · Título da Página', 'legacy');
    check(formData.centennialLegacy?.subtitle, 'Legado · Subtítulo Desde 1908', 'legacy');
    check(formData.centennialLegacy?.paragraph1, 'Legado · História Início 1908', 'legacy');
    check(formData.centennialLegacy?.paragraph2, 'Legado · História 3ª Geração 1986', 'legacy');
    check(formData.centennialLegacy?.card40Kicker, 'Legado · Box 40 Anos Kicker', 'legacy');
    check(formData.centennialLegacy?.card40Title, 'Legado · Box 40 Anos Título', 'legacy');
    check(formData.centennialLegacy?.card40Text, 'Legado · Box 40 Anos Texto', 'legacy');
    (formData.centennialLegacy?.events || []).forEach((ev, i) => {
      check(ev.year, `Legado · Linha do Tempo Ano (${ev.year})`, 'legacy');
      check(ev.title, `Legado · Linha do Tempo (${ev.title})`, 'legacy');
      check(ev.lawyers?.join(' '), `Legado · Advogado (${ev.lawyers?.join(' ')})`, 'legacy');
      check(ev.description, `Legado · Descrição (${ev.year})`, 'legacy');
    });

    // Dr. Aldo Head Jurídico
    check(formData.founder.name, 'Dr. Aldo · Nome de Apresentação', 'founder');
    check(formData.founder.fullName, 'Dr. Aldo · Nome Completo Oficial', 'founder');
    check(formData.founder.title, 'Dr. Aldo · Cargo / Especialidade', 'founder');
    check(formData.founder.credentials, 'Dr. Aldo · OAB', 'founder');
    check(formData.founder.bioParagraph1, 'Dr. Aldo · Biografia Parágrafo 1', 'founder');
    check(formData.founder.bioParagraph2, 'Dr. Aldo · Biografia Parágrafo 2', 'founder');
    check(formData.founder.counterTitle, 'Dr. Aldo · Contador 40 Anos Título', 'founder');
    check(formData.founder.counterSub, 'Dr. Aldo · Contador 40 Anos Legenda', 'founder');

    // Áreas de Atuação
    check(formData.practiceAreasHeader?.kicker, 'Áreas de Atuação · Kicker Superior', 'services');
    check(formData.practiceAreasHeader?.title, 'Áreas de Atuação · Título', 'services');
    check(formData.practiceAreasHeader?.description, 'Áreas de Atuação · Texto Introdutório', 'services');
    (formData.practiceAreas || []).forEach((area, i) => {
      check(area.title, `Área ${i + 1} · ${area.title}`, 'services');
      check(area.subtitle, `Área ${i + 1} · Subtítulo`, 'services');
      check(area.description, `Área ${i + 1} · Descrição`, 'services');
    });

    // Soluções
    check(formData.excellenceSolutionsHeader?.kicker, 'Soluções · Kicker Superior', 'solutions');
    check(formData.excellenceSolutionsHeader?.title, 'Soluções · Título', 'solutions');
    check(formData.excellenceSolutionsHeader?.description1, 'Soluções · Introdução 1', 'solutions');
    check(formData.excellenceSolutionsHeader?.description2, 'Soluções · Introdução 2', 'solutions');
    (formData.excellenceSolutions || []).forEach((sol, i) => {
      check(sol.title, `Solução ${i + 1} · ${sol.title}`, 'solutions');
      check(sol.subtitle, `Solução ${i + 1} · Subtítulo`, 'solutions');
      check(sol.description, `Solução ${i + 1} · Descrição`, 'solutions');
    });

    // CTA Consulta
    check(formData.digitalConsultation?.sectionKicker, 'CTA Consulta · Kicker', 'consultation');
    check(formData.digitalConsultation?.sectionTitle, 'CTA Consulta · Título', 'consultation');
    check(formData.digitalConsultation?.description, 'CTA Consulta · Descrição', 'consultation');
    check(formData.digitalConsultation?.btnSchedule, 'CTA Consulta · Botão Agendar', 'consultation');
    check(formData.digitalConsultation?.btnWhatsApp, 'CTA Consulta · Botão WhatsApp', 'consultation');

    // Holding Familiar
    check(formData.holdingFamiliar?.sectionKicker, 'Holding Familiar · Kicker', 'holding');
    check(formData.holdingFamiliar?.sectionTitle, 'Holding Familiar · Título', 'holding');
    check(formData.holdingFamiliar?.cardTitle, 'Holding Familiar · Card Estruturação Título', 'holding');
    check(formData.holdingFamiliar?.cardText, 'Holding Familiar · Card Estruturação Texto', 'holding');
    check(formData.holdingFamiliar?.boxWhatIsTitle, 'Holding Familiar · O Que É Título', 'holding');
    check(formData.holdingFamiliar?.boxWhatIsHeading, 'Holding Familiar · O Que É Cabeçalho', 'holding');
    check(formData.holdingFamiliar?.boxWhatIsText, 'Holding Familiar · O Que É Explicação', 'holding');
    check(formData.holdingFamiliar?.boxWhyTitle, 'Holding Familiar · Por Que Fazer Título', 'holding');
    check(formData.holdingFamiliar?.boxWhyText, 'Holding Familiar · Por Que Fazer Alerta', 'holding');

    // Publicações
    check(formData.publicationsSection?.kicker, 'Publicações · Kicker Notícias e Artigos', 'publications');
    check(formData.publicationsSection?.titleWhite, 'Publicações · Título', 'publications');
    check(formData.publicationsSection?.paragraph1, 'Publicações · Parágrafo 1', 'publications');
    check(formData.publicationsSection?.paragraph2, 'Publicações · Parágrafo 2', 'publications');
    check(formData.publicationsSection?.paragraph3, 'Publicações · Parágrafo 3', 'publications');
    // Assinatura Automática dos Artigos
    check(formData.articleSignature?.line1, 'Assinatura Artigos · Linha 1 (Núcleo de Comunicação)', 'publications');
    check(formData.articleSignature?.line2, 'Assinatura Artigos · Linha 2 (Aldo Leão Advocacia Estratégica)', 'publications');
    check(formData.articleSignature?.line3, 'Assinatura Artigos · Linha 3 (Excelência Jurídica Desde 1908)', 'publications');
    check(formData.articleSignature?.buttonText, 'Assinatura Artigos · Botão CTA Agendar Consulta', 'publications');
    (formData.publications || []).forEach((pub, i) => {
      check(pub.title, `Publicação ${i + 1} · ${pub.title}`, 'publications');
      check(pub.area, `Publicação ${i + 1} · Área (${pub.area})`, 'publications');
      check(pub.excerpt, `Publicação ${i + 1} · Resumo`, 'publications');
    });

    // Livros
    check(formData.booksSection?.goldKicker, 'Livros · Frase Dourada Superior', 'books');
    check(formData.booksSection?.titleWhite, 'Livros · Título Livros Digitais', 'books');
    check(formData.booksSection?.paragraph1, 'Livros · Parágrafo 1', 'books');
    check(formData.booksSection?.paragraph2, 'Livros · Parágrafo 2', 'books');
    check(formData.booksSection?.paragraph3, 'Livros · Parágrafo 3', 'books');
    (formData.digitalBooks || []).forEach((book, i) => {
      check(book.title, `Livro ${i + 1} · ${book.title}`, 'books');
      check(book.author, `Livro ${i + 1} · Autor (${book.author})`, 'books');
      check(book.area, `Livro ${i + 1} · Área (${book.area})`, 'books');
      check(book.description, `Livro ${i + 1} · Sinopse`, 'books');
      check(book.pages, `Livro ${i + 1} · Páginas (${book.pages})`, 'books');
    });

    // Contatos
    check(formData.contact.whatsappNumber, 'Contato · WhatsApp Oficial', 'contact');
    check(formData.contact.phonePrimary, 'Contato · Telefone Celular 1', 'contact');
    check(formData.contact.phoneSecondary, 'Contato · Telefone Celular 2', 'contact');
    check(formData.contact.addressPortoAlegre, 'Contato · Endereço Porto Alegre', 'contact');
    check(formData.contact.emailPrimary, 'Contato · E-mail Principal', 'contact');
    check(formData.contact.emailHolding, 'Contato · E-mail Holding', 'contact');
    check(formData.contact.emailAcademia, 'Contato · E-mail Academia', 'contact');
    check(formData.contact.officeHours, 'Contato · Horário de Atendimento', 'contact');

    // Rodapé
    check(formData.footer?.institutionalParagraph1, 'Rodapé · Parágrafo 1', 'footer');
    check(formData.footer?.institutionalParagraph2, 'Rodapé · Parágrafo 2', 'footer');
    check(formData.footer?.copyrightText, 'Rodapé · Direitos Autorais', 'footer');
    check(formData.footer?.oabComplianceText, 'Rodapé · Conformidade OAB', 'footer');

    return results;
  }, [searchQuery, formData]);

  const tabs = [
    { id: 'identidade', label: '1. Logo & Topo', icon: Sparkles },
    { id: 'hero', label: '2. Hero Slider (Slides 1 e 2)', icon: FileText },
    { id: 'digital_presence', label: '3. Presença Nacional Digital', icon: Compass },
    { id: 'legacy', label: '4. O Legado Centenário', icon: Trophy },
    { id: 'founder', label: '5. Head Jurídico (Dr. Aldo & 40 Anos)', icon: ImageIcon },
    { id: 'services', label: '6. Áreas de Atuação', icon: Briefcase },
    { id: 'solutions', label: '7. Soluções & Academia Leão', icon: GraduationCap },
    { id: 'consultation', label: '8. Agende sua Consulta Digital', icon: PhoneCall },
    { id: 'holding', label: '9. Planejamento Patrimonial (Holding 4.0)', icon: Layers },
    { id: 'publications', label: '10. Publicações Jurídicas (Artigos & Notícias)', icon: BookOpen },
    { id: 'books', label: '11. Livros Digitais (Acervo de 8 Obras)', icon: BookOpen },
    { id: 'contact', label: '12. Telefones, WhatsApp & Endereço', icon: PhoneCall },
    { id: 'footer', label: '13. Rodapé, LGPD & OAB', icon: Scale },
    { id: 'all_images', label: '14. Central de Fotos & Mídia', icon: ImageIcon },
  ] as const;

  const handleSelectSearchResult = (targetTab: typeof activeTab) => {
    setActiveTab(targetTab);
    setTimeout(() => {
      const container = document.getElementById('cms-editor-active-tab-container');
      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        container.classList.add('ring-2', 'ring-[#F6E27A]', 'ring-offset-2', 'ring-offset-[#071122]');
        setTimeout(() => {
          container.classList.remove('ring-2', 'ring-[#F6E27A]', 'ring-offset-2', 'ring-offset-[#071122]');
        }, 2500);
      }
    }, 120);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="p-5 sm:p-6 bg-[#071122] rounded-2xl border border-[#D4AF37]/35 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>Editor Geral de Conteúdo & Imagens</span>
              </h2>
              <span className="text-[11px] font-sans text-[#F6E27A] font-bold uppercase tracking-wider bg-[#D4AF37]/20 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50">
                100% Editável: Textos + Imagens
              </span>
              <span className="text-[11px] font-sans text-emerald-300 font-bold uppercase tracking-wider bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Nuvem Firebase Ativa</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Você pode alterar qualquer texto ou imagem do site. Use a barra de pesquisa abaixo para encontrar na hora qualquer palavra ou foto que queira editar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onSwitchToCanvasMode && (
              <button
                onClick={onSwitchToCanvasMode}
                className="px-4 py-2.5 rounded-lg text-xs font-bold text-black bg-gradient-to-r from-[#D4AF37] to-[#F6E27A] hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                title="Abrir o site ao vivo para navegar e editar com 1 clique"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Editor Visual (Estilo Canva)</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Restaura os textos e imagens oficiais originais"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B14] bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar no Site</span>
            </button>
          </div>
        </div>

        {/* Global Search Bar Interativa com busca instantânea */}
        <div className="relative pt-2 border-t border-slate-800/80 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#F6E27A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="🔍 Digite qualquer palavra ou letra para encontrar no site (ex: inventário, WhatsApp, 1908, Porto Alegre, foto, OAB)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-3 rounded-xl bg-[#040913] border-2 border-[#D4AF37]/50 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F6E27A] focus:ring-2 focus:ring-[#F6E27A]/25 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Atalhos de Busca Rápida */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mr-1">
              Buscas rápidas:
            </span>
            {[
              'Holding',
              'WhatsApp',
              '1908',
              'Inventário',
              'Dr. Aldo',
              'Porto Alegre',
              'ITCMD',
              'Livros',
              'OAB'
            ].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className="px-2 py-0.5 rounded-md bg-[#0A1730] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[11px] text-[#F6E27A] hover:bg-[#12264C] transition-all cursor-pointer font-medium"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Painel de Resultados da Busca */}
          {searchQuery.trim().length > 0 && (
            <div className="mt-2 p-3 sm:p-4 bg-[#0A1730] border-2 border-[#D4AF37]/60 rounded-xl max-h-72 overflow-y-auto space-y-2 shadow-2xl animate-in fade-in duration-150">
              {searchResults.length > 0 ? (
                <>
                  <div className="text-xs font-bold text-[#F6E27A] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Encontrado em {searchResults.length} local(is) no site para "{searchQuery}":
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      Clique em qualquer resultado para ir direto à aba
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {searchResults.map((res, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSearchResult(res.tab)}
                        className="p-2.5 rounded-lg bg-[#050B14] hover:bg-[#12264C] cursor-pointer flex items-center justify-between gap-3 text-xs border border-slate-800 hover:border-[#D4AF37]/60 transition-all group"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-[#E5C158] group-hover:text-[#F6E27A] block text-xs">
                            {res.label}
                          </span>
                          <span className="text-slate-300 text-[11px] line-clamp-1 mt-0.5 font-light">
                            {res.hint}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold bg-[#D4AF37]/25 text-[#F6E27A] group-hover:bg-[#D4AF37] group-hover:text-black px-2.5 py-1 rounded-md whitespace-nowrap shrink-0 border border-[#D4AF37]/50 transition-colors">
                          Ir para Aba e Editar →
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-3 text-center space-y-1">
                  <p className="text-xs text-slate-300">
                    Nenhum texto contendo exatamente <strong className="text-[#F6E27A]">"{searchQuery}"</strong> foi encontrado.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Tente digitar palavras-chave como: <em>holding, 1908, aldo, telefone, whatsapp, oab, livros, inventário...</em>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 shadow-xl animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            <strong>Conteúdo e imagens salvos com sucesso!</strong> Todas as alterações foram salvas e já estão ativas em todo o site.
          </span>
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const tabMatches = searchResults.filter((r) => r.tab === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#0E1F3D] text-[#F6E27A] border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tabMatches > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37] text-black">
                  {tabMatches}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Container Principal com ID para auto-scroll */}
      <div id="cms-editor-active-tab-container" className="rounded-xl transition-all duration-300">
      {/* TAB 1: IDENTIDADE & LOGOMARCA */}
      {activeTab === 'identidade' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F6E27A]" />
              <span>Identidade Visual, Nome do Escritório & Barra Superior (Navbar)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Configure o nome que aparece na logomarca do topo, no rodapé e nos botões de navegação.
            </p>
          </div>

          {/* Upload de Imagem do Logo */}
          <ImageUploadField
            label="Logomarca Oficial (Leão Dourado / Símbolo do Escritório)"
            description="Faça o upload do arquivo de imagem do logo (PNG com fundo transparente recomendado) ou use a imagem padrão."
            currentValue={formData.navbar?.logoImageUrl}
            defaultValue="/img/logo-symbol.png"
            aspectRatio="square"
            onChange={(newUrl) => setFormData({
              ...formData,
              navbar: { ...(formData.navbar || {}), logoImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-bold mb-1.5">
                Nome do Escritório (Logo Principal)
              </label>
              <input
                type="text"
                value={formData.navbar?.logoTitle || 'Aldo Leão'}
                onChange={(e) => setFormData({
                  ...formData,
                  navbar: { ...(formData.navbar || {}), logoTitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-white font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Exibido na fonte clássica com gradiente dourado.</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Subtítulo do Logo (Slogan)
              </label>
              <input
                type="text"
                value={formData.navbar?.logoSubtitle || 'Advocacia Estratégica'}
                onChange={(e) => setFormData({
                  ...formData,
                  navbar: { ...(formData.navbar || {}), logoSubtitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Exibido logo abaixo do nome do escritório.</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Inscrição da OAB Oficial
              </label>
              <input
                type="text"
                value={formData.navbar?.oabNumber || 'OAB/RS 48.452'}
                onChange={(e) => setFormData({
                  ...formData,
                  navbar: { ...(formData.navbar || {}), oabNumber: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Texto do Botão Dourado Superior (Navbar)
              </label>
              <input
                type="text"
                value={formData.navbar?.btnConsultation || 'Consulta Digital'}
                onChange={(e) => setFormData({
                  ...formData,
                  navbar: { ...(formData.navbar || {}), btnConsultation: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-medium"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HERO & SLIDES 1 E 2 */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          {/* SLIDE 1 */}
          <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="text-[#E5C158]">SLIDE 1</span> · Tradição Jurídica Desde 1908
            </h3>

            {/* Imagens do Slide 1 (Desktop e Mobile) com Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploadField
                label="Imagem do Slide 1 · Desktop (Computadores)"
                description="Foto exibida em telas grandes (computadores e notebooks)."
                currentValue={formData.hero.heroImageUrl}
                defaultValue="/img/novofundohero.jpg"
                aspectRatio="video"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, heroImageUrl: newUrl }
                })}
              />

              <ImageUploadField
                label="Imagem do Slide 1 · Mobile (Smartphones)"
                description="Versão vertical otimizada para smartphones (mostra as duas estátuas sem zoom excessivo)."
                currentValue={formData.hero.heroImageMobileUrl}
                defaultValue="/img/novofundohero_mobile.jpg"
                aspectRatio="portrait"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, heroImageMobileUrl: newUrl }
                })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Primeira Frase da Etiqueta Superior (Kicker 1)
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
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Segunda Frase da Etiqueta Superior (Kicker 2)
                </label>
                <input
                  type="text"
                  value={formData.hero.kickerSub || 'ADVOCACIA ESTRATÉGICA'}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, kickerSub: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                Destaque do Box Superior (Tagline)
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

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Título Parte 2
                </label>
                <input
                  type="text"
                  value={formData.hero.titlePart2 || '· MAIS DE UM SÉCULO DE EXCELÊNCIA'}
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
                Texto Principal da Tradição (Slide 1)
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Botão CTA 1 (Principal)
                </label>
                <input
                  type="text"
                  value={formData.hero.cta1Text || 'Agende a sua Consulta Digital'}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, cta1Text: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Botão CTA 2 (Secundário)
                </label>
                <input
                  type="text"
                  value={formData.hero.cta2Text || 'Holding Familiar 4.0'}
                  onChange={(e) => setFormData({
                    ...formData,
                    hero: { ...formData.hero, cta2Text: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
            <h3 className="font-cinzel text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="text-[#E5C158]">SLIDE 2</span> · Holding Familiar & Planejamento Patrimonial 4.0
            </h3>

            {/* Imagens do Slide 2 (Desktop e Mobile) com Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploadField
                label="Imagem de Fundo Slide 2 · Desktop (Computadores)"
                description="Foto de fundo do Slide 2 em telas grandes (BMW e portão dourado)."
                currentValue={formData.hero.heroSlide2ImageUrl}
                defaultValue="/img/holding-familiar-1.jpg"
                aspectRatio="video"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, heroSlide2ImageUrl: newUrl }
                })}
              />

              <ImageUploadField
                label="Imagem de Fundo Slide 2 · Mobile (Smartphones)"
                description="Versão vertical otimizada para celulares do Slide 2."
                currentValue={formData.hero.heroSlide2ImageMobileUrl}
                defaultValue="/img/holding-familiar-1.jpg"
                aspectRatio="portrait"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, heroSlide2ImageMobileUrl: newUrl }
                })}
              />
            </div>

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">
                    Patrimônio Adquirido (IR)
                  </label>
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
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">
                    Patrimônio a Valor de Mercado
                  </label>
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
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">
                    Custo Médio no Inventário
                  </label>
                  <input
                    type="text"
                    value={formData.slide2?.inventoryTotal || 'R$ 180.000,00 a R$ 250.000,00'}
                    onChange={(e) => setFormData({
                      ...formData,
                      slide2: { ...(formData.slide2 || {}), inventoryTotal: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#F6E27A] font-bold mb-1">
                    Percentual de Economia Holding
                  </label>
                  <input
                    type="text"
                    value={formData.slide2?.savingsPercentage || 'Economia de até 75%'}
                    onChange={(e) => setFormData({
                      ...formData,
                      slide2: { ...(formData.slide2 || {}), savingsPercentage: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRESENÇA NACIONAL DIGITAL */}
      {activeTab === 'digital_presence' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white">
              Página 2 · Presença Nacional Digital
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Altere os textos, os 3 tópicos institucionais e a imagem oficial de presença nacional.
            </p>
          </div>

          {/* Upload do Mapa da Presença Digital */}
          <ImageUploadField
            label="Imagem do Mapa da Presença Nacional Digital"
            description="Atualmente configurada para presencadigital.jpeg. Clique em Carregar do Computador para substituir pela sua imagem ou mapa."
            currentValue={formData.nationalPresence?.mapImageUrl}
            defaultValue="/presencadigital.jpeg"
            onChange={(newUrl) => setFormData({
              ...formData,
              nationalPresence: { ...(formData.nationalPresence || {}), mapImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Etiqueta Superior (Kicker)
              </label>
              <input
                type="text"
                value={formData.nationalPresence?.kicker || 'ATENDIMENTO DIGITAL EM TODO O BRASIL'}
                onChange={(e) => setFormData({
                  ...formData,
                  nationalPresence: { ...(formData.nationalPresence || {}), kicker: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                Título Principal
              </label>
              <input
                type="text"
                value={formData.nationalPresence?.title || 'PRESENÇA NACIONAL DIGITAL'}
                onChange={(e) => setFormData({
                  ...formData,
                  nationalPresence: { ...(formData.nationalPresence || {}), title: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Parágrafo 1 (História e Sede em Porto Alegre)
            </label>
            <textarea
              rows={3}
              value={formData.nationalPresence?.paragraph1 || 'Com sede em Porto Alegre/RS e atuação digital estratégica em todo o Brasil, a ALDO LEÃO ADVOCACIA ESTRATÉGICA atende clientes em todo o território nacional e no exterior, prestando serviços jurídicos de alta excelência com agilidade, segurança e eficiência.'}
              onChange={(e) => setFormData({
                ...formData,
                nationalPresence: { ...(formData.nationalPresence || {}), paragraph1: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Parágrafo 2 (Tradição e Tecnologia de Ponta)
            </label>
            <textarea
              rows={3}
              value={formData.nationalPresence?.paragraph2 || 'Combinando tradição jurídica centenária e tecnologia de ponta, estruturamos um modelo de advocacia digital que proporciona aos nossos clientes atendimento personalizado, videoconferências e acompanhamento processual transparente em tempo real, sem a necessidade de deslocamentos.'}
              onChange={(e) => setFormData({
                ...formData,
                nationalPresence: { ...(formData.nationalPresence || {}), paragraph2: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          {/* Os 3 Cards da Presença Digital */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs uppercase font-bold text-[#E5C158] tracking-wider">
              Os 3 Destaques com Ícone de Balança Dourada
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Destaque 1</label>
                <input
                  type="text"
                  value={formData.nationalPresence?.card1Text || 'Atuação Digital no Brasil'}
                  onChange={(e) => setFormData({
                    ...formData,
                    nationalPresence: { ...(formData.nationalPresence || {}), card1Text: e.target.value }
                  })}
                  className="w-full p-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Destaque 2</label>
                <input
                  type="text"
                  value={formData.nationalPresence?.card2Text || 'Infraestrutura Tecnológica de última geração'}
                  onChange={(e) => setFormData({
                    ...formData,
                    nationalPresence: { ...(formData.nationalPresence || {}), card2Text: e.target.value }
                  })}
                  className="w-full p-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Destaque 3</label>
                <input
                  type="text"
                  value={formData.nationalPresence?.card3Text || 'Comodidade, Segurança, Confidencialidade, Sigilo e Economia para cada cliente.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    nationalPresence: { ...(formData.nationalPresence || {}), card3Text: e.target.value }
                  })}
                  className="w-full p-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: O LEGADO CENTENÁRIO */}
      {activeTab === 'legacy' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white">
              Página 3 · O Legado Centenário & Linha do Tempo
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edite a história de mais de um século, os 3 parágrafos, o card de 40 anos e os marcos cronológicos.
            </p>
          </div>

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

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Parágrafo 1 da História Centenária (Início em 1908)
            </label>
            <textarea
              rows={3}
              value={formData.centennialLegacy?.paragraph1 || 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.'}
              onChange={(e) => setFormData({
                ...formData,
                centennialLegacy: { ...(formData.centennialLegacy || {}), paragraph1: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Parágrafo 2 da História Centenária (3ª Geração desde 1986)
            </label>
            <textarea
              rows={3}
              value={formData.centennialLegacy?.paragraph2 || 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.'}
              onChange={(e) => setFormData({
                ...formData,
                centennialLegacy: { ...(formData.centennialLegacy || {}), paragraph2: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          {/* Card de 40 Anos */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
              Box de Destaque · 40 Anos de Advocacia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Etiqueta do Box</label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.card40Kicker || '40 ANOS DE EXPERIÊNCIA'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), card40Kicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Título do Box</label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.card40Title || 'Quatro décadas de dedicação exclusiva'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), card40Title: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Texto de Destaque dos 40 Anos</label>
              <textarea
                rows={2}
                value={formData.centennialLegacy?.card40Text || 'Mais de 40 anos de sólida e ininterrupta atuação na advocacia estratégica, com excelência, discrição e resultados expressivos.'}
                onChange={(e) => setFormData({
                  ...formData,
                  centennialLegacy: { ...(formData.centennialLegacy || {}), card40Text: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Texto do Selo (Nome)</label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.sealName || 'Dr. ALDO LEÃO'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), sealName: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Subtítulo do Selo</label>
                <input
                  type="text"
                  value={formData.centennialLegacy?.sealSubtitle || '40 ANOS DE ADVOCACIA ESTRATÉGICA'}
                  onChange={(e) => setFormData({
                    ...formData,
                    centennialLegacy: { ...(formData.centennialLegacy || {}), sealSubtitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-[#E5C158] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <ImageUploadField
                label="Imagem do Selo 40 Anos"
                description="Upload do selo dourado comemorativo."
                currentValue={formData.centennialLegacy?.sealImageUrl}
                defaultValue="/img/selo-40-anos.png"
                aspectRatio="square"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  centennialLegacy: { ...(formData.centennialLegacy || {}), sealImageUrl: newUrl }
                })}
              />
              <ImageUploadField
                label="Assinatura Dourada Dr. Aldo Leão"
                description="Upload da assinatura institucional exibida no final da linha do tempo."
                currentValue={formData.centennialLegacy?.signatureImageUrl}
                defaultValue="/img/assinatura-gold.png"
                aspectRatio="video"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  centennialLegacy: { ...(formData.centennialLegacy || {}), signatureImageUrl: newUrl }
                })}
              />
            </div>
          </div>

          {/* Marcos Históricos / Linha do Tempo */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase font-bold text-[#E5C158] tracking-wider">
                Marcos Históricos da Linha do Tempo
              </h4>
              <button
                type="button"
                onClick={handleAddTimelineEvent}
                className="px-3 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-xs font-semibold text-[#F6E27A] hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Adicionar Marco</span>
              </button>
            </div>

            <div className="space-y-3">
              {(formData.centennialLegacy?.events || []).map((ev, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#050B14] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F6E27A]">
                      Ano: {ev.year} · {ev.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTimelineEvent(idx)}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remover</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400">Ano</label>
                      <input
                        type="text"
                        value={ev.year}
                        onChange={(e) => {
                          const updated = [...(formData.centennialLegacy?.events || [])];
                          updated[idx].year = e.target.value;
                          setFormData({
                            ...formData,
                            centennialLegacy: { ...(formData.centennialLegacy || {}), events: updated }
                          });
                        }}
                        className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400">Título do Marco</label>
                      <input
                        type="text"
                        value={ev.title}
                        onChange={(e) => {
                          const updated = [...(formData.centennialLegacy?.events || [])];
                          updated[idx].title = e.target.value;
                          setFormData({
                            ...formData,
                            centennialLegacy: { ...(formData.centennialLegacy || {}), events: updated }
                          });
                        }}
                        className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400">Advogado Homenageado</label>
                      <input
                        type="text"
                        value={ev.lawyers?.join(', ') || ''}
                        onChange={(e) => {
                          const updated = [...(formData.centennialLegacy?.events || [])];
                          updated[idx].lawyers = [e.target.value];
                          setFormData({
                            ...formData,
                            centennialLegacy: { ...(formData.centennialLegacy || {}), events: updated }
                          });
                        }}
                        className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400">Descrição do Marco</label>
                    <textarea
                      rows={2}
                      value={ev.description}
                      onChange={(e) => {
                        const updated = [...(formData.centennialLegacy?.events || [])];
                        updated[idx].description = e.target.value;
                        setFormData({
                          ...formData,
                          centennialLegacy: { ...(formData.centennialLegacy || {}), events: updated }
                        });
                      }}
                      className="w-full p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HEAD JURÍDICO DR. ALDO LEÃO */}
      {activeTab === 'founder' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white">
              Página 4 · Head Jurídico: Dr. Aldo Leão & 40 Anos de Advocacia
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Escolha a foto oficial, altere títulos, biografia completa, diferenciais e o contador de 40 anos.
            </p>
          </div>

          {/* Upload de Imagem do Dr. Aldo Leão */}
          <ImageUploadField
            label="Foto Oficial do Dr. Aldo Leão (Head Jurídico)"
            description="Carregue uma foto nova do Dr. Aldo Leão direto do computador/celular ou selecione uma foto pronta da galeria oficial."
            currentValue={formData.founder.photoUrl}
            defaultValue="/img/dr-aldo-portrait.jpg"
            aspectRatio="portrait"
            onChange={(newUrl) => setFormData({
              ...formData,
              founder: { ...formData.founder, photoUrl: newUrl }
            })}
            presetOptions={[
              { label: 'Retrato Formal', url: '/img/dr-aldo-portrait.jpg' },
              { label: 'Dr. Aldo Forense', url: '/img/dr-aldo-1.jpg' },
              { label: 'Ambiente Executivo', url: '/img/dr-aldo-2.jpg' },
              { label: 'Consultoria Estratégica', url: '/img/dr-aldo-3.jpg' },
              { label: 'Gabinete & Biblioteca', url: '/img/dr-aldo-4.jpg' },
              { label: 'Alta Definição', url: '/img/dr-aldo-foco.jpg' },
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Kicker da Seção
              </label>
              <input
                type="text"
                value={formData.founder.sectionKicker || 'ADVOCACIA ESTRATÉGICA DESDE 1986'}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, sectionKicker: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Título em Branco
              </label>
              <input
                type="text"
                value={(formData.founder as any).titleWhite || 'Dr. ALDO'}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, titleWhite: e.target.value } as any
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                Título em Dourado
              </label>
              <input
                type="text"
                value={(formData.founder as any).titleGold || 'LEÃO'}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, titleGold: e.target.value } as any
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1.5">
                Inscrição OAB
              </label>
              <input
                type="text"
                value={formData.founder.credentials || 'OAB/RS 48.452'}
                onChange={(e) => setFormData({
                  ...formData,
                  founder: { ...formData.founder, credentials: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Título Profissional / Especialidade
            </label>
            <input
              type="text"
              value={formData.founder.title || 'Head Jurídico · Especialista em Planejamento Patrimonial 4.0'}
              onChange={(e) => setFormData({
                ...formData,
                founder: { ...formData.founder, title: e.target.value }
              })}
              className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-medium"
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
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
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
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Biografia Institucional — Parágrafo 3 (Tradição & Rigor Técnico)
            </label>
            <textarea
              rows={3}
              value={formData.founder.bioParagraph3 || 'Com uma trajetória de mais de 40 anos de Excelência Jurídica, unimos o rigor técnico do Direito à inteligência jurídica na gestão patrimonial e empresarial para a perpetuação do seu legado.'}
              onChange={(e) => setFormData({
                ...formData,
                founder: { ...formData.founder, bioParagraph3: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Biografia Institucional — Parágrafo 4 (Produção Jurídica & Palestras)
            </label>
            <textarea
              rows={3}
              value={formData.founder.bioParagraph4 || 'O Dr. Aldo Leão possui extensa produção jurídica, com mais de uma centena de Artigos Jurídicos e Livros Digitais publicados, com uma reconhecida trajetória profissional, liderança jurídica e docência superior, que lhe rendeu convites para realização de palestras sobre temas jurídicos importantes.'}
              onChange={(e) => setFormData({
                ...formData,
                founder: { ...formData.founder, bioParagraph4: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          {/* Diferenciais Estratégicos */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                  Diferenciais Estratégicos (Exibidos abaixo da biografia)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Pontos fortes do Dr. Aldo Leão com ícones de verificação dourados.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const current = formData.founder.differentials || [];
                  setFormData({
                    ...formData,
                    founder: { ...formData.founder, differentials: [...current, 'Novo diferencial estratégico'] }
                  });
                }}
                className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] hover:bg-[#D4AF37]/30 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Adicionar</span>
              </button>
            </div>

            <div className="space-y-2">
              {(formData.founder.differentials || [
                '40 + Anos de Advocacia Estratégica num legado jurídico centenário',
                'Autor de Livros e Artigos Jurídicos Publicados',
                'Referência nacional em Planejamento Patrimonial via Holding Familiar',
                'Atendimento e processos 100% digitais no Brasil'
              ]).map((diff, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={diff}
                    onChange={(e) => {
                      const current = [...(formData.founder.differentials || [])];
                      current[idx] = e.target.value;
                      setFormData({
                        ...formData,
                        founder: { ...formData.founder, differentials: current }
                      });
                    }}
                    className="flex-1 p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const current = (formData.founder.differentials || []).filter((_, i) => i !== idx);
                      setFormData({
                        ...formData,
                        founder: { ...formData.founder, differentials: current }
                      });
                    }}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                    title="Remover Diferencial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Currículo Oficial Completo do Dr. Aldo Leão (Modal Saiba Mais) */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/45 space-y-4">
            <div className="border-b border-[#D4AF37]/25 pb-2">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                <span>Currículo Oficial do Dr. Aldo Leão (Modal 'Saiba Mais')</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Edite os 5 parágrafos da Trajetória Profissional, listas de cargos, obras e docência superior.
              </p>
            </div>

            {/* 5 Parágrafos da Trajetória */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
                Trajetória Profissional — 5 Parágrafos Oficiais
              </span>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 1 (Convergência Centenária)</label>
                <textarea
                  rows={2}
                  value={formData.founder.curriculumTrajectoryP1 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, curriculumTrajectoryP1: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 2 (Continuidade Desde 1986 e Avô Paterno)</label>
                <textarea
                  rows={2}
                  value={formData.founder.curriculumTrajectoryP2 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, curriculumTrajectoryP2: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 3 (Rigor Técnico e Inteligência Jurídica)</label>
                <textarea
                  rows={2}
                  value={formData.founder.curriculumTrajectoryP3 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, curriculumTrajectoryP3: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 4 (Artigos, Livros, Mentorias e Liderança)</label>
                <textarea
                  rows={2}
                  value={formData.founder.curriculumTrajectoryP4 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, curriculumTrajectoryP4: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 5 (Frase Dourada de Encerramento)</label>
                <input
                  type="text"
                  value={formData.founder.curriculumTrajectoryP5 || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, curriculumTrajectoryP5: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-xs text-[#F6E27A] font-semibold"
                />
              </div>
            </div>

            {/* Especialização e Excelência Jurídica */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#E5C158] uppercase">
                  Especialização e Excelência Jurídica
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.founder.curriculumLeadershipItems || [];
                    setFormData({
                      ...formData,
                      founder: { ...formData.founder, curriculumLeadershipItems: [...current, 'Nova especialização'] }
                    });
                  }}
                  className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[10px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" /> Adicionar
                </button>
              </div>
              <div className="space-y-1.5">
                {(formData.founder.curriculumLeadershipItems || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const current = [...(formData.founder.curriculumLeadershipItems || [])];
                        current[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, curriculumLeadershipItems: current }
                        });
                      }}
                      className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.founder.curriculumLeadershipItems || []).filter((_, i) => i !== idx);
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, curriculumLeadershipItems: current }
                        });
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trajetória Profissional - Cargos e Funções */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#E5C158] uppercase">
                  Trajetória Profissional — Cargos e Funções de Destaque
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.founder.curriculumTrajectoryItems || [];
                    setFormData({
                      ...formData,
                      founder: { ...formData.founder, curriculumTrajectoryItems: [...current, 'Novo cargo / função institucional'] }
                    });
                  }}
                  className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[10px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" /> Adicionar
                </button>
              </div>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {(formData.founder.curriculumTrajectoryItems || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const current = [...(formData.founder.curriculumTrajectoryItems || [])];
                        current[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, curriculumTrajectoryItems: current }
                        });
                      }}
                      className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.founder.curriculumTrajectoryItems || []).filter((_, i) => i !== idx);
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, curriculumTrajectoryItems: current }
                        });
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Docência Superior */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#E5C158] uppercase">
                  Docência Superior
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.founder.curriculumDocenciaItems || [];
                    setFormData({
                      ...formData,
                      founder: { ...formData.founder, curriculumDocenciaItems: [...current, 'Prof. em Instituição Jurídica'] }
                    });
                  }}
                  className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[10px] font-bold text-[#F6E27A] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-2.5 h-2.5" /> Adicionar
                </button>
              </div>
              <div className="space-y-1.5">
                {(formData.founder.curriculumDocenciaItems || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const current = [...(formData.founder.curriculumDocenciaItems || [])];
                        current[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, curriculumDocenciaItems: current }
                        });
                      }}
                      className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.founder.curriculumDocenciaItems || []).filter((_, i) => i !== idx);
                        setFormData({
                          ...formData,
                          founder: { ...formData.founder, curriculumDocenciaItems: current }
                        });
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contador de 40 Anos */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
              Contador / Selo Oficial de 40 Anos (Item 21 do Dr. Aldo Leão)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Título do Contador</label>
                <input
                  type="text"
                  value={formData.founder.counterTitle || '40 ANOS DE ADVOCACIA'}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, counterTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Subtítulo do Contador</label>
                <input
                  type="text"
                  value={formData.founder.counterSub || 'Quatro décadas de excelência e dedicação exclusiva à advocacia estratégica'}
                  onChange={(e) => setFormData({
                    ...formData,
                    founder: { ...formData.founder, counterSub: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ÁREAS DE ATUAÇÃO */}
      {activeTab === 'services' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Página 5 · Áreas de Atuação Especializadas
              </h3>
              <p className="text-xs text-slate-400">
                Gerencie o cabeçalho da seção e os títulos, subtítulos, selos e descrições dos serviços jurídicos.
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

          {/* Cabeçalho da Seção Áreas de Atuação */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block">
              Cabeçalho & Introdução da Seção (Página 5)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Frase Dourada Superior (Kicker)
                </label>
                <input
                  type="text"
                  value={formData.practiceAreasHeader?.kicker || 'SOLUÇÕES JURÍDICAS DE ALTA PERFORMANCE'}
                  onChange={(e) => setFormData({
                    ...formData,
                    practiceAreasHeader: { ...(formData.practiceAreasHeader || {}), kicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Título em Branco
                </label>
                <input
                  type="text"
                  value={formData.practiceAreasHeader?.title || 'ÁREAS DE'}
                  onChange={(e) => setFormData({
                    ...formData,
                    practiceAreasHeader: { ...(formData.practiceAreasHeader || {}), title: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Destaque Dourado do Título
                </label>
                <input
                  type="text"
                  value={formData.practiceAreasHeader?.titleHighlight || 'ATUAÇÃO'}
                  onChange={(e) => setFormData({
                    ...formData,
                    practiceAreasHeader: { ...(formData.practiceAreasHeader || {}), titleHighlight: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                Texto de Introdução das Especialidades
              </label>
              <textarea
                rows={3}
                value={formData.practiceAreasHeader?.description || 'Com a solidez de um legado jurídico iniciado em 1908 e a experiência de mais de quatro décadas da terceira geração da família na advocacia, a ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas avançadas e personalizadas, unindo inteligência estratégica, prevenção de riscos e excelência técnica para proteger patrimônios, fortalecer empresas e preservar legados. Nossa atuação concentra-se nas seguintes áreas:'}
                onChange={(e) => setFormData({
                  ...formData,
                  practiceAreasHeader: { ...(formData.practiceAreasHeader || {}), description: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
              />
            </div>
          </div>

          <div className="space-y-4">
            {(formData.practiceAreas || []).map((area, idx) => (
              <div key={area.id || idx} className="p-4 rounded-xl bg-[#050B14] border border-slate-800 space-y-3">
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
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium"
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
                    Descrição do Escopo Jurídico
                  </label>
                  <textarea
                    rows={2}
                    value={area.description}
                    onChange={(e) => {
                      const updated = [...(formData.practiceAreas || [])];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, practiceAreas: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SOLUÇÕES DE EXCELÊNCIA & ACADEMIA */}
      {activeTab === 'solutions' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white">
              Página 6 · Soluções de Excelência & Academia Leão Ferreira
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Altere o cabeçalho da seção, os 14 cards de soluções de excelência e os detalhes da Academia Leão Ferreira.
            </p>
          </div>

          {/* Cabeçalho da Seção Soluções de Excelência */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block">
              Cabeçalho & Textos de Introdução (Página 6)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Frase Dourada Superior (Kicker)
                </label>
                <input
                  type="text"
                  value={formData.excellenceSolutionsHeader?.kicker || 'INTELIGÊNCIA JURÍDICA, ESTRATÉGIA E INOVAÇÃO'}
                  onChange={(e) => setFormData({
                    ...formData,
                    excellenceSolutionsHeader: { ...(formData.excellenceSolutionsHeader || {}), kicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Título em Branco
                </label>
                <input
                  type="text"
                  value={formData.excellenceSolutionsHeader?.title || 'SOLUÇÕES DE'}
                  onChange={(e) => setFormData({
                    ...formData,
                    excellenceSolutionsHeader: { ...(formData.excellenceSolutionsHeader || {}), title: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Destaque Dourado do Título
                </label>
                <input
                  type="text"
                  value={formData.excellenceSolutionsHeader?.titleHighlight || 'EXCELÊNCIA'}
                  onChange={(e) => setFormData({
                    ...formData,
                    excellenceSolutionsHeader: { ...(formData.excellenceSolutionsHeader || {}), titleHighlight: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 1 de Introdução
                </label>
                <textarea
                  rows={3}
                  value={formData.excellenceSolutionsHeader?.description1 || 'A ALDO LEÃO ADVOCACIA ESTRATÉGICA desenvolve soluções jurídicas inovadoras que integram tradição jurídica centenária, inteligência estratégica e gestão, proporcionando proteção patrimonial e empresarial, segurança jurídica, eficiência organizacional e perpetuação de patrimônios, empresas e legados familiares.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    excellenceSolutionsHeader: { ...(formData.excellenceSolutionsHeader || {}), description1: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 2 de Introdução (Slogan de Excelência)
                </label>
                <textarea
                  rows={3}
                  value={formData.excellenceSolutionsHeader?.description2 || 'A excelência jurídica resulta da combinação entre o conhecimento técnico centenário, experiência profissional e visão estratégica.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    excellenceSolutionsHeader: { ...(formData.excellenceSolutionsHeader || {}), description2: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {(formData.excellenceSolutions || []).map((sol, idx) => (
              <div key={sol.id || idx} className="p-4 rounded-xl bg-[#050B14] border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-[#E5C158] uppercase">
                  Solução 0{idx + 1} · {sol.title}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Título da Solução
                    </label>
                    <input
                      type="text"
                      value={sol.title}
                      onChange={(e) => {
                        const updated = [...(formData.excellenceSolutions || [])];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, excellenceSolutions: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium"
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
                    Descrição Detalhada
                  </label>
                  <textarea
                    rows={2}
                    value={sol.description}
                    onChange={(e) => {
                      const updated = [...(formData.excellenceSolutions || [])];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, excellenceSolutions: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Configuração da Página da Academia Leão Ferreira (Item II) */}
          <div className="pt-6 border-t border-[#D4AF37]/30 space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#E5C158]" />
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                Página Exclusiva: Academia Leão Ferreira
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Card Inicial (Tagline)
                </label>
                <input
                  type="text"
                  value={formData.academiaLeao?.kicker || 'CENTRO DE ESTUDOS JURÍDICOS SUPERIORES'}
                  onChange={(e) => setFormData({
                    ...formData,
                    academiaLeao: { ...(formData.academiaLeao || {}), kicker: e.target.value }
                  })}
                  className="w-full p-2.5 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Frase Dourada
                </label>
                <input
                  type="text"
                  value={formData.academiaLeao?.phraseGold || 'CONFERENCISTA E PALESTRANTE NACIONAL'}
                  onChange={(e) => setFormData({
                    ...formData,
                    academiaLeao: { ...(formData.academiaLeao || {}), phraseGold: e.target.value }
                  })}
                  className="w-full p-2.5 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                Texto do Palestrante (Dr. Aldo Leão)
              </label>
              <textarea
                rows={2}
                value={formData.academiaLeao?.speakerText || 'O Dr. Aldo Leão é presença marcante em congressos, seminários, mentorias, workshops, fóruns empresariais e imobiliários e palestras.'}
                onChange={(e) => setFormData({
                  ...formData,
                  academiaLeao: { ...(formData.academiaLeao || {}), speakerText: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/25 space-y-3">
              <h5 className="font-cinzel text-xs font-bold text-[#F6E27A] uppercase tracking-wider">
                Box da Foto da Palestra com Plateia
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Título do Box
                  </label>
                  <input
                    type="text"
                    value={formData.academiaLeao?.lectureBoxTitle || 'PLANEJAMENTO PATRIMONIAL 4.0 & O ALTO CUSTO DA OMISSÃO'}
                    onChange={(e) => setFormData({
                      ...formData,
                      academiaLeao: { ...(formData.academiaLeao || {}), lectureBoxTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>

                {/* Upload da Foto da Palestra */}
                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Foto da Palestra / Conferência com Plateia"
                    description="Carregue a foto do Dr. Aldo Leão em conferência presencial a partir do seu dispositivo."
                    currentValue={formData.academiaLeao?.lecturePhotoUrl || '/img/palestra-1.jpg'}
                    aspectRatio="video"
                    onChange={(newUrl) => setFormData({
                      ...formData,
                      academiaLeao: { ...(formData.academiaLeao || {}), lecturePhotoUrl: newUrl }
                    })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Legenda em Branco Abaixo da Foto
                </label>
                <input
                  type="text"
                  value={formData.academiaLeao?.lectureCaption || 'Dr. Aldo Leão em conferência presencial sobre Planejamento Patrimonial 4.0 & o Alto Custo da Omissão'}
                  onChange={(e) => setFormData({
                    ...formData,
                    academiaLeao: { ...(formData.academiaLeao || {}), lectureCaption: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Frase Convite para Agendamento de Conferência (Dourada)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.academiaLeao?.ctaPrompt || 'Para solicitar a realização de uma Conferência, Palestra, Seminário, Mentoria ou Workshop a ser ministrado pelo Dr. Aldo Leão, clique no botão abaixo.'}
                    onChange={(e) => setFormData({
                      ...formData,
                      academiaLeao: { ...(formData.academiaLeao || {}), ctaPrompt: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={formData.academiaLeao?.ctaButtonText || 'AGENDAR CONFERÊNCIA'}
                    onChange={(e) => setFormData({
                      ...formData,
                      academiaLeao: { ...(formData.academiaLeao || {}), ctaButtonText: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: AGENDE SUA CONSULTA DIGITAL */}
      {activeTab === 'consultation' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F6E27A]" />
              <span>Aba 8 · Agende a sua Consulta Digital (Página 7 do Site)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure os textos, chamada para ação, imagem de fundo e garantias de confidencialidade da consulta online.
            </p>
          </div>

          {/* Imagem de Fundo do CTA */}
          <ImageUploadField
            label="Imagem de Fundo do Bloco de Consulta"
            description="Imagem sutil de fundo para a seção de agendamento de consulta digital."
            currentValue={formData.digitalConsultation?.bgImageUrl}
            defaultValue="/img/dr-aldo-reuniao.jpg"
            aspectRatio="video"
            onChange={(newUrl) => setFormData({
              ...formData,
              digitalConsultation: { ...(formData.digitalConsultation || {}), bgImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Frase Superior (Kicker)
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.sectionKicker || 'ATENDIMENTO DIGITAL EM TODO O BRASIL'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), sectionKicker: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white font-semibold mb-1">
                Título em Branco
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.sectionTitle || 'AGENDE SUA'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), sectionTitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                Destaque Dourado do Título
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.sectionHighlight || 'CONSULTA DIGITAL'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), sectionHighlight: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
              Descrição do Atendimento
            </label>
            <textarea
              rows={3}
              value={formData.digitalConsultation?.description || 'Agende a sua Consulta Jurídica Digital com a ALDO LEÃO ADVOCACIA ESTRATÉGICA e descubra as soluções jurídicas avançadas e inteligentes para a sua necessidade. Nosso atendimento virtual no Brasil é realizado de forma personalizada, com segurança digital, confidencialidade e a mesma excelência do atendimento presencial.'}
              onChange={(e) => setFormData({
                ...formData,
                digitalConsultation: { ...(formData.digitalConsultation || {}), description: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Texto do Botão Principal (Agendar Consulta)
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.btnSchedule || 'AGENDAR CONSULTA VIRTUAL'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), btnSchedule: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Texto do Botão WhatsApp
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.btnWhatsApp || 'Agendar pelo WhatsApp'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), btnWhatsApp: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: HOLDING FAMILIAR & PLANEJAMENTO 4.0 */}
      {activeTab === 'holding' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F6E27A]" />
              <span>Aba 9 · Planejamento Patrimonial 4.0 (Holding Familiar) · Página 8 do Site</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edite todos os textos da seção explicativa de Holding, a foto do card de estruturação (BMW oficial), as caixas O Que É, Por Que Fazer e as vantagens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Frase Superior (Kicker)
              </label>
              <input
                type="text"
                value={formData.holdingFamiliar?.sectionKicker || 'PLANEJAMENTO PATRIMONIAL E EMPRESARIAL 4.0'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), sectionKicker: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white font-semibold mb-1">
                Título em Branco
              </label>
              <input
                type="text"
                value={formData.holdingFamiliar?.sectionTitle || 'HOLDING'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), sectionTitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                Destaque Dourado do Título
              </label>
              <input
                type="text"
                value={formData.holdingFamiliar?.sectionHighlight || 'FAMILIAR'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), sectionHighlight: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
              />
            </div>
          </div>

          {/* 3 Parágrafos Explicativos da Seção */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block">
              3 Parágrafos Explicativos Abaixo do Título
            </span>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Parágrafo 1</label>
              <textarea
                rows={2}
                value={formData.holdingFamiliar?.paragraph1 || 'O Planejamento Patrimonial e Empresarial 4.0 via Holding Familiar representa uma nova geração de soluções jurídicas avançadas e especializadas voltadas à proteção patrimonial, estruturação e organização societária, governança familiar e sucessão empresarial.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), paragraph1: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Parágrafo 2</label>
              <textarea
                rows={2}
                value={formData.holdingFamiliar?.paragraph2 || 'Muito além da constituição de uma empresa, trata-se de uma modelagem jurídica personalizada, desenvolvida por advogados especialistas, para proteger o patrimônio, fortalecer a gestão dos ativos e assegurar sua perpetuação para as futuras gerações.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), paragraph2: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Parágrafo 3</label>
              <textarea
                rows={2}
                value={formData.holdingFamiliar?.paragraph3 || 'Cada modelagem estrutural é concebida de forma individualizada, considerando as características do patrimônio, da empresa, da família e dos objetivos do cliente (família).'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), paragraph3: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          {/* Card ESTRUTURAÇÃO E PROTEÇÃO PATRIMONIAL (Foto BMW oficial) */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/40 space-y-4">
            <span className="text-xs font-bold text-[#F6E27A] uppercase tracking-wider block">
              Card de Destaque: Estruturação e Proteção Patrimonial (Foto BMW)
            </span>

            <ImageUploadField
              label="Foto Oficial do Card (Família, Edifício Corporativo e Carro BMW Dourado)"
              description="Imagem oficial aprovada pelo Dr. Aldo Leão para o card de destaque da Holding Familiar."
              currentValue={formData.holdingFamiliar?.cardImageUrl || '/img/holding-familiar-1.jpg'}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                holdingFamiliar: { ...(formData.holdingFamiliar || {}), cardImageUrl: newUrl }
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Selo / Badge do Card</label>
                <input
                  type="text"
                  value={formData.holdingFamiliar?.cardBadge || 'PLANEJAMENTO 4.0'}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingFamiliar: { ...(formData.holdingFamiliar || {}), cardBadge: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Título do Card</label>
                <input
                  type="text"
                  value={formData.holdingFamiliar?.cardTitle || 'ESTRUTURAÇÃO E PROTEÇÃO PATRIMONIAL'}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingFamiliar: { ...(formData.holdingFamiliar || {}), cardTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Descrição do Card</label>
              <textarea
                rows={2}
                value={formData.holdingFamiliar?.cardText || 'Organização societária de especialistas para proteger e perpetuar o seu patrimônio e negócio para as futuras gerações.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), cardText: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          {/* Box O QUE É? */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#E5C158] tracking-wider">
              Box 1: O Que É o Planejamento 4.0?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Etiqueta do Box</label>
                <input
                  type="text"
                  value={formData.holdingFamiliar?.boxWhatIsTitle || 'O QUE É O PLANEJAMENTO 4.0?'}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhatIsTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Cabeçalho</label>
                <input
                  type="text"
                  value={formData.holdingFamiliar?.boxWhatIsHeading || 'Metodologia Jurídica Estratégica Multidisciplinar'}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhatIsHeading: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Texto Explicativo</label>
              <textarea
                rows={3}
                value={formData.holdingFamiliar?.boxWhatIsText || 'Desenvolvida para organizar, proteger e perpetuar patrimônios e empresas por meio de soluções preventivas, reduzindo riscos jurídicos, sucessórios e tributários. Sua estrutura integra instrumentos de Direito Societário, Direito Empresarial, Direito Civil, Direito Imobiliário e Governança Familiar.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhatIsText: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>
          </div>

          {/* Box POR QUE PLANEJAR EM VIDA? */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#E5C158] tracking-wider">
              Box 2: Por Que Planejar em Vida?
            </h4>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Título do Box</label>
              <input
                type="text"
                value={formData.holdingFamiliar?.boxWhyTitle || 'Por Que Planejar em Vida?'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhyTitle: e.target.value }
                })}
                className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Texto de Alerta e Conscientização</label>
              <textarea
                rows={3}
                value={formData.holdingFamiliar?.boxWhyText || 'Permite que decisões patrimoniais e empresariais sejam tomadas de forma organizada, estratégica e com segurança jurídica, eliminando brigas entre herdeiros, a alta perda patrimonial e financeira do inventário (média 40% do patrimônio inventariado), partilha das cotas sociais em divórcios e dissoluções de uniões estáveis, a venda forçada e rápida de bens com deságio para quitar o inventário.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhyText: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* SEÇÃO DEDICADA: LANDING PAGE HOLDING FAMILIAR 4.0 (/1208/) */}
          {/* ========================================================= */}
          <div className="mt-12 pt-8 border-t-2 border-[#D4AF37]/40 space-y-6">
            <div className="bg-[#050B14] p-5 rounded-2xl border border-[#D4AF37]/50 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-bold block mb-1">
                PÁGINA DEDICADA EXCLUSIVA
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F6E27A]" />
                <span>LANDING PAGE HOLDING FAMILIAR 4.0 (ROTA /1208/)</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Gerencie todos os textos, perguntas frequentes, as 18 vantagens, os problemas do inventário e a tabela comparativa de custos da página oficial de conversão.
              </p>
            </div>

            {/* 1. HERO DA LANDING PAGE */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-4">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                1. Hero Principal da Landing Page
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Frase Superior (Eyebrow)</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.heroEyebrow || 'HOLDING FAMILIAR'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroEyebrow: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Título em Branco</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.heroTitle || 'PLANEJAMENTO'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Subtítulo em Dourado</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.heroSubtitle || 'O INVENTÁRIO ACARRETA ALTA PERDA PATRIMONIAL E FINANCEIRA AOS HERDEIROS'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroSubtitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/40 text-xs text-[#F6E27A] font-bold"
                  />
                </div>
              </div>

              {/* 5 Parágrafos do Hero */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
                  Os 5 Parágrafos do Hero da Landing Page
                </span>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 1</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.heroParagraph1 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroParagraph1: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 2</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.heroParagraph2 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroParagraph2: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 3</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.heroParagraph3 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroParagraph3: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 4</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.heroParagraph4 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroParagraph4: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 5 (Destaque Final)</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.heroParagraph5 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroParagraph5: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              {/* Botões do Hero */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Botão Dourado (Viabilidade)</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.heroBtnViabilidade || 'AGENDAR SESSÃO DE VIABILIDADE'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroBtnViabilidade: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Botão Secundário (Custos)</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.heroBtnCustos || 'CUSTOS: INVENTÁRIO X PLANEJAMENTO 4.0'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), heroBtnCustos: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 2. ALGUNS PROBLEMAS DO INVENTÁRIO */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-red-500/35 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-bold text-red-400 tracking-wider">
                    2. Seção: Alguns Problemas do Inventário
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Cards com ícone de alerta vermelho conscientizando o cliente sobre os riscos do inventário.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.holdingLanding?.problemsList || [];
                    setFormData({
                      ...formData,
                      holdingLanding: {
                        ...(formData.holdingLanding || {}),
                        problemsList: [...current, 'Novo problema diagnosticado no inventário']
                      }
                    });
                  }}
                  className="px-2.5 py-1 rounded bg-red-950/40 border border-red-500 text-[11px] font-bold text-red-300 hover:bg-red-900/50 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Adicionar Problema
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Kicker da Seção</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.problemsSubtitle || 'DIAGNÓSTICO PREVENTIVO'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), problemsSubtitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Título da Seção</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.problemsTitle || 'ALGUNS PROBLEMAS DO INVENTÁRIO'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), problemsTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {(formData.holdingLanding?.problemsList || []).map((prob, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={prob}
                      onChange={(e) => {
                        const current = [...(formData.holdingLanding?.problemsList || [])];
                        current[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          holdingLanding: { ...(formData.holdingLanding || {}), problemsList: current }
                        });
                      }}
                      className="flex-1 p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.holdingLanding?.problemsList || []).filter((_, i) => i !== idx);
                        setFormData({
                          ...formData,
                          holdingLanding: { ...(formData.holdingLanding || {}), problemsList: current }
                        });
                      }}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. ARQUITETURA JURÍDICA ESTRATÉGICA */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                3. Arquitetura Jurídica Estratégica (Perpetuação do Legado)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Kicker Superior</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.strategyKicker || 'ARQUITETURA JURÍDICA ESTRATÉGICA'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), strategyKicker: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Título</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.strategyTitle || 'O PLANEJAMENTO PATRIMONIAL 4.0 EVITA O INVENTÁRIO E PERPETUA O SEU LEGADO'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), strategyTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 1</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.strategyParagraph1 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), strategyParagraph1: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 2</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.strategyParagraph2 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), strategyParagraph2: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Parágrafo 3</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.strategyParagraph3 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), strategyParagraph3: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* 4. AS 18 VANTAGENS EXCLUSIVAS */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                    4. As 18 Vantagens Exclusivas da Holding Familiar
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Cards elegantes com check dourado apresentando os benefícios diretos do planejamento.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.holdingLanding?.advantagesList || [];
                    setFormData({
                      ...formData,
                      holdingLanding: {
                        ...(formData.holdingLanding || {}),
                        advantagesList: [...current, 'Nova vantagem exclusiva']
                      }
                    });
                  }}
                  className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] hover:bg-[#D4AF37]/30 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Adicionar Vantagem
                </button>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Título da Seção</label>
                <input
                  type="text"
                  value={formData.holdingLanding?.advantagesTitle || 'VANTAGENS EXCLUSIVAS DO PLANEJAMENTO 4.0 (HOLDING FAMILIAR)'}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingLanding: { ...(formData.holdingLanding || {}), advantagesTitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {(formData.holdingLanding?.advantagesList || []).map((vant, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[11px] text-[#D4AF37] font-bold w-6 text-right shrink-0">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={vant}
                      onChange={(e) => {
                        const current = [...(formData.holdingLanding?.advantagesList || [])];
                        current[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          holdingLanding: { ...(formData.holdingLanding || {}), advantagesList: current }
                        });
                      }}
                      className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.holdingLanding?.advantagesList || []).filter((_, i) => i !== idx);
                        setFormData({
                          ...formData,
                          holdingLanding: { ...(formData.holdingLanding || {}), advantagesList: current }
                        });
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. TABELA COMPARATIVA DE CUSTOS COMPLETA */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 space-y-4">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                  5. Tabela Comparativa de Custos: Inventário x Holding Familiar
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Edite os títulos, o caso exemplo e cada valor da tabela comparativa lado a lado.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Kicker</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.tableKicker || 'ESTUDO COMPARATIVO'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), tableKicker: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Título da Tabela</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.tableTitle || 'CUSTOS: INVENTÁRIO X HOLDING FAMILIAR'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), tableTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Subtítulo / Caso Exemplo (R$ 1.000.000,00...)</label>
                <textarea
                  rows={2}
                  value={formData.holdingLanding?.tableSubtitle || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingLanding: { ...(formData.holdingLanding || {}), tableSubtitle: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              {/* Linhas da Tabela de Custos */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-[#E5C158] uppercase block">
                  Valores dos Custos (Inventário x Holding)
                </span>

                {/* ITCD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-red-300 mb-0.5">ITCD / ITCMD · Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.itcmdInventario || 'R$ 75.000,00 (5%)'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), itcmdInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] mb-0.5">ITCD / ITCMD · Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.itcmdHolding || 'R$ 60.000,00 (4%)'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), itcmdHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Honorários */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-red-300 mb-0.5">Honorários Advocatícios · Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.honorariosInventario || 'R$ 120.000,00 (8%)'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), honorariosInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] mb-0.5">Honorários Advocatícios · Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.honorariosHolding || 'R$ 70.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), honorariosHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Custas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-red-300 mb-0.5">Custas de Cartório · Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.custasInventario || 'R$ 12.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), custasInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#25D366] mb-0.5">Custas de Cartório · Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.custasHolding || 'R$ 0,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), custasHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                    />
                  </div>
                </div>

                {/* Certidões */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-red-300 mb-0.5">Certidões · Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.certidoesInventario || 'R$ 3.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), certidoesInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#25D366] mb-0.5">Certidões · Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.certidoesHolding || 'R$ 0,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), certidoesHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                    />
                  </div>
                </div>

                {/* Ganho de Capital */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-red-300 mb-0.5">I.R. Ganho de Capital · Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.ganhoCapitalInventario || 'R$ 75.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), ganhoCapitalInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#25D366] mb-0.5">I.R. Ganho de Capital · Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.ganhoCapitalHolding || 'R$ 0,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), ganhoCapitalHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                    />
                  </div>
                </div>

                {/* Registro */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-red-300 mb-0.5">Registro de Imóveis · Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.registroInventario || 'R$ 12.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), registroInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] mb-0.5">Registro de Imóveis · Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.registroHolding || 'R$ 3.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), registroHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Custo Total */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-[10px] text-red-400 font-bold mb-0.5">Custo Total · Processo de Inventário</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.totalInventario || 'R$ 297.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), totalInventario: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-red-500/50 text-xs text-red-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#F6E27A] font-bold mb-0.5">Custo Total · Holding Familiar</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.totalHolding || 'R$ 133.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), totalHolding: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                    />
                  </div>
                </div>

                {/* Economia */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-[10px] text-[#25D366] font-bold mb-0.5">Economia em R$ com a Holding</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.economiaValor || 'R$ 164.000,00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), economiaValor: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-[#25D366]/50 text-xs text-[#25D366] font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white font-bold mb-0.5">Percentual de Economia</label>
                    <input
                      type="text"
                      value={formData.holdingLanding?.economiaPercentual || '55,21%'}
                      onChange={(e) => setFormData({
                        ...formData,
                        holdingLanding: { ...(formData.holdingLanding || {}), economiaPercentual: e.target.value }
                      })}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6. BOX FAÇA O SEU PLANEJAMENTO 4.0 */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                6. Box: Faça o Seu Planejamento 4.0 (Chamada para Ação)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Título do Box</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.ctaBoxTitle || 'FAÇA O SEU PLANEJAMENTO 4.0'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), ctaBoxTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Texto do Botão Viabilidade</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.ctaBoxBtnViabilidade || 'AGENDAR DIAGNÓSTICO DE VIABILIDADE'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), ctaBoxBtnViabilidade: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Texto do Box</label>
                <textarea
                  rows={2}
                  value={formData.holdingLanding?.ctaBoxText || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingLanding: { ...(formData.holdingLanding || {}), ctaBoxText: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            {/* 7. PÚBLICO-ALVO (PARA QUEM É A HOLDING FAMILIAR?) */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                    7. Para Quem É a Holding Familiar? (Público-Alvo)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Perfis atendidos (Empresários, Proprietários de bens, Famílias empresárias, etc.).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.holdingLanding?.targetList || [];
                    setFormData({
                      ...formData,
                      holdingLanding: {
                        ...(formData.holdingLanding || {}),
                        targetList: [...current, 'Novo perfil de cliente']
                      }
                    });
                  }}
                  className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37] text-[11px] font-bold text-[#F6E27A] hover:bg-[#D4AF37]/30 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Adicionar Perfil
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Kicker</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.targetSubtitle || 'PERFIL E ABRANGÊNCIA'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), targetSubtitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] text-slate-400 mb-0.5">Título</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.targetTitle || 'PARA QUEM É A HOLDING FAMILIAR?'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), targetTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Texto Introdutório</label>
                <textarea
                  rows={2}
                  value={formData.holdingLanding?.targetIntro || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingLanding: { ...(formData.holdingLanding || {}), targetIntro: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(formData.holdingLanding?.targetList || []).map((target, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={target}
                      onChange={(e) => {
                        const current = [...(formData.holdingLanding?.targetList || [])];
                        current[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          holdingLanding: { ...(formData.holdingLanding || {}), targetList: current }
                        });
                      }}
                      className="flex-1 p-1.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = (formData.holdingLanding?.targetList || []).filter((_, i) => i !== idx);
                        setFormData({
                          ...formData,
                          holdingLanding: { ...(formData.holdingLanding || {}), targetList: current }
                        });
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. DR. ALDO LEÃO NA LANDING PAGE */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                8. Seção Dr. Aldo Leão na Landing Page
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Kicker Superior</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.drAldoKicker || 'ADVOCACIA ESTRATÉGICA DESDE 1986'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), drAldoKicker: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Legenda da Foto de Palestra</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.drAldoCaption || 'Conferência e Liderança em Planejamento Patrimonial 4.0'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), drAldoCaption: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Foto de Palestra do Dr. Aldo Leão na Landing Page"
                description="Foto exclusiva para a landing page (evita repetição da foto do site principal)."
                currentValue={formData.holdingLanding?.drAldoPhotoUrl || '/img/palestra-1.jpg'}
                defaultValue="/img/palestra-1.jpg"
                aspectRatio="video"
                onChange={(newUrl) => setFormData({
                  ...formData,
                  holdingLanding: { ...(formData.holdingLanding || {}), drAldoPhotoUrl: newUrl }
                })}
              />

              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Bio Parágrafo 1</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.drAldoBio1 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), drAldoBio1: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Bio Parágrafo 2</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.drAldoBio2 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), drAldoBio2: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Bio Parágrafo 3</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.drAldoBio3 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), drAldoBio3: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Bio Parágrafo 4</label>
                  <textarea
                    rows={2}
                    value={formData.holdingLanding?.drAldoBio4 || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), drAldoBio4: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* 9. PERGUNTAS FREQUENTES (FAQS COMPLETAS COM ADICIONAR E REMOVER) */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                    9. Perguntas Frequentes da Landing Page (Sanfona Interativa)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    As 8 perguntas e respostas essenciais. Você pode alterar, excluir ou adicionar novas perguntas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const current = formData.holdingLanding?.faqs || [];
                    setFormData({
                      ...formData,
                      holdingLanding: {
                        ...(formData.holdingLanding || {}),
                        faqs: [
                          ...current,
                          {
                            q: 'Nova Pergunta Frequente sobre Holding Familiar?',
                            a: 'Resposta detalhada com orientação jurídica clara e preventiva.'
                          }
                        ]
                      }
                    });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Pergunta
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Kicker Superior</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.faqKicker || 'DÚVIDAS'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), faqKicker: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Título da Seção</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.faqTitle || 'PERGUNTAS FREQUENTES'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), faqTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
              </div>

              {/* Lista de FAQs */}
              <div className="space-y-4">
                {(formData.holdingLanding?.faqs || []).map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#071122] border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#E5C158] uppercase">
                        Pergunta #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const current = (formData.holdingLanding?.faqs || []).filter((_, i) => i !== idx);
                          setFormData({
                            ...formData,
                            holdingLanding: { ...(formData.holdingLanding || {}), faqs: current }
                          });
                        }}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remover
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Pergunta</label>
                      <input
                        type="text"
                        value={faq.q}
                        onChange={(e) => {
                          const current = [...(formData.holdingLanding?.faqs || [])];
                          current[idx] = { ...current[idx], q: e.target.value };
                          setFormData({
                            ...formData,
                            holdingLanding: { ...(formData.holdingLanding || {}), faqs: current }
                          });
                        }}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Resposta</label>
                      <textarea
                        rows={3}
                        value={faq.a}
                        onChange={(e) => {
                          const current = [...(formData.holdingLanding?.faqs || [])];
                          current[idx] = { ...current[idx], a: e.target.value };
                          setFormData({
                            ...formData,
                            holdingLanding: { ...(formData.holdingLanding || {}), faqs: current }
                          });
                        }}
                        className="w-full p-2.5 rounded bg-[#050B14] border border-slate-700 text-xs text-slate-200 leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10. BOX ALGUMA DÚVIDA? E RODAPÉ */}
            <div className="p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
              <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider">
                10. Box Final "Alguma Dúvida?" & Rodapé Exclusivo
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Título do Box</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.doubtTitle || 'ALGUMA DÚVIDA?'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), doubtTitle: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Texto do Botão Especialista</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.doubtBtnText || 'FALAR COM O ESPECIALISTA'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), doubtBtnText: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Rodapé Direitos Autorais</label>
                  <input
                    type="text"
                    value={formData.holdingLanding?.footerCopyright || '© ALDO LEÃO ADVOCACIA ESTRATÉGICA – TODOS OS DIREITOS RESERVADOS'}
                    onChange={(e) => setFormData({
                      ...formData,
                      holdingLanding: { ...(formData.holdingLanding || {}), footerCopyright: e.target.value }
                    })}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Texto de Orientação do Box</label>
                <textarea
                  rows={2}
                  value={formData.holdingLanding?.doubtText || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    holdingLanding: { ...(formData.holdingLanding || {}), doubtText: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: PUBLICAÇÕES & ARTIGOS */}
      {activeTab === 'publications' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F6E27A]" />
                <span>Aba 10 · Publicações Jurídicas (Artigos & Notícias) · Página 9 do Site</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Edite o cabeçalho e os textos introdutórios oficiais, configure a assinatura automática e gerencie todos os artigos e notícias.
              </p>
            </div>
            <button
              onClick={handleAddPublication}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Publicação</span>
            </button>
          </div>

          {/* Cabeçalho da Seção Publicações Jurídicas */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block">
              Cabeçalho & 3 Parágrafos Oficiais da Seção (Página 9)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Frase Dourada Superior (Kicker)
                </label>
                <input
                  type="text"
                  value={formData.publicationsSection?.kicker || 'NOTÍCIAS E ARTIGOS JURÍDICOS'}
                  onChange={(e) => setFormData({
                    ...formData,
                    publicationsSection: { ...(formData.publicationsSection || {}), kicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Título em Branco
                </label>
                <input
                  type="text"
                  value={formData.publicationsSection?.titleWhite || 'PUBLICAÇÕES'}
                  onChange={(e) => setFormData({
                    ...formData,
                    publicationsSection: { ...(formData.publicationsSection || {}), titleWhite: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Destaque Dourado do Título
                </label>
                <input
                  type="text"
                  value={formData.publicationsSection?.titleGold || 'JURÍDICAS'}
                  onChange={(e) => setFormData({
                    ...formData,
                    publicationsSection: { ...(formData.publicationsSection || {}), titleGold: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 1 Oficial
                </label>
                <textarea
                  rows={2}
                  value={formData.publicationsSection?.paragraph1 || 'A produção de conhecimento jurídico faz parte da tradição centenária da ALDO LEÃO ADVOCACIA ESTRATÉGICA.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    publicationsSection: { ...(formData.publicationsSection || {}), paragraph1: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 2 Oficial
                </label>
                <textarea
                  rows={2}
                  value={formData.publicationsSection?.paragraph2 || 'Aqui você encontra as notícias importantes e os artigos jurídicos de especialistas em linguagem clara e acessível.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    publicationsSection: { ...(formData.publicationsSection || {}), paragraph2: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 3 Oficial
                </label>
                <textarea
                  rows={2}
                  value={formData.publicationsSection?.paragraph3 || 'Nosso compromisso é compartilhar o conhecimento especializado para que você fique atualizado com as novas tendências do cenário jurídico nacional, que impactam a sua vida e o seu legado.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    publicationsSection: { ...(formData.publicationsSection || {}), paragraph3: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO EXCLUSIVA: ASSINATURA AUTOMÁTICA DOS ARTIGOS E NOTÍCIAS */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#050B14] border-2 border-[#D4AF37]/60 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-[#D4AF37]/5 blur-3xl pointer-events-none rounded-full" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F6E27A] mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-cinzel text-base font-bold text-white">
                      Assinatura Automática dos Artigos e Notícias
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Captação de Leads
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Esta assinatura é inserida <strong>automaticamente ao final de cada notícia ou artigo</strong>, sem necessidade de digitação em cada texto.
                    Se quiser alterar o texto ou as cores da assinatura, basta digitar nos campos específicos abaixo.
                  </p>
                </div>
              </div>

              {/* Switch Ativar / Desativar */}
              <label className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#071122] border border-slate-700 hover:border-[#D4AF37]/60 cursor-pointer transition-colors self-start sm:self-auto shrink-0">
                <input
                  type="checkbox"
                  checked={formData.articleSignature?.enabled ?? true}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      articleSignature: {
                        ...(formData.articleSignature || {
                          enabled: true,
                          line1: 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                          line1Color: '#FFFFFF',
                          line2: 'Excelência Jurídica Desde 1908',
                          line2Color: '#D4AF37',
                          buttonText: 'AGENDAR CONSULTA',
                          buttonTextColor: '#E0E6ED',
                          whatsappNumber: '',
                          whatsappMessage: 'Olá! Estava lendo uma publicação no portal da Aldo Leão Advocacia Estratégica e gostaria de agendar uma consulta jurídica.'
                        }),
                        enabled: e.target.checked
                      }
                    });
                  }}
                  className="w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37] cursor-pointer"
                />
                <span className="text-xs font-semibold text-white">
                  {formData.articleSignature?.enabled !== false ? 'Assinatura Ativada' : 'Assinatura Desativada'}
                </span>
              </label>
            </div>

            {/* Controles de Configuração da Assinatura */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {/* Linha 1 (Item 56: "Núcleo de Comunicação" #FFFFFF) */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Linha 1 da Assinatura (Núcleo de Comunicação)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.articleSignature?.line1 ?? 'Núcleo de Comunicação'}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        articleSignature: {
                          ...(formData.articleSignature || {}),
                          enabled: formData.articleSignature?.enabled ?? true,
                          line1: e.target.value,
                          line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                          line2: formData.articleSignature?.line2 || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                          line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                          line3: formData.articleSignature?.line3 || 'Excelência Jurídica Desde 1908',
                          line3Color: formData.articleSignature?.line3Color || '#F8F8F8',
                          buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                          buttonTextColor: formData.articleSignature?.buttonTextColor || '#050B14',
                        }
                      });
                    }}
                    className="flex-1 p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Ex: Núcleo de Comunicação"
                  />
                  <div className="flex items-center gap-1.5 p-1 rounded bg-[#071122] border border-slate-700" title="Cor da Linha 1">
                    <input
                      type="color"
                      value={formData.articleSignature?.line1Color || '#FFFFFF'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          articleSignature: {
                            ...(formData.articleSignature || {}),
                            enabled: formData.articleSignature?.enabled ?? true,
                            line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação',
                            line1Color: e.target.value,
                            line2: formData.articleSignature?.line2 || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                            line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                            line3: formData.articleSignature?.line3 || 'Excelência Jurídica Desde 1908',
                            line3Color: formData.articleSignature?.line3Color || '#F8F8F8',
                            buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                            buttonTextColor: formData.articleSignature?.buttonTextColor || '#050B14',
                          }
                        });
                      }}
                      className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] text-slate-400 font-mono pr-1">
                      {formData.articleSignature?.line1Color || '#FFFFFF'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linha 2 (Item 56: "ALDO LEÃO ADVOCACIA ESTRATÉGICA" #D4AF37) */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Linha 2 da Assinatura (Escritório / Marca)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.articleSignature?.line2 ?? 'ALDO LEÃO ADVOCACIA ESTRATÉGICA'}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        articleSignature: {
                          ...(formData.articleSignature || {}),
                          enabled: formData.articleSignature?.enabled ?? true,
                          line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação',
                          line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                          line2: e.target.value,
                          line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                          line3: formData.articleSignature?.line3 || 'Excelência Jurídica Desde 1908',
                          line3Color: formData.articleSignature?.line3Color || '#F8F8F8',
                          buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                          buttonTextColor: formData.articleSignature?.buttonTextColor || '#050B14',
                        }
                      });
                    }}
                    className="flex-1 p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Ex: ALDO LEÃO ADVOCACIA ESTRATÉGICA"
                  />
                  <div className="flex items-center gap-1.5 p-1 rounded bg-[#071122] border border-slate-700" title="Cor da Linha 2">
                    <input
                      type="color"
                      value={formData.articleSignature?.line2Color || '#D4AF37'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          articleSignature: {
                            ...(formData.articleSignature || {}),
                            enabled: formData.articleSignature?.enabled ?? true,
                            line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação',
                            line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                            line2: formData.articleSignature?.line2 || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                            line2Color: e.target.value,
                            line3: formData.articleSignature?.line3 || 'Excelência Jurídica Desde 1908',
                            line3Color: formData.articleSignature?.line3Color || '#F8F8F8',
                            buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                            buttonTextColor: formData.articleSignature?.buttonTextColor || '#050B14',
                          }
                        });
                      }}
                      className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] text-slate-400 font-mono pr-1">
                      {formData.articleSignature?.line2Color || '#D4AF37'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linha 3 (Item 56: "Excelência Jurídica Desde 1908" #F8F8F8) */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Linha 3 da Assinatura (Slogan / Centenário)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.articleSignature?.line3 ?? 'Excelência Jurídica Desde 1908'}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        articleSignature: {
                          ...(formData.articleSignature || {}),
                          enabled: formData.articleSignature?.enabled ?? true,
                          line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação',
                          line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                          line2: formData.articleSignature?.line2 || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                          line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                          line3: e.target.value,
                          line3Color: formData.articleSignature?.line3Color || '#F8F8F8',
                          buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                          buttonTextColor: formData.articleSignature?.buttonTextColor || '#050B14',
                        }
                      });
                    }}
                    className="flex-1 p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Ex: Excelência Jurídica Desde 1908"
                  />
                  <div className="flex items-center gap-1.5 p-1 rounded bg-[#071122] border border-slate-700" title="Cor da Linha 3">
                    <input
                      type="color"
                      value={formData.articleSignature?.line3Color || '#F8F8F8'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          articleSignature: {
                            ...(formData.articleSignature || {}),
                            enabled: formData.articleSignature?.enabled ?? true,
                            line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação',
                            line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                            line2: formData.articleSignature?.line2 || 'ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                            line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                            line3: formData.articleSignature?.line3 || 'Excelência Jurídica Desde 1908',
                            line3Color: e.target.value,
                            buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                            buttonTextColor: formData.articleSignature?.buttonTextColor || '#050B14',
                          }
                        });
                      }}
                      className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] text-slate-400 font-mono pr-1">
                      {formData.articleSignature?.line3Color || '#F8F8F8'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão CTA WhatsApp */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Texto do Botão de Agendamento (WhatsApp)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.articleSignature?.buttonText ?? 'AGENDAR CONSULTA'}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        articleSignature: {
                          ...(formData.articleSignature || {}),
                          enabled: formData.articleSignature?.enabled ?? true,
                          line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                          line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                          line2: formData.articleSignature?.line2 || 'Excelência Jurídica Desde 1908',
                          line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                          buttonText: e.target.value,
                          buttonTextColor: formData.articleSignature?.buttonTextColor || '#E0E6ED',
                        }
                      });
                    }}
                    className="flex-1 p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                    placeholder="Ex: AGENDAR CONSULTA"
                  />
                  <div className="flex items-center gap-1.5 p-1 rounded bg-[#071122] border border-slate-700" title="Cor do Texto do Botão">
                    <input
                      type="color"
                      value={formData.articleSignature?.buttonTextColor || '#E0E6ED'}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          articleSignature: {
                            ...(formData.articleSignature || {}),
                            enabled: formData.articleSignature?.enabled ?? true,
                            line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                            line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                            line2: formData.articleSignature?.line2 || 'Excelência Jurídica Desde 1908',
                            line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                            buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                            buttonTextColor: e.target.value,
                          }
                        });
                      }}
                      className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-[10px] text-slate-400 font-mono pr-1">
                      {formData.articleSignature?.buttonTextColor || '#E0E6ED'}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Específico para Leads de Artigos */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  WhatsApp para Atendimento dos Artigos (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.articleSignature?.whatsappNumber ?? ''}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      articleSignature: {
                        ...(formData.articleSignature || {}),
                        enabled: formData.articleSignature?.enabled ?? true,
                        line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                        line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                        line2: formData.articleSignature?.line2 || 'Excelência Jurídica Desde 1908',
                        line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                        buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                        buttonTextColor: formData.articleSignature?.buttonTextColor || '#E0E6ED',
                        whatsappNumber: e.target.value,
                      }
                    });
                  }}
                  className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Deixe em branco para usar o WhatsApp oficial do site: (51) 99808-8998"
                />
              </div>

              {/* Mensagem Pré-definida */}
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Mensagem Pré-definida enviada no WhatsApp
                </label>
                <textarea
                  rows={2}
                  value={formData.articleSignature?.whatsappMessage ?? 'Olá! Estava lendo uma publicação no portal da Aldo Leão Advocacia Estratégica e gostaria de agendar uma consulta jurídica.'}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      articleSignature: {
                        ...(formData.articleSignature || {}),
                        enabled: formData.articleSignature?.enabled ?? true,
                        line1: formData.articleSignature?.line1 || 'Núcleo de Comunicação | ALDO LEÃO ADVOCACIA ESTRATÉGICA',
                        line1Color: formData.articleSignature?.line1Color || '#FFFFFF',
                        line2: formData.articleSignature?.line2 || 'Excelência Jurídica Desde 1908',
                        line2Color: formData.articleSignature?.line2Color || '#D4AF37',
                        buttonText: formData.articleSignature?.buttonText || 'AGENDAR CONSULTA',
                        buttonTextColor: formData.articleSignature?.buttonTextColor || '#E0E6ED',
                        whatsappMessage: e.target.value,
                      }
                    });
                  }}
                  className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                  placeholder="Mensagem padrão enviada quando o lead clica no botão AGENDAR CONSULTA"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Ao clicar, o WhatsApp é aberto com essa mensagem pré-preenchida, informando inclusive qual artigo o leitor estava consultando.
                </p>
              </div>
            </div>

            {/* Prévia Visual ao Vivo */}
            <div className="pt-4 border-t border-slate-800 relative z-10">
              <span className="block text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Prévia Visual em Tempo Real (Como aparecerá ao final de cada artigo e notícia):</span>
              </span>
              <ArticleSignature
                previewMode={true}
                customConfig={formData.articleSignature}
                publicationTitle="A Nova Disciplina do ITCMD e o Impacto Imediato na Estruturação de Holdings Familiares"
              />
            </div>
          </div>

          {/* LISTA DE PUBLICAÇÕES (ARTIGOS E NOTÍCIAS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-300">
                Lista de Publicações Cadastradas ({formData.publications?.length || 0})
              </h4>
            </div>

            {(formData.publications || []).map((pub, idx) => (
              <div key={pub.id || idx} className="p-5 rounded-xl bg-[#050B14] border border-slate-800 hover:border-[#D4AF37]/40 transition-colors space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      pub.type === 'artigo' ? 'bg-[#D4AF37] text-black font-black' : 'bg-slate-700 text-slate-200'
                    }`}>
                      {pub.type === 'artigo' ? 'Artigo Jurídico' : 'Notícia Jurídica'}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Publicação #{idx + 1}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemovePublication(idx)}
                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* Tipo de Publicação */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Tipo de Conteúdo
                    </label>
                    <select
                      value={pub.type || 'artigo'}
                      onChange={(e) => {
                        const updated = [...(formData.publications || [])];
                        updated[idx].type = e.target.value as 'artigo' | 'noticia';
                        setFormData({ ...formData, publications: updated });
                      }}
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    >
                      <option value="artigo">Artigo Jurídico (Dr. Aldo Leão)</option>
                      <option value="noticia">Notícia Jurídica</option>
                    </select>
                  </div>

                  {/* Título */}
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
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium"
                    />
                  </div>

                  {/* Área */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Data da Publicação
                    </label>
                    <input
                      type="text"
                      value={pub.date || ''}
                      onChange={(e) => {
                        const updated = [...(formData.publications || [])];
                        updated[idx].date = e.target.value;
                        setFormData({ ...formData, publications: updated });
                      }}
                      placeholder="Ex: 10 de Outubro de 2026"
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Tempo de Leitura Estimado
                    </label>
                    <input
                      type="text"
                      value={pub.readTime || ''}
                      onChange={(e) => {
                        const updated = [...(formData.publications || [])];
                        updated[idx].readTime = e.target.value;
                        setFormData({ ...formData, publications: updated });
                      }}
                      placeholder="Ex: 5 min de leitura"
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Resumo / Excerpt (Exibido no Cartão da Seção)
                  </label>
                  <textarea
                    rows={2}
                    value={pub.excerpt}
                    onChange={(e) => {
                      const updated = [...(formData.publications || [])];
                      updated[idx].excerpt = e.target.value;
                      setFormData({ ...formData, publications: updated });
                    }}
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                    <span>Conteúdo Completo (Texto Integral do Artigo / Notícia)</span>
                    <span className="text-[10px] text-slate-500 font-normal">A assinatura automática é anexada ao final deste texto</span>
                  </label>
                  <textarea
                    rows={5}
                    value={pub.content || ''}
                    onChange={(e) => {
                      const updated = [...(formData.publications || [])];
                      updated[idx].content = e.target.value;
                      setFormData({ ...formData, publications: updated });
                    }}
                    placeholder="Cole aqui o texto integral do artigo ou parecer jurídico..."
                    className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-sans font-light"
                  />
                </div>

                {/* Metadados SEO Ocultos para Indexação nos Buscadores (Itens 17 e 55) */}
                <div className="p-4 rounded-lg bg-[#071122] border border-[#D4AF37]/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#F6E27A] font-bold">
                      Metadados SEO para Buscadores (Google / Bing) · Campos Ocultos
                    </span>
                    <span className="text-[10px] text-slate-400">Indexado por robôs de busca sem poluir o layout</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                        Título SEO (Title Tag)
                      </label>
                      <input
                        type="text"
                        value={pub.seoTitle || ''}
                        onChange={(e) => {
                          const updated = [...(formData.publications || [])];
                          updated[idx].seoTitle = e.target.value;
                          setFormData({ ...formData, publications: updated });
                        }}
                        placeholder={pub.title || "Ex: Holding Familiar e Proteção Patrimonial | Dr. Aldo Leão"}
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                        Palavras-Chave (# Tags)
                      </label>
                      <input
                        type="text"
                        value={(pub.keywords || []).join(', ')}
                        onChange={(e) => {
                          const updated = [...(formData.publications || [])];
                          updated[idx].keywords = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setFormData({ ...formData, publications: updated });
                        }}
                        placeholder="Ex: #holding, #itcmd, #inventario, #planejamento"
                        className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                      Meta Descrição (Meta Description)
                    </label>
                    <textarea
                      rows={2}
                      value={pub.metaDescription || ''}
                      onChange={(e) => {
                        const updated = [...(formData.publications || [])];
                        updated[idx].metaDescription = e.target.value;
                        setFormData({ ...formData, publications: updated });
                      }}
                      placeholder={pub.excerpt || "Breve descrição otimizada para aparecer nos resultados de busca do Google (150 a 160 caracteres)..."}
                      className="w-full p-2 rounded bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: LIVROS DIGITAIS */}
      {activeTab === 'books' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F6E27A]" />
                <span>Aba 11 · Livros Digitais (Acervo de 8 Obras) · Página 10 do Site</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Edite os textos do cabeçalho oficial da página e gerencie os 8 livros digitais publicados com download gratuito e capas personalizadas.
              </p>
            </div>
            <button
              onClick={handleAddBook}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Livro</span>
            </button>
          </div>

          {/* Cabeçalho Oficial da Seção Livros Digitais */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-3">
            <span className="text-xs font-bold text-[#E5C158] uppercase tracking-wider block">
              Cabeçalho & 3 Parágrafos Oficiais da Página (Página 10)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Frase Dourada Superior (Pill)
                </label>
                <input
                  type="text"
                  value={formData.booksSection?.goldKicker || 'Acervo de Livros Digitais Publicados'}
                  onChange={(e) => setFormData({
                    ...formData,
                    booksSection: { ...(formData.booksSection || {}), goldKicker: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Título em Branco
                </label>
                <input
                  type="text"
                  value={formData.booksSection?.titleWhite || 'LIVROS'}
                  onChange={(e) => setFormData({
                    ...formData,
                    booksSection: { ...(formData.booksSection || {}), titleWhite: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Destaque Dourado do Título
                </label>
                <input
                  type="text"
                  value={formData.booksSection?.titleGold || 'DIGITAIS'}
                  onChange={(e) => setFormData({
                    ...formData,
                    booksSection: { ...(formData.booksSection || {}), titleGold: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 1 Oficial
                </label>
                <textarea
                  rows={2}
                  value={formData.booksSection?.paragraph1 || 'A produção intelectual sempre fez parte da tradição da ALDO LEÃO ADVOCACIA ESTRATÉGICA.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    booksSection: { ...(formData.booksSection || {}), paragraph1: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 2 Oficial
                </label>
                <textarea
                  rows={2}
                  value={formData.booksSection?.paragraph2 || 'Nesta página reunimos os livros digitais publicados por especialistas, para compartilhar GRATUITAMENTE o conhecimento jurídico com soluções estratégicas e boas práticas.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    booksSection: { ...(formData.booksSection || {}), paragraph2: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                  Parágrafo 3 Oficial
                </label>
                <textarea
                  rows={2}
                  value={formData.booksSection?.paragraph3 || 'Cada obra publicada pela Academia Leão Ferreira representa nosso compromisso permanente com a excelência jurídica, a inovação e a difusão do conhecimento especializado.'}
                  onChange={(e) => setFormData({
                    ...formData,
                    booksSection: { ...(formData.booksSection || {}), paragraph3: e.target.value }
                  })}
                  className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed font-light"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {(formData.digitalBooks || []).map((book, idx) => (
              <div key={book.id || idx} className="p-5 rounded-xl bg-[#050B14] border border-slate-800 space-y-4">
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

                {/* Upload de Capa para cada Livro */}
                <ImageUploadField
                  label={`Capa do Livro: ${book.title}`}
                  description="Carregue a imagem da capa do livro digital a partir do seu dispositivo."
                  currentValue={book.coverImage}
                  aspectRatio="video"
                  onChange={(newUrl) => {
                    const updated = [...(formData.digitalBooks || [])];
                    updated[idx].coverImage = newUrl;
                    setFormData({ ...formData, digitalBooks: updated });
                  }}
                />

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
                      Número de Páginas (Editável pelo Dr. Aldo Leão)
                    </label>
                    <input
                      type="text"
                      value={book.pages || '144 páginas'}
                      onChange={(e) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].pages = e.target.value;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                      placeholder="Ex: 144 páginas"
                      className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Upload das Páginas do Sumário (Item III: foto/imagem das páginas do sumário) */}
                <ImageUploadField
                  label={`Foto/Imagem das Páginas do Sumário: ${book.title}`}
                  description="Carregue a foto ou digitalização das páginas do sumário deste livro para exibição na janela de Ver Sumário."
                  currentValue={book.summaryImage}
                  aspectRatio="portrait"
                  onChange={(newUrl) => {
                    const updated = [...(formData.digitalBooks || [])];
                    updated[idx].summaryImage = newUrl;
                    setFormData({ ...formData, digitalBooks: updated });
                  }}
                />

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

      {/* TAB 12: CONTATO & TELEFONES */}
      {activeTab === 'contact' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white">
              Página 11 · Canais de Comunicação, WhatsApp Oficial & Localização
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Altere o número de WhatsApp que recebe mensagens de todo o site, telefones e e-mails.
            </p>
          </div>

          {/* WhatsApp Oficial Principal */}
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
                  contact: { ...formData.contact, phonePrimary: e.target.value.replace(/\./g, '') }
                })}
                onBlur={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phonePrimary: cleanAndFormatPhone(e.target.value, '(51) 99808-8998') }
                })}
                placeholder="(51) 99808-8998"
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">Formato oficial sem pontos: (51) 99808-8998</p>
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
                  contact: { ...formData.contact, phoneSecondary: e.target.value.replace(/\./g, '') }
                })}
                onBlur={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phoneSecondary: cleanAndFormatPhone(e.target.value, '(51) 99807-8998') }
                })}
                placeholder="(51) 99807-8998"
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">Formato oficial sem pontos: (51) 99807-8998</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                E-mail Holding Familiar
              </label>
              <input
                type="email"
                value={formData.contact.emailHolding || 'aldoleao.planejamento@gmail.com'}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, emailHolding: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                E-mail Academia Leão Ferreira
              </label>
              <input
                type="email"
                value={formData.contact.emailAcademia || 'academialeaoferreira@gmail.com'}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, emailAcademia: e.target.value }
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

          {/* Seção Formulário de Contato (Item 10) */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="font-cinzel text-xs font-bold text-[#E5C158] uppercase tracking-wider">
              Textos do Formulário de Contato
            </h4>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Frase em Dourado no Topo do Formulário
              </label>
              <textarea
                rows={2}
                value={formData.contact.formPrompt || 'Preencha os campos abaixo para o seu atendimento estratégico por um de nossos Advogados especialistas.'}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, formPrompt: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Placeholder do Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.contact.formNamePlaceholder || 'Nome Completo'}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, formNamePlaceholder: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  Rótulo do Campo de Consulta
                </label>
                <input
                  type="text"
                  value={formData.contact.formConsultationLabel || 'Tipo de Consulta'}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact: { ...formData.contact, formConsultationLabel: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 13: RODAPÉ & AVISOS DA OAB */}
      {activeTab === 'footer' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#F6E27A]" />
              <span>Página 12 · Rodapé Institucional & Avisos da OAB</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Altere os textos de rodapé, mensagens de direitos autorais e avisos de conformidade com a OAB.
            </p>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Texto Institucional do Rodapé — Parágrafo 1
            </label>
            <textarea
              rows={3}
              value={formData.footer?.institutionalParagraph1 || 'A história da Aldo Leão Advocacia Estratégica começou em 1908 e atravessa mais de um século de dedicação ao Direito, preservando valores éticos, excelência técnica e compromisso permanente com a proteção dos interesses de seus clientes.'}
              onChange={(e) => setFormData({
                ...formData,
                footer: { ...(formData.footer || {}), institutionalParagraph1: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
              Texto Institucional do Rodapé — Parágrafo 2
            </label>
            <textarea
              rows={3}
              value={formData.footer?.institutionalParagraph2 || 'Desde 1986, esse legado jurídico centenário é representado pela terceira geração da família, unindo tradição jurídica, inovação e inteligência estratégica para oferecer soluções jurídicas de alta performance.'}
              onChange={(e) => setFormData({
                ...formData,
                footer: { ...(formData.footer || {}), institutionalParagraph2: e.target.value }
              })}
              className="w-full p-3 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Texto de Direitos Reservados (Copyright)
              </label>
              <input
                type="text"
                value={formData.footer?.copyrightText || '© 2026 Aldo Leão Advocacia Estratégica · Tradição Jurídica Centenária Desde 1908. Todos os direitos reservados.'}
                onChange={(e) => setFormData({
                  ...formData,
                  footer: { ...(formData.footer || {}), copyrightText: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Aviso de Conformidade OAB (Provimento nº 205/2021)
              </label>
              <input
                type="text"
                value={formData.footer?.oabComplianceText || 'Provimento nº 205/2021 do Conselho Federal da OAB · Inscrição OAB/RS 22.418.'}
                onChange={(e) => setFormData({
                  ...formData,
                  footer: { ...(formData.footer || {}), oabComplianceText: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 14: CENTRAL DE TODAS AS IMAGENS DO SITE */}
      {activeTab === 'all_images' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/35 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#F6E27A]" />
              <span>14. Central de Todas as Imagens & Fotos do Portal</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Aqui você tem visão panorâmica e controle total sobre <strong>todas as imagens, fotos e capas de livros de todas as seções do site</strong>. Clique em <strong>"Carregar do Computador / Celular"</strong> para selecionar qualquer arquivo ou cole o link/URL.
            </p>
          </div>

          <div className="space-y-6">
            {/* 1. Logomarca Oficial */}
            <ImageUploadField
              label="1. Logomarca Oficial (Leão Dourado / Símbolo do Topo e Rodapé)"
              description="Exibida na barra de navegação no topo, nas seções e no rodapé do portal."
              currentValue={formData.navbar?.logoImageUrl}
              defaultValue="/img/logo-symbol.png"
              aspectRatio="square"
              onChange={(newUrl) => setFormData({
                ...formData,
                navbar: { ...(formData.navbar || {}), logoImageUrl: newUrl }
              })}
            />

            {/* 2. Slide 1 Desktop */}
            <ImageUploadField
              label="2. Slide 1 - Imagem Principal Tradição Jurídica Centenária (Computador / Desktop)"
              description="Foto de abertura em alta resolução exibida no primeiro slide em telas de computador."
              currentValue={formData.hero.heroImageUrl}
              defaultValue="/img/hero-advocacia-bg.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                hero: { ...formData.hero, heroImageUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Imagem Atual com Estátuas', url: '/img/hero-advocacia-bg.jpg' },
                { label: 'Versão Otimizada Mobile', url: '/img/hero-advocacia-bg-mobile.jpg' },
              ]}
            />

            {/* 3. Slide 1 Mobile */}
            <ImageUploadField
              label="3. Slide 1 - Imagem Tradição Jurídica Centenária (Smartphones / Celular)"
              description="Versão enquadrada perfeitamente na vertical para celulares (sem cortar as estátuas da justiça)."
              currentValue={formData.hero.heroImageMobileUrl}
              defaultValue="/img/hero-advocacia-bg-mobile.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => setFormData({
                ...formData,
                hero: { ...formData.hero, heroImageMobileUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Versão Otimizada Mobile', url: '/img/hero-advocacia-bg-mobile.jpg' },
                { label: 'Versão Desktop', url: '/img/hero-advocacia-bg.jpg' },
              ]}
            />

            {/* 4. Slide 2 Desktop */}
            <ImageUploadField
              label="4. Slide 2 - Imagem Holding Familiar & Planejamento 4.0 (Computador / Desktop)"
              description="Foto oficial aprovada com a família em frente ao edifício e carro BMW dourado."
              currentValue={formData.hero.heroSlide2ImageUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                hero: { ...formData.hero, heroSlide2ImageUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Família & BMW Dourada (Oficial)', url: '/img/holding-familiar-1.jpg' },
              ]}
            />

            {/* 5. Slide 2 Mobile */}
            <ImageUploadField
              label="5. Slide 2 - Imagem Holding Familiar (Smartphones / Celular)"
              description="Foto otimizada para celulares no slide 2 de Planejamento Patrimonial 4.0."
              currentValue={formData.hero.heroSlide2ImageMobileUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => setFormData({
                ...formData,
                hero: { ...formData.hero, heroSlide2ImageMobileUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Família & BMW Dourada (Oficial)', url: '/img/holding-familiar-1.jpg' },
              ]}
            />

            {/* 6. Card Estruturação Holding BMW */}
            <ImageUploadField
              label="6. Foto do Card de Estruturação & Proteção Patrimonial (Página 9)"
              description="Foto em destaque no card central com badge 'ESTRUTURAÇÃO & PROTEÇÃO' na seção Planejamento Patrimonial 4.0."
              currentValue={formData.holdingFamiliar?.cardImageUrl}
              defaultValue="/img/holding-familiar-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                holdingFamiliar: { ...(formData.holdingFamiliar || {}), cardImageUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Família & BMW Dourada (Oficial)', url: '/img/holding-familiar-1.jpg' },
              ]}
            />

            {/* 7. Mapa de Presença Nacional Digital */}
            <ImageUploadField
              label="7. Mapa da Presença Nacional Digital (Página 3)"
              description="Mapa do Brasil com os estados e capitais atendidas pelo escritório digital."
              currentValue={formData.nationalPresence?.mapImageUrl}
              defaultValue="/presencadigital.jpeg"
              aspectRatio="auto"
              onChange={(newUrl) => setFormData({
                ...formData,
                nationalPresence: { ...(formData.nationalPresence || {}), mapImageUrl: newUrl }
              })}
            />

            {/* 8. Retrato Oficial do Dr. Aldo Leão */}
            <ImageUploadField
              label="8. Retrato Principal do Dr. Aldo Leão (Head Jurídico · 40 Anos)"
              description="Foto principal do Dr. Aldo Leão na seção Head Jurídico e apresentações institucionais."
              currentValue={formData.founder.photoUrl}
              defaultValue="/img/dr-aldo-portrait.jpg"
              aspectRatio="portrait"
              onChange={(newUrl) => setFormData({
                ...formData,
                founder: { ...formData.founder, photoUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Retrato Formal', url: '/img/dr-aldo-portrait.jpg' },
                { label: 'Dr. Aldo Forense', url: '/img/dr-aldo-1.jpg' },
                { label: 'Ambiente Executivo', url: '/img/dr-aldo-2.jpg' },
                { label: 'Consultoria Estratégica', url: '/img/dr-aldo-3.jpg' },
                { label: 'Gabinete & Biblioteca', url: '/img/dr-aldo-4.jpg' },
                { label: 'Alta Definição', url: '/img/dr-aldo-foco.jpg' },
              ]}
            />

            {/* 9. Foto Secundária Reunião / Gabinete */}
            <ImageUploadField
              label="9. Foto Secundária do Dr. Aldo Leão (Ambiente Executivo / Reunião)"
              description="Foto de apoio do Dr. Aldo Leão em reunião estratégica com clientes."
              currentValue={formData.founder.secondaryPhotoUrl}
              defaultValue="/img/dr-aldo-2.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                founder: { ...formData.founder, secondaryPhotoUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Ambiente Executivo', url: '/img/dr-aldo-2.jpg' },
                { label: 'Consultoria Estratégica', url: '/img/dr-aldo-3.jpg' },
                { label: 'Gabinete & Biblioteca', url: '/img/dr-aldo-4.jpg' },
                { label: 'Dr. Aldo Forense', url: '/img/dr-aldo-1.jpg' },
              ]}
            />

            {/* 10. Imagem de Fundo do CTA de Consulta Digital */}
            <ImageUploadField
              label="10. Imagem de Fundo do CTA Agende Sua Consulta Digital (Página 8)"
              description="Plano de fundo ou ilustração do bloco de agendamento online de consulta."
              currentValue={formData.digitalConsultation?.bgImageUrl}
              defaultValue=""
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                digitalConsultation: { ...(formData.digitalConsultation || {}), bgImageUrl: newUrl }
              })}
            />

            {/* 11. Selo Oficial de 40 Anos de Advocacia */}
            <ImageUploadField
              label="11. Selo Comemorativo de 40 Anos de Advocacia (1986–2026)"
              description="Chancela e selo oficial de 40 Anos de Advocacia exibido na página O Legado Centenário e na seção do Selo."
              currentValue={formData.centennialLegacy?.sealImageUrl}
              defaultValue="/img/selo-40-anos.png"
              aspectRatio="square"
              onChange={(newUrl) => setFormData({
                ...formData,
                centennialLegacy: { ...(formData.centennialLegacy || {}), sealImageUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Selo 40 Anos (PNG Transparente)', url: '/img/selo-40-anos.png' },
                { label: 'Selo Dourado Oficial', url: '/img/selode40anos.jpg.jpeg' },
              ]}
            />

            {/* 12. Assinatura Oficial do Dr. Aldo Leão */}
            <ImageUploadField
              label="12. Assinatura do Dr. Aldo Leão (Dourada / Transparente)"
              description="Assinatura manuscrita oficial exibida na página Head Jurídico e no final da linha do tempo do Legado Centenário."
              currentValue={formData.founder?.signatureImageUrl || formData.centennialLegacy?.signatureImageUrl}
              defaultValue="/img/assinatura-gold.png"
              aspectRatio="auto"
              onChange={(newUrl) => setFormData({
                ...formData,
                founder: { ...formData.founder, signatureImageUrl: newUrl },
                centennialLegacy: { ...(formData.centennialLegacy || {}), signatureImageUrl: newUrl }
              })}
              presetOptions={[
                { label: 'Assinatura Dourada Oficial', url: '/img/assinatura-gold.png' },
                { label: 'Assinatura Original', url: '/img/assinatura.png' },
              ]}
            />

            {/* 13. Foto da Palestra / Conferência Presencial */}
            <ImageUploadField
              label="13. Foto da Palestra Presencial (Academia Leão Ferreira)"
              description="Foto exibida na seção Academia Leão Ferreira com o Dr. Aldo Leão ministrando a palestra magna 'Planejamento Patrimonial 4.0 & O Alto Custo da Omissão'."
              currentValue={formData.academiaLeao?.lecturePhotoUrl}
              defaultValue="/img/palestra-1.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                academiaLeao: { ...(formData.academiaLeao || {}), lecturePhotoUrl: newUrl }
              })}
            />

            {/* 14. Capas dos 8 Livros Digitais */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-4">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#F6E27A]" />
                  <span>14. Capas dos 8 Livros Digitais Publicados (Acervo Completo)</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Faça o upload ou altere a imagem da capa de cada uma das 8 obras digitais disponíveis para download gratuito.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.digitalBooks || []).map((book, idx) => (
                  <div key={book.id || idx} className="p-3.5 rounded-lg bg-[#071122] border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-[#E5C158] block truncate">
                      Livro #{idx + 1} · {book.title}
                    </span>
                    <ImageUploadField
                      label={`Capa do Livro #${idx + 1}`}
                      currentValue={book.coverImage}
                      aspectRatio="video"
                      onChange={(newUrl) => {
                        const updated = [...(formData.digitalBooks || [])];
                        updated[idx].coverImage = newUrl;
                        setFormData({ ...formData, digitalBooks: updated });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
