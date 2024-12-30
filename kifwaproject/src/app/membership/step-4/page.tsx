'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, Plus } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { StepIndicator } from '@/components/StepIndicator'

export default function StaffDetailsStep() {
  const { 
    companyDetails, 
    updateCompanyDetails, 
    saveProgress, 
    setCurrentStep 
  } = useMembership()
  const router = useRouter()

  useEffect(() => {
    setCurrentStep(4)
  }, [setCurrentStep])

  const handleNext = () => {
    saveProgress()
    router.push('/membership/step-5')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Staff Details</CardTitle>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex gap-8">
          <StepIndicator currentStep={4} />
          
          <div className="flex-1">
            <h2 className="mb-6 text-xl font-semibold">Staff Details</h2>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="staff-count">Number of Staff Employed</Label>
                  <Input 
                    id="staff-count"
                    type="number"
                    placeholder="Enter number of staff employed"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certified-staff">Number of Staff with EACFFC Certificates</Label>
                  <Input 
                    id="certified-staff"
                    type="number"
                    placeholder="Enter number with EACFFC Certificates"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Do any of your staff have any other relevant experience?</Label>
                <RadioGroup defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => {
                saveProgress()
                router.push('/membership/step-3')
              }}>
                Previous Step
              </Button>
              <Button variant="outline" onClick={() => {
                saveProgress()
                router.push('/dashboard')
              }}>
                Save Draft
              </Button>
              <Button onClick={handleNext}>Next Step</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

