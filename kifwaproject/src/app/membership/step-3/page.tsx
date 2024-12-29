'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, Check, X } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'

export default function DirectorsDetailsStep() {
  const { 
    stepStatuses, 
    documents: uploadedDocuments, 
    updateDocument, 
    goToNextStep 
  } = useMembership()

  const handleFileUpload = async (documentId: string, file: File) => {
    updateDocument(documentId, {
      name: file.name,
      progress: 0,
      uploaded: false,
      file
    })

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      updateDocument(documentId, {
        name: file.name,
        progress,
        uploaded: progress === 100,
        file
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent, documentId: string) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      await handleFileUpload(documentId, file)
    }
  }

  const steps = [
    { number: 1, title: 'Company Details' },
    { number: 2, title: 'Attach Company Documents' },
    { number: 3, title: 'Directors\' Details' },
    { number: 4, title: 'Staff\'s Details' },
    { number: 5, title: 'Shareholder/Partner Details' },
    { number: 6, title: 'Referees and Declaration' },
    { number: 7, title: 'Make Payment' }
  ]

  const yearOptions = Array.from({ length: 21 }, (_, i) => i.toString())

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Membership Application</CardTitle>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex gap-8">
          {/* Steps Sidebar */}
          <div className="w-64 shrink-0">
            <div className="space-y-1">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-3 rounded-lg p-3 text-sm ${
                    stepStatuses[step.number]?.active ? 'bg-blue-50 text-blue-600' :
                    stepStatuses[step.number]?.completed ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    stepStatuses[step.number]?.completed ? 'bg-blue-600 text-white' :
                    stepStatuses[step.number]?.active ? 'border-2 border-blue-600 text-blue-600' :
                    'border-2 border-gray-300'
                  }`}>
                    {stepStatuses[step.number]?.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Step {step.number}</span>
                    <span className="text-xs">{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="mb-6 text-xl font-semibold">Director's Details</h2>
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="director-name">Director's Name</Label>
                  <Input 
                    id="director-name" 
                    placeholder="Enter Director's Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kra-pin">KRA PIN Number</Label>
                  <Input 
                    id="kra-pin" 
                    placeholder="Enter Director's KRA PIN Number"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* KRA PIN Upload */}
                <div className="space-y-2">
                  <Label>KRA PIN</Label>
                  {!uploadedDocuments['kra-pin'] ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'kra-pin')}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400"
                    >
                      <Upload className="mb-2 h-6 w-6 text-gray-400" />
                      <div className="text-center">
                        <button
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = '.pdf,.jpg,.jpeg,.png'
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                await handleFileUpload('kra-pin', file)
                              }
                            }
                            input.click()
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Click to upload
                        </button>
                        <span className="text-gray-500"> or drag and drop</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. 800KB)
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                            PDF
                          </div>
                          <span className="text-sm">{uploadedDocuments['kra-pin'].name}</span>
                        </div>
                        {uploadedDocuments['kra-pin'].uploaded && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <Progress
                        value={uploadedDocuments['kra-pin'].progress}
                        className="mt-2"
                      />
                      <div className="mt-1 text-right text-xs text-gray-500">
                        {uploadedDocuments['kra-pin'].progress}%
                      </div>
                    </div>
                  )}
                </div>

                {/* ID/Passport Upload */}
                <div className="space-y-2">
                  <Label>ID/Passport</Label>
                  {!uploadedDocuments['id-passport'] ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'id-passport')}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400"
                    >
                      <Upload className="mb-2 h-6 w-6 text-gray-400" />
                      <div className="text-center">
                        <button
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = '.pdf,.jpg,.jpeg,.png'
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                await handleFileUpload('id-passport', file)
                              }
                            }
                            input.click()
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Click to upload
                        </button>
                        <span className="text-gray-500"> or drag and drop</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. 800KB)
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                            PDF
                          </div>
                          <span className="text-sm">{uploadedDocuments['id-passport'].name}</span>
                        </div>
                        {uploadedDocuments['id-passport'].uploaded && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <Progress
                        value={uploadedDocuments['id-passport'].progress}
                        className="mt-2"
                      />
                      <div className="mt-1 text-right text-xs text-gray-500">
                        {uploadedDocuments['id-passport'].progress}%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience / Professional Qualifications</Label>
                <Textarea 
                  id="experience" 
                  placeholder="Enter Experience / Professional Qualifications"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clearing-years">Years in Clearing and Forwarding</Label>
                  <Select>
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

                <div className="space-y-2">
                  <Label htmlFor="warehousing-years">Years in Warehousing</Label>
                  <Select>
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

              <div className="space-y-2">
                <Label>Does the director have any other relevant experience?</Label>
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
              <Button variant="outline">Save Draft</Button>
              <Button onClick={goToNextStep}>Save and Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

