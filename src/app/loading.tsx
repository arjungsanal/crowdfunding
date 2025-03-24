'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function FunLoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  const funnyMessages = [
    "Convincing hamsters to power the servers...",
    "Reticulating splines...",
    "Teaching AI to make better jokes...",
    "Brewing coffee for the developers...",
    "Counting to infinity. Twice.",
    "Making the pixels extra pretty just for you...",
    "Searching for the meaning of life...",
    "Generating excuses for the slow loading time...",
    "Untangling the internet cables...",
    "Polishing the pixels to a high shine..."
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Decrease the increment value to make it slower
        return prevProgress + 1; // Changed from 2 to 1
      });
    }, 300); // Changed from 150 to 300 milliseconds
    
    // Change funny message every few seconds
    const messageTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * funnyMessages.length);
      setLoadingMessage(funnyMessages[randomIndex]);
    }, 3000); // Changed from 2000 to 3000 milliseconds
    
    // Set initial message
    setLoadingMessage(funnyMessages[Math.floor(Math.random() * funnyMessages.length)]);
    
    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <motion.div 
          animate={{ 
            rotate: [0, 10, 0, -10, 0], 
            y: [0, -10, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="mb-8"
        >
          <div className="text-6xl md:text-8xl mb-4">🚀</div>
          <h1 className="text-2xl md:text-4xl font-bold text-indigo-800 mb-2">
            Almost There!
          </h1>
        </motion.div>
        
        <div className="mb-6">
          <Progress value={progress} className="h-2 bg-indigo-100" />
          <p className="text-sm text-indigo-600 mt-2">{progress}% complete</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          key={loadingMessage}
          className="h-12 flex items-center justify-center"
        >
          <p className="text-gray-600 italic">"{loadingMessage}"</p>
        </motion.div>
        
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="mt-8"
        >
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 rounded-full bg-indigo-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      <p className="text-xs text-gray-500 mt-12">
        Click anywhere to pretend you're making it load faster
      </p>
    </div>
  );
}