import React, { useRef, useState } from 'react';
import { Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export interface ImageUploadFieldProps {
  label: string;
  description?: string;
  currentValue?: string;
  defaultValue?: string;
  onChange: (newVal: string) => void;
  presetOptions?: { label: string; url: string }[];
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
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
        return 'w-24 h-32 sm:w-28 sm:h-36';
      case 'square':
        return 'w-20 h-20 sm:w-24 sm:h-24';
      case 'video':
        return 'w-36 h-22 sm:w-44 sm:h-28';
      default:
        return 'w-28 h-20 sm:w-36 sm:h-24';
    }
  };

  return (
    <div className="p-3 sm:p-4 rounded-xl bg-[#050B14] border border-[#D4AF37]/35 space-y-2.5">
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
              <ImageIcon className="w-5 h-5 mb-1 text-[#D4AF37]/60" />
              <span className="text-[9px]">Sem Imagem</span>
            </div>
          )}
          <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-[8px] text-[#F6E27A] font-bold">
            Prévia
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex-1 w-full space-y-2">
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
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F6E27A] via-[#E5C158] to-[#D4AF37] text-black text-[11px] font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Carregar Imagem</span>
            </button>

            {defaultValue && activeImage !== defaultValue && (
              <button
                type="button"
                onClick={() => onChange(defaultValue)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
              >
                Restaurar Padrão
              </button>
            )}
          </div>

          {successNotice && (
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{successNotice}</span>
            </div>
          )}

          {presetOptions && presetOptions.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Ou selecione uma foto pronta:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetOptions.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange(opt.url)}
                    className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer font-medium ${
                      activeImage === opt.url
                        ? 'bg-[#D4AF37] text-black font-bold'
                        : 'bg-[#0E1F3D] text-[#F6E27A] hover:bg-[#1A365D] border border-[#D4AF37]/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
