'use client';

import { useState } from 'react';

interface DiscoverModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function DiscoverModal({ darkMode, isOpen, onClose }: DiscoverModalProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'suggestions' | 'inspiration'>('insights');

  if (!isOpen) return null;

  const insights = [
    {
      id: 1,
      title: 'Padrões de Escrita',
      description: 'Você tende a escrever mais durante as manhãs, com um tom mais positivo',
      icon: 'ri-line-chart-line',
      color: 'from-purple-500 to-blue-500',
      category: 'Análise',
      trend: '+12%'
    },
    {
      id: 2,
      title: 'Humor Semanal',
      description: 'Terças e quintas são seus dias mais produtivos emocionalmente',
      icon: 'ri-emotion-happy-line',
      color: 'from-emerald-500 to-green-500',
      category: 'Emocional',
      trend: '+8%'
    },
    {
      id: 3,
      title: 'Produtividade',
      description: 'Suas tarefas pessoais têm 85% de taxa de conclusão',
      icon: 'ri-task-line',
      color: 'from-blue-500 to-indigo-500',
      category: 'Tarefas',
      trend: '+15%'
    },
    {
      id: 4,
      title: 'Sequência Atual',
      description: 'Você está em uma sequência de 12 dias - continue assim!',
      icon: 'ri-fire-line',
      color: 'from-orange-500 to-red-500',
      category: 'Motivação',
      trend: 'Novo recorde!'
    }
  ];

  const suggestions = [
    {
      id: 1,
      title: 'Reflexão Guiada',
      description: 'Baseado em suas entradas, que tal refletir sobre seus relacionamentos?',
      icon: 'ri-heart-line',
      color: 'from-pink-500 to-rose-500',
      action: 'Iniciar reflexão',
      time: '10 min'
    },
    {
      id: 2,
      title: 'Meditação Matinal',
      description: 'Suas manhãs têm sido agitadas. Uma meditação de 5 minutos pode ajudar',
      icon: 'ri-brain-line',
      color: 'from-purple-500 to-indigo-500',
      action: 'Começar meditação',
      time: '5 min'
    },
    {
      id: 3,
      title: 'Gratidão Diária',
      description: 'Que tal listar 3 coisas pelas quais você é grata hoje?',
      icon: 'ri-gift-line',
      color: 'from-amber-500 to-orange-500',
      action: 'Lista de gratidão',
      time: '3 min'
    },
    {
      id: 4,
      title: 'Planejamento Semanal',
      description: 'Organize suas prioridades para uma semana mais equilibrada',
      icon: 'ri-calendar-check-line',
      color: 'from-blue-500 to-cyan-500',
      action: 'Planejar semana',
      time: '15 min'
    }
  ];

  const inspiration = [
    {
      id: 1,
      quote: 'A jornada de mil milhas começa com um único passo.',
      author: 'Lao Tzu',
      category: 'Motivação',
      image: 'https://readdy.ai/api/search-image?query=peaceful%20mountain%20path%20with%20morning%20light%2C%20minimal%20zen%20aesthetic%2C%20soft%20pastel%20colors%2C%20serene%20landscape%20for%20meditation%20and%20reflection&width=400&height=200&seq=discover1&orientation=landscape'
    },
    {
      id: 2,
      quote: 'Não é sobre ser perfeito, é sobre ser consistente.',
      author: 'Reflexão Notare',
      category: 'Crescimento',
      image: 'https://readdy.ai/api/search-image?query=gentle%20flowing%20water%20over%20smooth%20stones%2C%20calming%20nature%20scene%2C%20soft%20lighting%2C%20minimalist%20composition%20for%20personal%20growth%20inspiration&width=400&height=200&seq=discover2&orientation=landscape'
    },
    {
      id: 3,
      quote: 'Cada pequeno progresso é uma vitória que merece ser celebrada.',
      author: 'Sabedoria Interior',
      category: 'Autocompaixão',
      image: 'https://readdy.ai/api/search-image?query=delicate%20flower%20blooming%20in%20soft%20sunlight%2C%20gentle%20nature%20photography%2C%20peaceful%20garden%20setting%2C%20warm%20natural%20tones%20for%20self-compassion&width=400&height=200&seq=discover3&orientation=landscape'
    }
  ];

  const exercises = [
    {
      id: 1,
      title: 'Respiração 4-7-8',
      description: 'Técnica relaxante para momentos de ansiedade',
      duration: '5 min',
      difficulty: 'Fácil',
      icon: 'ri-lungs-line'
    },
    {
      id: 2,
      title: 'Escaneamento Corporal',
      description: 'Conecte-se com seu corpo e libere tensões',
      duration: '10 min',
      difficulty: 'Médio',
      icon: 'ri-body-scan-line'
    },
    {
      id: 3,
      title: 'Diário de Gratidão',
      description: 'Cultive uma mentalidade de abundância',
      duration: '8 min',
      difficulty: 'Fácil',
      icon: 'ri-heart-3-line'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${darkMode ? 'bg-slate-900/95 border-slate-700/50' : 'bg-white/95 border-white/50'} backdrop-blur-xl rounded-3xl border shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="sticky top-0 bg-inherit rounded-t-3xl p-6 border-b border-opacity-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg`}>
                <i className="text-white ri-compass-line text-2xl"></i>
              </div>
              <div>
                <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
                  Descobrir
                </h2>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Explore insights, sugestões e inspiração para sua jornada
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

        {/* Tab Navigation */}
        <div className="px-6 pt-6">
          <div className="flex justify-center">
            <div className={`${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/50 border-white/50'} backdrop-blur-xl rounded-full p-2 border flex space-x-2`}>
              {[
                { id: 'insights', label: 'Insights', icon: 'ri-lightbulb-line' },
                { id: 'suggestions', label: 'Sugestões', icon: 'ri-magic-line' },
                { id: 'inspiration', label: 'Inspiração', icon: 'ri-heart-3-line' }
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
                  } px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 whitespace-nowrap font-medium`}
                >
                  <i className={`${tab.icon} text-lg`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-2`}>
                  Seus Insights Pessoais
                </h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Descubra padrões e tendências em sua jornada
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${insight.color} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <i className={`${insight.icon} text-white text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                            {insight.title}
                          </h4>
                          <span className={`${darkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-100/80 text-gray-600'} px-2 py-1 rounded-full text-xs`}>
                            {insight.category}
                          </span>
                        </div>
                        <p className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} text-sm leading-relaxed mb-3`}>
                          {insight.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-sm font-medium`}>
                            {insight.trend}
                          </span>
                          <button className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} text-sm font-medium`}>
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-2`}>
                  Sugestões Personalizadas
                </h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Atividades baseadas em seus padrões e necessidades
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${suggestion.color} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <i className={`${suggestion.icon} text-white text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                            {suggestion.title}
                          </h4>
                          <span className={`${darkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-100/80 text-gray-600'} px-2 py-1 rounded-full text-xs`}>
                            {suggestion.time}
                          </span>
                        </div>
                        <p className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} text-sm leading-relaxed mb-4`}>
                          {suggestion.description}
                        </p>
                        <button className={`bg-gradient-to-r ${suggestion.color} text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap`}>
                          {suggestion.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Exercises */}
              <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
                <h4 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                  Exercícios Rápidos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`${darkMode ? 'bg-slate-700/50 hover:bg-slate-700/70' : 'bg-gray-50/80 hover:bg-gray-100/80'} rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`${darkMode ? 'bg-purple-600' : 'bg-purple-500'} w-8 h-8 rounded-full flex items-center justify-center`}>
                          <i className={`${exercise.icon} text-white text-sm`}></i>
                        </div>
                        <div>
                          <h5 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm`}>
                            {exercise.title}
                          </h5>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                              {exercise.duration}
                            </span>
                            <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>•</span>
                            <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                              {exercise.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className={`${darkMode ? 'text-slate-300' : 'text-gray-700'} text-xs leading-relaxed`}>
                        {exercise.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Inspiration Tab */}
          {activeTab === 'inspiration' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold mb-2`}>
                  Inspiração Diária
                </h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Reflexões e pensamentos para nutrir sua alma
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {inspiration.map((item) => (
                  <div
                    key={item.id}
                    className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl overflow-hidden border shadow-xl hover:scale-[1.01] transition-all duration-300`}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={item.image}
                          alt={item.category}
                          className="w-full h-48 md:h-full object-cover object-top"
                        />
                      </div>
                      <div className="md:w-2/3 p-6 flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4">
                          <span className={`${darkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                            {item.category}
                          </span>
                        </div>
                        <blockquote className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-medium leading-relaxed mb-4`}>
                          "{item.quote}"
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <cite className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm not-italic`}>
                            — {item.author}
                          </cite>
                          <div className="flex items-center space-x-2">
                            <button className={`${darkMode ? 'text-slate-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'} w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}>
                              <i className="ri-heart-line text-lg"></i>
                            </button>
                            <button className={`${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'} w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}>
                              <i className="ri-share-line text-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}