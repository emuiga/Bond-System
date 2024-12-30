'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { StepIndicator } from '@/components/StepIndicator'
import { useMembership } from '@/contexts/membership-context'
import { X, AlertCircle, Loader2, Check } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export default function PaymentStep() {
  const router = useRouter()
  const { setCurrentStep, saveProgress } = useMembership()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState<string>('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    setCurrentStep(7)
  }, [setCurrentStep])

  const handleSendPrompt = async () => {
    // Implement M-PESA prompt functionality
    console.log('Sending M-PESA prompt to:', phoneNumber)
  }

  const handleCheckPayment = async () => {
    setIsChecking(true)
    
    // Simulate payment verification steps
    const checkingSteps = [
      { message: "Checking Payment...", duration: 1000 },
      { message: "Verifying Transaction...", duration: 1500 },
      { message: "Confirming Details...", duration: 1500 },
      { message: "Payment Confirmed!", duration: 1000 }
    ]

    for (const step of checkingSteps) {
      setCheckingStatus(step.message)
      await new Promise(resolve => setTimeout(resolve, step.duration))
    }

    // After all checks are complete
    setTimeout(() => {
      setIsChecking(false)
      setCheckingStatus('')
      setShowSuccessModal(true)
    }, 1000)
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
          <CardTitle>Make Payment</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            <StepIndicator currentStep={7} />
            
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Make Payment</h2>
                <p className="text-gray-600 mt-1">Pay your membership fee via M-PESA.</p>
              </div>

              <Alert className="bg-orange-50 border-orange-200">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-600">
                  Once you pay, click 'check payment' to proceed.
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Annual Membership Fee</span>
                  <span className="font-semibold">Ksh. 12,000.00</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter Phone Number to receive an M-PESA Prompt"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleSendPrompt}
                    className="whitespace-nowrap"
                  >
                    Send Prompt
                  </Button>
                </div>

                <div className="text-center">OR</div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-medium">Lipa na Mpesa</h3>
                  <div className="space-y-1 text-sm">
                    <p>Paybill: 412346</p>
                    <p>Account: 412346</p>
                    <p>Amount: Ksh. 12,000</p>
                  </div>
                </div>
              </div>

              {isChecking && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 space-y-4 max-w-sm w-full mx-4">
                    <div className="flex items-center justify-center space-x-3">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                      <span className="text-lg font-medium">{checkingStatus}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                        style={{ 
                          width: checkingStatus.includes("Confirmed") ? "100%" : "60%",
                          transition: "width 0.5s ease-in-out"
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    saveProgress()
                    router.push('/membership/step-6')
                  }}
                  disabled={isChecking}
                >
                  Previous Step
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    saveProgress()
                    router.push('/dashboard')
                  }}
                  disabled={isChecking}
                >
                  Save Draft
                </Button>
                <Button 
                  onClick={handleCheckPayment}
                  disabled={isChecking}
                  className="min-w-[140px]"
                >
                  {isChecking ? "Checking..." : "Check Payment"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Membership Application Submitted</DialogTitle>
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-center">
              Membership Application has been submitted.
            </h2>
            <p className="text-gray-600 text-center">
              We will review your membership application and get back to you within 7 days.
            </p>
            <Button 
              className="w-full"
              onClick={() => {
                setShowSuccessModal(false)
                router.push('/dashboard')
              }}
            >
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 