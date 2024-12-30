'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { StepIndicator } from '@/components/StepIndicator'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

interface FormData {
  companyName: string;
  kraPin: string;
  regNumber: string;
  authorisedCapital: string;
  paidUpCapital: string;
  town: string;
  streetRoad: string;
  building: string;
  floor: string;
  isPrincipalPlace: boolean;
  bankBranch: string;
  bankTown: string;
}

const initialFormData: FormData = {
  companyName: '',
  kraPin: '',
  regNumber: '',
  authorisedCapital: '',
  paidUpCapital: '',
  town: '',
  streetRoad: '',
  building: '',
  floor: '',
  isPrincipalPlace: false,
  bankBranch: '',
  bankTown: '',
};

export default function Step1() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    
    if (!formData.kraPin.trim()) {
      newErrors.kraPin = 'KRA PIN is required'
    } else if (!/^[A-Z][0-9]{9}[A-Z]$/.test(formData.kraPin)) {
      newErrors.kraPin = 'Invalid KRA PIN format'
    }
    
    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Registration number is required'
    }
    
    if (!formData.authorisedCapital.trim()) {
      newErrors.authorisedCapital = 'Authorised capital is required'
    } else if (isNaN(formData.authorisedCapital)) {
      newErrors.authorisedCapital = 'Must be a valid number'
    }
    
    if (!formData.paidUpCapital.trim()) {
      newErrors.paidUpCapital = 'Paid up capital is required'
    } else if (isNaN(formData.paidUpCapital)) {
      newErrors.paidUpCapital = 'Must be a valid number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSaveDraft = async () => {
    try {
      // Save to local storage for now - replace with API call
      localStorage.setItem('membershipStep1Draft', JSON.stringify(formData))
      toast({
        title: "Draft saved",
        description: "Your progress has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error saving draft",
        description: "There was a problem saving your progress.",
        variant: "destructive",
      })
    }
  }

  const handleNext = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Save data (replace with your API call)
      localStorage.setItem('membershipStep1', JSON.stringify(formData))
      router.push('/membership/step-2')
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Load draft data on mount
  useState(() => {
    const savedDraft = localStorage.getItem('membershipStep1Draft')
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mx-auto max-w-6xl">
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            <StepIndicator currentStep={1} />
            
            <div className="flex-1 space-y-6">
              <div>
                <Label htmlFor="companyName">
                  Company/Firm Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={errors.companyName ? "border-red-500" : ""}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kraPin">
                    KRA PIN Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="kraPin"
                    name="kraPin"
                    placeholder="Enter KRA PIN Number"
                    value={formData.kraPin}
                    onChange={handleInputChange}
                    className={errors.kraPin ? "border-red-500" : ""}
                  />
                  {errors.kraPin && (
                    <p className="text-red-500 text-sm mt-1">{errors.kraPin}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="regNumber">
                    Registration Certificate Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="regNumber"
                    name="regNumber"
                    placeholder="Enter Registration Number"
                    value={formData.regNumber}
                    onChange={handleInputChange}
                    className={errors.regNumber ? "border-red-500" : ""}
                  />
                  {errors.regNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.regNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authorisedCapital">
                    Authorised Capital <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="authorisedCapital"
                    name="authorisedCapital"
                    placeholder="Ksh"
                    value={formData.authorisedCapital}
                    onChange={handleInputChange}
                    className={errors.authorisedCapital ? "border-red-500" : ""}
                  />
                  {errors.authorisedCapital && (
                    <p className="text-red-500 text-sm mt-1">{errors.authorisedCapital}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="paidUpCapital">
                    Paid Up Capital <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="paidUpCapital"
                    name="paidUpCapital"
                    placeholder="Ksh"
                    value={formData.paidUpCapital}
                    onChange={handleInputChange}
                    className={errors.paidUpCapital ? "border-red-500" : ""}
                  />
                  {errors.paidUpCapital && (
                    <p className="text-red-500 text-sm mt-1">{errors.paidUpCapital}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Physical Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="town">Town</Label>
                    <Input
                      id="town"
                      name="town"
                      placeholder="Enter Town"
                      value={formData.town}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="streetRoad">Street/Road</Label>
                    <Input
                      id="streetRoad"
                      name="streetRoad"
                      placeholder="Enter Street/Road"
                      value={formData.streetRoad}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="building">Building</Label>
                    <Input
                      id="building"
                      name="building"
                      placeholder="Enter Building"
                      value={formData.building}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="floor">Floor</Label>
                    <Input
                      id="floor"
                      name="floor"
                      placeholder="Enter Floor"
                      value={formData.floor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="isPrincipalPlace"
                    checked={formData.isPrincipalPlace}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({...prev, isPrincipalPlace: checked}))
                    }
                  />
                  <Label htmlFor="isPrincipalPlace">
                    This address is also my principal place of business
                  </Label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Bankers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankBranch">Branch</Label>
                    <Input
                      id="bankBranch"
                      name="bankBranch"
                      placeholder="Enter Branch"
                      value={formData.bankBranch}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bankTown">Town</Label>
                    <Input
                      id="bankTown"
                      name="bankTown"
                      placeholder="Enter Town"
                      value={formData.bankTown}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Next Step"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}