'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
}

export const useTypingTest = (targetCode: string, duration: number = 60, mode: 'fixed' | 'infinite' = 'fixed') => {
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = useCallback(() => {
    if (!isActive && !isFinished) {
      setIsActive(true);
    }
  }, [isActive, isFinished]);

  const endTest = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resetTest = useCallback(() => {
    setUserInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalChars: 0,
    });
    if (timerRef.current) clearInterval(timerRef.current);
  }, [duration]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement> | string) => {
    if (isFinished) return;
    
    const rawValue = typeof e === 'string' ? e : e.target.value;
    const value = rawValue.replace(/\r\n/g, '\n');
    
    // Timer only starts when the user types the first character
    if (!isActive && value.length > 0) {
      startTest();
    }

    if (mode === 'fixed') {
      if (value.length <= targetCode.length) {
        // Auto-indentation logic: trigger only on addition
        if (value.length > userInput.length && value.endsWith('\n')) {
          let autoIndent = '';
          let nextIndex = value.length;
          while (nextIndex < targetCode.length && targetCode[nextIndex] === ' ') {
            autoIndent += ' ';
            nextIndex++;
          }
          setUserInput(value + autoIndent);
        } else {
          setUserInput(value);
        }
      }

      if (value.length === targetCode.length) {
        endTest();
      }
    } else {
      // Infinite mode: just set input, no length restriction
      setUserInput(value);
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, endTest, timeLeft]);

  useEffect(() => {
    const calculateStats = () => {
      let correct = 0;
      let incorrect = 0;

      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetCode[i]) {
          correct++;
        } else {
          incorrect++;
        }
      }

      const timeElapsed = (duration - timeLeft) / 60; // in minutes
      const cpm = timeElapsed > 0 ? Math.round(correct / timeElapsed) : 0;
      const wpm = Math.round(cpm / 5);
      const accuracy = userInput.length > 0 ? Math.round((correct / userInput.length) * 100) : 0;

      setStats({
        wpm,
        cpm,
        accuracy,
        correctChars: correct,
        incorrectChars: incorrect,
        totalChars: userInput.length,
      });
    };

    calculateStats();
  }, [userInput, targetCode, duration, timeLeft]);

  return {
    userInput,
    handleInput,
    timeLeft,
    isActive,
    isFinished,
    stats,
    resetTest,
    startTest
  };
};
