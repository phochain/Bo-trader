import {useCallback, useEffect, useState} from 'react';

interface Token {
  id: string;
  name: string;
}

interface TradeItem {
  tokenId: string;
  amount: string; // Assuming amount is a string from the API
  direction: string; // 'SELL' or 'BUY'
  baseTokenId: string;
  quoteTokenId: string;
  entryPrice: string; // Assuming entryPrice is a string from the API
  expiryTime: string; // Assuming expiryTime is a string or number
  exitPrice: string; // Assuming exitPrice is a string from the API
  result: string; // 'WIN' or 'LOSS'
  status: string; // Status of the trade
  createdAt: string; // Date string from API
}

export const formatTradeData = (
  data: TradeItem[],
  listToken: Token[]
): Array<{
  tokenId: string;
  amount: string;
  direction: {
    text: string;
    color: string;
  };
  tradingPair: string;
  entryPrice: string;
  expiryTime: string;
  exitPrice: string;
  result: {
    text: string;
    color: string;
  };
  status: string;
  createdAt: string;
}> => {
  const tokenMap = listToken.reduce((acc, token) => {
    acc[token.id] = token.name;
    return acc;
  }, {} as Record<string, string>);

  return data.map(item => ({
    tokenId: tokenMap[item.tokenId] || item.tokenId,
    amount: parseFloat(item.amount).toFixed(2),
    direction: {
      text: item.direction,
      color: item.direction === 'SELL' ? '#f05359' : '#03a781',
    },
    tradingPair: `${tokenMap[item.baseTokenId] || item.baseTokenId}/${tokenMap[item.quoteTokenId] || item.quoteTokenId}`,
    entryPrice: `${parseFloat(item.entryPrice).toFixed(2)} USDT`,
    expiryTime: new Date(parseInt(item.expiryTime)).toLocaleString(),
    exitPrice: `${parseFloat(item.exitPrice).toFixed(2)} USDT`,
    result: {
      text: item.result,
      color: item.result === 'WIN' ? '#03a781' : '#f05359',
    },
    status: item.status,
    createdAt: new Date(item.createdAt).toLocaleString(),
  }));
};

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