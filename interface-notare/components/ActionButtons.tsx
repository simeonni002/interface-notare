'use client';

interface ActionButtonsProps {
  darkMode: boolean;
  onNewEntry: () => void;
  onViewProgress: () => void;
}

export default function ActionButtons({ darkMode, onNewEntry, onViewProgress }: ActionButtonsProps) {
  return (
    <div className="space-y-6">
      {/* Primary Action Button */}
      <button
        onClick={onNewEntry}
        className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'} text-white rounded-3xl px-8 py-6 font-semibold transition-all duration-300 flex items-center justify-center space-x-3 whitespace-nowrap w-full shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105`}
      >
        <i className="ri-add-circle-line text-2xl"></i>
        <span className="text-lg">Nova Reflexão</span>
      </button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={onViewProgress}
          className={`${darkMode ? 'bg-slate-800/60 hover:bg-slate-700/60 text-white border-slate-700/50' : 'bg-white/80 hover:bg-gray-50/80 text-gray-900 border-white/50'} backdrop-blur-xl rounded-2xl px-6 py-4 font-medium transition-all duration-300 flex items-center justify-center space-x-3 whitespace-nowrap w-full border shadow-xl hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-[1.02]`}
        >
          <i className="ri-bar-chart-line text-xl"></i>
          <span>Análise Detalhada</span>
        </button>

        <button className={`${darkMode ? 'bg-slate-800/60 hover:bg-slate-700/60 text-white border-slate-700/50' : 'bg-white/80 hover:bg-gray-50/80 text-gray-900 border-white/50'} backdrop-blur-xl rounded-2xl px-6 py-4 font-medium transition-all duration-300 flex items-center justify-center space-x-3 whitespace-nowrap w-full border shadow-xl hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-[1.02]`}>
          <i className="ri-heart-pulse-line text-xl"></i>
          <span>Registro de Humor</span>
        </button>

        <button className={`${darkMode ? 'bg-slate-800/60 hover:bg-slate-700/60 text-white border-slate-700/50' : 'bg-white/80 hover:bg-gray-50/80 text-gray-900 border-white/50'} backdrop-blur-xl rounded-2xl px-6 py-4 font-medium transition-all duration-300 flex items-center justify-center space-x-3 whitespace-nowrap w-full border shadow-xl hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-[1.02]`}>
          <i className="ri-target-line text-xl"></i>
          <span>Metas & Objetivos</span>
        </button>

        <button className={`${darkMode ? 'bg-slate-800/60 hover:bg-slate-700/60 text-white border-slate-700/50' : 'bg-white/80 hover:bg-gray-50/80 text-gray-900 border-white/50'} backdrop-blur-xl rounded-2xl px-6 py-4 font-medium transition-all duration-300 flex items-center justify-center space-x-3 whitespace-nowrap w-full border shadow-xl hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-[1.02]`}>
          <i className="ri-brain-line text-xl"></i>
          <span>Mindfulness</span>
        </button>
      </div>

      {/* Quick Tools */}
      <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
        <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
          Ferramentas Rápidas
        </h3>
        <div className="space-y-3">
          <button className={`${darkMode ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30 text-emerald-300 hover:from-emerald-800/40 hover:to-green-800/40' : 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 hover:from-emerald-100 hover:to-green-100'} w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-3 whitespace-nowrap hover:scale-[1.02]`}>
            <i className="ri-leaf-line text-lg"></i>
            <span>Respiração Guiada</span>
          </button>
          
          <button className={`${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 text-blue-300 hover:from-blue-800/40 hover:to-indigo-800/40' : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100'} w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-3 whitespace-nowrap hover:scale-[1.02]`}>
            <i className="ri-timer-line text-lg"></i>
            <span>Meditação 5min</span>
          </button>
          
          <button className={`${darkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 text-purple-300 hover:from-purple-800/40 hover:to-pink-800/40' : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100'} w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-3 whitespace-nowrap hover:scale-[1.02]`}>
            <i className="ri-heart-3-line text-lg"></i>
            <span>Diário de Gratidão</span>
          </button>
        </div>
      </div>
    </div>
  );
}