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

interface Director {
  id: number;
  name: string;
  position: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
}

interface Shareholder {
  id: number;
  name: string;
  nationality: string;
  shares: string;
}

interface Referee {
  id: number;
  name: string;
  company: string;
  position: string;
  phoneNumber: string;
  email: string;
}

interface CompanyDetails {
  // Company Details
  companyName: string;
  kraPin: string;
  registrationNumber: string;
  registrationDate: string;
  businessType: string;
  authorizedCapital: string;
  paidUpCapital: string;
  
  // Physical Address
  physicalAddress: {
    town: string;
    streetRoad: string;
    building: string;
    floor: string;
    roomNumber: string;
    postalAddress: string;
    postalCode: string;
    telephone: string;
    mobile: string;
    email: string;
    website: string;
    isPrincipalPlace: boolean;
  };

  // Bankers
  bankers: {
    bankName: string;
    branch: string;
    town: string;
    accountNumber: string;
  };

  // Other fields...
  documents: {
    [key: string]: DocumentUpload | null;
  };
  directors: Director[];
  shareholders: Shareholder[];
  referees: Referee[];
  declaration: boolean;
}

interface MembershipContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  companyDetails: CompanyDetails;
  updateCompanyDetails: (details: Partial<CompanyDetails>) => void;
  saveProgress: () => void;
  resetForm: () => void;
  stepStatuses: { [key: number]: StepStatus };
}

const INITIAL_STATE: CompanyDetails = {
  // Company Details
  companyName: '',
  kraPin: '',
  registrationNumber: '',
  registrationDate: '',
  businessType: '',
  authorizedCapital: '',
  paidUpCapital: '',
  
  // Physical Address
  physicalAddress: {
    town: '',
    streetRoad: '',
    building: '',
    floor: '',
    roomNumber: '',
    postalAddress: '',
    postalCode: '',
    telephone: '',
    mobile: '',
    email: '',
    website: '',
    isPrincipalPlace: false,
  },

  // Bankers
  bankers: {
    bankName: '',
    branch: '',
    town: '',
    accountNumber: '',
  },

  // Other fields...
  documents: {
    'cr12': null,
    'cert-inc-1': null,
    'memo': null,
    'cert-inc-2': null,
    'tcc': null,
    'statements': null
  },
  directors: [],
  shareholders: [],
  referees: [],
  declaration: false
};

const MembershipContext = createContext<MembershipContextType | undefined>(undefined);

export function MembershipProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>(INITIAL_STATE)
  const [stepStatuses, setStepStatuses] = useState<{ [key: number]: StepStatus }>({
    1: { completed: false, active: true },
    2: { completed: false, active: false },
    3: { completed: false, active: false },
    4: { completed: false, active: false },
    5: { completed: false, active: false },
    6: { completed: false, active: false },
    7: { completed: false, active: false },
  });

  const updateCompanyDetails = (details: Partial<CompanyDetails>) => {
    setCompanyDetails(prev => ({ ...prev, ...details }))
  }

  const saveProgress = () => {
    localStorage.setItem('membershipProgress', JSON.stringify({
      step: currentStep,
      details: companyDetails,
    }))
  }

  const resetForm = () => {
    localStorage.removeItem('membershipProgress')
    setCurrentStep(1)
    setCompanyDetails(INITIAL_STATE)
  }

  return (
    <MembershipContext.Provider value={{
      currentStep,
      setCurrentStep,
      companyDetails,
      updateCompanyDetails,
      saveProgress,
      resetForm,
      stepStatuses
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