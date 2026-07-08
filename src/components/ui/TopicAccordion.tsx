import React from 'react';
import { Topic } from '../../types';
import { GlassCard } from './GlassCard';
import { Bookmark } from 'lucide-react';
import { cn } from '../../lib/utils';
import confetti from 'canvas-confetti';

interface TopicAccordionProps {
  key?: React.Key;
  topic: Topic;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleCompletion: (id: string) => void;
}

export function TopicAccordion({ topic, isBookmarked, isCompleted, onToggleBookmark, onToggleCompletion }: TopicAccordionProps) {
  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCompleted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f3ff', '#bc13fe', '#00ff66']
      });
    }
    onToggleCompletion(topic.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(topic.id);
  };

  return (
    <GlassCard className="p-4 mb-4 transition-colors hover:bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div>
          <h3 className={cn("text-base sm:text-lg font-medium", isCompleted && "text-muted-foreground line-through decoration-white/30")}>
            {topic.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">{topic.subject}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-3 self-end sm:self-auto">
        <button 
          onClick={handleBookmark} 
          className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-neon-purple hover:bg-white/10 transition-colors"
          title="Bookmark Topic"
        >
          <Bookmark className={cn("w-4 h-4 sm:w-5 sm:h-5", isBookmarked && "fill-neon-purple text-neon-purple")} />
        </button>
        <button 
          onClick={handleComplete} 
          className={cn(
            "text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-colors",
            isCompleted 
              ? "bg-white/10 text-gray-400 hover:bg-white/20" 
              : "bg-neon-blue/20 text-neon-blue hover:bg-neon-blue hover:text-gray-900"
          )}
        >
          {isCompleted ? 'Check Out' : 'Check In'}
        </button>
      </div>
    </GlassCard>
  );
}
