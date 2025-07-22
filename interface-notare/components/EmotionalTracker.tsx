'use client';

import { useState } from 'react';

interface EmotionalTrackerProps {
  darkMode: boolean;
  expanded?: boolean;
}

export default function EmotionalTracker({ darkMode, expanded = false }: EmotionalTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState([
    { date: '2024-01-15', mood: 'positive', note: 'Dia produtivo e energético' },
    { date: '2024-01-14', mood: 'neutral', note: 'Dia normal, sem grandes eventos' },
    { date: '2024-01-13', mood: 'positive', note: 'Ótima conversa com amigos' },
    { date: '2024-01-12', mood: 'negative', note: 'Dia desafiador no trabalho' },
    { date: '2024-01-11', mood: 'positive', note: 'Meditação trouxe clareza' }
  ]);

  const moods = [
    { 
      id: 'amazing', 
      label: 'Incrível', 
      icon: 'ri-emotion-laugh-line', 
      color: darkMode ? 'bg-green-600' : 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'positive', 
      label: 'Positivo', 
      icon: 'ri-emotion-happy-line', 
      color: darkMode ? 'bg-emerald-600' : 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'neutral', 
      label: 'Neutro', 
      icon: 'ri-emotion-normal-line', 
      color: darkMode ? 'bg-yellow-600' : 'bg-yellow-500',
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'negative', 
      label: 'Difícil', 
      icon: 'ri-emotion-sad-line', 
      color: darkMode ? 'bg-orange-600' : 'bg-orange-500',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      id: 'terrible', 
      label: 'Terrível', 
      icon: 'ri-emotion-unhappy-line', 
      color: darkMode ? 'bg-red-600' : 'bg-red-500',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    // Here you would typically save the mood to your backend
  };

  const getMoodStats = () => {
    const total = moodHistory.length;
    const positive = moodHistory.filter(m => m.mood === 'positive' || m.mood === 'amazing').length;
    const negative = moodHistory.filter(m => m.mood === 'negative' || m.mood === 'terrible').length;
    const neutral = total - positive - negative;
    
    return {
      positive: Math.round((positive / total) * 100),
      negative: Math.round((negative / total) * 100),
      neutral: Math.round((neutral / total) * 100)
    };
  };

  const stats = getMoodStats();

  if (expanded) {
    return (
      <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border h-[700px] flex flex-col transition-all duration-500 shadow-2xl`}>
        {/* Header */}
        <div className="p-6 border-b border-opacity-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
                <i className="text-white ri-brain-line text-xl"></i>
              </div>
              <div>
                <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>
                  Análise Emocional
                </h2>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Acompanhe sua jornada emocional
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Mood Selection */}
          <div>
            <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
              Como você se sente agora?
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`${
                    selectedMood === mood.id
                      ? `bg-gradient-to-r ${mood.gradient} text-white shadow-lg scale-105`
                      : darkMode
                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } rounded-2xl p-4 transition-all duration-300 hover:scale-105 flex flex-col items-center space-y-2`}
                >
                  <i className={`${mood.icon} text-2xl`}></i>
                  <span className="text-xs font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={`${darkMode ? 'bg-slate-700/30' : 'bg-gray-50/80'} rounded-2xl p-4`}>
            <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-4`}>
              Estatísticas dos últimos 7 dias
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.positive}%</div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Positivo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.neutral}%</div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Neutro</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.negative}%</div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Difícil</div>
              </div>
            </div>
          </div>

          {/* History */}
          <div>
            <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-4`}>
              Histórico Recente
            </h4>
            <div className="space-y-3">
              {moodHistory.map((entry, index) => {
                const mood = moods.find(m => m.id === entry.mood);
                return (
                  <div
                    key={index}
                    className={`${darkMode ? 'bg-slate-700/30' : 'bg-gray-50/80'} rounded-xl p-4 flex items-center space-x-4`}
                  >
                    <div className={`${mood?.color} w-10 h-10 rounded-full flex items-center justify-center`}>
                      <i className={`${mood?.icon} text-white text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>
                        {entry.note}
                      </p>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs`}>
                        {entry.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border p-6 transition-all duration-500 shadow-xl`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-bold`}>
          Como você se sente?
        </h3>
        <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-10 h-10 rounded-xl flex items-center justify-center`}>
          <i className="text-white ri-heart-pulse-line text-lg"></i>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {moods.slice(1, 4).map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`${
              selectedMood === mood.id
                ? `bg-gradient-to-r ${mood.gradient} text-white shadow-lg scale-105`
                : darkMode
                  ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } rounded-2xl p-4 transition-all duration-300 hover:scale-105 flex flex-col items-center space-y-2`}
          >
            <i className={`${mood.icon} text-2xl`}></i>
            <span className="text-xs font-medium">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className={`${darkMode ? 'bg-slate-700/30' : 'bg-gray-50/80'} rounded-2xl p-4`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Esta semana</span>
          <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-sm font-medium`}>
            {stats.positive}% positivo
          </span>
        </div>
        <div className={`${darkMode ? 'bg-slate-600' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
          <div 
            className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
            style={{ width: `${stats.positive}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}