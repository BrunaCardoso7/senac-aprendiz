"use client"

import { useState } from "react"
import { User, Lock, Eye, EyeOff, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import useUserForm from "@/hooks/use-user-form"
import Image from "next/image"

export function SignupModal() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const { form, onSubmit, isLoading } = useUserForm()
  const { register, handleSubmit, formState: { errors } } = form

  return (
    <Card className="w-full max-w-md bg-white rounded-2xl shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-blue-900">
          <Image src="/logo-white.png" alt="Logo" width={90} height={90} className="mx-auto" />
          <CardTitle className="text-2xl font-bold text-blue-900">Senac Aprendiz</CardTitle>
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">Registre-se e embarque conosco!</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#1a3a5c] font-medium">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                required
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                className="pl-10 h-12 border-gray-200 rounded-lg"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message  as string}</p>
            )}
          </div>

          {/* Matrícula */}
          <div className="space-y-2">
            <Label htmlFor="matricula" className="text-[#1a3a5c] font-medium">Número de matrícula</Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                required
                id="matricula"
                type="text"
                placeholder="Digite sua matrícula"
                className="pl-10 h-12 border-gray-200 rounded-lg"
                {...register("matricula")}
              />
            </div>
            {errors.matricula && (
              <p className="text-sm text-red-500">{errors.matricula.message  as string}</p>
            )}
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#1a3a5c] font-medium">Criar senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                className="pl-10 pr-10 h-12 border-gray-200 rounded-lg"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message as string}</p>
            )}
          </div>

          {/* Confirmar senha */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#1a3a5c] font-medium">Confirmar senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Digite a senha novamente"
                className="pl-10 pr-10 h-12 border-gray-200 rounded-lg"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message as string}
                </p>
              )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#e67e22] hover:bg-[#d35400] text-white font-semibold rounded-lg mt-6"
          >
            {isLoading ? "Criando..." : "Criar conta"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full h-12 rounded-xl text-blue-900 hover:bg-blue-50 font-semibold text-base"
            onClick={() => router.push("/")}
          >
            Já tenho uma conta!
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}