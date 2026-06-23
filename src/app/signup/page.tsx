'use client';

import { AuroraBackground, GlassCard } from '@/components/ui/glass';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/chat');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#050505] relative overflow-hidden">
      <AuroraBackground />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
              <Sparkles className="text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-white uppercase">AI NEXUS</span>
          </Link>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-gray-400 mt-2">Join the elite AI community today.</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full glass-input py-3 pl-12 pr-4 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full glass-input py-3 pl-12 pr-4 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full glass-input py-3 pl-12 pr-12 rounded-xl"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 py-2">
              By signing up, you agree to our <span className="text-blue-500">Terms of Service</span> and <span className="text-blue-500">Privacy Policy</span>.
            </p>

            <button type="submit" className="w-full btn-primary py-4 font-bold text-lg">
              Get Started
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#050505] px-2 text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 glass hover:bg-white/10 rounded-xl transition-all">
              <Globe className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 glass hover:bg-white/10 rounded-xl transition-all">
              <Globe className="w-5 h-5" />
              <span>GitHub</span>
            </button>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-gray-400">
          Already have an account? <Link href="/login" className="text-blue-500 font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </main>
  );
}