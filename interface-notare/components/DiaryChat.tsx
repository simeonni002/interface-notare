'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DiaryEntry {
  id: string;
  message: string;
  timestamp: Date;
  mood: 'positive' | 'neutral' | 'negative';
  isUser: boolean;
}

interface DiaryChatProps {
  darkMode: boolean;
  selectedDate: Date;
}

export default function DiaryChat({ darkMode, selectedDate }: DiaryChatProps) {
  const [isClient, setIsClient] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      message: 'Hoje acordei me sentindo muito mais motivada! Consegui fazer minha meditação matinal e tomar um café da manhã saudável. Acho que essa nova rotina está realmente fazendo diferença.',
      timestamp: new Date(Date.now() - 1800000),
      mood: 'positive',
      isUser: true
    },
    {
      id: '2',
      message: 'Que bom ouvir isso! Como você se sente em relação aos seus objetivos da semana?',
      timestamp: new Date(Date.now() - 1700000),
      mood: 'neutral',
      isUser: false
    },
    {
      id: '3',
      message: 'Estou progredindo bem! Concluí 3 das 5 tarefas que planejei. Às vezes me sinto um pouco sobrecarregada, mas estou aprendendo a ser mais gentil comigo mesma.',
      timestamp: new Date(Date.now() - 1600000),
      mood: 'positive',
      isUser: true
    },
    {
      id: '4',
      message: 'Isso é muito importante. Lembra-se de celebrar cada pequena vitória. O que mais te trouxe alegria hoje?',
      timestamp: new Date(Date.now() - 1500000),
      mood: 'neutral',
      isUser: false
    },
    {
      id: '5',
      message: 'Tive uma conversa incrível com uma amiga que não via há meses. Percebo como essas conexões genuínas me fazem bem. Quero cultivar mais momentos assim.',
      timestamp: new Date(Date.now() - 1400000),
      mood: 'positive',
      isUser: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newEntry: DiaryEntry = {
        id: Date.now().toString(),
        message: newMessage,
        timestamp: new Date(),
        mood: 'neutral',
        isUser: true
      };
      setEntries([...entries, newEntry]);
      setNewMessage('');
      
      // Simulate AI response after a delay
      setIsTyping(true);
      setTimeout(() => {
        const responses = [
          'Como isso fez você se sentir?',
          'Conte-me mais sobre isso.',
          'Que interessante! O que você aprendeu com essa experiência?',
          'Isso parece muito significativo para você.',
          'Como você pode aplicar isso em outros aspectos da sua vida?'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const aiResponse: DiaryEntry = {
          id: (Date.now() + 1).toString(),
          message: randomResponse,
          timestamp: new Date(),
          mood: 'neutral',
          isUser: false
        };
        setEntries(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const getMoodColor = (mood: string, isUser: boolean) => {
    if (!isUser) {
      return darkMode ? 'bg-slate-700/50 border-slate-600/50' : 'bg-purple-50/80 border-purple-200/50';
    }
    
    switch (mood) {
      case 'positive':
        return darkMode ? 'bg-gradient-to-r from-emerald-900/40 to-green-900/40 border-emerald-700/50' : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200/50';
      case 'negative':
        return darkMode ? 'bg-gradient-to-r from-red-900/40 to-orange-900/40 border-red-700/50' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200/50';
      default:
        return darkMode ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-700/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-slate-800/60 border-slate-700/30' : 'bg-white/80 border-white/30'} backdrop-blur-xl rounded-3xl border h-[700px] flex flex-col transition-all duration-500 shadow-2xl`}>
      {/* Header */}
      <div className="p-6 border-b border-opacity-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-blue-500'} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
              <i className="text-white ri-chat-heart-line text-xl"></i>
            </div>
            <div>
              <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>
                Conversa Pessoal
              </h2>
              <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`} suppressHydrationWarning={true}>
                {isClient ? format(selectedDate, "d 'de' MMMM", { locale: ptBR }) : 'Carregando...'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`${darkMode ? 'bg-emerald-600' : 'bg-emerald-500'} w-3 h-3 rounded-full`}></div>
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} text-sm font-medium`}>Online</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`flex ${entry.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${entry.isUser ? 'order-2' : 'order-1'}`}>
              <div className={`${getMoodColor(entry.mood, entry.isUser)} backdrop-blur-sm border rounded-2xl p-4 ${entry.isUser ? 'rounded-br-md' : 'rounded-bl-md'} shadow-lg`}>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm leading-relaxed`}>
                  {entry.message}
                </p>
                <div className={`${darkMode ? 'text-slate-400' : 'text-gray-500'} text-xs mt-2 ${entry.isUser ? 'text-right' : 'text-left'}`} suppressHydrationWarning={true}>
                  {isClient ? format(entry.timestamp, 'HH:mm') : '--:--'}
                </div>
              </div>
            </div>
            
            {/* Avatar */}
            <div className={`${entry.isUser ? 'order-1 mr-3' : 'order-2 ml-3'} flex-shrink-0`}>
              <div className={`${
                entry.isUser 
                  ? darkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  : darkMode
                    ? 'bg-slate-700'
                    : 'bg-purple-100'
              } w-8 h-8 rounded-full flex items-center justify-center shadow-md`}>
                <i className={`${entry.isUser ? 'text-white ri-user-smile-line' : darkMode ? 'text-purple-400 ri-heart-3-line' : 'text-purple-600 ri-heart-3-line'} text-sm`}></i>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="order-2 ml-3 flex-shrink-0">
              <div className={`${darkMode ? 'bg-slate-700' : 'bg-purple-100'} w-8 h-8 rounded-full flex items-center justify-center shadow-md`}>
                <i className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} ri-heart-3-line text-sm`}></i>
              </div>
            </div>
            <div className="order-1 max-w-xs lg:max-w-md">
              <div className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50' : 'bg-purple-50/80 border-purple-200/50'} backdrop-blur-sm border rounded-2xl rounded-bl-md p-4 shadow-lg`}>
                <div className="flex space-x-1">
                  <div className={`${darkMode ? 'bg-slate-500' : 'bg-purple-400'} w-2 h-2 rounded-full animate-bounce`}></div>
                  <div className={`${darkMode ? 'bg-slate-500' : 'bg-purple-400'} w-2 h-2 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                  <div className={`${darkMode ? 'bg-slate-500' : 'bg-purple-400'} w-2 h-2 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-6 border-t border-opacity-30">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Compartilhe seus pensamentos..."
              className={`${darkMode ? 'bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400' : 'bg-white/80 border-gray-200/50 text-gray-900 placeholder-gray-500'} flex-1 rounded-2xl border px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all backdrop-blur-sm`}
            />
            <button
              type="submit"
              className={`${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'} text-white rounded-2xl px-8 py-4 text-sm font-medium transition-all whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105`}
            >
              <i className="ri-send-plane-2-fill text-lg"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}