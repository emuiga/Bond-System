'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { StepIndicator } from '@/components/StepIndicator'
import { useMembership } from '@/contexts/membership-context'
import { X, Plus, Trash2 } from 'lucide-react'

interface Referee {
  id: number
  name: string
  company: string
  position: string
  phoneNumber: string
  email: string
}

const DEFAULT_REFEREE: Referee = {
  id: 1,
  name: '',
  company: '',
  position: '',
  phoneNumber: '',
  email: ''
}

export default function RefereesDeclarationStep() {
  const router = useRouter()
  const { companyDetails, updateCompanyDetails, saveProgress, setCurrentStep } = useMembership()
  const [referees, setReferees] = useState<Referee[]>([DEFAULT_REFEREE])
  const [declaration, setDeclaration] = useState(false)

  useEffect(() => {
    setCurrentStep(6)
  }, [setCurrentStep])

  const handleRefereeChange = (index: number, field: string, value: string) => {
    const updatedReferees = referees.map((referee, i) => {
      if (i === index) {
        return { ...referee, [field]: value }
      }
      return referee
    })
    setReferees(updatedReferees)
    updateCompanyDetails({ referees: updatedReferees })
  }

  const addReferee = () => {
    const newReferee = {
      id: referees.length + 1,
      name: '',
      company: '',
      position: '',
      phoneNumber: '',
      email: ''
    }
    setReferees([...referees, newReferee])
  }

  const removeReferee = (index: number) => {
    if (referees.length > 1) {
      const updatedReferees = referees.filter((_, i) => i !== index)
      setReferees(updatedReferees)
      updateCompanyDetails({ referees: updatedReferees })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Referees and Declaration</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex gap-8">
          <StepIndicator currentStep={6} />
          
          <div className="flex-1 space-y-6">
            {referees.map((referee, index) => (
              <div key={referee.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Referee {index + 1}</h3>
                  {referees.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeReferee(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      value={referee.name}
                      onChange={(e) => handleRefereeChange(index, 'name', e.target.value)}
                      placeholder="Enter referee's name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company</label>
                    <Input
                      value={referee.company}
                      onChange={(e) => handleRefereeChange(index, 'company', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <Input
                      value={referee.position}
                      onChange={(e) => handleRefereeChange(index, 'position', e.target.value)}
                      placeholder="Enter position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input
                      value={referee.phoneNumber}
                      onChange={(e) => handleRefereeChange(index, 'phoneNumber', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    value={referee.email}
                    onChange={(e) => handleRefereeChange(index, 'email', e.target.value)}
                    placeholder="Enter email address"
                    type="email"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addReferee}
              className="w-full text-blue-600 hover:bg-blue-50 hover:border-blue-600"
            >
              <Plus className="h-4 w-4 mr-2 text-blue-600" />
              Add Another Referee
            </Button>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-medium">Declaration</h3>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="declaration" 
                  checked={declaration}
                  onCheckedChange={(checked) => {
                    setDeclaration(checked as boolean)
                    updateCompanyDetails({ declaration: checked as boolean })
                  }}
                />
                <label htmlFor="declaration" className="text-sm">
                  I declare that the information provided is true and accurate to the best of my knowledge.
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => {
                saveProgress()
                router.push('/membership/step-5')
              }}>
                Previous Step
              </Button>
              <Button variant="outline" onClick={() => {
                saveProgress()
                router.push('/dashboard')
              }}>
                Save Draft
              </Button>
              <Button 
                onClick={() => {
                  saveProgress()
                  router.push('/membership/step-7')
                }}
                disabled={!declaration}
              >
                Next Step
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}