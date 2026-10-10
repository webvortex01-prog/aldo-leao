import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Building2, 
  Calendar, 
  ShieldAlert, 
  Save, 
  Trash2,
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { ConsultationRequest, LeadStatus, LeadUrgency } from '../../types';

interface LeadDetailsModalProps {
  lead: ConsultationRequest;
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
  whatsappContactNumber: string;
}

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  lead,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
  onDelete,
  whatsappContactNumber
}) => {
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead.status || 'novo');
  const [notes, setNotes] = useState(lead.internalNotes || '');
  const [savedNotesFeedback, setSavedNotesFeedback] = useState(false);

  const handleSaveNotes = () => {
    if (lead.id) {
      onUpdateNotes(lead.id, notes);
      setSavedNotesFeedback(true);
      setTimeout(() => setSavedNotesFeedback(false), 2000);
    }
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    setCurrentStatus(newStatus);
    if (lead.id) {
      onUpdateStatus(lead.id, newStatus);
    }
  };

  const cleanPhone = lead.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
    `Prezado(a) ${lead.fullName},\n\nAqui é o Dr. Aldo Leão (Aldo Leão Advocacia Estratégica). Recebi seu formulário a respeito de ${lead.area} e gostaria de agendar uma conferência confidencial.`
  )}`;

  const getUrgencyBadge = (urgency: LeadUrgency) => {
    switch (urgency) {
      case 'imediata':
        return <span className="text-red-400 font-semibold uppercase text-xs">Urgência Crítica / Liminar</span>;
      case 'media':
        return <span className="text-amber-400 font-medium uppercase text-xs">Prazo em Aberto (Moderada)</span>;
      default:
        return <span className="text-emerald-400 font-medium uppercase text-xs">Planejamento Preventivo</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#071122] rounded-xl border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Fechar detalhes"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pb-4 border-b border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#E5C158] uppercase tracking-wider font-semibold">
              <span>Ficha Confidencial do Caso</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 tabular-nums">
                {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : 'Data recente'}
              </span>
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white mt-1">
              {lead.fullName}
            </h3>
            {lead.company && (
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{lead.company}</span>
              </p>
            )}
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Fase:</span>
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
              className="bg-[#050B14] border border-[#D4AF37]/50 text-xs font-semibold text-[#F6E27A] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="novo">Novo Contato</option>
              <option value="em_analise">Em Triagem / Análise</option>
              <option value="reuniao_agendada">Reunião Agendada</option>
              <option value="proposta">Proposta de Honorários</option>
              <option value="contratado">Contrato Fechado</option>
              <option value="arquivado">Arquivado / Sem Acordo</option>
            </select>
          </div>
        </div>

        {/* Action Bar (WhatsApp, Call, Email) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-3 bg-[#050B14] rounded-lg border border-slate-800">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-[#25D366] text-black text-xs font-bold hover:bg-[#20ba59] transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chamar no WhatsApp</span>
          </a>

          <a
            href={`tel:${lead.phone}`}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-[#0A1730] border border-[#D4AF37]/40 text-[#F6E27A] text-xs font-semibold hover:bg-[#0E1F3D] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Ligar ({lead.phone})</span>
          </a>

          <a
            href={`mailto:${lead.email}?subject=Retorno Confidencial - Aldo Leão Advocacia`}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-[#0A1730] border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-[#0E1F3D] transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Enviar E-mail</span>
          </a>
        </div>

        {/* Case Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-3.5 rounded-lg bg-[#050B14]/70 border border-slate-800">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
              Área de Atuação
            </span>
            <span className="text-xs font-semibold text-white">
              {lead.area}
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#050B14]/70 border border-slate-800">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
              Grau de Risco / Urgência
            </span>
            <div>{getUrgencyBadge(lead.urgency)}</div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#050B14]/70 border border-slate-800">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
              Volume Financeiro Estimado
            </span>
            <span className="text-xs font-bold text-[#F6E27A] tabular-nums">
              {lead.estimatedValue || 'Não especificado'}
            </span>
          </div>
        </div>

        {/* Case Description / Summary */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Relato do Caso pelo Solicitante:</span>
          </h4>
          <div className="p-4 rounded-lg bg-[#050B14] border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans-body">
            {lead.summary || 'Nenhum resumo adicional fornecido na abertura rápida.'}
          </div>
        </div>

        {/* Internal Strategy Notepad */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase tracking-wider text-[#E5C158] font-semibold flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Notas Estratégicas Privativas do Dr. Aldo Leão:</span>
            </h4>
            {savedNotesFeedback && (
              <span className="text-[11px] text-[#25D366] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Notas salvas!
              </span>
            )}
          </div>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anote aqui teses preliminares, valores de honorários combinados, nomes dos ministros relatores ou prazos de recurso..."
            className="w-full p-3 rounded-lg bg-[#050B14] border border-[#D4AF37]/35 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSaveNotes}
              className="px-4 py-2 rounded text-xs font-semibold bg-[#D4AF37] text-[#050B14] hover:bg-[#f6e27a] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Notas do Caso</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (lead.id && confirm('Tem certeza que deseja excluir este registro do sistema?')) {
                onDelete(lead.id);
                onClose();
              }
            }}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Excluir Lead</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
