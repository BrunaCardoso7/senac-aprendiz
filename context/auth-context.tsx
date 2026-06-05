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

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

const getStoredToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const setStoredUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

const clearStorage = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // inicia com o usuário do localStorage — sem flash
  const [user, setUser] = useState<User | null>(getStoredUser)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getStoredToken()

    if (!token) {
      setIsLoading(false)
      return
    }

    // valida o token com o servidor
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          // token expirado ou inválido — desloga
          clearStorage()
          setUser(null)
          toast.error('Sessão expirada. Faça login novamente.')
          router.push('/')
          return
        }

        const data = await res.json()

        if (data.user) {
          setUser(data.user)
          setStoredUser(data.user) // mantém localStorage atualizado
        } else {
          clearStorage()
          setUser(null)
        }
      })
      .catch(() => {
        // erro de rede — mantém usuário do localStorage pra não deslogar sem motivo
      })
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
      localStorage.setItem(TOKEN_KEY, data.token)
    }

    if (data.user) {
      setStoredUser(data.user)
      setUser(data.user)
    }

    toast.success('Login realizado com sucesso!')
    router.push('/senac/home')
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    clearStorage()
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