// signup-page.tsx
"use client"

import { EditProfileModal } from "@/components/global/edit-profile-modal"
import { SettingsSection } from "@/components/global/settings-session"
import { StudentProfileCard } from "@/components/global/studant-profile-card"
import { useGetContrato } from "@/hooks/contrato/use-get-contrato"
import { useState } from "react"

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const { data: contrato, isLoading, isError } = useGetContrato()

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Carregando...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-red-500">
        Erro ao carregar contrato.
      </div>
    )
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-5xl space-y-6 py-4">
        <StudentProfileCard data={contrato} />
        <SettingsSection onEditProfile={() => setEditing(true)} />
      </div>
      <EditProfileModal
        open={editing}
        onClose={() => setEditing(false)}
        contrato={contrato}
      />
    
    </div>
  )
}