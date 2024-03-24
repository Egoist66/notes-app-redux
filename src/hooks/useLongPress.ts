import { useState, useRef, useEffect } from 'react';

export const useLongPress = (callback: (e: any) => void, ms = 300) => {
  const [startLongPress, onLongPress] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (startLongPress) {
      timeoutRef.current = setTimeout(callback, ms);
    } else {
      clearTimeout(timeoutRef.current);
    }

    return () => {
      clearTimeout(timeoutRef.current);
     
    };
  }, [startLongPress]);

  return {
    onLongPress
  };
}

