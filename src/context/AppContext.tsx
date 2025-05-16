import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Countdown, AppSettings, Language, CalendarType } from '../types';
import { getURLCountdown } from '../utils/shareUtils';

interface AppContextType {
  countdowns: Countdown[];
  settings: AppSettings;
  addCountdown: (countdown: Omit<Countdown, 'id'>) => void;
  updateCountdown: (countdown: Countdown) => void;
  deleteCountdown: (id: string) => void;
  reorderCountdowns: (startIndex: number, endIndex: number) => void;
  setLanguage: (language: Language) => void;
  setDefaultCalendar: (calendar: CalendarType) => void;
  isRTL: boolean;
}

const defaultSettings: AppSettings = {
  language: 'en',
  defaultCalendar: 'gregorian',
  theme: 'dark',
};

const defaultColors = [
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#F97316', // orange
  '#10B981', // emerald
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedCountdowns = localStorage.getItem('countdowns');
    const savedSettings = localStorage.getItem('settings');

    if (savedCountdowns) {
      setCountdowns(JSON.parse(savedCountdowns));
    }

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check URL for shared countdown
    const urlCountdown = getURLCountdown();
    if (urlCountdown && !loaded) {
      // Check if this countdown already exists
      const exists = savedCountdowns ? 
        JSON.parse(savedCountdowns).some((c: Countdown) => 
          c.title === urlCountdown.title && c.date === urlCountdown.date
        ) : false;

      if (!exists) {
        addCountdown({
          ...urlCountdown,
          color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
        });
      }
    }

    setLoaded(true);
  }, [loaded]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('countdowns', JSON.stringify(countdowns));
    }
  }, [countdowns, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }, [settings, loaded]);

  // Add new countdown
  const addCountdown = (countdown: Omit<Countdown, 'id'>) => {
    const newCountdown: Countdown = {
      ...countdown,
      id: uuidv4(),
    };
    setCountdowns([...countdowns, newCountdown]);
  };

  // Update existing countdown
  const updateCountdown = (updatedCountdown: Countdown) => {
    setCountdowns(
      countdowns.map((countdown) =>
        countdown.id === updatedCountdown.id ? updatedCountdown : countdown
      )
    );
  };

  // Delete countdown
  const deleteCountdown = (id: string) => {
    setCountdowns(countdowns.filter((countdown) => countdown.id !== id));
  };

  // Reorder countdowns (for drag and drop)
  const reorderCountdowns = (startIndex: number, endIndex: number) => {
    const result = Array.from(countdowns);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setCountdowns(result);
  };

  // Set language
  const setLanguage = (language: Language) => {
    setSettings({ ...settings, language });
  };

  // Set default calendar
  const setDefaultCalendar = (calendar: CalendarType) => {
    setSettings({ ...settings, defaultCalendar: calendar });
  };

  return (
    <AppContext.Provider
      value={{
        countdowns,
        settings,
        addCountdown,
        updateCountdown,
        deleteCountdown,
        reorderCountdowns,
        setLanguage,
        setDefaultCalendar,
        isRTL: settings.language === 'ar',
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}