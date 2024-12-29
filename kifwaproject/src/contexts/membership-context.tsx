'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export type StepStatus = {
  completed: boolean
  active: boolean
}

export type DocumentUpload = {
  name: string
  progress: number
  uploaded: boolean
  file?: File
}

export type StepDocuments = {
  [key: string]: DocumentUpload | null
}

type MembershipContextType = {
  currentStep: number
  stepStatuses: { [key: number]: StepStatus }
  documents: StepDocuments
  updateStepStatus: (step: number, status: Partial<StepStatus>) => void
  goToNextStep: () => void
  updateDocument: (documentId: string, upload: DocumentUpload | null) => void
}

const MembershipContext = createContext<MembershipContextType | null>(null)

export function MembershipProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(2)
  const [stepStatuses, setStepStatuses] = useState<{ [key: number]: StepStatus }>({
    1: { completed: true, active: false },
    2: { completed: false, active: true },
    3: { completed: false, active: false },
    4: { completed: false, active: false },
    5: { completed: false, active: false },
    6: { completed: false, active: false },
    7: { completed: false, active: false },
  })
  const [documents, setDocuments] = useState<StepDocuments>({})

  const updateStepStatus = (step: number, status: Partial<StepStatus>) => {
    setStepStatuses(prev => ({
      ...prev,
      [step]: { ...prev[step], ...status }
    }))
  }

  const goToNextStep = () => {
    const nextStep = currentStep + 1
    if (nextStep <= 7) {
      updateStepStatus(currentStep, { completed: true, active: false })
      updateStepStatus(nextStep, { active: true })
      setCurrentStep(nextStep)
      router.push(`/membership/step-${nextStep}`)
    }
  }

  const updateDocument = (documentId: string, upload: DocumentUpload | null) => {
    setDocuments(prev => ({
      ...prev,
      [documentId]: upload
    }))
  }

  return (
    <MembershipContext.Provider value={{
      currentStep,
      stepStatuses,
      documents,
      updateStepStatus,
      goToNextStep,
      updateDocument
    }}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership() {
  const context = useContext(MembershipContext)
  if (!context) {
    throw new Error('useMembership must be used within a MembershipProvider')
  }
  return context
}