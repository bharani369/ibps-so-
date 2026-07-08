import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Play, Pause, Square, Timer } from 'lucide-react';
import { useProgressStore } from '../../store/useProgress';

export function FocusTimer() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60); // 25 minutes default
  const addStudyTime = useProgressStore((state) => state.addStudyTime);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      addStudyTime(25); // log 25 minutes
      setSeconds(25 * 60); // reset
      alert('Focus session complete! Great job!');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, addStudyTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(25 * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Timer className="w-6 h-6 text-neon-pink" />
        <h2 className="text-xl font-semibold">Focus Timer</h2>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-5xl font-mono font-bold mb-8 tracking-wider text-white">
          {formatTime(seconds)}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neon-blue/20 text-neon-blue hover:bg-neon-blue hover:text-gray-900 transition-colors font-medium"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Start
              </>
            )}
          </button>
          
          <button
            onClick={resetTimer}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors font-medium"
          >
            <Square className="w-5 h-5" /> Reset
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-400 font-medium">
          Total Study Time: {Math.floor((useProgressStore(state => state.progress.totalStudyMinutes) || 0) / 60)}h {(useProgressStore(state => state.progress.totalStudyMinutes) || 0) % 60}m
        </p>
      </div>
    </GlassCard>
  );
}
