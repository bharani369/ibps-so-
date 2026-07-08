import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '../types';
import { prelimsTopics, mainsTopics } from '../data/syllabus';

const defaultProgress: UserProgress = {
  overallPercentage: 0,
  streak: 0,
  dailyGoalProgress: 0,
  bookmarkedTopics: [],
  completedTopics: [],
  completedResources: [],
  userProfile: null,
  lastActiveDate: null,
  dailyCompletions: null,
  totalStudyMinutes: 0,
  notes: []
};

interface ProgressStore {
  progress: UserProgress;
  toggleBookmark: (topicId: string) => void;
  toggleTopicCompletion: (topicId: string) => void;
  markResourceComplete: (resourceId: string) => void;
  setUserProfile: (name: string, age: string) => void;
  updateDailyGoal: (completed: boolean) => void;
  checkStreak: () => void;
  addStudyTime: (minutes: number) => void;
  addNote: (text: string) => void;
  deleteNote: (id: string) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: defaultProgress,

      checkStreak: () => set((state) => {
        const today = new Date().toDateString();
        const prev = state.progress;
        
        if (prev.lastActiveDate === today) return state;

        let newStreak = prev.streak;
        let newDailyCompletions = prev.dailyCompletions;

        if (prev.dailyCompletions?.date !== today) {
          newDailyCompletions = { date: today, count: 0 };
        }
        
        if (prev.lastActiveDate) {
          const lastDate = new Date(prev.lastActiveDate);
          const todayDate = new Date(today);
          const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        return {
          progress: {
            ...prev,
            streak: newStreak,
            lastActiveDate: today,
            dailyCompletions: newDailyCompletions,
            dailyGoalProgress: Math.min(100, Math.round(((newDailyCompletions?.count || 0) / 3) * 100))
          }
        };
      }),

      toggleBookmark: (topicId: string) => set((state) => {
        const prev = state.progress;
        return {
          progress: {
            ...prev,
            bookmarkedTopics: prev.bookmarkedTopics.includes(topicId)
              ? prev.bookmarkedTopics.filter(id => id !== topicId)
              : [...prev.bookmarkedTopics, topicId]
          }
        };
      }),

      updateDailyGoal: (completed: boolean) => set((state) => {
        const today = new Date().toDateString();
        const prev = state.progress;
        let count = prev.dailyCompletions?.date === today ? prev.dailyCompletions.count : 0;
        count = completed ? count + 1 : Math.max(0, count - 1);
        
        return {
          progress: {
            ...prev,
            dailyCompletions: { date: today, count },
            dailyGoalProgress: Math.min(100, Math.round((count / 3) * 100))
          }
        };
      }),

      toggleTopicCompletion: (topicId: string) => set((state) => {
        const prev = state.progress;
        const isCompleted = prev.completedTopics.includes(topicId);
        const newCompleted = isCompleted
          ? prev.completedTopics.filter(id => id !== topicId)
          : [...prev.completedTopics, topicId];
          
        const totalTopics = prelimsTopics.length + mainsTopics.length;
        
        const today = new Date().toDateString();
        let count = prev.dailyCompletions?.date === today ? prev.dailyCompletions.count : 0;
        count = !isCompleted ? count + 1 : Math.max(0, count - 1);
          
        return {
          progress: {
            ...prev,
            completedTopics: newCompleted,
            overallPercentage: Math.min(100, Math.round((newCompleted.length / totalTopics) * 100)),
            dailyCompletions: { date: today, count },
            dailyGoalProgress: Math.min(100, Math.round((count / 3) * 100))
          }
        };
      }),

      markResourceComplete: (resourceId: string) => set((state) => {
        const prev = state.progress;
        const isCompleted = prev.completedResources.includes(resourceId);
        if (isCompleted) return state;
        
        const newCompleted = [...prev.completedResources, resourceId];
        
        const today = new Date().toDateString();
        let count = prev.dailyCompletions?.date === today ? prev.dailyCompletions.count : 0;
        count += 1;

        return {
          progress: {
            ...prev,
            completedResources: newCompleted,
            dailyCompletions: { date: today, count },
            dailyGoalProgress: Math.min(100, Math.round((count / 3) * 100))
          }
        };
      }),

      setUserProfile: (name: string, age: string) => set((state) => ({
        progress: {
          ...state.progress,
          userProfile: { name, age }
        }
      })),

      addStudyTime: (minutes: number) => set((state) => ({
        progress: {
          ...state.progress,
          totalStudyMinutes: (state.progress.totalStudyMinutes || 0) + minutes
        }
      })),

      addNote: (text: string) => set((state) => ({
        progress: {
          ...state.progress,
          notes: [{ id: Date.now().toString(), text, date: new Date().toISOString() }, ...(state.progress.notes || [])]
        }
      })),

      deleteNote: (id: string) => set((state) => ({
        progress: {
          ...state.progress,
          notes: (state.progress.notes || []).filter(note => note.id !== id)
        }
      }))
    }),
    {
      name: 'ibps-so-progress',
    }
  )
);

export function useProgress() {
  const store = useProgressStore();
  return store;
}
