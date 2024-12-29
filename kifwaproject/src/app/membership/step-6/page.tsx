'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'

interface RefereeDetails {
  name: string
  company: string
  address: string
  phone: string
}

export default function RefereesDeclarationStep() {
  const { 
    stepStatuses, 
    goToNextStep 
  } = useMembership()

  const [proposer, setProposer] = useState<RefereeDetails>({
    name: '',
    company: '',
    address: '',
    phone: ''
  })

  const [seconder, setSeconder] = useState<RefereeDetails>({
    name: '',
    company: '',
    address: '',
    phone: ''
  })

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
            <h2 className="mb-2 text-xl font-semibold">Referees and Declaration</h2>
            <p className="mb-6 text-sm text-gray-500">
              Give two Directors or Sole Proprietors from member organisations.
            </p>

            <div className="space-y-8">
              {/* Proposer Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Proposer</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="proposer-name">Name</Label>
                    <Input 
                      id="proposer-name"
                      value={proposer.name}
                      onChange={(e) => setProposer({...proposer, name: e.target.value})}
                      placeholder="Enter proposer's name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposer-company">Company</Label>
                    <Input 
                      id="proposer-company"
                      value={proposer.company}
                      onChange={(e) => setProposer({...proposer, company: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposer-address">Address</Label>
                    <Input 
                      id="proposer-address"
                      value={proposer.address}
                      onChange={(e) => setProposer({...proposer, address: e.target.value})}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposer-phone">Phone</Label>
                    <Input 
                      id="proposer-phone"
                      value={proposer.phone}
                      onChange={(e) => setProposer({...proposer, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Seconder Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Seconder</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="seconder-name">Name</Label>
                    <Input 
                      id="seconder-name"
                      value={seconder.name}
                      onChange={(e) => setSeconder({...seconder, name: e.target.value})}
                      placeholder="Enter seconder's name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seconder-company">Company</Label>
                    <Input 
                      id="seconder-company"
                      value={seconder.company}
                      onChange={(e) => setSeconder({...seconder, company: e.target.value})}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seconder-address">Address</Label>
                    <Input 
                      id="seconder-address"
                      value={seconder.address}
                      onChange={(e) => setSeconder({...seconder, address: e.target.value})}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seconder-phone">Phone</Label>
                    <Input 
                      id="seconder-phone"
                      value={seconder.phone}
                      onChange={(e) => setSeconder({...seconder, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
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