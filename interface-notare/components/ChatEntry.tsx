'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Entry {
  id: string;
  message: string;
  timestamp: Date;
  mood: 'positive' | 'neutral' | 'negative';
  tags: string[];
}

interface ChatEntryProps {
  darkMode: boolean;
  selectedDate: Date;
}

export default function ChatEntry({ darkMode, selectedDate }: ChatEntryProps) {
  const [isClient, setIsClient] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      message: 'Hoje me senti incrivelmente produtivo e energizado. Completei todas as tarefas que planejei para hoje e ainda consegui dedicar tempo para uma meditação de 20 minutos. Sinto que estou desenvolvendo uma rotina mais equilibrada e saudável.',
      timestamp: new Date(),
      mood: 'positive',
      tags: ['produtividade', 'meditação', 'equilíbrio']
    },
    {
      id: '2',
      message: 'Estou um pouco ansioso sobre a reunião importante de amanhã, mas ao mesmo tempo me sinto preparado. Revisei todos os materiais e pratiquei minha apresentação. Reconheço que a ansiedade é normal e estou tentando canalizá-la de forma positiva.',
      timestamp: new Date(Date.now() - 3600000),
      mood: 'neutral',
      tags: ['ansiedade', 'preparação', 'crescimento']
    },
    {
      id: '3',
      message: 'Tive uma conversa profunda com um amigo próximo hoje. Percebi como é importante ter pessoas com quem posso ser vulnerável e autêntico. Essa conexão me lembrou do valor das relações genuínas em minha vida.',
      timestamp: new Date(Date.now() - 7200000),
      mood: 'positive',
      tags: ['amizade', 'conexão', 'autenticidade']
    },
    {
      id: '4',
      message: 'Finalizei a leitura de um livro sobre mindfulness que me inspirou muito. Algumas técnicas apresentadas realmente ressoaram comigo, especialmente a prática da respiração consciente. Quero incorporar essas práticas em minha rotina diária.',
      timestamp: new Date(Date.now() - 10800000),
      mood: 'positive',
      tags: ['mindfulness', 'leitura', 'crescimento pessoal']
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newEntry: Entry = {
        id: Date.now().toString(),
        message: newMessage,
        timestamp: new Date(),
        mood: 'neutral',
        tags: selectedTags
      };
      setEntries([newEntry, ...entries]);
      setNewMessage('');
      setSelectedTags([]);
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive':
        return darkMode ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30 border-emerald-700/50' : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200/50';
      case 'negative':
        return darkMode ? 'bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-700/50' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200/50';
      default:
        return darkMode ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/50' : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200/50';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'positive':
        return 'ri-emotion-happy-line';
      case 'negative':
        return 'ri-emotion-sad-line';
      default:
        return 'ri-emotion-normal-line';
    }
  };

  const getMoodIconColor = (mood: string) => {
    switch (mood) {
      case 'positive':
        return darkMode ? 'text-emerald-400' : 'text-emerald-600';
      case 'negative':
        return darkMode ? 'text-red-400' : 'text-red-600';
      default:
        return darkMode ? 'text-slate-400' : 'text-gray-600';
    }
  };

  const commonTags = ['gratidão', 'ansiedade', 'produtividade', 'relacionamentos', 'crescimento', 'saúde', 'trabalho', 'família'];

  return (
    <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border h-[700px] flex flex-col transition-all duration-500 shadow-2xl`}>
      {/* Header */}
      <div className="p-8 border-b border-opacity-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-2xl font-bold`}>
              Suas Reflexões
            </h2>
            <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mt-2`} suppressHydrationWarning={true}>
              {isClient ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR }) : 'Carregando...'}
            </p>
          </div>
          <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} rounded-2xl p-3 shadow-lg`}>
            <i className="text-white ri-chat-heart-line text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`${getMoodColor(entry.mood)} backdrop-blur-sm border rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
              index === 0 ? 'ring-2 ring-purple-500/20' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`${darkMode ? 'bg-slate-700/50' : 'bg-white/80'} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <i className={`${getMoodIcon(entry.mood)} ${getMoodIconColor(entry.mood)} text-xl`}></i>
              </div>
              <div className="flex-1">
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-base leading-relaxed`}>
                  {entry.message}
                </p>
                
                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {entry.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`${darkMode ? 'bg-purple-900/50 text-purple-300 border-purple-700/50' : 'bg-purple-100/80 text-purple-700 border-purple-200/50'} px-3 py-1 rounded-full text-xs font-medium border`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <span className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-sm`} suppressHydrationWarning={true}>
                    {isClient ? format(entry.timestamp, 'HH:mm') : '--:--'}
                  </span>
                  <div className="flex items-center space-x-3">
                    <button className={`${darkMode ? 'text-slate-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'} transition-colors hover:scale-110`}>
                      <i className="ri-heart-line text-lg"></i>
                    </button>
                    <button className={`${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'} transition-colors hover:scale-110`}>
                      <i className="ri-bookmark-line text-lg"></i>
                    </button>
                    <button className={`${darkMode ? 'text-slate-400 hover:text-purple-400' : 'text-gray-400 hover:text-purple-600'} transition-colors hover:scale-110`}>
                      <i className="ri-share-line text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-6 border-t border-opacity-50">
        {/* Tags Selection */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  } else {
                    setSelectedTags([...selectedTags, tag]);
                  }
                }}
                className={`${
                  selectedTags.includes(tag)
                    ? darkMode
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-purple-500 text-white border-purple-400'
                    : darkMode
                      ? 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-600/50'
                      : 'bg-gray-100/80 text-gray-600 border-gray-200/50 hover:bg-gray-200/80'
                } px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
              <i className="text-white ri-user-smile-line text-xl"></i>
            </div>
            <div className="flex-1 flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Compartilhe seus pensamentos e reflexões..."
                className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400' : 'bg-white/80 border-gray-200/50 text-gray-900 placeholder-gray-500'} flex-1 rounded-2xl border px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all backdrop-blur-sm`}
              />
              <button
                type="submit"
                className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'} text-white rounded-2xl px-8 py-4 text-sm font-medium transition-all whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <i className="ri-send-plane-line text-lg"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}