'use client';

import { useState } from 'react';

interface FloatingActionsProps {
  darkMode: boolean;
}

export default function FloatingActions({ darkMode }: FloatingActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: 'new-entry',
      label: 'Nova Entrada',
      icon: 'ri-edit-line',
      color: darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500',
      hoverColor: darkMode ? 'hover:from-purple-700 hover:to-blue-700' : 'hover:from-purple-600 hover:to-blue-600'
    },
    {
      id: 'quick-task',
      label: 'Tarefa Rápida',
      icon: 'ri-task-line',
      color: darkMode ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-emerald-500 to-green-500',
      hoverColor: darkMode ? 'hover:from-emerald-700 hover:to-green-700' : 'hover:from-emerald-600 hover:to-green-600'
    },
    {
      id: 'mood-check',
      label: 'Registro de Humor',
      icon: 'ri-heart-pulse-line',
      color: darkMode ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-gradient-to-r from-pink-500 to-rose-500',
      hoverColor: darkMode ? 'hover:from-pink-700 hover:to-rose-700' : 'hover:from-pink-600 hover:to-rose-600'
    },
    {
      id: 'meditation',
      label: 'Meditação',
      icon: 'ri-brain-line',
      color: darkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-purple-500',
      hoverColor: darkMode ? 'hover:from-indigo-700 hover:to-purple-700' : 'hover:from-indigo-600 hover:to-purple-600'
    }
  ];

  const handleActionClick = (actionId: string) => {
    console.log('Action clicked:', actionId);
    setIsExpanded(false);
    
    // Here you would handle the specific action
    switch (actionId) {
      case 'new-entry':
        // Focus on diary input or open entry modal
        break;
      case 'quick-task':
        // Open task creation modal
        break;
      case 'mood-check':
        // Open mood selection modal
        break;
      case 'meditation':
        // Start meditation session
        break;
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Secondary Actions */}
      <div className={`${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} transition-all duration-300 space-y-4 mb-4`}>
        {actions.slice(1).map((action, index) => (
          <div
            key={action.id}
            className="flex items-center space-x-3"
            style={{ 
              transitionDelay: isExpanded ? `${index * 100}ms` : '0ms',
              transform: isExpanded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className={`${darkMode ? 'bg-slate-800/80 text-white' : 'bg-white/80 text-gray-900'} backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap`}>
              {action.label}
            </div>
            <button
              onClick={() => handleActionClick(action.id)}
              className={`${action.color} ${action.hoverColor} w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl`}
            >
              <i className={`${action.icon} text-xl`}></i>
            </button>
          </div>
        ))}
      </div>

      {/* Main Action Button */}
      <button
        onClick={() => {
          if (isExpanded) {
            setIsExpanded(false);
          } else {
            setIsExpanded(true);
          }
        }}
        className={`${actions[0].color} ${actions[0].hoverColor} w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <i className={`${isExpanded ? 'ri-close-line' : actions[0].icon} text-2xl`}></i>
      </button>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
    </div>
  );
}