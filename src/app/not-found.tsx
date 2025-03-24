// app/not-found.tsx
"use client"

import { useState, useEffect, SVGProps } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HomeIcon, ArrowLeft, Compass } from "lucide-react"
import { JSX } from "react/jsx-runtime"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Only render animations after client-side hydration
  if (!mounted) {
    return null
  }

  return (
    <div className="overflow-hidden relative flex flex-col items-center justify-center min-h-screen bg-background px-4">
      {/* Floating mountains in background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute opacity-10 top-20 left-10 lg:left-20"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MountainIcon className="h-16 w-16 lg:h-24 lg:w-24 text-primary" />
        </motion.div>
        
        <motion.div
          className="absolute opacity-10 bottom-20 right-10 lg:right-20"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <MountainIcon className="h-12 w-12 lg:h-20 lg:w-20 text-primary" />
        </motion.div>
        
        <motion.div
          className="absolute opacity-10 top-1/2 right-1/4"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <MountainIcon className="h-10 w-10 lg:h-16 lg:w-16 text-primary" />
        </motion.div>
      </div>
      
      {/* Logo that follows mouse slightly */}
      <motion.div 
        className="flex mb-10 relative z-10"
        animate={{
          x: mousePosition.x / 80,
          y: mousePosition.y / 80,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold ms-2">CrestFunding</span>
        </motion.div>
      </motion.div>

      <div className="text-center max-w-md mx-auto relative z-10">
        {/* Animated 404 text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-extrabold text-primary relative">
            404
            <motion.div
              className="absolute -top-4 -right-4 text-4xl opacity-75"
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              
            </motion.div>
          </h1>
        </motion.div>
        
        {/* Line separator with animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-px bg-border w-full my-6 relative"
        >
          <motion.div 
            className="h-2 w-2 rounded-full bg-primary absolute top-1/2 -translate-y-1/2"
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Error message with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-2">Page not found</h2>
          <motion.p 
            className="text-muted-foreground mb-8"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            But hey, at least you found me!😜
          </motion.p>
        </motion.div>
        
        {/* Buttons with hover animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="default" className="w-full sm:w-auto">
              <Link href="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="javascript:history.back()">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Stylized footprints path animation */}
      <div className="absolute bottom-8 w-full max-w-lg flex justify-center overflow-hidden h-8">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex items-center space-x-8"
        >
          {[...Array(10)].map((_, i) => (
            <FootprintIcon 
              key={i} 
              className={`h-4 w-4 text-primary opacity-30 ${i % 2 === 0 ? 'rotate-12' : '-rotate-12'}`} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function FootprintIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 2.28-5 5-5 2.72 0 4.94 2.1 5 4.82.04 1.82-.66 3.22-2 3.76V16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2zm12-6.39V16c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-3c0-1.86-1.28-3.48-3-4-1.32-.4-2.22-1.58-2.22-2.93 0-1.64-1.35-2.97-3-2.97-1.3 0-2.4.84-2.82 2 .77.05 1.3.39 1.74.86 1.03 1.1 1.3 2.57 1.3 4.55z" />
    </svg>
  )
}