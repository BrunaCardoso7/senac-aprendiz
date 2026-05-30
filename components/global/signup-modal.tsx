"use client"

import { useState } from "react"
import { User, CreditCard, Lock, Eye, EyeOff, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import useUserForm from "@/hooks/use-user-form"

export function SignupModal() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {form, onSubmit, isLoading, isError, error} = useUserForm()

  const [formData, setFormData] = useState({
    name: "",
    matricula: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center text-[#1a3a5c]">
            Criar Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1a3a5c] font-medium">
                Nome completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="pl-10 h-12 border-gray-200 rounded-lg"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matricula" className="text-[#1a3a5c] font-medium">
                Número de matrícula
              </Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="matricula"
                  type="text"
                  placeholder="Digite sua matrícula"
                  className="pl-10 h-12 border-gray-200 rounded-lg"
                  value={formData.matricula}
                  onChange={(e) =>
                    setFormData({ ...formData, matricula: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1a3a5c] font-medium">
                Criar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10 pr-10 h-12 border-gray-200 rounded-lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-[#1a3a5c] font-medium"
              >
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Digite a senha novamente"
                  className="pl-10 pr-10 h-12 border-gray-200 rounded-lg"
                  // onChange={(e) =>
                  //   setFormData({ ...formData, confirmPassword: e.target.value })
                  // }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#e67e22] hover:bg-[#d35400] text-white font-semibold rounded-lg mt-6"
              
            >
              Criar conta
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
    </>
  )
}
