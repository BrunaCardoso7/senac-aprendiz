"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type ModalType = "transaction" | "goal" | null

interface ModalsContextType {
  activeModal: ModalType
  openTransactionModal: () => void
  openGoalModal: () => void
  closeModal: () => void
  isTransactionModalOpen: boolean
  isGoalModalOpen: boolean
}

const ModalsContext = createContext<ModalsContextType | undefined>(undefined)

export function ModalsProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const openTransactionModal = () => setActiveModal("transaction")
  const openGoalModal = () => setActiveModal("goal")
  const closeModal = () => setActiveModal(null)

  return (
    <ModalsContext.Provider
      value={{
        activeModal,
        openTransactionModal,
        openGoalModal,
        closeModal,
        isTransactionModalOpen: activeModal === "transaction",
        isGoalModalOpen: activeModal === "goal",
      }}
    >
      {children}
    </ModalsContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalsContext)
  if (!context) {
    throw new Error("useModals must be used within a ModalsProvider")
  }
  return context
}

// Hooks individuais para cada modal (compatibilidade)
export function useTransactionModal() {
  const { isTransactionModalOpen, openTransactionModal, closeModal } = useModals()
  return {
    isOpen: isTransactionModalOpen,
    openModal: openTransactionModal,
    closeModal,
  }
}

export function useGoalModal() {
  const { isGoalModalOpen, openGoalModal, closeModal } = useModals()
  return {
    isOpen: isGoalModalOpen,
    openModal: openGoalModal,
    closeModal,
  }
}
