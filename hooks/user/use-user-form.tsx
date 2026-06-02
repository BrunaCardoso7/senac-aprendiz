import { UserFormData, userSchema } from "@/server/schema/user-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useCreateUserMutation } from "./use-user-create-mutation"
import { toast } from "sonner"

export default function useUserForm() {
  const router = useRouter()

  const form = useForm<any>({
    resolver: zodResolver(userSchema),
    defaultValues: {
        name: '',
        matricula: '',
        password: '',
        confirmPassword: '', // 👈 só isso
    },
  })

  const createMutation = useCreateUserMutation()

  function handleSuccess(response: any) {
    const user = response.data
    if (user) {
      toast.success('usuário criado com sucesso!')
      router.push('/')
    } else {
      toast.error('Erro ao criar usuário')
    }
  }

  const onSubmit = async (values: UserFormData) => {
    const payload = {
      name: values.name,
      matricula: values.matricula,
      password: values.password,
      confirmPassword: values.password,
    }

    createMutation.mutate(payload, {
        onSuccess: handleSuccess, 
    })
  }

  const isLoading = createMutation.isPending 
  const isError = createMutation.isError
  const error = createMutation.error

  return { form, onSubmit, isLoading, isError, error }
}
