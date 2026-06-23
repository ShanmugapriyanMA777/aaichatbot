'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ChatContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  chatHistory: any[];
  setChatHistory: (history: any[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useLocalStorage<string>('ai-nexus-api-key', '');
  const [selectedModel, setSelectedModel] = useLocalStorage<string>('ai-nexus-model', 'deepseek/deepseek-chat');
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  return (
    <ChatContext.Provider value={{
      apiKey, setApiKey,
      selectedModel, setSelectedModel,
      currentChatId, setCurrentChatId,
      chatHistory, setChatHistory
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}