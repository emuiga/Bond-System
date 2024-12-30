'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { StepIndicator } from '@/components/StepIndicator'
import { useMembership } from '@/contexts/membership-context'
import { X, Plus, Trash2, Upload, Check } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface Director {
  id: number;
  name: string;
  position: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  kraPinNumber: string;
  kraPin: File | null;
  idPassport: File | null;
  experience: string;
  yearsClearing: string;
  yearsWarehousing: string;
  hasOtherExperience: boolean;
}

const DEFAULT_DIRECTOR: Director = {
  id: 1,
  name: '',
  position: '',
  idNumber: '',
  phoneNumber: '',
  email: '',
  kraPinNumber: '',
  kraPin: null,
  idPassport: null,
  experience: '',
  yearsClearing: '0',
  yearsWarehousing: '0',
  hasOtherExperience: false
};

const yearOptions = ['0-2', '3-5', '6-10', '10+']

export default function DirectorsDetailsStep() {
  const router = useRouter()
  const { companyDetails, updateCompanyDetails, saveProgress, setCurrentStep } = useMembership()
  const [directors, setDirectors] = useState<Director[]>([DEFAULT_DIRECTOR])

  useEffect(() => {
    setCurrentStep(3)
  }, [setCurrentStep])

  const handleDirectorChange = (index: number, field: keyof Director, value: any) => {
    const updatedDirectors = directors.map((director, i) => {
      if (i === index) {
        return { ...director, [field]: value }
      }
      return director
    })
    setDirectors(updatedDirectors)
    updateCompanyDetails({ directors: updatedDirectors })
  }

  const handleFileUpload = async (index: number, field: 'kraPin' | 'idPassport', file: File) => {
    handleDirectorChange(index, field, file)
  }

  const addDirector = () => {
    const newDirector = {
      ...DEFAULT_DIRECTOR,
      id: directors.length + 1,
    }
    setDirectors([...directors, newDirector])
  }

  const removeDirector = (index: number) => {
    if (directors.length > 1) {
      const updatedDirectors = directors.filter((_, i) => i !== index)
      setDirectors(updatedDirectors)
      updateCompanyDetails({ directors: updatedDirectors })
    }
  }

  const handleNext = () => {
    saveProgress()
    router.push('/membership/step-4')
  }

  const handleBack = () => {
    saveProgress()
    router.push('/membership/step-2')
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
          <CardTitle>Director's Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            <StepIndicator currentStep={3} />
            
            <div className="flex-1 space-y-6">
              {directors.map((director, index) => (
                <div key={director.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Director {index + 1}</h3>
                    {directors.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDirector(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Director's Name</Label>
                      <Input
                        value={director.name}
                        onChange={(e) => handleDirectorChange(index, 'name', e.target.value)}
                        placeholder="Enter Director's Name"
                      />
                    </div>
                    <div>
                      <Label>KRA PIN Number</Label>
                      <Input
                        value={director.kraPinNumber}
                        onChange={(e) => handleDirectorChange(index, 'kraPinNumber', e.target.value)}
                        placeholder="Enter Director's KRA PIN Number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>KRA PIN</Label>
                      <div
                        className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={async (e) => {
                          e.preventDefault()
                          const file = e.dataTransfer.files[0]
                          if (file) await handleFileUpload(index, 'kraPin', file)
                        }}
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = '.pdf,.jpg,.png'
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) await handleFileUpload(index, 'kraPin', file)
                          }
                          input.click()
                        }}
                      >
                        {!director.kraPin ? (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <div className="text-center">
                              <span className="text-blue-600 hover:underline cursor-pointer">
                                Click to upload
                              </span>
                              <span className="text-gray-500"> or drag and drop</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              SVG, PNG, JPG or GIF (max. 800×400px)
                            </span>
                          </div>
                        ) : (
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                                  PDF
                                </div>
                                <span className="text-sm">{director.kraPin.name}</span>
                              </div>
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <Progress
                              value={100}
                              className="mt-2"
                            />
                            <div className="mt-1 text-right text-xs text-gray-500">
                              100%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label>ID/Passport</Label>
                      <div
                        className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={async (e) => {
                          e.preventDefault()
                          const file = e.dataTransfer.files[0]
                          if (file) await handleFileUpload(index, 'idPassport', file)
                        }}
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = '.pdf,.jpg,.png'
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) await handleFileUpload(index, 'idPassport', file)
                          }
                          input.click()
                        }}
                      >
                        {!director.idPassport ? (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-6 w-6 text-gray-400" />
                            <div className="text-center">
                              <span className="text-blue-600 hover:underline cursor-pointer">
                                Click to upload
                              </span>
                              <span className="text-gray-500"> or drag and drop</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              SVG, PNG, JPG or GIF (max. 800×400px)
                            </span>
                          </div>
                        ) : (
                          <div className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                                  PDF
                                </div>
                                <span className="text-sm">{director.idPassport.name}</span>
                              </div>
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                            <Progress
                              value={100}
                              className="mt-2"
                            />
                            <div className="mt-1 text-right text-xs text-gray-500">
                              100%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Experience / Professional Qualifications</Label>
                    <Textarea
                      value={director.experience}
                      onChange={(e) => handleDirectorChange(index, 'experience', e.target.value)}
                      placeholder="Enter Experience / Professional Qualifications"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Years in Clearing and Forwarding</Label>
                      <Select
                        value={director.yearsClearing}
                        onValueChange={(value) => handleDirectorChange(index, 'yearsClearing', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose years" />
                        </SelectTrigger>
                        <SelectContent>
                          {yearOptions.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year} years
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Years in Warehousing</Label>
                      <Select
                        value={director.yearsWarehousing}
                        onValueChange={(value) => handleDirectorChange(index, 'yearsWarehousing', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose years" />
                        </SelectTrigger>
                        <SelectContent>
                          {yearOptions.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year} years
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Does the director have any other relevant experience?</Label>
                    <RadioGroup
                      value={director.hasOtherExperience ? "yes" : "no"}
                      onValueChange={(value) => handleDirectorChange(index, 'hasOtherExperience', value === "yes")}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`yes-${index}`} />
                        <Label htmlFor={`yes-${index}`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`no-${index}`} />
                        <Label htmlFor={`no-${index}`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addDirector}
                className="w-full text-blue-600 hover:bg-blue-50 hover:border-blue-600"
              >
                <Plus className="h-4 w-4 mr-2 text-blue-600" />
                Add Another Director
              </Button>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={handleBack}>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

