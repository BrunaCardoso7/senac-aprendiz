'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type User = {
  id: string
  name: string | null
  matricula: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (matricula: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // busca usuário logado ao carregar
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    fetch('/api/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user)
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  async function login(matricula: string, password: string) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message ?? 'Erro ao fazer login')
    }

    const data = await res.json()

    if (data.token) {
      try {
        localStorage.setItem('token', data.token)
      } catch (e) {
      }
    }
    toast.success('Login realizado com sucesso!')
    setUser(data.user)
    router.push('/senac')
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    try {
      localStorage.removeItem('token')
    } catch (e) {}
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}