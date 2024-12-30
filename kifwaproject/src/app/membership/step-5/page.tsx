'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { StepIndicator } from '@/components/StepIndicator'
import { useMembership } from '@/contexts/membership-context'
import { X, Plus, Trash2 } from 'lucide-react'

interface Shareholder {
  id: number;
  name: string;
  kraPinNumber: string;
  nationality: string;
  shares: string;
}

const DEFAULT_SHAREHOLDER: Shareholder = {
  id: 1,
  name: '',
  kraPinNumber: '',
  nationality: '',
  shares: ''
};

export default function ShareholderDetailsStep() {
  const router = useRouter()
  const { companyDetails, updateCompanyDetails, saveProgress, setCurrentStep } = useMembership()
  const [hasShareholders, setHasShareholders] = useState<boolean>(false)
  const [shareholders, setShareholders] = useState<Shareholder[]>([DEFAULT_SHAREHOLDER])

  useEffect(() => {
    setCurrentStep(5)
  }, [setCurrentStep])

  const handleShareholderChange = (index: number, field: keyof Shareholder, value: string) => {
    const updatedShareholders = shareholders.map((shareholder, i) => {
      if (i === index) {
        return { ...shareholder, [field]: value }
      }
      return shareholder
    })
    setShareholders(updatedShareholders)
    updateCompanyDetails({ shareholders: updatedShareholders })
  }

  const addShareholder = () => {
    const newShareholder = {
      ...DEFAULT_SHAREHOLDER,
      id: shareholders.length + 1,
    }
    setShareholders([...shareholders, newShareholder])
  }

  const removeShareholder = (index: number) => {
    if (shareholders.length > 1) {
      const updatedShareholders = shareholders.filter((_, i) => i !== index)
      setShareholders(updatedShareholders)
      updateCompanyDetails({ shareholders: updatedShareholders })
    }
  }

  const handleNext = () => {
    saveProgress()
    router.push('/membership/step-6')
  }

  const handleBack = () => {
    saveProgress()
    router.push('/membership/step-4')
  }

  const handleCancel = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      saveProgress()
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shareholder/Partner Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            <StepIndicator currentStep={5} />
            
            <div className="flex-1 space-y-6">
              <div>
                <Label>Do you have any shareholder/partner?</Label>
                <RadioGroup
                  value={hasShareholders ? "yes" : "no"}
                  onValueChange={(value) => {
                    setHasShareholders(value === "yes")
                    if (value === "no") {
                      setShareholders([])
                      updateCompanyDetails({ shareholders: [] })
                    } else {
                      setShareholders([DEFAULT_SHAREHOLDER])
                      updateCompanyDetails({ shareholders: [DEFAULT_SHAREHOLDER] })
                    }
                  }}
                  className="flex gap-4 mt-2 [&_[data-state=checked]]:bg-blue-600 [&_[data-state=checked]]:border-blue-600"
                >
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

              {hasShareholders && (
                <>
                  {shareholders.map((shareholder, index) => (
                    <div key={shareholder.id} className="space-y-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Shareholder {index + 1}</h3>
                        {shareholders.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeShareholder(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Shareholder's Name</Label>
                          <Input
                            value={shareholder.name}
                            onChange={(e) => handleShareholderChange(index, 'name', e.target.value)}
                            placeholder="Enter Shareholder's Name"
                            className="focus:border-blue-600 focus:ring-blue-600"
                          />
                        </div>
                        <div>
                          <Label>KRA PIN Number</Label>
                          <Input
                            value={shareholder.kraPinNumber}
                            onChange={(e) => handleShareholderChange(index, 'kraPinNumber', e.target.value)}
                            placeholder="Enter KRA PIN Number"
                            className="focus:border-blue-600 focus:ring-blue-600"
                          />
                        </div>
                        <div>
                          <Label>Nationality</Label>
                          <Input
                            value={shareholder.nationality}
                            onChange={(e) => handleShareholderChange(index, 'nationality', e.target.value)}
                            placeholder="Enter Nationality"
                            className="focus:border-blue-600 focus:ring-blue-600"
                          />
                        </div>
                        <div>
                          <Label>Shares</Label>
                          <Input
                            value={shareholder.shares}
                            onChange={(e) => handleShareholderChange(index, 'shares', e.target.value)}
                            placeholder="Enter Number of Shares"
                            className="focus:border-blue-600 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addShareholder}
                    className="w-full text-blue-600 hover:bg-blue-50 hover:border-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-2 text-blue-600" />
                    Add another Shareholder
                  </Button>
                </>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                >
                  Previous Step
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    saveProgress()
                    router.push('/dashboard')
                  }}
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                >
                  Save Draft
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next Step
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}