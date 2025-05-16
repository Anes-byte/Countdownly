import { Countdown } from '../types';

// Create a shareable URL for a countdown
export const createShareableURL = (countdown: Countdown): string => {
  const url = new URL(window.location.href);
  url.searchParams.set('title', countdown.title);
  url.searchParams.set('date', countdown.date);
  
  if (countdown.icon) {
    url.searchParams.set('icon', countdown.icon);
  }
  
  if (countdown.isHijri) {
    url.searchParams.set('isHijri', 'true');
  }
  
  if (countdown.background) {
    url.searchParams.set('bg', countdown.background);
  }
  
  if (countdown.description) {
    url.searchParams.set('desc', countdown.description);
  }
  
  return url.toString();
};

// Copy shareable URL to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// Get countdown from URL if it exists
export const getURLCountdown = (): Omit<Countdown, 'id' | 'color'> | null => {
  const url = new URL(window.location.href);
  const title = url.searchParams.get('title');
  const date = url.searchParams.get('date');
  
  if (!title || !date) {
    return null;
  }
  
  const icon = url.searchParams.get('icon') || undefined;
  const isHijri = url.searchParams.get('isHijri') === 'true';
  const background = url.searchParams.get('bg') || undefined;
  const description = url.searchParams.get('desc') || undefined;
  
  return {
    title,
    date,
    icon,
    isHijri,
    background,
    description,
  };
};