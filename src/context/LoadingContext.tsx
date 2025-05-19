'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

// Define types for our context
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  showLoader: (msg?: string, minDisplayTime?: number) => void;
  hideLoader: () => void;
}

// Define props for our provider component
interface LoadingProviderProps {
  children: ReactNode;
  minDisplayTime?: number; // Default minimum display time in ms
}

// Create context with a default value
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
  message: undefined,
  setMessage: () => {},
  showLoader: () => {},
  hideLoader: () => {},
});

// Provider component
export function LoadingProvider({ 
  children, 
  minDisplayTime = 1000 // Default 1 second minimum display time
}: LoadingProviderProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [loadStartTime, setLoadStartTime] = useState<number>(0);
  const [hideRequested, setHideRequested] = useState<boolean>(false);

  // Effect to handle minimum display time
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (hideRequested && loadStartTime > 0) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - loadStartTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      if (remainingTime > 0) {
        // If minimum time hasn't elapsed, set a timer
        timerId = setTimeout(() => {
          setIsLoading(false);
          setHideRequested(false);
          setLoadStartTime(0);
        }, remainingTime);
      } else {
        // Minimum time already elapsed, hide immediately
        setIsLoading(false);
        setHideRequested(false);
        setLoadStartTime(0);
      }
    }

    // Cleanup timer on unmount
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [hideRequested, loadStartTime, minDisplayTime]);

  // Debug logging
  useEffect(() => {
    console.log('Loading state changed:', isLoading, 'Message:', message);
  }, [isLoading, message]);

  // Helper functions for showing/hiding loader
  const showLoader = (msg?: string, customMinTime?: number) => {
    if (msg) setMessage(msg);
    setLoadStartTime(Date.now());
    setHideRequested(false);
    setIsLoading(true);
    
    // For debugging, log when loader should appear
    console.log(`Loader shown at ${new Date().toISOString()} with min display time: ${customMinTime || minDisplayTime}ms`);
  };

  const hideLoader = () => {
    // Instead of hiding immediately, set flag to request hiding
    setHideRequested(true);
    
    // For debugging, log when hide was requested
    console.log(`Hide loader requested at ${new Date().toISOString()}`);
  };

  return (
    <LoadingContext.Provider 
      value={{ isLoading, setIsLoading, message, setMessage, showLoader, hideLoader }}
    >
      {children}
      {/* Only render when isLoading is true */}
      {isLoading && <LoadingOverlay message={message} />}
    </LoadingContext.Provider>
  );
}

// Separate loading overlay component for better organization
function LoadingOverlay({ message }: { message?: string }): JSX.Element {
  // Log when overlay renders
  useEffect(() => {
    console.log('LoadingOverlay rendered with message:', message);
  }, [message]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[9999] flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4">
        {/* Fancy loading spinner */}
        <div className="relative">
          {/* Outer spinning circle */}
          <div className="w-16 h-16 border-4 border-blue-500 border-opacity-30 rounded-full animate-spin"></div>
          {/* Inner spinning circle (opposite direction) */}
          <div className="absolute top-1 left-1 w-14 h-14 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin"></div>
          {/* Center dot */}
          <div className="absolute top-5 left-5 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Message display */}
        <p className="mt-6 font-medium text-gray-700 dark:text-gray-200 text-center">
          {message || "Loading..."}
        </p>
        
        {/* Progress bar animation */}
        <div className="w-full mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
        </div>
      </div>
    </div>
  );
}

// Custom hook to use the loading context
export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  
  // Instead of throwing error, log a warning and return context
  if (context === undefined) {
    console.error('useLoading hook was called outside of LoadingProvider!');
  }
  
  return context;
}