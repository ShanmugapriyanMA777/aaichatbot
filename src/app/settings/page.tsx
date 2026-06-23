'use client';

import Sidebar from '@/components/chat/Sidebar';
import { AuroraBackground, GlassCard } from '@/components/ui/glass';
import { useChat } from '@/context/ChatContext';
import { Key, Moon, Sun, Globe, Shield, Trash2, Download, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { apiKey, setApiKey, selectedModel, setSelectedModel } = useChat();
  const [showKey, setShowKey] = useState(false);

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#050505]">
      <AuroraBackground />
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-gray-400">Manage your account and application preferences.</p>
          </header>

          <div className="space-y-6">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-bold">API Configuration</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">OpenRouter API Key</label>
                  <div className="relative">
                    <input 
                      type={showKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-or-..."
                      className="w-full glass-input py-3 px-4 rounded-xl pr-12"
                    />
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showKey ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Get your API key from <a href="https://openrouter.ai/keys" target="_blank" className="text-blue-500 hover:underline">OpenRouter</a>. 
                    Your key is stored locally in your browser.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold">Privacy & Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="font-medium">Clear Chat History</p>
                    <p className="text-xs text-gray-500">Permanently delete all conversations</p>
                  </div>
                  <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-all">
                    Delete All
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="font-medium">Export Conversations</p>
                    <p className="text-xs text-gray-500">Download all your chats as JSON</p>
                  </div>
                  <button className="px-4 py-2 glass hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="border-red-500/20">
               <div className="flex items-center gap-3 mb-6 text-red-500">
                <LogOut className="w-5 h-5" />
                <h2 className="text-xl font-bold">Danger Zone</h2>
              </div>
              <p className="text-sm text-gray-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all">
                Delete Account
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}