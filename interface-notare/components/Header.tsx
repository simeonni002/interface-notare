
'use client';

import { useState } from 'react';
import ProgressModal from './ProgressModal';
import DiscoverModal from './DiscoverModal';
import ReportGenerator from './ReportGenerator';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const [showReports, setShowReports] = useState(false);

  return (
    <>
      <header className={`${darkMode ? 'bg-slate-900/80 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl border-b transition-all duration-500 sticky top-0 z-50`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-14 h-14 rounded-3xl flex items-center justify-center shadow-xl`}>
                  <i className="text-white ri-quill-pen-line text-2xl"></i>
                </div>
                <div className={`${darkMode ? 'bg-purple-500' : 'bg-purple-400'} absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'} font-pacifico text-4xl`}>
                  Notare
                </div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-sm -mt-1`}>
                  Sua jornada interior
                </div>
              </div>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} text-sm font-medium transition-colors duration-300 flex items-center space-x-2`}>
                <i className="ri-home-line text-lg"></i>
                <span>Início</span>
              </button>
              <button 
                onClick={() => setShowProgress(true)}
                className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm font-medium transition-colors duration-300 flex items-center space-x-2`}
              >
                <i className="ri-bar-chart-line text-lg"></i>
                <span>Progresso</span>
              </button>
              <button 
                onClick={() => setShowDiscover(true)}
                className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm font-medium transition-colors duration-300 flex items-center space-x-2`}
              >
                <i className="ri-compass-line text-lg"></i>
                <span>Descobrir</span>
              </button>
              <button 
                onClick={() => setShowReports(true)}
                className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm font-medium transition-colors duration-300 flex items-center space-x-2`}
              >
                <i className="ri-file-chart-line text-lg"></i>
                <span>Relatórios</span>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <button className={`${darkMode ? 'bg-slate-800/50 text-slate-300 hover:text-white border-slate-700/50' : 'bg-white/50 text-gray-600 hover:text-gray-900 border-gray-200/50'} w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border backdrop-blur-sm hover:scale-105`}>
                <i className="ri-search-line text-xl"></i>
              </button>

              {/* Reports */}
              <button
                onClick={() => setShowReports(true)}
                className={`${darkMode ? 'bg-slate-800/50 text-slate-300 hover:text-white border-slate-700/50' : 'bg-white/50 text-gray-600 hover:text-gray-900 border-gray-200/50'} w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border backdrop-blur-sm hover:scale-105`}
              >
                <i className="ri-file-chart-line text-xl"></i>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleDarkMode}
                className={`${darkMode ? 'bg-slate-800/50 text-slate-300 hover:text-white border-slate-700/50' : 'bg-white/50 text-gray-600 hover:text-gray-900 border-gray-200/50'} w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border backdrop-blur-sm hover:scale-105`}
              >
                <i className={`${darkMode ? 'ri-sun-line' : 'ri-moon-line'} text-xl`}></i>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`${darkMode ? 'bg-slate-800/50 text-slate-300 hover:text-white border-slate-700/50' : 'bg-white/50 text-gray-600 hover:text-gray-900 border-gray-200/50'} w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border backdrop-blur-sm hover:scale-105 relative`}
                >
                  <i className="ri-notification-line text-xl"></i>
                  <div className={`${darkMode ? 'bg-red-500' : 'bg-red-500'} absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </button>

                {showNotifications && (
                  <div className={`${darkMode ? 'bg-slate-800/95 border-slate-700/50' : 'bg-white/95 border-white/50'} absolute right-0 mt-3 w-80 rounded-3xl shadow-2xl border backdrop-blur-xl z-50`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>Notificações</h3>
                        <button className={`${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'} text-sm`}>
                          Limpar tudo
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-purple-50/80'} rounded-2xl p-4`}>
                          <div className="flex items-start space-x-3">
                            <div className={`${darkMode ? 'bg-purple-600' : 'bg-purple-500'} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                              <i className="text-white ri-heart-line text-sm"></i>
                            </div>
                            <div>
                              <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>Hora da reflexão!</p>
                              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs mt-1`}>Que tal compartilhar como foi seu dia?</p>
                              <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs`}>5 min atrás</span>
                            </div>
                          </div>
                        </div>
                        <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-blue-50/80'} rounded-2xl p-4`}>
                          <div className="flex items-start space-x-3">
                            <div className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                              <i className="text-white ri-trophy-line text-sm"></i>
                            </div>
                            <div>
                              <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>Parabéns! </p>
                              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs mt-1`}>Você completou 10 dias consecutivos</p>
                              <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs`}>2 horas atrás</span>
                            </div>
                          </div>
                        </div>
                        <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-green-50/80'} rounded-2xl p-4`}>
                          <div className="flex items-start space-x-3">
                            <div className={`${darkMode ? 'bg-green-600' : 'bg-green-500'} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
                              <i className="text-white ri-leaf-line text-sm"></i>
                            </div>
                            <div>
                              <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>Sessão de mindfulness</p>
                              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs mt-1`}>Pronto para 5 minutos de paz?</p>
                              <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs`}>1 dia atrás</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'} w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-300 shadow-xl hover:scale-105`}
                >
                  <i className="ri-user-smile-line text-xl"></i>
                </button>

                {showProfile && (
                  <div className={`${darkMode ? 'bg-slate-800/95 border-slate-700/50' : 'bg-white/95 border-white/50'} absolute right-0 mt-3 w-80 rounded-3xl shadow-2xl border backdrop-blur-xl z-50`}>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                          <i className="text-white ri-user-smile-line text-2xl"></i>
                        </div>
                        <div>
                          <p className={`${darkMode ? 'text-white' : 'text-gray-900'} font-semibold text-lg`}>Maria Silva</p>
                          <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Jornada iniciada em março</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className={`${darkMode ? 'bg-emerald-500' : 'bg-emerald-400'} w-2 h-2 rounded-full`}></div>
                            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-xs`}>Online agora</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} text-xl font-bold`}>47</div>
                          <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs`}>Entradas</div>
                        </div>
                        <div className="text-center">
                          <div className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-xl font-bold`}>12</div>
                          <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs`}>Sequência</div>
                        </div>
                        <div className="text-center">
                          <div className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-xl font-bold`}>89%</div>
                          <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs`}>Positivo</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <button className={`${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'} w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-300 flex items-center space-x-3`}>
                          <i className="ri-user-line text-lg"></i>
                          <span>Perfil & Configurações</span>
                        </button>
                        <button className={`${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'} w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-300 flex items-center space-x-3`}>
                          <i className="ri-download-line text-lg"></i>
                          <span>Exportar Dados</span>
                        </button>
                        <button className={`${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'} w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-300 flex items-center space-x-3`}>
                          <i className="ri-question-line text-lg"></i>
                          <span>Suporte & Ajuda</span>
                        </button>
                        <hr className={`${darkMode ? 'border-slate-700' : 'border-gray-200'} my-2`} />
                        <button className={`${darkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-red-600 hover:text-red-700 hover:bg-red-50'} w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-300 flex items-center space-x-3`}>
                          <i className="ri-logout-box-line text-lg"></i>
                          <span>Sair</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Modal */}
      <ProgressModal
        darkMode={darkMode}
        isOpen={showProgress}
        onClose={() => setShowProgress(false)}
      />

      {/* Discover Modal */}
      <DiscoverModal
        darkMode={darkMode}
        isOpen={showDiscover}
        onClose={() => setShowDiscover(false)}
      />

      {/* Reports Modal */}
      <ReportGenerator
        darkMode={darkMode}
        isOpen={showReports}
        onClose={() => setShowReports(false)}
      />
    </>
  );
}
