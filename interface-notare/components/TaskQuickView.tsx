'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'personal' | 'health' | 'study';
  dueTime?: string;
}

interface TaskQuickViewProps {
  darkMode: boolean;
  compact?: boolean;
}

export default function TaskQuickView({ darkMode, compact = false }: TaskQuickViewProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Meditação matinal de 15 minutos',
      completed: true,
      priority: 'high',
      category: 'health',
      dueTime: '08:00'
    },
    {
      id: '2',
      title: 'Revisar relatório mensal',
      completed: false,
      priority: 'high',
      category: 'work',
      dueTime: '14:00'
    },
    {
      id: '3',
      title: 'Exercício físico (30 min)',
      completed: false,
      priority: 'medium',
      category: 'health',
      dueTime: '18:00'
    },
    {
      id: '4',
      title: 'Ler capítulo do livro',
      completed: false,
      priority: 'low',
      category: 'personal',
      dueTime: '21:00'
    },
    {
      id: '5',
      title: 'Planejar fim de semana',
      completed: false,
      priority: 'medium',
      category: 'personal'
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium',
        category: 'personal'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return darkMode ? 'bg-red-900/30 border-red-700/50' : 'bg-red-50 border-red-200/50';
      case 'medium':
        return darkMode ? 'bg-amber-900/30 border-amber-700/50' : 'bg-amber-50 border-amber-200/50';
      default:
        return darkMode ? 'bg-blue-900/30 border-blue-700/50' : 'bg-blue-50 border-blue-200/50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'ri-alarm-warning-line';
      case 'medium':
        return 'ri-time-line';
      default:
        return 'ri-checkbox-circle-line';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work':
        return 'ri-briefcase-line';
      case 'health':
        return 'ri-heart-pulse-line';
      case 'study':
        return 'ri-book-line';
      default:
        return 'ri-user-line';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  if (compact) {
    return (
      <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white/80 border-white/50'} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-lg font-bold`}>
            Tarefas Hoje
          </h3>
          <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {completedCount}/{totalCount}
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredTasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                task.completed 
                  ? darkMode ? 'bg-slate-700/50 opacity-60' : 'bg-gray-50 opacity-60'
                  : darkMode ? 'bg-slate-700/30 hover:bg-slate-700/50' : 'bg-gray-50/50 hover:bg-gray-100/50'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`${
                  task.completed
                    ? darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                    : darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0`}
              >
                {task.completed && <i className="ri-check-line text-xs"></i>}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`${
                  task.completed
                    ? darkMode ? 'text-slate-400 line-through' : 'text-gray-500 line-through'
                    : darkMode ? 'text-white' : 'text-gray-900'
                } text-sm font-medium truncate`}>
                  {task.title}
                </p>
                {task.dueTime && (
                  <p className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs`}>
                    {task.dueTime}
                  </p>
                )}
              </div>
              
              <i className={`${getCategoryIcon(task.category)} ${darkMode ? 'text-slate-400' : 'text-gray-400'} text-sm`}></i>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border h-[700px] flex flex-col transition-all duration-500 shadow-2xl`}>
      {/* Header */}
      <div className="p-6 border-b border-opacity-30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
              <i className="text-white ri-task-line text-xl"></i>
            </div>
            <div>
              <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>
                Suas Tarefas
              </h2>
              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                {completedCount} de {totalCount} concluídas
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-white/50'} rounded-full p-1 flex`}>
              {['all', 'pending', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`${
                    filter === f
                      ? darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                      : darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-1 rounded-full text-xs font-medium transition-all duration-300`}
                >
                  {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendentes' : 'Feitas'}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`${getPriorityColor(task.priority)} backdrop-blur-sm border rounded-2xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`${
                  task.completed
                    ? darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                    : darkMode ? 'bg-slate-600 text-slate-300 hover:bg-slate-500' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 hover:scale-110`}
              >
                {task.completed && <i className="ri-check-line text-sm"></i>}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`${
                  task.completed
                    ? darkMode ? 'text-slate-400 line-through' : 'text-gray-500 line-through'
                    : darkMode ? 'text-white' : 'text-gray-900'
                } text-sm font-medium`}>
                  {task.title}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs flex items-center space-x-1`}>
                    <i className={`${getCategoryIcon(task.category)} text-xs`}></i>
                    <span>{task.category}</span>
                  </span>
                  {task.dueTime && (
                    <span className={`${darkMode ? 'text-slate-500' : 'text-gray-500'} text-xs flex items-center space-x-1`}>
                      <i className="ri-time-line text-xs"></i>
                      <span>{task.dueTime}</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <i className={`${getPriorityIcon(task.priority)} ${darkMode ? 'text-slate-400' : 'text-gray-400'} text-lg`}></i>
                <button className={`${darkMode ? 'text-slate-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'} transition-colors hover:scale-110`}>
                  <i className="ri-delete-bin-line text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <div className="p-6 border-t border-opacity-30">
        <form onSubmit={addTask}>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Adicionar nova tarefa..."
              className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400' : 'bg-white/80 border-gray-200/50 text-gray-900 placeholder-gray-500'} flex-1 rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all backdrop-blur-sm`}
            />
            <button
              type="submit"
              className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'} text-white rounded-2xl px-6 py-3 text-sm font-medium transition-all whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105`}
            >
              <i className="ri-add-line text-lg"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}