import React, { useState } from 'react';
import { mainsTopics } from '../data/syllabus';
import { TopicAccordion } from './ui/TopicAccordion';
import { useProgress } from '../store/useProgress';
import { GlassCard } from './ui/GlassCard';
import { Search, Server, Cpu, Cloud, Database } from 'lucide-react';

export function MainsPortal() {
  const { progress, toggleBookmark, toggleTopicCompletion } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTier, setActiveTier] = useState<string>('All');

  const filteredTopics = mainsTopics.filter(t => 
    (activeTier === 'All' || t.tier === activeTier) && 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-green">
          Mains Portal
        </h1>
        <p className="text-gray-400 mt-2">Professional Knowledge - Core IT Subjects.</p>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-4 flex items-center gap-4">
          <Database className="w-8 h-8 text-neon-purple" />
          <div>
            <p className="text-2xl font-bold font-mono">
              {mainsTopics.length - mainsTopics.filter(t => progress.completedTopics.includes(t.id)).length}
            </p>
            <p className="text-xs text-gray-400">Topics Left</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4">
          <Server className="w-8 h-8 text-neon-blue" />
          <div>
            <p className="text-2xl font-bold font-mono">
              {mainsTopics.filter(t => progress.completedTopics.includes(t.id)).length}
            </p>
            <p className="text-xs text-gray-400">Topics Done</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4">
          <Cpu className="w-8 h-8 text-neon-green" />
          <div>
            <p className="text-2xl font-bold font-mono">
              {Math.round((mainsTopics.filter(t => progress.completedTopics.includes(t.id)).length / mainsTopics.length) * 100) || 0}%
            </p>
            <p className="text-xs text-gray-400">Completion</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4">
           <div className="w-full">
              <p className="text-xs text-gray-400 mb-2">Tier Mastery</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-neon-purple transition-all" 
                   style={{ width: `${Math.round((mainsTopics.filter(t => (activeTier === 'All' || t.tier === activeTier) && progress.completedTopics.includes(t.id)).length / (mainsTopics.filter(t => activeTier === 'All' || t.tier === activeTier).length || 1)) * 100)}%` }}
                 />
              </div>
           </div>
        </GlassCard>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neon-purple transition-colors"
            />
          </div>

          <GlassCard className="p-2 flex flex-row lg:flex-col gap-2 overflow-x-auto hide-scrollbar">
            {['All', 'Tier 1', 'Tier 2', 'Tier 3'].map(tier => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`whitespace-nowrap px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTier === tier 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tier === 'All' ? 'All Topics' : tier}
              </button>
            ))}
          </GlassCard>

          <GlassCard className="hidden lg:block">
            <h3 className="font-semibold mb-4 text-sm text-neon-purple uppercase tracking-wider">Mains To Do</h3>
            <div className="space-y-3">
              {mainsTopics.filter(t => !progress.completedTopics.includes(t.id)).slice(0, 5).map(topic => (
                <div key={topic.id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center group">
                  <div>
                    <p className="font-medium text-xs line-clamp-1">{topic.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{topic.subject}</p>
                  </div>
                  <button 
                    onClick={() => toggleTopicCompletion(topic.id)}
                    className="text-[10px] font-medium bg-neon-purple/20 text-neon-purple px-2 py-1 rounded-full hover:bg-neon-purple hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    Check In
                  </button>
                </div>
              ))}
              {mainsTopics.filter(t => !progress.completedTopics.includes(t.id)).length === 0 && (
                <p className="text-xs text-gray-400 italic text-center py-4">All Mains topics caught up!</p>
              )}
            </div>
          </GlassCard>
        </div>

        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Professional Knowledge</h2>
            <span className="text-sm text-gray-400">{filteredTopics.length} Topics</span>
          </div>

          <div className="space-y-2">
            {filteredTopics.length > 0 ? (
              filteredTopics.map(topic => (
                <TopicAccordion 
                  key={topic.id}
                  topic={topic}
                  isBookmarked={progress.bookmarkedTopics.includes(topic.id)}
                  isCompleted={progress.completedTopics.includes(topic.id)}
                  onToggleBookmark={toggleBookmark}
                  onToggleCompletion={toggleTopicCompletion}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No topics found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
