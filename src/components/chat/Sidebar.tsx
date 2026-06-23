'use client';

import { useChat } from '@/context/ChatContext';
import { cn } from '@/lib/utils';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Settings, 
  LayoutDashboard, 
  LogOut, 
  User,
  History,
  Trash2,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Sidebar() {
  const { chatHistory, setChatHistory, currentChatId, setCurrentChatId } = useChat();
  const pathname = usePathname();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch('/api/chats');
        if (res.ok) {
          const data = await res.json();
          setChatHistory(data);
        }
      } catch (e) {
        console.error("Failed to fetch chats", e);
      }
    };
    fetchChats();
  }, [setChatHistory]);

  const menuItems = [
    { icon: MessageSquare, label: 'Chat', href: '/chat' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-72 h-screen glass border-r border-white/10 flex flex-col z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 mb-8 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AI NEXUS</span>
        </Link>

        <button 
          onClick={() => setCurrentChatId(null)}
          className="w-full btn-primary py-2.5 flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search chats..." 
            className="w-full glass-input py-2 pl-10 pr-4 text-sm rounded-xl"
          />
        </div>

        <nav className="space-y-1 mb-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
                pathname === item.href 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mb-4">
          <div className="flex items-center gap-2 px-4 mb-2">
            <History className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Chats</span>
          </div>
          <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
            {chatHistory.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-gray-600">No conversations yet</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChatId(chat.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all group",
                    currentChatId === chat.id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="truncate max-w-[140px]">{chat.title}</span>
                  <Trash2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-0.5">
            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden">
               <User className="text-blue-400 w-6 h-6" />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Guest User</p>
            <p className="text-xs text-gray-500 truncate">Pro Account</p>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}