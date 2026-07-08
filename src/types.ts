export type Subject = 'English' | 'Reasoning' | 'Quant' | 'Professional Knowledge';

export interface Topic {
  id: string;
  title: string;
  subject: Subject;
  tier?: 'Tier 1' | 'Tier 2' | 'Tier 3';
  completed: boolean;
}

export interface ExamCountdown {
  title: string;
  date: string;
}

export interface UserProfile {
  name: string;
  age: string;
}

export interface UserProgress {
  overallPercentage: number;
  streak: number;
  dailyGoalProgress: number; // out of 100
  bookmarkedTopics: string[];
  completedTopics: string[];
  completedResources: string[];
  userProfile: UserProfile | null;
  lastActiveDate?: string | null;
  dailyCompletions?: { date: string; count: number } | null;
  totalStudyMinutes?: number;
  notes?: Note[];
}

export interface Note {
  id: string;
  text: string;
  date: string;
}

