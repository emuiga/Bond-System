'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Plus, X } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'

interface Shareholder {
  id: string
  name: string
  kraPin: string
}

export default function ShareholderDetailsStep() {
  const { 
    stepStatuses, 
    goToNextStep 
  } = useMembership()

  const [hasShareholders, setHasShareholders] = useState<string>("no")
  const [shareholders, setShareholders] = useState<Shareholder[]>([])

  const addShareholder = () => {
    setShareholders([...shareholders, { 
      id: `shareholder-${shareholders.length + 1}`,
      name: '',
      kraPin: ''
    }])
  }

  const updateShareholder = (id: string, field: keyof Shareholder, value: string) => {
    setShareholders(shareholders.map(sh => 
      sh.id === id ? { ...sh, [field]: value } : sh
    ))
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
            <h2 className="mb-6 text-xl font-semibold">Shareholder/Partner Details</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Do you have any shareholder/partner?</Label>
                <RadioGroup 
                  value={hasShareholders} 
                  onValueChange={(value) => {
                    setHasShareholders(value)
                    if (value === 'yes' && shareholders.length === 0) {
                      addShareholder()
                    }
                  }}
                  className="flex gap-4"
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

              {hasShareholders === 'yes' && (
                <div className="space-y-4">
                  {shareholders.map((shareholder) => (
                    <div key={shareholder.id} className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`${shareholder.id}-name`}>Shareholder's Name</Label>
                        <Input 
                          id={`${shareholder.id}-name`}
                          value={shareholder.name}
                          onChange={(e) => updateShareholder(shareholder.id, 'name', e.target.value)}
                          placeholder="Enter shareholder's name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${shareholder.id}-kra`}>KRA PIN Number</Label>
                        <Input 
                          id={`${shareholder.id}-kra`}
                          value={shareholder.kraPin}
                          onChange={(e) => updateShareholder(shareholder.id, 'kraPin', e.target.value)}
                          placeholder="Enter KRA PIN number"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex items-center gap-2 text-blue-600"
                    onClick={addShareholder}
                  >
                    <Plus className="h-4 w-4" />
                    Add another Shareholder
                  </Button>
                </div>
              )}
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