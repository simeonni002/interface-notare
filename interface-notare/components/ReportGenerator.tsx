'use client';

import { useState } from 'react';
import { format, subDays, subMonths, startOfMonth, endOfMonth, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ReportGeneratorProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

interface FilterState {
  dateRange: {
    start: Date;
    end: Date;
    preset: 'custom' | 'last7days' | 'last30days' | 'lastMonth' | 'lastWeek' | 'thisMonth';
  };
  mood: string[];
  tags: string[];
  categories: string[];
  entryType: string[];
  taskStatus: string[];
}

interface ReportData {
  summary: {
    totalEntries: number;
    totalTasks: number;
    completedTasks: number;
    averageMood: number;
    streakDays: number;
    mostUsedTags: string[];
  };
  moodDistribution: { mood: string; count: number; percentage: number; }[];
  dailyActivity: { date: string; entries: number; tasks: number; mood: number; }[];
  categoryBreakdown: { category: string; count: number; percentage: number; }[];
  taskCompletion: { date: string; completed: number; total: number; }[];
  timePatterns: { hour: number; count: number; }[];
}

export default function ReportGenerator({ darkMode, isOpen, onClose }: ReportGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'filters' | 'dashboard' | 'charts'>('filters');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      start: subDays(new Date(), 30),
      end: new Date(),
      preset: 'last30days'
    },
    mood: [],
    tags: [],
    categories: [],
    entryType: [],
    taskStatus: []
  });

  const datePresets = [
    { id: 'last7days', label: 'Últimos 7 dias', getValue: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
    { id: 'last30days', label: 'Últimos 30 dias', getValue: () => ({ start: subDays(new Date(), 30), end: new Date() }) },
    { id: 'lastWeek', label: 'Semana passada', getValue: () => ({ start: startOfWeek(subWeeks(new Date(), 1)), end: endOfWeek(subWeeks(new Date(), 1)) }) },
    { id: 'lastMonth', label: 'Mês passado', getValue: () => ({ start: startOfMonth(subMonths(new Date(), 1)), end: endOfMonth(subMonths(new Date(), 1)) }) },
    { id: 'thisMonth', label: 'Este mês', getValue: () => ({ start: startOfMonth(new Date()), end: new Date() }) },
    { id: 'custom', label: 'Personalizado', getValue: () => ({ start: filters.dateRange.start, end: filters.dateRange.end }) }
  ];

  const moodOptions = [
    { id: 'amazing', label: 'Incrível', color: 'bg-green-500' },
    { id: 'positive', label: 'Positivo', color: 'bg-emerald-500' },
    { id: 'neutral', label: 'Neutro', color: 'bg-yellow-500' },
    { id: 'negative', label: 'Difícil', color: 'bg-orange-500' },
    { id: 'terrible', label: 'Terrível', color: 'bg-red-500' }
  ];

  const tagOptions = [
    'gratidão', 'ansiedade', 'produtividade', 'relacionamentos', 'crescimento', 
    'saúde', 'trabalho', 'família', 'meditação', 'exercício', 'estudo', 'criatividade'
  ];

  const categoryOptions = [
    { id: 'personal', label: 'Pessoal', icon: 'ri-user-line' },
    { id: 'work', label: 'Trabalho', icon: 'ri-briefcase-line' },
    { id: 'health', label: 'Saúde', icon: 'ri-heart-pulse-line' },
    { id: 'study', label: 'Estudo', icon: 'ri-book-line' },
    { id: 'social', label: 'Social', icon: 'ri-team-line' },
    { id: 'hobby', label: 'Hobby', icon: 'ri-gamepad-line' }
  ];

  const entryTypeOptions = [
    { id: 'reflection', label: 'Reflexão', icon: 'ri-chat-heart-line' },
    { id: 'gratitude', label: 'Gratidão', icon: 'ri-heart-line' },
    { id: 'goal', label: 'Objetivo', icon: 'ri-target-line' },
    { id: 'memory', label: 'Memória', icon: 'ri-image-line' },
    { id: 'dream', label: 'Sonho', icon: 'ri-moon-line' }
  ];

  const taskStatusOptions = [
    { id: 'completed', label: 'Concluídas', color: 'bg-green-500' },
    { id: 'pending', label: 'Pendentes', color: 'bg-yellow-500' },
    { id: 'overdue', label: 'Atrasadas', color: 'bg-red-500' }
  ];

  const handleDatePresetChange = (preset: string) => {
    const presetData = datePresets.find(p => p.id === preset);
    if (presetData) {
      const { start, end } = presetData.getValue();
      setFilters(prev => ({
        ...prev,
        dateRange: { start, end, preset: preset as any }
      }));
    }
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock data generation based on filters
    const mockData: ReportData = {
      summary: {
        totalEntries: 42,
        totalTasks: 156,
        completedTasks: 134,
        averageMood: 4.2,
        streakDays: 15,
        mostUsedTags: ['gratidão', 'produtividade', 'saúde']
      },
      moodDistribution: [
        { mood: 'Incrível', count: 8, percentage: 19 },
        { mood: 'Positivo', count: 20, percentage: 48 },
        { mood: 'Neutro', count: 10, percentage: 24 },
        { mood: 'Difícil', count: 3, percentage: 7 },
        { mood: 'Terrível', count: 1, percentage: 2 }
      ],
      dailyActivity: Array.from({ length: 30 }, (_, i) => ({
        date: format(subDays(new Date(), 29 - i), 'yyyy-MM-dd'),
        entries: Math.floor(Math.random() * 5) + 1,
        tasks: Math.floor(Math.random() * 8) + 2,
        mood: Number((Math.random() * 2 + 3).toFixed(1))
      })),
      categoryBreakdown: [
        { category: 'Pessoal', count: 18, percentage: 43 },
        { category: 'Trabalho', count: 12, percentage: 29 },
        { category: 'Saúde', count: 8, percentage: 19 },
        { category: 'Estudo', count: 4, percentage: 9 }
      ],
      taskCompletion: Array.from({ length: 7 }, (_, i) => ({
        date: format(subDays(new Date(), 6 - i), 'EEE', { locale: ptBR }),
        completed: Math.floor(Math.random() * 10) + 5,
        total: Math.floor(Math.random() * 5) + 15
      })),
      timePatterns: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        count: i >= 6 && i <= 22 ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 3)
      }))
    };
    
    setReportData(mockData);
    setIsGenerating(false);
    setActiveTab('dashboard');
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export
    const link = document.createElement('a');
    link.href = '#';
    link.download = `relatorio-notare-${format(new Date(), 'yyyy-MM-dd')}.${format}`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${darkMode ? 'bg-slate-900/95 border-slate-700/50' : 'bg-white/95 border-white/50'} backdrop-blur-xl rounded-3xl border shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-opacity-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg`}>
                <i className="text-white ri-bar-chart-box-line text-2xl"></i>
              </div>
              <div>
                <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                  Gerador de Relatórios
                </h2>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Análise avançada dos seus dados
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`${darkMode ? 'bg-slate-800/50 text-slate-300 hover:text-white border-slate-700/50' : 'bg-white/50 text-gray-600 hover:text-gray-900 border-gray-200/50'} w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border backdrop-blur-sm hover:scale-105`}
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-opacity-30">
          <div className="flex space-x-1">
            {[
              { id: 'filters', label: 'Filtros', icon: 'ri-filter-line' },
              { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
              { id: 'charts', label: 'Gráficos', icon: 'ri-pie-chart-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`${
                  activeTab === tab.id
                    ? darkMode
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                } px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 whitespace-nowrap font-medium`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Filters Tab */}
          {activeTab === 'filters' && (
            <div className="p-6 space-y-8">
              {/* Date Range */}
              <div className={`${darkMode ? 'bg-slate-800/30' : 'bg-gray-50/80'} rounded-2xl p-6`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Período de Análise
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {datePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleDatePresetChange(preset.id)}
                      className={`${
                        filters.dateRange.preset === preset.id
                          ? darkMode
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-purple-500 text-white border-purple-400'
                          : darkMode
                            ? 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      } px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                
                {filters.dateRange.preset === 'custom' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mb-2 block`}>
                        Data inicial
                      </label>
                      <input
                        type="date"
                        value={format(filters.dateRange.start, 'yyyy-MM-dd')}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: new Date(e.target.value) }
                        }))}
                        className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50 text-white' : 'bg-white border-gray-200 text-gray-900'} w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                      />
                    </div>
                    <div>
                      <label className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mb-2 block`}>
                        Data final
                      </label>
                      <input
                        type="date"
                        value={format(filters.dateRange.end, 'yyyy-MM-dd')}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: new Date(e.target.value) }
                        }))}
                        className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50 text-white' : 'bg-white border-gray-200 text-gray-900'} w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mood Filter */}
              <div className={`${darkMode ? 'bg-slate-800/30' : 'bg-gray-50/80'} rounded-2xl p-6`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Estados Emocionais
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          mood: prev.mood.includes(mood.id)
                            ? prev.mood.filter(m => m !== mood.id)
                            : [...prev.mood, mood.id]
                        }));
                      }}
                      className={`${
                        filters.mood.includes(mood.id)
                          ? `${mood.color} text-white shadow-lg scale-105`
                          : darkMode
                            ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                      } px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium border ${
                        filters.mood.includes(mood.id)
                          ? 'border-transparent'
                          : darkMode
                            ? 'border-slate-600/50'
                            : 'border-gray-200'
                      }`}
                    >
                      {mood.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              <div className={`${darkMode ? 'bg-slate-800/30' : 'bg-gray-50/80'} rounded-2xl p-6`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Tags e Temas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          tags: prev.tags.includes(tag)
                            ? prev.tags.filter(t => t !== tag)
                            : [...prev.tags, tag]
                        }));
                      }}
                      className={`${
                        filters.tags.includes(tag)
                          ? darkMode
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-purple-500 text-white border-purple-400'
                          : darkMode
                            ? 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      } px-3 py-2 rounded-full text-sm font-medium border transition-all duration-300`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div className={`${darkMode ? 'bg-slate-800/30' : 'bg-gray-50/80'} rounded-2xl p-6`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Categorias
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {categoryOptions.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setFilters(prev => ({
                          ...prev,
                          categories: prev.categories.includes(category.id)
                            ? prev.categories.filter(c => c !== category.id)
                            : [...prev.categories, category.id]
                        }));
                      }}
                      className={`${
                        filters.categories.includes(category.id)
                          ? darkMode
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : darkMode
                            ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                      } px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium border ${
                        filters.categories.includes(category.id)
                          ? 'border-transparent'
                          : darkMode
                            ? 'border-slate-600/50'
                            : 'border-gray-200'
                      } flex items-center space-x-2`}
                    >
                      <i className={`${category.icon} text-lg`}></i>
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center">
                <button
                  onClick={generateReport}
                  disabled={isGenerating}
                  className={`${
                    isGenerating
                      ? darkMode
                        ? 'bg-slate-600 text-slate-400'
                        : 'bg-gray-300 text-gray-500'
                      : darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                  } px-8 py-4 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-3 whitespace-nowrap`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Gerando relatório...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-file-chart-line text-lg"></i>
                      <span>Gerar Relatório</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && reportData && (
            <div className="p-6 space-y-6">
              {/* Export Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => exportReport('pdf')}
                  className={`${darkMode ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50' : 'bg-white text-gray-600 hover:bg-gray-50'} px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 text-sm`}
                >
                  <i className="ri-file-pdf-line"></i>
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => exportReport('excel')}
                  className={`${darkMode ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50' : 'bg-white text-gray-600 hover:bg-gray-50'} px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 text-sm`}
                >
                  <i className="ri-file-excel-line"></i>
                  <span>Excel</span>
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className={`${darkMode ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50' : 'bg-white text-gray-600 hover:bg-gray-50'} px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 text-sm`}
                >
                  <i className="ri-file-text-line"></i>
                  <span>CSV</span>
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <i className="text-white ri-edit-line text-xl"></i>
                    </div>
                    <div className="text-right">
                      <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                        {reportData.summary.totalEntries}
                      </div>
                      <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                        Total de Entradas
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-emerald-500 to-green-500'} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <i className="text-white ri-task-line text-xl"></i>
                    </div>
                    <div className="text-right">
                      <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                        {reportData.summary.completedTasks}/{reportData.summary.totalTasks}
                      </div>
                      <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                        Tarefas Concluídas
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div className={`${darkMode ? 'bg-gradient-to-r from-yellow-600 to-orange-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <i className="text-white ri-emotion-happy-line text-xl"></i>
                    </div>
                    <div className="text-right">
                      <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                        {reportData.summary.averageMood.toFixed(1)}
                      </div>
                      <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                        Humor Médio
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div className={`${darkMode ? 'bg-gradient-to-r from-red-600 to-pink-600' : 'bg-gradient-to-r from-red-500 to-pink-500'} w-12 h-12 rounded-xl flex items-center justify-center`}>
                      <i className="text-white ri-fire-line text-xl"></i>
                    </div>
                    <div className="text-right">
                      <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                        {reportData.summary.streakDays}
                      </div>
                      <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                        Dias Consecutivos
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mood Distribution */}
                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                    Distribuição de Humor
                  </h3>
                  <div className="space-y-3">
                    {reportData.moodDistribution.map((mood, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`${moodOptions.find(m => m.label === mood.mood)?.color} w-4 h-4 rounded-full`}></div>
                        <span className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} text-sm flex-1`}>
                          {mood.mood}
                        </span>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>
                          {mood.count}
                        </span>
                        <span className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-sm`}>
                          ({mood.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                    Categorias Mais Usadas
                  </h3>
                  <div className="space-y-3">
                    {reportData.categoryBreakdown.map((category, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-8 h-8 rounded-xl flex items-center justify-center`}>
                          <i className={`${categoryOptions.find(c => c.label === category.category)?.icon} text-white text-sm`}></i>
                        </div>
                        <span className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} text-sm flex-1`}>
                          {category.category}
                        </span>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>
                          {category.count}
                        </span>
                        <span className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-sm`}>
                          ({category.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Atividade Diária
                </h3>
                <div className="overflow-x-auto">
                  <div className="flex space-x-2 pb-4" style={{ minWidth: '800px' }}>
                    {reportData.dailyActivity.slice(-14).map((day, index) => (
                      <div key={index} className="flex-1 min-w-0">
                        <div className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-xs text-center mb-2`}>
                          {format(new Date(day.date), 'dd/MM')}
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                          <div 
                            className={`${darkMode ? 'bg-gradient-to-t from-purple-600 to-blue-600' : 'bg-gradient-to-t from-purple-500 to-blue-500'} w-6 rounded-t-lg`}
                            style={{ height: `${day.entries * 10}px` }}
                          ></div>
                          <div className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-xs`}>
                            {day.entries}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Most Used Tags */}
              <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Tags Mais Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {reportData.summary.mostUsedTags.map((tag, index) => (
                    <span
                      key={index}
                      className={`${darkMode ? 'bg-purple-900/50 text-purple-300 border-purple-700/50' : 'bg-purple-100/80 text-purple-700 border-purple-200/50'} px-3 py-2 rounded-full text-sm font-medium border`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Charts Tab */}
          {activeTab === 'charts' && reportData && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Completion Chart */}
                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                    Conclusão de Tarefas (Últimos 7 dias)
                  </h3>
                  <div className="space-y-3">
                    {reportData.taskCompletion.map((day, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} text-sm w-12`}>
                          {day.date}
                        </span>
                        <div className="flex-1">
                          <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-4 rounded-full overflow-hidden`}>
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                              style={{ width: `${(day.completed / day.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium w-16`}>
                          {day.completed}/{day.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Patterns */}
                <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                  <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                    Padrões de Horário
                  </h3>
                  <div className="grid grid-cols-12 gap-1">
                    {reportData.timePatterns.map((pattern, index) => (
                      <div key={index} className="text-center">
                        <div className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-xs mb-1`}>
                          {pattern.hour}h
                        </div>
                        <div 
                          className={`${darkMode ? 'bg-gradient-to-t from-purple-600 to-blue-600' : 'bg-gradient-to-t from-purple-500 to-blue-500'} w-full rounded-t-lg`}
                          style={{ height: `${pattern.count * 4}px` }}
                        ></div>
                        <div className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-xs mt-1`}>
                          {pattern.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mood Trend */}
              <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-2xl p-6 border shadow-xl`}>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Tendência de Humor
                </h3>
                <div className="overflow-x-auto">
                  <div className="flex space-x-2 pb-4" style={{ minWidth: '800px' }}>
                    {reportData.dailyActivity.slice(-30).map((day, index) => (
                      <div key={index} className="flex-1 min-w-0">
                        <div className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-xs text-center mb-2`}>
                          {format(new Date(day.date), 'dd')}
                        </div>
                        <div className="flex flex-col items-center">
                          <div 
                            className={`${
                              day.mood >= 4 ? 'bg-gradient-to-t from-emerald-500 to-green-500' :
                              day.mood >= 3 ? 'bg-gradient-to-t from-yellow-500 to-orange-500' :
                              'bg-gradient-to-t from-red-500 to-pink-500'
                            } w-4 rounded-t-lg`}
                            style={{ height: `${day.mood * 20}px` }}
                          ></div>
                          <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs mt-1`}>
                            {day.mood}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}