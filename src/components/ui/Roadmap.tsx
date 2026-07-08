import React from 'react';
import { GlassCard } from './GlassCard';
import { useProgress } from '../../store/useProgress';
import { prelimsTopics, mainsTopics } from '../../data/syllabus';
import { CheckCircle2, Circle, Flag } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export function Roadmap() {
  const { progress } = useProgress();

  const getTimelineSteps = (topics: typeof prelimsTopics) => {
    // Take a subset or group them to keep timeline manageable, or just show the first 5 and last 1 as goal
    const steps = topics.map((t, index) => {
      const isCompleted = progress.completedTopics.includes(t.id);
      return {
        id: t.id,
        title: t.title,
        subject: t.subject,
        isCompleted,
      };
    });
    return steps;
  };

  const prelimsSteps = getTimelineSteps(prelimsTopics);
  const mainsSteps = getTimelineSteps(mainsTopics);

  return (
    <GlassCard className="mt-8">
      <div className="flex items-center gap-3 mb-8">
        <Flag className="w-6 h-6 text-neon-pink" />
        <h2 className="text-xl font-semibold">Preparation Roadmap</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Prelims Roadmap */}
        <div>
          <h3 className="text-lg font-medium text-neon-blue mb-6">Prelims Journey</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {prelimsSteps.map((step, index) => (
              <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-gray-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm shadow-neon-blue/20 z-10">
                  {step.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-neon-blue" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/5 bg-white/5 shadow">
                  <h4 className={cn("font-semibold text-sm", step.isCompleted ? "text-white" : "text-gray-400")}>{step.title}</h4>
                  <span className="text-xs text-gray-500">{step.subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mains Roadmap */}
        <div>
          <h3 className="text-lg font-medium text-neon-purple mb-6">Mains Journey</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {mainsSteps.map((step, index) => (
              <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-gray-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm shadow-neon-purple/20 z-10">
                  {step.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-neon-purple" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/5 bg-white/5 shadow">
                  <h4 className={cn("font-semibold text-sm", step.isCompleted ? "text-white" : "text-gray-400")}>{step.title}</h4>
                  <span className="text-xs text-gray-500">{step.subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
