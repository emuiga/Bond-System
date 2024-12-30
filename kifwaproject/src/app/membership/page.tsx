'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useKeycloakUser } from '@/app/hooks/useKeycloakUser'

export default function MembershipWelcome() {
  const router = useRouter()
  const { displayName } = useKeycloakUser()
  
  const handleStart = () => {
    router.push('/membership/step-1')
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <Card className="max-w-4xl w-full overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src="/shipping-containers.jpg" 
              alt="Shipping containers" 
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold">Membership Application</h2>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-gray-600">Hey {displayName},</p>
              
              <p className="text-gray-600">
                Becoming a member of our Association means joining a network of 
                excellence and professionalism. To get started, we'll need a few 
                details from you—and just one small step to confirm your commitment!
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">💳 Application Fee: Ksh. 12,000</p>
                <p className="text-sm text-gray-600 mt-1">
                  This one-time fee helps cover your membership registration and 
                  supports the work of the Association.
                </p>
              </div>
              
              <p className="text-sm text-gray-600">
                By proceeding, you agree to abide by our Rules & Regulations, by-laws, 
                and Code of Conduct. Don't worry—you can save your progress and come 
                back to complete the form anytime.
              </p>
              
              <p className="font-medium">👉 Ready to join? Let's begin!</p>
              
              <Button 
                onClick={handleStart}
                className="w-full"
              >
                Let's go
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

