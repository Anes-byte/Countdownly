import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { TimeRemaining } from '../types';

// Calculate time remaining between now and target date
const calculateTimeRemaining = (targetDate: string): TimeRemaining => {
  const now = dayjs();
  const target = dayjs(targetDate);
  const diff = target.diff(now, 'second');
  
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }
  
  const days = Math.floor(diff / (60 * 60 * 24));
  const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = Math.floor(diff % 60);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  };
};

export function useCountdownTimer(targetDate: string) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetDate)
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear existing interval when the target date changes
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    // Set initial time
    setTimeRemaining(calculateTimeRemaining(targetDate));
    
    // Set up interval to update every second
    intervalRef.current = window.setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(newTimeRemaining);
      
      // Clear interval if countdown has expired
      if (newTimeRemaining.isExpired && intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }, 1000);
    
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [targetDate]);
  
  return timeRemaining;
}