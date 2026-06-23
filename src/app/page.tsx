import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import { AuroraBackground } from '@/components/ui/glass';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen relative">
      <AuroraBackground />
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Unmatched Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need for the ultimate AI experience, wrapped in a beautiful, futuristic interface.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Real-time Streaming" 
            description="Watch as the AI thinks and responds instantly with our advanced streaming protocol."
            icon="⚡"
          />
          <FeatureCard 
            title="Model Selection" 
            description="Choose from over 50+ world-class models including DeepSeek, Qwen, and Llama."
            icon="🧠"
          />
          <FeatureCard 
            title="Voice Integration" 
            description="Speak naturally with built-in voice-to-text capabilities for hands-free chat."
            icon="🎙️"
          />
          <FeatureCard 
            title="Export & Share" 
            description="Export your conversations to Markdown, PDF or JSON with a single click."
            icon="📤"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white/5 border-y border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-extrabold text-blue-500 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-purple-500 mb-2">50+</div>
            <div className="text-gray-400">AI Models</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-cyan-500 mb-2">10M+</div>
            <div className="text-gray-400">Tokens/sec</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© 2026 AI Nexus. All rights reserved. Built for the future.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/5 group">
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
