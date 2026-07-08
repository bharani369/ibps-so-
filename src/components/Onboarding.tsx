import React, { useState } from 'react';
import { GlassCard } from './ui/GlassCard';
import { User } from 'lucide-react';

export function Onboarding({ onComplete }: { onComplete: (name: string, age: string) => void }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age) {
      onComplete(name, age);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[hsl(var(--background))] text-white">
      <GlassCard neon className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-500 border-neon-blue/30">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)]">
             <User className="w-8 h-8 text-neon-blue" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Welcome</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Let's personalize your learning experience.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors text-white"
              placeholder="e.g. Rahul Kumar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Age</label>
            <input 
              type="number" 
              required
              min="18"
              max="40"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-colors text-white"
              placeholder="e.g. 24"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity mt-4 shadow-[0_4px_14px_0_rgba(188,19,254,0.39)]"
          >
            Start Preparation
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
