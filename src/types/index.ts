export interface Countdown {
  id: string;
  title: string;
  date: string;
  icon?: string;
  color: string;
  background?: string;
  isHijri?: boolean;
  description?: string;
  isPinned?: boolean;
  reminderTime?: number; // in minutes before event
  shares?: number;
  views?: number;
  showTimeSince?: boolean;
}

export type Language = 'en' | 'ar';
export type CalendarType = 'gregorian' | 'hijri';
export type ThemeType = 'dark' | 'light' | 'system';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface AppSettings {
  language: Language;
  defaultCalendar: CalendarType;
  theme: ThemeType;
  minimalMode?: boolean;
  notificationsEnabled?: boolean;
  soundEnabled?: boolean;
}

export interface Notification {
  id: string;
  countdownId: string;
  time: number; // minutes before event
  triggered: boolean;
}