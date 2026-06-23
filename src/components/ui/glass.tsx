'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, translateY: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={cn(
        "glass-card p-6 relative overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.div>
  );
}

// Fixed particle positions to avoid hydration mismatch
const PARTICLE_DATA = [
  { x: 10, y: 20, opacity: 0.3, duration: 15, delay: 0 },
  { x: 25, y: 50, opacity: 0.4, duration: 18, delay: 1 },
  { x: 40, y: 30, opacity: 0.2, duration: 20, delay: 2 },
  { x: 60, y: 70, opacity: 0.35, duration: 16, delay: 3 },
  { x: 80, y: 40, opacity: 0.25, duration: 22, delay: 4 },
  { x: 15, y: 80, opacity: 0.3, duration: 19, delay: 5 },
  { x: 35, y: 60, opacity: 0.4, duration: 17, delay: 6 },
  { x: 55, y: 20, opacity: 0.2, duration: 21, delay: 7 },
  { x: 75, y: 50, opacity: 0.35, duration: 18, delay: 8 },
  { x: 90, y: 85, opacity: 0.25, duration: 20, delay: 9 },
  { x: 5, y: 45, opacity: 0.3, duration: 16, delay: 10 },
  { x: 20, y: 10, opacity: 0.4, duration: 19, delay: 11 },
  { x: 45, y: 75, opacity: 0.2, duration: 22, delay: 12 },
  { x: 65, y: 35, opacity: 0.35, duration: 17, delay: 13 },
  { x: 85, y: 60, opacity: 0.25, duration: 20, delay: 14 },
  { x: 30, y: 90, opacity: 0.3, duration: 18, delay: 15 },
  { x: 50, y: 55, opacity: 0.4, duration: 21, delay: 16 },
  { x: 70, y: 15, opacity: 0.2, duration: 16, delay: 17 },
  { x: 95, y: 70, opacity: 0.35, duration: 19, delay: 18 },
  { x: 12, y: 35, opacity: 0.25, duration: 20, delay: 19 },
];

export function AuroraBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="aurora pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
    );
  }

  return (
    <div className="aurora pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Floating Particles with fixed positions */}
      {PARTICLE_DATA.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: particle.opacity
          }}
          animate={{ 
            y: [`${particle.y}%`, `${particle.y - 30}%`, `${particle.y}%`],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{ 
            duration: particle.duration, 
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
}
