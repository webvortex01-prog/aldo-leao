import React, { useState, useMemo } from 'react';
import { 
  Users, 
  FileEdit, 
  ArrowLeft, 
  Search, 
  Filter, 
  MessageSquare, 
  Eye, 
  Download, 
  Scale, 
  AlertTriangle, 
  CheckCircle, 
  Building2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { ConsultationRequest, LeadStatus, LeadUrgency } from '../../types';
import { Logo } from '../Logo';
import { LeadDetailsModal } from './LeadDetailsModal';
import { CmsEditor } from './CmsEditor';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { leads, updateLeadStatus, updateLeadNotes, deleteLead, siteConfig } = useSite();
  const [activeTab, setActiveTab] = useState<'leads' | 'cms'>('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('todas');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState('todas');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('todos');
  const [activeLeadModal, setActiveLeadModal] = useState<ConsultationRequest | null>(null);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchesSearch = 
        lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lead.phone.includes(searchTerm) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesArea = selectedAreaFilter === 'todas' || lead.area === selectedAreaFilter;
      const matchesUrgency = selectedUrgencyFilter === 'todas' || lead.urgency === selectedUrgencyFilter;
      const matchesStatus = selectedStatusFilter === 'todos' || lead.status === selectedStatusFilter;

      return matchesSearch && matchesArea && matchesUrgency && matchesStatus;
    });
  }, [leads, searchTerm, selectedAreaFilter, selectedUrgencyFilter, selectedStatusFilter]);

  // KPIs
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'novo').length;
  const criticalUrgentCount = leads.filter(l => l.urgency === 'imediata').length;
  const closedCount = leads.filter(l => l.status === 'contratado').length;

  const exportCSV = () => {
    const headers = ['Data', 'Nome', 'Empresa', 'Telefone', 'Email', 'Área', 'Urgência', 'Valor Estimado', 'Status', 'Resumo'];
    const rows = leads.map(l => [
      l.createdAt ? new Date(l.createdAt).toLocaleDateString('pt-BR') : '',
      `"${l.fullName}"`,
      `"${l.company || ''}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.area}"`,
      l.urgency,
      `"${l.estimatedValue || ''}"`,
      l.status || 'novo',
      `"${(l.summary || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_aldoleao_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status?: LeadStatus) => {
    switch (status) {
      case 'novo':
        return <span className="text-[11px] font-bold text-sky-400 bg-sky-950/60 border border-sky-600/40 px-2 py-0.5 rounded">Novo</span>;
      case 'em_analise':
        return <span className="text-[11px] font-medium text-amber-300 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded">Em Análise</span>;
      case 'reuniao_agendada':
        return <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-600/40 px-2 py-0.5 rounded">Reunião Agendada</span>;
      case 'proposta':
        return <span className="text-[11px] font-semibold text-blue-300 bg-blue-950/60 border border-blue-600/40 px-2 py-0.5 rounded">Proposta Enviada</span>;
      case 'contratado':
        return <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">Contratado</span>;
      case 'arquivado':
        return <span className="text-[11px] text-slate-400 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">Arquivado</span>;
      default:
        return <span className="text-[11px] text-slate-400">Novo</span>;
    }
  };

  const getUrgencyText = (urgency: LeadUrgency) => {
    switch (urgency) {
      case 'imediata':
        return <span className="text-red-400 font-semibold text-xs">Crítico / Liminar</span>;
      case 'media':
        return <span className="text-amber-400 font-medium text-xs">Prazo Aberto</span>;
      default:
        return <span className="text-emerald-400 text-xs">Preventivo</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 flex flex-col font-sans-body">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#071122]/95 border-b border-[#D4AF37]/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <div className="hidden sm:block border-l border-slate-700 pl-4">
              <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold font-cinzel block">
                Gabinete Jurídico Dr. Aldo Leão
              </span>
              <span className="text-[10px] text-slate-400">
                Sistema de Gestão de Litígios & CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 border border-[#D4AF37]/50 bg-[#0A1730] hover:bg-[#0E1F3D] hover:text-[#F6E27A] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Site Público</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#D4AF37] text-[#F6E27A]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Casos & Leads Recebidos</span>
            {newLeadsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#D4AF37] text-black font-bold">
                {newLeadsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`py-3 px-5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'cms'
                ? 'border-[#D4AF37] text-[#F6E27A]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>Editor do Site (CMS Live)</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {activeTab === 'leads' ? (
          <div className="space-y-6">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/25 shadow-lg">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                  Total de Casos no Sistema
                </span>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {totalLeads}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Demandas processadas
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#071122] border border-[#D4AF37]/25 shadow-lg">
                <span className="text-[11px] uppercase tracking-wider text-[#F6E27A] block mb-1">
                  Novos Não Atendidos
                </span>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F6E27A] tabular-nums">
                  {newLeadsCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Aguardando primeiro contato
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#071122] border border-red-500/30 shadow-lg">
                <span className="text-[11px] uppercase tracking-wider text-red-400 block mb-1">
                  Urgência Crítica / Liminar
                </span>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-red-400 tabular-nums">
                  {criticalUrgentCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Prazo de recurso ou cautelar
                </span>
              </div>

              <div className="p-5 rounded-xl bg-[#071122] border border-emerald-500/30 shadow-lg">
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 block mb-1">
                  Contratos Fechados
                </span>
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                  {closedCount}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Honorários em execução
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-[#071122] border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, empresa, telefone ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Area filter */}
                <select
                  value={selectedAreaFilter}
                  onChange={(e) => setSelectedAreaFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="todas">Todas as Áreas</option>
                  <option value="Defesa Tributária & CARF">Tributário & CARF</option>
                  <option value="Blindagem Patrimonial & Sucessão">Blindagem Patrimonial</option>
                  <option value="Cortes Superiores (STF/STJ)">Cortes Superiores</option>
                  <option value="Direito Penal Econômico">Penal Econômico</option>
                  <option value="Direito Societário & M&A">Societário & M&A</option>
                  <option value="Agronegócio & Reestruturação">Agronegócio</option>
                </select>

                {/* Urgency filter */}
                <select
                  value={selectedUrgencyFilter}
                  onChange={(e) => setSelectedUrgencyFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="todas">Qualquer Urgência</option>
                  <option value="imediata">Crítica / Imediata</option>
                  <option value="media">Prazo em Aberto</option>
                  <option value="baixa">Preventivo</option>
                </select>

                {/* Status filter */}
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#050B14] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="novo">Novo</option>
                  <option value="em_analise">Em Análise</option>
                  <option value="reuniao_agendada">Reunião Agendada</option>
                  <option value="proposta">Proposta</option>
                  <option value="contratado">Contratado</option>
                  <option value="arquivado">Arquivado</option>
                </select>

                {/* Export CSV */}
                <button
                  onClick={exportCSV}
                  className="px-3.5 py-2 rounded-lg bg-[#0A1730] border border-[#D4AF37]/40 text-xs font-semibold text-[#F6E27A] hover:bg-[#0E1F3D] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Cases Table */}
            <div className="rounded-xl border border-[#D4AF37]/25 overflow-hidden bg-[#071122] shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0A1730] border-b border-[#D4AF37]/20 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Data / Cliente</th>
                      <th className="py-3 px-4">Área & Urgência</th>
                      <th className="py-3 px-4">Volume Estimado</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Ações Imediatas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-400">
                          Nenhum caso encontrado com os filtros atuais.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const cleanPhone = lead.phone.replace(/\D/g, '');
                        const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
                          `Olá ${lead.fullName}, sou o Dr. Aldo Leão. Recebi seus dados sobre o caso de ${lead.area}.`
                        )}`;

                        return (
                          <tr
                            key={lead.id}
                            className="hover:bg-[#0B1A35]/60 transition-colors group cursor-pointer"
                            onClick={() => setActiveLeadModal(lead)}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex flex-col">
                                <span className="font-semibold text-white group-hover:text-[#F6E27A] transition-colors">
                                  {lead.fullName}
                                </span>
                                {lead.company && (
                                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <Building2 className="w-3 h-3 text-[#D4AF37]" />
                                    <span>{lead.company}</span>
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-500 tabular-nums mt-0.5">
                                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : 'Hoje'} · {lead.phone}
                                </span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-medium text-slate-200 block">
                                {lead.area}
                              </span>
                              <div className="mt-1">
                                {getUrgencyText(lead.urgency)}
                              </div>
                            </td>

                            <td className="py-3.5 px-4 font-bold text-[#F6E27A] tabular-nums">
                              {lead.estimatedValue || 'A definir'}
                            </td>

                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5">
                                {getStatusBadge(lead.status)}
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded bg-[#25D366] text-black hover:brightness-110 transition-all cursor-pointer"
                                  title="Chamar no WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  onClick={() => setActiveLeadModal(lead)}
                                  className="px-2.5 py-1.5 rounded bg-[#0E1F3D] border border-slate-700 text-slate-200 hover:text-white hover:border-[#D4AF37] transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>Abrir</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: CMS Live Editor */
          <CmsEditor />
        )}
      </main>

      {/* Case Details Modal */}
      {activeLeadModal && (
        <LeadDetailsModal
          lead={activeLeadModal}
          onClose={() => setActiveLeadModal(null)}
          onUpdateStatus={updateLeadStatus}
          onUpdateNotes={updateLeadNotes}
          onDelete={deleteLead}
          whatsappContactNumber={siteConfig.contact.whatsappNumber}
        />
      )}
    </div>
  );
};
