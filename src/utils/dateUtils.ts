import dayjs from 'dayjs';
import { CalendarType } from '../types';

// Function to format date based on calendar type
export const formatDate = (
  date: string,
  calendarType: CalendarType = 'gregorian',
  format = 'YYYY-MM-DD HH:mm'
): string => {
  if (calendarType === 'hijri') {
    // In a real implementation, we would use a Hijri calendar library
    // For now, we'll return a placeholder
    return `${dayjs(date).format(format)} (Hijri)`;
  }
  
  return dayjs(date).format(format);
};

// Format time remaining for display
export const formatTimeRemaining = (
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  language: 'en' | 'ar' = 'en'
): { value: number; label: string }[] => {
  const timeUnits = [
    {
      value: days,
      label: language === 'en' ? 'days' : 'أيام',
      singular: language === 'en' ? 'day' : 'يوم',
    },
    {
      value: hours,
      label: language === 'en' ? 'hours' : 'ساعات',
      singular: language === 'en' ? 'hour' : 'ساعة',
    },
    {
      value: minutes,
      label: language === 'en' ? 'mins' : 'دقائق',
      singular: language === 'en' ? 'min' : 'دقيقة',
    },
    {
      value: seconds,
      label: language === 'en' ? 'secs' : 'ثواني',
      singular: language === 'en' ? 'sec' : 'ثانية',
    },
  ];

  return timeUnits.map(unit => ({
    value: unit.value,
    label: unit.value === 1 ? unit.singular : unit.label
  }));
};

// Check if date is in the past
export const isDateInPast = (date: string): boolean => {
  return dayjs(date).isBefore(dayjs());
};

// Get current date in ISO format
export const getCurrentDate = (): string => {
  return dayjs().format('YYYY-MM-DDTHH:mm');
};

// Add days to a date
export const addDays = (date: string, days: number): string => {
  return dayjs(date).add(days, 'day').format('YYYY-MM-DDTHH:mm');
};