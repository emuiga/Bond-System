'use client';

import { useMembership } from '@/contexts/membership-context';

interface StepIndicatorProps {
  currentStep: number;
}

export const steps = [
  { number: 1, title: 'Company Details' },
  { number: 2, title: 'Attach Company Documents' },
  { number: 3, title: "Directors' Details" },
  { number: 4, title: "Staff's Details" },
  { number: 5, title: 'Shareholder/Partner Details' },
  { number: 6, title: 'Referees and Declaration' },
  { number: 7, title: 'Make Payment' }
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { setCurrentStep } = useMembership();

  return (
    <div className="w-64 shrink-0">
      <div className="space-y-1">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => setCurrentStep(step.number)}
            className={`w-full flex items-center gap-3 rounded-lg p-3 text-sm ${
              step.number === currentStep 
                ? 'bg-blue-50 text-blue-600' 
                : step.number < currentStep
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              step.number === currentStep
                ? 'border-2 border-blue-600 text-blue-600'
                : step.number < currentStep
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300'
            }`}>
              {step.number}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium">Step {step.number}</span>
              <span className="text-xs">{step.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 