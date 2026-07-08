import React from 'react';
import { GlassCard } from './ui/GlassCard';
import { ProgressRing } from './ui/ProgressRing';
import { useProgress } from '../store/useProgress';
import { Calendar, Target, Flame, PlayCircle, Trophy, Bookmark, ListTodo } from 'lucide-react';
import { prelimsTopics, mainsTopics } from '../data/syllabus';
import { FocusTimer } from './ui/FocusTimer';
import { Roadmap } from './ui/Roadmap';

export function HomeDashboard() {
  const { progress, toggleTopicCompletion } = useProgress();

  const allTopics = [...prelimsTopics, ...mainsTopics];
  const bookmarkedTopics = allTopics.filter(t => progress.bookmarkedTopics.includes(t.id));
  const todoPrelims = prelimsTopics.filter(t => !progress.completedTopics.includes(t.id)).slice(0, 3);
  const todoMains = mainsTopics.filter(t => !progress.completedTopics.includes(t.id)).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Welcome back, {progress.userProfile?.name?.split(' ')[0] || 'Achiever'}!
          </h1>
          <p className="text-gray-400 mt-1">Ready to conquer the IBPS SO IT Officer exam?</p>
        </div>
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-all neon-border cursor-pointer z-10">
          <PlayCircle className="w-5 h-5" />
          Resume Learning
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Overall Progress */}
        <div className="flex flex-col gap-6">
          <GlassCard className="flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium text-gray-300 mb-6">Overall Readiness</h3>
            <ProgressRing progress={progress.overallPercentage} size={160} strokeWidth={12} />
            <p className="mt-6 text-sm text-gray-400">Keep it up! You're making steady progress.</p>
          </GlassCard>
          <FocusTimer />
        </div>

        {/* Countdowns & Goals */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard neon className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon-blue/20 rounded-xl text-neon-blue">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Prelims Exam</p>
                  <p className="text-2xl font-bold font-mono">45 Days</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="relative overflow-hidden group border-white/10 hover:border-neon-purple/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon-purple/20 rounded-xl text-neon-purple">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mains Exam</p>
                  <p className="text-2xl font-bold font-mono">85 Days</p>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <GlassCard className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Daily Goal</p>
                  <p className="text-lg font-semibold mt-1">3 Topics/Resources</p>
                </div>
                <div className="text-right">
                   <Target className="w-8 h-8 text-neon-green ml-auto mb-2 opacity-80" />
                   <p className="text-sm font-mono text-neon-green">{progress.dailyGoalProgress}% Done</p>
                </div>
             </GlassCard>

             <GlassCard className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Streak</p>
                  <p className="text-lg font-semibold mt-1">{progress.streak} {progress.streak === 1 ? 'Day' : 'Days'}</p>
                </div>
                <div className="text-right">
                   <Flame className={`w-8 h-8 ml-auto mb-2 ${progress.streak > 0 ? 'text-orange-500' : 'text-gray-600'}`} />
                   <p className={`text-sm ${progress.streak > 0 ? 'text-orange-400' : 'text-gray-500'}`}>
                     {progress.streak > 2 ? 'On fire!' : 'Keep going!'}
                   </p>
                </div>
             </GlassCard>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <ListTodo className="w-6 h-6 text-neon-blue" />
            <h2 className="text-xl font-semibold">To Do List</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prelims To Do */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neon-blue uppercase tracking-wider">Prelims Pending</h3>
              {todoPrelims.length > 0 ? (
                todoPrelims.map(topic => (
                  <div key={topic.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors group">
                    <div>
                      <p className="font-medium text-sm">{topic.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{topic.subject}</p>
                    </div>
                    <button 
                      onClick={() => toggleTopicCompletion(topic.id)}
                      className="text-xs font-medium bg-neon-blue/20 text-neon-blue px-3 py-1.5 rounded-full hover:bg-neon-blue hover:text-gray-900 transition-colors cursor-pointer z-10"
                    >
                      Check In
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">All Prelims topics caught up!</p>
              )}
            </div>
            
            {/* Mains To Do */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-neon-purple uppercase tracking-wider">Mains Pending</h3>
              {todoMains.length > 0 ? (
                todoMains.map(topic => (
                  <div key={topic.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors group">
                    <div>
                      <p className="font-medium text-sm">{topic.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{topic.subject}</p>
                    </div>
                    <button 
                      onClick={() => toggleTopicCompletion(topic.id)}
                      className="text-xs font-medium bg-neon-purple/20 text-neon-purple px-3 py-1.5 rounded-full hover:bg-neon-purple hover:text-gray-900 transition-colors cursor-pointer z-10"
                    >
                      Check In
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">All Mains topics caught up!</p>
              )}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <Bookmark className="w-6 h-6 text-neon-pink fill-neon-pink/20" />
              <h2 className="text-xl font-semibold">Want to Watch</h2>
            </div>
            <div className="space-y-4 max-h-[200px] overflow-y-auto hide-scrollbar pr-2">
              {bookmarkedTopics.length > 0 ? (
                bookmarkedTopics.map(topic => (
                  <div key={topic.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{topic.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{topic.subject}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  <p>No bookmarks yet.</p>
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-neon-green" />
              <h2 className="text-xl font-semibold">Real-Time Mocks</h2>
            </div>
            <div className="space-y-3">
              <a 
                href="https://bhagyaachievers.com/community-notes/bank/ibps-po"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm group-hover:text-neon-green transition-colors">Bhagya Achievers Mocks</p>
                    <p className="text-xs text-gray-400 mt-1">Access real-time IBPS PO/SO mocks</p>
                  </div>
                  <Trophy className="w-5 h-5 text-neon-green/50 group-hover:text-neon-green transition-colors" />
                </div>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
      
      <Roadmap />
    </div>
  );
}
