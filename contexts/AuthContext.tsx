"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { router } from "expo-router"

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session)
      if (mounted.current) {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session)
      if (mounted.current) {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Handle sign out navigation for React Native
        if (event === "SIGNED_OUT") {
          console.log("User signed out, redirecting to login...")
          // Use setTimeout to ensure state updates are complete
          setTimeout(() => {
            try {
              // For React Native, we might need to reset the navigation stack
              router.dismissAll()
              router.replace("/(auth)/login")
            } catch (error) {
              console.error("Navigation error after sign out:", error)
              // Fallback
              router.push("/(auth)/login")
            }
          }, 100)
        }
      }
    })

    return () => {
      mounted.current = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    console.log("Attempting to sign out...")
    const { error } = await supabase.auth.signOut()
    console.log("Sign out result:", { error })

    if (!error) {
      // Clear local state immediately
      setSession(null)
      setUser(null)
    }

    return { error }
  }

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
