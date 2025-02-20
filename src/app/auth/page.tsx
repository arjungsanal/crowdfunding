"use client"

import AuthComponent from '@/components/auth'
import Navbar from '@/components/navbar'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/profile')
    }
  }, [user, router])

  return <>
  <Navbar />
  <AuthComponent />

  </>
}