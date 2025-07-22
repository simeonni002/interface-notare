
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import DiaryChat from '../components/DiaryChat';
import TaskQuickView from '../components/TaskQuickView';
import CalendarWidget from '../components/CalendarWidget';
import EmotionalTracker from '../components/EmotionalTracker';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState<'diary' | 'tasks' | 'calendar' | 'insights'>('diary');

  return (
    <div className={`${darkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} min-h-screen transition-all duration-700`}>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
      
      {/* Main Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className={`${darkMode ? 'text-white' : 'text-gray-900'} text-4xl font-bold mb-2`}>
            Olá, Maria ✨
          </div>
          <div className={`${darkMode ? 'text-purple-300' : 'text-purple-600'} text-lg`}>
            Como você está se sentindo hoje?
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex justify-center mb-8">
          <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-full p-2 border flex space-x-2 shadow-2xl`}>
            {[
              { id: 'diary', label: 'Diário', icon: 'ri-chat-heart-line' },
              { id: 'tasks', label: 'Tarefas', icon: 'ri-task-line' },
              { id: 'calendar', label: 'Agenda', icon: 'ri-calendar-line' },
              { id: 'insights', label: 'Insights', icon: 'ri-brain-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`${
                  activeView === tab.id
                    ? darkMode
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                } px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 whitespace-nowrap font-medium`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <CalendarWidget 
              darkMode={darkMode} 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
            <EmotionalTracker darkMode={darkMode} />
          </div>

          {/* Center Content */}
          <div className="lg:col-span-6">
            {activeView === 'diary' && <DiaryChat darkMode={darkMode} selectedDate={selectedDate} />}
            {activeView === 'tasks' && <TaskQuickView darkMode={darkMode} />}
            {activeView === 'calendar' && <CalendarWidget darkMode={darkMode} selectedDate={selectedDate} onDateSelect={setSelectedDate} expanded />}
            {activeView === 'insights' && <EmotionalTracker darkMode={darkMode} expanded />}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <TaskQuickView darkMode={darkMode} compact />
            
            {/* Progress Overview */}
            <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>
                  Seu Progresso
                </h3>
                <div className={`${darkMode ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-emerald-500 to-green-500'} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                  <i className="text-white ri-trophy-line text-xl"></i>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} text-sm font-medium`}>Entradas este mês</span>
                    <span className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-sm font-bold`}>24/30</span>
                  </div>
                  <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full w-4/5 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} text-sm font-medium`}>Humor positivo</span>
                    <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-sm font-bold`}>78%</span>
                  </div>
                  <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-full w-4/5 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} text-sm font-medium`}>Tarefas concluídas</span>
                    <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm font-bold`}>12/15</span>
                  </div>
                  <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-4/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspirational Quote */}
            <div className={`${darkMode ? 'bg-gradient-to-br from-purple-900/70 to-blue-900/70 border-purple-700/50' : 'bg-gradient-to-br from-purple-100/80 to-blue-100/80 border-purple-200/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
              <div className="text-center">
                <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className="text-white ri-heart-3-line text-2xl"></i>
                </div>
                <p className={`${darkMode ? 'text-purple-200' : 'text-purple-800'} text-sm font-medium leading-relaxed mb-3`}>
                  "Cada pequeno passo é um progresso. Celebre suas conquistas diárias."
                </p>
                <div className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-xs`}>
                  💜 Mensagem do dia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActions darkMode={darkMode} />
    </div>
  );
}
