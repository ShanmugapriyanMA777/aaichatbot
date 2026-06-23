'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-blue-400 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Introducing AI Nexus v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            The Future of <br />
            <span className="text-gradient">AI Conversations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl"
          >
            Experience the next generation of artificial intelligence. Powered by the world's most advanced models, AI Nexus delivers a premium chat experience with unparalleled speed and intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/chat" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="btn-glass flex items-center gap-2 text-lg px-8 py-4">
              View Features
            </Link>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Bot,
              title: "Advanced Intelligence",
              desc: "Access GPT-4, Claude 3, and Llama 3 in one unified interface."
            },
            {
              icon: Zap,
              title: "Blazing Fast",
              desc: "Streaming responses with zero latency for natural conversations."
            },
            {
              icon: Shield,
              title: "Private & Secure",
              desc: "Your data is encrypted and stays in your control at all times."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <GlassCard className="h-full border-t-blue-500/20">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
                  <feature.icon className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}