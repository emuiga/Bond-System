'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useKeycloakUser } from '@/app/hooks/useKeycloakUser';

const DashboardPage = () => {
  const router = useRouter();
  const { displayName } = useKeycloakUser();
  
  const handleProfileClick = () => {
    router.push('/membership');
  };

  const metrics = [
    {
      title: "Total Bonds Issued",
      value: "0",
      info: "Total number of bonds issued through the platform"
    },
    {
      title: "Payments Made This Month",
      value: "0",
      info: "Sum of all payments processed in the current month"
    },
    {
      title: "Pending Tasks",
      value: "0",
      info: "Number of tasks requiring your attention"
    }
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Hello {displayName}</h1>
        <p className="text-gray-600 text-sm">
          Easily manage your bonds, payments, certifications, and compliance all in one place.
        </p>
      </div>

      {/* Profile Completion Alert */}
      <div className="bg-blue-200 p-4 rounded-lg mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <User className="h-5 w-5" />
          <div>
            <h3 className="font-medium">Complete Your Profile</h3>
            <p className="text-sm">Fill in your details to start using the platform</p>
          </div>
        </div>
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleProfileClick}
        >
          Complete Profile
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <h3 className="font-medium text-sm text-gray-600">{metric.title}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Info size={16} />
              </button>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Welcome Card */}
      <Card className="text-center py-12">
        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">You're almost there!</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
            Finish setting up your account to access all features, including bond management,
            payments, and document uploads.
          </p>
          
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleProfileClick}
          >
            Complete Your Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;