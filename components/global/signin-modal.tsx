"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"

export function SigninModal() {
  const [showPassword, setShowPassword] = useState(false)
  const [matricula, setMatricula] = useState("")
  const [senha, setSenha] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login(matricula, senha),
    onError: (err: Error) => {
      console.error(err.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  return (
    <>
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-2">
          <Image
            src="/logo-white.png"
            alt="Logo"
            width={90}
            height={90}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-blue-900">Senac Aprendiz</CardTitle>
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">Sua jornada profissional começa aqui.</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="matricula" className="text-sm font-medium text-gray-700">
                Número de matrícula
              </Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  required
                  id="matricula"
                  type="text"
                  placeholder="Digite sua matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  required
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* erro de login */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error.message}</p>
            )}

            {/* <a href="#" className="inline-block text-sm text-blue-600 hover:text-blue-700 hover:underline">
              Esqueci minha senha
            </a> */}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-[#e67e22] hover:bg-[#d35400] text-white font-semibold rounded-lg mt-6"
            >
              {isPending ? "Entrando..." : "Entrar"}
            </Button>

            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl border-2 border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold text-base"
              onClick={() => router.push("/registre-se")}
            >
              Criar nova conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}