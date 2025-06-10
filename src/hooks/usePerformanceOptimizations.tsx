
import { useCallback, useMemo, useRef, useEffect } from 'react';

// Debounce hook for performance optimization
export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Throttle hook for performance optimization
export const useThrottle = (callback: (...args: any[]) => void, limit: number) => {
  const inThrottle = useRef(false);

  const throttledCallback = useCallback((...args: any[]) => {
    if (!inThrottle.current) {
      callback(...args);
      inThrottle.current = true;
      setTimeout(() => {
        inThrottle.current = false;
      }, limit);
    }
  }, [callback, limit]);

  return throttledCallback;
};

// Memoized calculation hook
export const useMemoizedValue = <T,>(calculation: () => T, dependencies: any[]): T => {
  return useMemo(calculation, dependencies);
};

// Optimized event listener hook
export const useOptimizedEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  element?: Element | Window | Document
) => {
  const savedHandler = useRef(handler);
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element || window;
    
    const eventListener = (event: Event) => {
      savedHandler.current(event);
    };

    if (targetElement && targetElement.addEventListener) {
      targetElement.addEventListener(eventName, eventListener, { passive: true });
      
      return () => {
        targetElement.removeEventListener(eventName, eventListener);
      };
    }
  }, [eventName, element]);
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (renderTime > 16) { // More than 1 frame at 60fps
      console.warn(`Performance warning: ${componentName} took ${renderTime.toFixed(2)}ms to render (render #${renderCount.current})`);
    }
    
    startTime.current = performance.now();
  });

  return { renderCount: renderCount.current };
};
