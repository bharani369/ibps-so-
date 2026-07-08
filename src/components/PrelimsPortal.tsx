import React, { useState } from 'react';
import { prelimsTopics } from '../data/syllabus';
import { TopicAccordion } from './ui/TopicAccordion';
import { useProgress } from '../store/useProgress';
import { GlassCard } from './ui/GlassCard';
import { Search, BookOpen, Clock, BarChart } from 'lucide-react';
import { Subject } from '../types';

const SUBJECTS: Subject[] = ['English', 'Reasoning', 'Quant'];

export function PrelimsPortal() {
  const { progress, toggleBookmark, toggleTopicCompletion } = useProgress();
  const [activeSubject, setActiveSubject] = useState<Subject>('English');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = prelimsTopics.filter(t => 
    t.subject === activeSubject && 
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
          Prelims Portal
        </h1>
        <p className="text-gray-400 mt-2">Master English, Reasoning, and Quantitative Aptitude.</p>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <GlassCard className="p-4 flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-neon-blue" />
          <div>
            <p className="text-2xl font-bold font-mono">
              {prelimsTopics.length - prelimsTopics.filter(t => progress.completedTopics.includes(t.id)).length}
            </p>
            <p className="text-xs text-gray-400">Topics Left</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4">
          <Clock className="w-8 h-8 text-neon-purple" />
          <div>
            <p className="text-2xl font-bold font-mono">
              {prelimsTopics.filter(t => progress.completedTopics.includes(t.id)).length}
            </p>
            <p className="text-xs text-gray-400">Topics Done</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4">
          <BarChart className="w-8 h-8 text-neon-green" />
          <div>
            <p className="text-2xl font-bold font-mono">
              {Math.round((prelimsTopics.filter(t => progress.completedTopics.includes(t.id)).length / prelimsTopics.length) * 100) || 0}%
            </p>
            <p className="text-xs text-gray-400">Completion</p>
          </div>
        </GlassCard>
        <GlassCard className="p-4 flex items-center gap-4">
           <div className="w-full">
              <p className="text-xs text-gray-400 mb-2">Subject Mastery</p>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-neon-blue transition-all" 
                   style={{ width: `${Math.round((prelimsTopics.filter(t => t.subject === activeSubject && progress.completedTopics.includes(t.id)).length / (prelimsTopics.filter(t => t.subject === activeSubject).length || 1)) * 100)}%` }}
                 />
              </div>
           </div>
        </GlassCard>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Filters */}
        <div className="lg:w-1/4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-neon-blue transition-colors"
            />
          </div>

          <GlassCard className="p-2 space-y-1">
            {SUBJECTS.map(subject => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSubject === subject 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {subject}
              </button>
            ))}
          </GlassCard>

          <GlassCard className="hidden lg:block">
            <h3 className="font-semibold mb-4 text-sm text-neon-blue uppercase tracking-wider">Prelims To Do</h3>
            <div className="space-y-3">
              {prelimsTopics.filter(t => !progress.completedTopics.includes(t.id)).slice(0, 5).map(topic => (
                <div key={topic.id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center group">
                  <div>
                    <p className="font-medium text-xs line-clamp-1">{topic.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{topic.subject}</p>
                  </div>
                  <button 
                    onClick={() => toggleTopicCompletion(topic.id)}
                    className="text-[10px] font-medium bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-full hover:bg-neon-blue hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    Check In
                  </button>
                </div>
              ))}
              {prelimsTopics.filter(t => !progress.completedTopics.includes(t.id)).length === 0 && (
                <p className="text-xs text-gray-400 italic text-center py-4">All Prelims topics caught up!</p>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">{activeSubject} Syllabus</h2>
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
