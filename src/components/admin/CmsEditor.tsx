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

export const CmsEditor: React.FC = () => {
  const { siteConfig, updateSiteConfig, resetSiteConfigToDefault } = useSite();
  const [formData, setFormData] = useState(siteConfig);
  const [activeTab, setActiveTab] = useState<
    | 'all_images'
    | 'identidade'
    | 'hero'
    | 'digital_presence'
    | 'legacy'
    | 'founder'
    | 'services'
    | 'solutions'
    | 'holding'
    | 'consultation'
    | 'publications'
    | 'books'
    | 'contact'
    | 'footer'
  >('all_images');
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
    check(formData.hero?.heroImageUrl, 'Imagem do Slide 1', 'all_images');
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
    (formData.practiceAreas || []).forEach((area, i) => {
      check(area.title, `Área ${i + 1} · ${area.title}`, 'services');
      check(area.subtitle, `Área ${i + 1} · Subtítulo`, 'services');
      check(area.description, `Área ${i + 1} · Descrição`, 'services');
    });

    // Soluções
    (formData.excellenceSolutions || []).forEach((sol, i) => {
      check(sol.title, `Solução ${i + 1} · ${sol.title}`, 'solutions');
      check(sol.subtitle, `Solução ${i + 1} · Subtítulo`, 'solutions');
      check(sol.description, `Solução ${i + 1} · Descrição`, 'solutions');
    });

    // Holding Familiar
    check(formData.holdingFamiliar?.sectionKicker, 'Holding Familiar · Kicker', 'holding');
    check(formData.holdingFamiliar?.sectionTitle, 'Holding Familiar · Título', 'holding');
    check(formData.holdingFamiliar?.boxWhatIsTitle, 'Holding Familiar · O Que É Título', 'holding');
    check(formData.holdingFamiliar?.boxWhatIsHeading, 'Holding Familiar · O Que É Cabeçalho', 'holding');
    check(formData.holdingFamiliar?.boxWhatIsText, 'Holding Familiar · O Que É Explicação', 'holding');
    check(formData.holdingFamiliar?.boxWhyTitle, 'Holding Familiar · Por Que Fazer Título', 'holding');
    check(formData.holdingFamiliar?.boxWhyText, 'Holding Familiar · Por Que Fazer Alerta', 'holding');

    // CTA Consulta
    check(formData.digitalConsultation?.sectionKicker, 'CTA Consulta · Kicker', 'consultation');
    check(formData.digitalConsultation?.sectionTitle, 'CTA Consulta · Título', 'consultation');
    check(formData.digitalConsultation?.description, 'CTA Consulta · Descrição', 'consultation');
    check(formData.digitalConsultation?.btnSchedule, 'CTA Consulta · Botão Agendar', 'consultation');
    check(formData.digitalConsultation?.btnWhatsApp, 'CTA Consulta · Botão WhatsApp', 'consultation');

    // Publicações
    (formData.publications || []).forEach((pub, i) => {
      check(pub.title, `Publicação ${i + 1} · ${pub.title}`, 'publications');
      check(pub.area, `Publicação ${i + 1} · Área (${pub.area})`, 'publications');
      check(pub.excerpt, `Publicação ${i + 1} · Resumo`, 'publications');
    });

    // Livros
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
    { id: 'all_images', label: '🖼️ Todas as Imagens (Upload)', icon: ImageIcon },
    { id: 'identidade', label: '1. Logo & Topo', icon: Sparkles },
    { id: 'hero', label: '2. Slides 1 e 2 (Custos)', icon: FileText },
    { id: 'digital_presence', label: '3. Presença Digital', icon: Compass },
    { id: 'legacy', label: '4. O Legado Centenário', icon: Trophy },
    { id: 'founder', label: '5. Dr. Aldo & 40 Anos', icon: ImageIcon },
    { id: 'services', label: '6. Áreas de Atuação', icon: Briefcase },
    { id: 'solutions', label: '7. Soluções & Academia', icon: GraduationCap },
    { id: 'holding', label: '8. Holding Familiar 4.0', icon: Layers },
    { id: 'consultation', label: '9. CTA Consulta', icon: PhoneCall },
    { id: 'publications', label: '10. Publicações', icon: BookOpen },
    { id: 'books', label: '11. Livros Digitais', icon: BookOpen },
    { id: 'contact', label: '12. Telefones & WhatsApp', icon: PhoneCall },
    { id: 'footer', label: '13. Rodapé & OAB', icon: Scale },
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
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Você pode alterar qualquer texto ou imagem do site. Use a barra de pesquisa abaixo para encontrar na hora qualquer palavra ou foto que queira editar.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
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

      {/* ABA 0: CENTRAL DE TODAS AS IMAGENS DO SITE */}
      {activeTab === 'all_images' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/35 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#F6E27A]" />
              <span>Central de Todas as Imagens do Site</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Aqui você pode visualizar e alterar <strong>cada imagem de qualquer lugar do site</strong>. Clique em <strong>"Carregar do Computador / Celular"</strong> para selecionar uma foto dos seus arquivos, ou cole qualquer link/URL.
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

            {/* 2. Foto Principal do Slide 1 */}
            <ImageUploadField
              label="2. Imagem Principal do Slide 1 (Tradição Jurídica Centenária Desde 1908)"
              description="Foto em destaque na coluna direita do primeiro slide na abertura do site."
              currentValue={formData.hero.heroImageUrl}
              defaultValue="/img/hero-advocacia-bg.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                hero: { ...formData.hero, heroImageUrl: newUrl }
              })}
            />

            {/* 3. Mapa de Presença Nacional Digital */}
            <ImageUploadField
              label="3. Mapa da Presença Nacional Digital (Atualmente: presencadigital.jpeg)"
              description="Mapa do Brasil exibido na página 2 de Presença Nacional Digital. Para trocar o mapa, basta clicar em Carregar e escolher o novo arquivo."
              currentValue={formData.nationalPresence?.mapImageUrl}
              defaultValue="/presencadigital.jpeg"
              aspectRatio="auto"
              onChange={(newUrl) => setFormData({
                ...formData,
                nationalPresence: { ...(formData.nationalPresence || {}), mapImageUrl: newUrl }
              })}
            />

            {/* 4. Retrato Oficial do Dr. Aldo Leão */}
            <ImageUploadField
              label="4. Retrato do Dr. Aldo Leão (Head Jurídico · 40 Anos)"
              description="Foto principal do advogado Dr. Aldo Leão na seção Head Jurídico. Você pode carregar uma foto nova do seu computador ou escolher entre os 6 retratos forenses da galeria."
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

            {/* 5. Imagem de Fundo do CTA de Consulta Digital */}
            <ImageUploadField
              label="5. Imagem de Fundo do CTA Agende Sua Consulta Digital"
              description="Plano de fundo ou ilustração do bloco de agendamento online de consulta."
              currentValue={formData.digitalConsultation?.bgImageUrl}
              defaultValue=""
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                digitalConsultation: { ...(formData.digitalConsultation || {}), bgImageUrl: newUrl }
              })}
            />

            {/* 6. Selo Oficial de 40 Anos de Advocacia */}
            <ImageUploadField
              label="6. Selo Comemorativo de 40 Anos (1986–2026)"
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

            {/* 7. Assinatura Oficial do Dr. Aldo Leão */}
            <ImageUploadField
              label="7. Assinatura do Dr. Aldo Leão (Dourada / Transparente)"
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

            {/* 8. Capas dos 6 Livros Digitais */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-4">
              <div>
                <h4 className="text-xs uppercase font-bold text-[#F6E27A] tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#F6E27A]" />
                  <span>8. Capas dos Livros Digitais (Download Gratuito)</span>
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Você pode fazer o upload da imagem da capa para cada um dos 6 livros digitais do Dr. Aldo Leão.
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

            {/* Imagem do Slide 1 com Upload */}
            <ImageUploadField
              label="Imagem Principal do Slide 1 (Coluna Direita)"
              description="Foto do Leão com a Balança da Justiça ou outra imagem representativa do escritório."
              currentValue={formData.hero.heroImageUrl}
              defaultValue="/img/hero-advocacia-bg.jpg"
              aspectRatio="video"
              onChange={(newUrl) => setFormData({
                ...formData,
                hero: { ...formData.hero, heroImageUrl: newUrl }
              })}
            />

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
                Gerencie títulos, subtítulos, selos e descrições dos serviços jurídicos.
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
              Altere os cards das soluções de excelência e os detalhes da Academia Leão Ferreira.
            </p>
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
        </div>
      )}

      {/* TAB 8: HOLDING FAMILIAR & PLANEJAMENTO 4.0 */}
      {activeTab === 'holding' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F6E27A]" />
              <span>Página 7 · Seção Holding Familiar & Planejamento Patrimonial 4.0</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edite todos os textos da seção explicativa de Holding, as caixas O Que É, Por Que Fazer e as vantagens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Kicker da Seção
              </label>
              <input
                type="text"
                value={formData.holdingFamiliar?.sectionKicker || 'HOLDING FAMILIAR'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), sectionKicker: e.target.value }
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
                value={formData.holdingFamiliar?.sectionTitle || 'PLANEJAMENTO PATRIMONIAL 4.0'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), sectionTitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-[#D4AF37]/50 text-xs text-[#F6E27A] font-bold"
              />
            </div>
          </div>

          {/* Box O QUE É? */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#E5C158] tracking-wider">
              Box 1: O Que É o Planejamento Patrimonial da Família?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Etiqueta do Box</label>
                <input
                  type="text"
                  value={formData.holdingFamiliar?.boxWhatIsTitle || 'O QUE É?'}
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
                  value={formData.holdingFamiliar?.boxWhatIsHeading || 'Estruturação Jurídica Inteligente e Preventiva'}
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
                value={formData.holdingFamiliar?.boxWhatIsText || 'O Planejamento Patrimonial 4.0 é um sistema jurídico integrado que organiza o patrimônio da família em estruturas societárias seguras (Holding Familiar), permitindo a transferência do patrimônio aos herdeiros em vida, com reserva de usufruto e controle total dos pais, sem a necessidade do caro e demorado processo de inventário.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhatIsText: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>
          </div>

          {/* Box POR QUE FAZER? */}
          <div className="p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/30 space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#E5C158] tracking-wider">
              Box 2: Por Que Fazer? (Eliminação da Perda de 40%)
            </h4>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Título do Box</label>
              <input
                type="text"
                value={formData.holdingFamiliar?.boxWhyTitle || 'POR QUE FAZER O PLANEJAMENTO PATRIMONIAL 4.0?'}
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
                value={formData.holdingFamiliar?.boxWhyText || 'No inventário tradicional, a família chega a perder até 40% de todo o patrimônio acumulado em uma vida de trabalho com impostos (ITCMD), cartórios, certidões e honorários. Além disso, a alíquota do ITCMD já foi autorizada a subir de 8% para até 16% ou 20%. Com o Planejamento 4.0, a família economiza até 75% e garante paz e harmonia entre os herdeiros.'}
                onChange={(e) => setFormData({
                  ...formData,
                  holdingFamiliar: { ...(formData.holdingFamiliar || {}), boxWhyText: e.target.value }
                })}
                className="w-full p-2.5 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: CTA CONSULTA DIGITAL */}
      {activeTab === 'consultation' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-cinzel text-base font-bold text-white">
              Página 8 · Bloco de Agendamento da Consulta Digital
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
            defaultValue=""
            aspectRatio="video"
            onChange={(newUrl) => setFormData({
              ...formData,
              digitalConsultation: { ...(formData.digitalConsultation || {}), bgImageUrl: newUrl }
            })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Kicker
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.sectionKicker || 'ATENDIMENTO ONLINE EM TODO O BRASIL'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), sectionKicker: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#F6E27A] font-semibold mb-1">
                Título do Bloco
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.sectionTitle || 'AGENDE A SUA CONSULTA DIGITAL'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), sectionTitle: e.target.value }
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
              value={formData.digitalConsultation?.description || 'Agende agora uma consulta digital personalizada com o Dr. Aldo Leão Ferreira Filho para analisar o seu caso com total sigilo, segurança e comodidade, diretamente de onde você estiver.'}
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
                Texto do Botão Principal
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.btnSchedule || 'Agendar Consulta Digital Agora'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), btnSchedule: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                Texto do Botão WhatsApp
              </label>
              <input
                type="text"
                value={formData.digitalConsultation?.btnWhatsApp || 'Falar pelo WhatsApp'}
                onChange={(e) => setFormData({
                  ...formData,
                  digitalConsultation: { ...(formData.digitalConsultation || {}), btnWhatsApp: e.target.value }
                })}
                className="w-full p-2.5 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: PUBLICAÇÕES & ARTIGOS */}
      {activeTab === 'publications' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white">
                Página 9 · Publicações, Artigos & Notícias Jurídicas
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
              <span>Adicionar Artigo</span>
            </button>
          </div>

          <div className="space-y-4">
            {(formData.publications || []).map((pub, idx) => (
              <div key={pub.id || idx} className="p-4 rounded-xl bg-[#050B14] border border-slate-800 space-y-3">
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
                      className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white font-medium"
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
                    className="w-full p-2 rounded bg-[#071122] border border-slate-700 text-xs text-white leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: LIVROS DIGITAIS */}
      {activeTab === 'books' && (
        <div className="bg-[#071122] rounded-xl border border-[#D4AF37]/25 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#F6E27A]" />
                <span>Página 10 · Livros Digitais e Obras do Dr. Aldo Leão</span>
              </h3>
              <p className="text-xs text-slate-400">
                Todos os 6 livros digitais disponibilizados para download gratuito aos clientes, com suporte a capa personalizada.
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
      </div>
    </div>
  );
};
