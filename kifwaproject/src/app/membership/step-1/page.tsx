'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, X } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'

interface CompanyDetails {
  companyName: string
  kraPin: string
  registrationNumber: string
  authorizedCapital: string
  paidUpCapital: string
  town: string
  streetRoad: string
  building: string
  floor: string
  isPrincipalPlace: boolean
  bankBranch: string
  bankTown: string
}

export default function CompanyDetailsStep() {
  const { 
    stepStatuses, 
    goToNextStep 
  } = useMembership()

  const [details, setDetails] = useState<CompanyDetails>({
    companyName: '',
    kraPin: '',
    registrationNumber: '',
    authorizedCapital: '',
    paidUpCapital: '',
    town: '',
    streetRoad: '',
    building: '',
    floor: '',
    isPrincipalPlace: false,
    bankBranch: '',
    bankTown: ''
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

  const handleInputChange = (field: keyof CompanyDetails, value: string | boolean) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

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
            <h2 className="mb-6 text-xl font-semibold">Company Details</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company/Firm Name</Label>
                <Input 
                  id="company-name"
                  value={details.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter Company Name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="kra-pin">KRA PIN Number</Label>
                  <Input 
                    id="kra-pin"
                    value={details.kraPin}
                    onChange={(e) => handleInputChange('kraPin', e.target.value)}
                    placeholder="Enter KRA PIN Number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-number">Registration Certificate Number</Label>
                  <Input 
                    id="reg-number"
                    value={details.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="Enter Registration Number Number"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="authorized-capital">Authorised Capital</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Ksh</span>
                    <Input 
                      id="authorized-capital"
                      value={details.authorizedCapital}
                      onChange={(e) => handleInputChange('authorizedCapital', e.target.value)}
                      className="pl-12"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paid-capital">Paid Up Capital</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Ksh</span>
                    <Input 
                      id="paid-capital"
                      value={details.paidUpCapital}
                      onChange={(e) => handleInputChange('paidUpCapital', e.target.value)}
                      className="pl-12"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-medium">Physical Address</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="town">Town</Label>
                    <Input 
                      id="town"
                      value={details.town}
                      onChange={(e) => handleInputChange('town', e.target.value)}
                      placeholder="Enter Town"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street">Street/Road</Label>
                    <Input 
                      id="street"
                      value={details.streetRoad}
                      onChange={(e) => handleInputChange('streetRoad', e.target.value)}
                      placeholder="Enter Street/Road"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="building">Building</Label>
                    <Input 
                      id="building"
                      value={details.building}
                      onChange={(e) => handleInputChange('building', e.target.value)}
                      placeholder="Enter Building"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input 
                      id="floor"
                      value={details.floor}
                      onChange={(e) => handleInputChange('floor', e.target.value)}
                      placeholder="Enter Floor"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox 
                    id="principal"
                    checked={details.isPrincipalPlace}
                    onCheckedChange={(checked: boolean) => handleInputChange('isPrincipalPlace', checked as boolean)}
                  />
                  <Label htmlFor="principal">This address is also my principal place of business</Label>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-medium">Bankers</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bank-branch">Branch</Label>
                    <Input 
                      id="bank-branch"
                      value={details.bankBranch}
                      onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                      placeholder="Enter Branch"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bank-town">Town</Label>
                    <Input 
                      id="bank-town"
                      value={details.bankTown}
                      onChange={(e) => handleInputChange('bankTown', e.target.value)}
                      placeholder="Enter Town"
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