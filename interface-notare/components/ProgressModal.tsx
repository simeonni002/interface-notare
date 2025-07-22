'use client';

import { useState } from 'react';

interface ProgressModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgressModal({ darkMode, isOpen, onClose }: ProgressModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  if (!isOpen) return null;

  const progressData = {
    week: {
      entries: 6,
      totalDays: 7,
      positiveRate: 85,
      tasksCompleted: 18,
      totalTasks: 22,
      moodAverage: 4.2,
      streak: 6
    },
    month: {
      entries: 24,
      totalDays: 30,
      positiveRate: 78,
      tasksCompleted: 89,
      totalTasks: 105,
      moodAverage: 4.0,
      streak: 12
    },
    year: {
      entries: 285,
      totalDays: 365,
      positiveRate: 82,
      tasksCompleted: 1045,
      totalTasks: 1250,
      moodAverage: 4.1,
      streak: 25
    }
  };

  const data = progressData[selectedPeriod];

  const achievements = [
    {
      id: 1,
      title: 'Sequência de Ouro',
      description: 'Manteve sequência de 30 dias',
      icon: 'ri-trophy-line',
      color: 'from-yellow-500 to-orange-500',
      earned: true
    },
    {
      id: 2,
      title: 'Reflexão Profunda',
      description: 'Escreveu 100 entradas',
      icon: 'ri-heart-line',
      color: 'from-purple-500 to-pink-500',
      earned: true
    },
    {
      id: 3,
      title: 'Mestre do Humor',
      description: 'Manteve 80% de positividade',
      icon: 'ri-emotion-happy-line',
      color: 'from-green-500 to-emerald-500',
      earned: true
    },
    {
      id: 4,
      title: 'Organizador Expert',
      description: 'Completou 500 tarefas',
      icon: 'ri-checkbox-circle-line',
      color: 'from-blue-500 to-indigo-500',
      earned: false
    }
  ];

  const weeklyData = [
    { day: 'Seg', entries: 2, mood: 4.5 },
    { day: 'Ter', entries: 1, mood: 3.8 },
    { day: 'Qua', entries: 3, mood: 4.2 },
    { day: 'Qui', entries: 2, mood: 4.0 },
    { day: 'Sex', entries: 1, mood: 4.8 },
    { day: 'Sáb', entries: 2, mood: 4.3 },
    { day: 'Dom', entries: 1, mood: 4.1 }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${darkMode ? 'bg-slate-900/95 border-slate-700/50' : 'bg-white/95 border-white/50'} backdrop-blur-xl rounded-3xl border shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 bg-inherit rounded-t-3xl p-6 border-b border-opacity-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg`}>
                <i className="text-white ri-bar-chart-line text-2xl"></i>
              </div>
              <div>
                <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                  Seu Progresso
                </h2>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Acompanhe sua jornada de crescimento
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

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Period Selector */}
          <div className="flex justify-center">
            <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-white/50'} backdrop-blur-xl rounded-full p-2 border flex space-x-2`}>
              {[
                { id: 'week', label: 'Semana' },
                { id: 'month', label: 'Mês' },
                { id: 'year', label: 'Ano' }
              ].map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id as any)}
                  className={`${
                    selectedPeriod === period.id
                      ? darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : darkMode
                        ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  } px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 whitespace-nowrap font-medium`}
                >
                  <span>{period.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <i className="text-white ri-edit-line text-xl"></i>
                </div>
                <div className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-right`}>
                  <div className="text-3xl font-bold">{data.entries}</div>
                  <div className="text-xs">{((data.entries / data.totalDays) * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-2`}>
                  Entradas
                </h3>
                <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500"
                    style={{ width: `${(data.entries / data.totalDays) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-emerald-500 to-green-500'} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <i className="text-white ri-emotion-happy-line text-xl"></i>
                </div>
                <div className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-right`}>
                  <div className="text-3xl font-bold">{data.positiveRate}%</div>
                  <div className="text-xs">Positivo</div>
                </div>
              </div>
              <div>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-2`}>
                  Humor
                </h3>
                <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-full transition-all duration-500"
                    style={{ width: `${data.positiveRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${darkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-blue-500 to-indigo-500'} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <i className="text-white ri-task-line text-xl"></i>
                </div>
                <div className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-right`}>
                  <div className="text-3xl font-bold">{data.tasksCompleted}</div>
                  <div className="text-xs">{((data.tasksCompleted / data.totalTasks) * 100).toFixed(0)}%</div>
                </div>
              </div>
              <div>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-2`}>
                  Tarefas
                </h3>
                <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500"
                    style={{ width: `${(data.tasksCompleted / data.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${darkMode ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-orange-500 to-red-500'} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <i className="text-white ri-fire-line text-xl"></i>
                </div>
                <div className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} text-right`}>
                  <div className="text-3xl font-bold">{data.streak}</div>
                  <div className="text-xs">Dias</div>
                </div>
              </div>
              <div>
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold mb-2`}>
                  Sequência
                </h3>
                <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min((data.streak / 30) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
            <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-6`}>
              Atividade Semanal
            </h3>
            <div className="grid grid-cols-7 gap-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mb-3`}>
                    {day.day}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col items-center">
                      <div 
                        className={`${darkMode ? 'bg-gradient-to-t from-purple-600 to-blue-600' : 'bg-gradient-to-t from-purple-500 to-blue-500'} w-8 rounded-t-lg`}
                        style={{ height: `${day.entries * 20}px` }}
                      ></div>
                      <div className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-xs mt-1`}>
                        {day.entries}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className={`${darkMode ? 'bg-gradient-to-t from-emerald-600 to-green-600' : 'bg-gradient-to-t from-emerald-500 to-green-500'} w-8 rounded-t-lg`}
                        style={{ height: `${day.mood * 15}px` }}
                      ></div>
                      <div className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-xs mt-1`}>
                        {day.mood}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center space-x-2">
                <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-4 h-4 rounded`}></div>
                <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Entradas</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-emerald-500 to-green-500'} w-4 h-4 rounded`}></div>
                <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Humor</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
            <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-6`}>
              Conquistas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`${
                    achievement.earned 
                      ? darkMode 
                        ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-600/50' 
                        : 'bg-gradient-to-r from-gray-50 to-white border-gray-200/50'
                      : darkMode
                        ? 'bg-slate-700/30 border-slate-600/30 opacity-60'
                        : 'bg-gray-100/50 border-gray-200/30 opacity-60'
                  } backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${
                      achievement.earned 
                        ? `bg-gradient-to-r ${achievement.color}` 
                        : darkMode ? 'bg-slate-600' : 'bg-gray-300'
                    } w-12 h-12 rounded-2xl flex items-center justify-center`}>
                      <i className={`${achievement.icon} text-white text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                        {achievement.title}
                      </h4>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        <i className="ri-check-line text-xl"></i>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}