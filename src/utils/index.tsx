import {useCallback, useEffect, useState} from 'react';

export const playSound = (soundFilePath: string) => {
  const audio = new Audio(soundFilePath);
  audio.play();
};

export const useCountdown = (initialDuration: number) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storedEndTime = localStorage.getItem('endTime');
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = endTime - currentTime;

      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        setIsActive(true);
      } else {
        localStorage.removeItem('endTime');
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsActive(false);
            localStorage.removeItem('endTime');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft]);

  const startCountdown = useCallback(() => {
    setTimeLeft(initialDuration);
    setIsActive(true);
    const endTime = Math.floor(Date.now() / 1000) + initialDuration;
    localStorage.setItem('endTime', endTime.toString());
  }, [initialDuration]);

  return {timeLeft, isActive, startCountdown};
};

export const formatHash = (hash: string) => {
  if (hash.length <= 16) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
};