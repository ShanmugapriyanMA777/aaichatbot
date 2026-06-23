'use client';

import Sidebar from '@/components/chat/Sidebar';
import { AuroraBackground, GlassCard } from '@/components/ui/glass';
import { MessageSquare, Zap, Clock, TrendingUp, BarChart3, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Chats', value: '124', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Messages', value: '1,420', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Tokens Used', value: '45.2k', icon: Zap, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { label: 'Avg. Response', value: '1.2s', icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#050505]">
      <AuroraBackground />
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your AI usage and performance statistics.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="lg:col-span-2 min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-bold">Usage Activity</h2>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg opacity-80"
                    />
                    <span className="text-[10px] text-gray-500">Day {i+1}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-bold">Most Used Models</h2>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'DeepSeek V3', usage: 65, color: 'bg-blue-500' },
                  { name: 'Llama 3.3', usage: 20, color: 'bg-purple-500' },
                  { name: 'Qwen 2.5', usage: 10, color: 'bg-cyan-500' },
                  { name: 'Gemma 2', usage: 5, color: 'bg-green-500' },
                ].map((model, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium">{model.name}</span>
                      <span className="text-gray-500">{model.usage}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${model.usage}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className={`h-full ${model.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}