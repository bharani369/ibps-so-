import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { PlayCircle, Lock, BrainCircuit } from 'lucide-react';

export function MockTestsPortal() {
  const mockTests = [
    { id: 1, title: 'IBPS SO IT Prelims Full Mock 1', type: 'Full Length', duration: '120 Mins', questions: 150, locked: false },
    { id: 2, title: 'IBPS SO IT Prelims Full Mock 2', type: 'Full Length', duration: '120 Mins', questions: 150, locked: false },
    { id: 3, title: 'IBPS SO IT Mains Professional Knowledge 1', type: 'Mains', duration: '45 Mins', questions: 60, locked: false },
    { id: 4, title: 'IBPS SO IT Mains Professional Knowledge 2', type: 'Mains', duration: '45 Mins', questions: 60, locked: true },
    { id: 5, title: 'English Sectional Mock (Hard)', type: 'Sectional', duration: '40 Mins', questions: 50, locked: false },
    { id: 6, title: 'Reasoning Sectional Mock (Hard)', type: 'Sectional', duration: '40 Mins', questions: 50, locked: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          Mock Tests & Analysis
        </h1>
        <p className="text-gray-400 mt-2">Test your readiness with actual exam level mocks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {mockTests.map(mock => (
           <GlassCard key={mock.id} className="relative overflow-hidden flex flex-col justify-between h-full group hover:border-white/20 transition-colors">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div>
               <div className="flex justify-between items-start mb-4">
                 <span className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-gray-300">
                   {mock.type}
                 </span>
                 {mock.locked ? <Lock className="w-5 h-5 text-gray-500" /> : <PlayCircle className="w-5 h-5 text-neon-blue" />}
               </div>
               <h3 className="text-lg font-semibold mb-2 pr-4">{mock.title}</h3>
               <p className="text-sm text-gray-400">{mock.duration} • {mock.questions} Questions</p>
             </div>
             
             <div className="mt-6 pt-4 border-t border-white/5 relative z-10">
                <button className={`w-full py-2 rounded-lg font-medium transition-colors ${mock.locked ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30'}`}>
                   {mock.locked ? 'Unlock via Pro' : 'Start Mock Test'}
                </button>
             </div>
           </GlassCard>
         ))}
      </div>
      
      <GlassCard neon className="mt-12 bg-black/40 border-neon-purple/30">
        <div className="flex items-center gap-3 mb-6">
          <BrainCircuit className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-semibold">AI Performance Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 mb-1">Strongest Section</p>
              <p className="text-lg font-bold text-neon-green">English Language</p>
              <p className="text-xs text-gray-500 mt-2">Top 15% of candidates</p>
           </div>
           <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 mb-1">Weakest Section</p>
              <p className="text-lg font-bold text-red-400">Quantitative Aptitude</p>
              <p className="text-xs text-gray-500 mt-2">Focus on Data Interpretation</p>
           </div>
           <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-sm text-gray-400 mb-1">Estimated Rank</p>
              <p className="text-lg font-bold text-neon-blue">12,450 / 85,000</p>
              <p className="text-xs text-gray-500 mt-2">Based on latest mocks</p>
           </div>
        </div>
      </GlassCard>
    </div>
  );
}
