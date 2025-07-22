'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarWidgetProps {
  darkMode: boolean;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  expanded?: boolean;
}

export default function CalendarWidget({ darkMode, selectedDate, onDateSelect, expanded = false }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

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

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const prevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const getEventsForDay = (date: Date) => {
    // Mock data for events
    const events: { [key: string]: { title: string; type: 'task' | 'entry' | 'mood' }[] } = {
      '2024-01-15': [
        { title: 'Reflexão matinal', type: 'entry' },
        { title: 'Exercício', type: 'task' }
      ],
      '2024-01-16': [
        { title: 'Meditação', type: 'task' },
        { title: 'Humor positivo', type: 'mood' }
      ],
      '2024-01-17': [
        { title: 'Conversa importante', type: 'entry' }
      ]
    };
    
    const dateKey = format(date, 'yyyy-MM-dd');
    return events[dateKey] || [];
  };

  const getEventTypeColor = (type: 'task' | 'entry' | 'mood') => {
    switch (type) {
      case 'task':
        return darkMode ? 'bg-blue-600' : 'bg-blue-500';
      case 'entry':
        return darkMode ? 'bg-purple-600' : 'bg-purple-500';
      case 'mood':
        return darkMode ? 'bg-emerald-600' : 'bg-emerald-500';
      default:
        return darkMode ? 'bg-slate-600' : 'bg-gray-500';
    }
  };

  if (expanded) {
    return (
      <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border h-[700px] flex flex-col transition-all duration-500 shadow-2xl`}>
        {/* Header */}
        <div className="p-6 border-b border-opacity-30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
                <i className="text-white ri-calendar-line text-xl"></i>
              </div>
              <div>
                <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>
                  {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h2>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                  Sua agenda pessoal
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-white/50'} rounded-full p-1 flex`}>
                <button
                  onClick={() => setView('month')}
                  className={`${
                    view === 'month'
                      ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                      : darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-1 rounded-full text-xs font-medium transition-all duration-300`}
                >
                  Mês
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`${
                    view === 'week'
                      ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                      : darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-1 rounded-full text-xs font-medium transition-all duration-300`}
                >
                  Semana
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={view === 'month' ? prevMonth : prevWeek}
              className={`${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'} w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105`}
            >
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            
            <button
              onClick={() => setCurrentDate(new Date())}
              className={`${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} text-sm font-medium`}
            >
              Hoje
            </button>
            
            <button
              onClick={view === 'month' ? nextMonth : nextWeek}
              className={`${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700/50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'} w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-105`}
            >
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
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
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);
              const events = getEventsForDay(day);

              return (
                <button
                  key={day.toString()}
                  onClick={() => onDateSelect(day)}
                  className={`
                    h-16 text-sm rounded-2xl transition-all duration-300 whitespace-nowrap cursor-pointer relative p-2 flex flex-col
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
                    hover:scale-105 hover:shadow-md
                  `}
                >
                  <span className="font-medium">{format(day, 'd')}</span>
                  
                  {/* Events */}
                  {events.length > 0 && (
                    <div className="flex-1 flex flex-col justify-end space-y-1">
                      {events.slice(0, 2).map((event, index) => (
                        <div
                          key={index}
                          className={`${getEventTypeColor(event.type)} h-1 rounded-full opacity-80`}
                        ></div>
                      ))}
                      {events.length > 2 && (
                        <div className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-xs`}>
                          +{events.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

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
          const events = getEventsForDay(day);

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
                ${events.length > 0 && !isSelected && !isTodayDate
                  ? darkMode
                    ? 'bg-slate-700/30'
                    : 'bg-gray-50/80'
                  : ''
                }
                hover:scale-105 hover:shadow-md
              `}
            >
              <span className="relative z-10">{format(day, 'd')}</span>
              
              {/* Event Indicator */}
              {events.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 pb-1">
                  {events.slice(0, 3).map((event, index) => (
                    <div
                      key={index}
                      className={`${getEventTypeColor(event.type)} w-1 h-1 rounded-full opacity-80`}
                    ></div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}