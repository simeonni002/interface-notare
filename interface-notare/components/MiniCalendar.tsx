'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MiniCalendarProps {
  darkMode: boolean;
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export default function MiniCalendar({ darkMode, onDateSelect, selectedDate }: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getEntryCount = (date: Date) => {
    // Mock data - different entry counts for different days
    const entriesData: { [key: number]: number } = {
      1: 2, 3: 1, 5: 3, 7: 1, 12: 2, 15: 4, 18: 1, 20: 2, 22: 3, 25: 1, 28: 2
    };
    return entriesData[date.getDate()] || 0;
  };

  const getMoodForDay = (date: Date) => {
    // Mock data - different moods for different days
    const moodData: { [key: number]: 'positive' | 'neutral' | 'negative' } = {
      1: 'positive', 3: 'neutral', 5: 'positive', 7: 'positive', 12: 'neutral',
      15: 'positive', 18: 'negative', 20: 'positive', 22: 'positive', 25: 'neutral', 28: 'positive'
    };
    return moodData[date.getDate()] || null;
  };

  const getMoodColor = (mood: 'positive' | 'neutral' | 'negative' | null) => {
    if (!mood) return '';
    switch (mood) {
      case 'positive':
        return darkMode ? 'bg-emerald-600' : 'bg-emerald-500';
      case 'negative':
        return darkMode ? 'bg-red-600' : 'bg-red-500';
      default:
        return darkMode ? 'bg-amber-600' : 'bg-amber-500';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border p-6 transition-all duration-500 shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className={`${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'} w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105`}
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
        
        <div className="text-center">
          <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} font-bold text-lg`}>
            {format(currentDate, 'MMMM', { locale: ptBR })}
          </h3>
          <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
            {format(currentDate, 'yyyy')}
          </p>
        </div>
        
        <button
          onClick={nextMonth}
          className={`${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'} w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105`}
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div
            key={day}
            className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs text-center py-2 font-semibold`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelected = isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          const entryCount = getEntryCount(day);
          const mood = getMoodForDay(day);

          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`
                w-10 h-10 text-sm rounded-2xl transition-all duration-300 whitespace-nowrap cursor-pointer relative overflow-hidden
                ${isCurrentMonth
                  ? darkMode
                    ? 'text-white hover:bg-slate-700/50'
                    : 'text-gray-900 hover:bg-gray-100/50'
                  : darkMode
                  ? 'text-slate-600'
                  : 'text-gray-400'
                }
                ${isSelected
                  ? darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : ''
                }
                ${isTodayDate && !isSelected
                  ? darkMode
                    ? 'bg-slate-700/50 text-purple-300 ring-2 ring-purple-500/50'
                    : 'bg-purple-50/80 text-purple-600 ring-2 ring-purple-400/50'
                  : ''
                }
                ${entryCount > 0 && !isSelected && !isTodayDate
                  ? darkMode
                    ? 'bg-slate-700/30'
                    : 'bg-gray-50/80'
                  : ''
                }
                hover:scale-105 hover:shadow-md
              `}
            >
              <span className="relative z-10">{format(day, 'd')}</span>
              
              {/* Entry Count Indicator */}
              {entryCount > 0 && (
                <div className="absolute -top-1 -right-1 z-20">
                  <div className={`${getMoodColor(mood)} w-3 h-3 rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{entryCount}</span>
                  </div>
                </div>
              )}
              
              {/* Mood Indicator */}
              {mood && !isSelected && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${getMoodColor(mood)} opacity-60`}></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-opacity-30">
        <h4 className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs font-medium mb-3`}>Legenda</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-emerald-600' : 'bg-emerald-500'}`}></div>
              <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Humor positivo</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-amber-600' : 'bg-amber-500'}`}></div>
              <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Humor neutro</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-red-600' : 'bg-red-500'}`}></div>
              <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Precisa de atenção</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-500'}`}></div>
              <span className={`${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Selecionado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}