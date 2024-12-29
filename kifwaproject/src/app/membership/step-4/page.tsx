'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, X } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'

export default function StaffDetailsStep() {
  const { 
    stepStatuses, 
    goToNextStep 
  } = useMembership()

  const steps = [
    { number: 1, title: 'Company Details' },
    { number: 2, title: 'Attach Company Documents' },
    { number: 3, title: 'Directors\' Details' },
    { number: 4, title: 'Staff\'s Details' },
    { number: 5, title: 'Shareholder/Partner Details' },
    { number: 6, title: 'Referees and Declaration' },
    { number: 7, title: 'Make Payment' }
  ]

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
              <Button variant="outline">Save Draft</Button>
              <Button onClick={goToNextStep}>Save and Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

