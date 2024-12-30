'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Check, X } from 'lucide-react'
import { useMembership } from '@/contexts/membership-context'
import { StepIndicator } from '@/components/StepIndicator'
import { useRouter } from 'next/navigation'

const documents = [
  {
    id: 'cr12',
    title: 'CR12',
    fileType: 'PDF',
    maxSize: '800KB',
  },
  {
    id: 'cert-inc-1',
    title: 'Certificate of Incorporation',
    fileType: 'PDF',
    maxSize: '800KB',
  },
  {
    id: 'memo',
    title: 'Memorandum and Article of Association',
    fileType: 'PDF',
    maxSize: '800KB',
  },
  {
    id: 'cert-inc-2',
    title: 'Certificate of Incorporation',
    fileType: 'PDF',
    maxSize: '800KB',
  },
  {
    id: 'tcc',
    title: 'TCC',
    fileType: 'PDF',
    maxSize: '800KB',
  },
  {
    id: 'statements',
    title: 'Audited Statements',
    fileType: 'PDF',
    maxSize: '800KB',
  }
]

const steps = [
  { number: 1, title: 'Company Details' },
  { number: 2, title: 'Attach Company Documents' },
  { number: 3, title: 'Directors\' Details' },
  { number: 4, title: 'Staff\'s Details' },
  { number: 5, title: 'Shareholder/Partner Details' },
  { number: 6, title: 'Referees and Declaration' },
  { number: 7, title: 'Make Payment' }
]

export default function DocumentUploadStep() {
  const router = useRouter();
  const { 
    stepStatuses,
    companyDetails,
    updateCompanyDetails,
    saveProgress,
    setCurrentStep
  } = useMembership();

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const handleCancel = () => {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
      saveProgress();
      router.push('/dashboard');
    }
  };

  const handlePrevious = () => {
    saveProgress();
    router.push('/membership/step-1');
  };

  const handleNext = () => {
    saveProgress();
    router.push('/membership/step-3');
  };

  const handleFileUpload = async (documentId: string, file: File) => {
    const newDocuments = { ...companyDetails.documents }
    newDocuments[documentId] = {
      name: file.name,
      progress: 0,
      uploaded: false,
      file
    }
    updateCompanyDetails({ documents: newDocuments })

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      newDocuments[documentId] = {
        name: file.name,
        progress,
        uploaded: progress === 100,
        file
      }
      updateCompanyDetails({ documents: newDocuments })
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

  const allDocumentsUploaded = documents.every(
    doc => companyDetails.documents[doc.id]?.uploaded
  )

  useEffect(() => {
    if (allDocumentsUploaded) {
      const timer = setTimeout(saveProgress, 1000)
      return () => clearTimeout(timer)
    }
  }, [allDocumentsUploaded, saveProgress])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mx-auto max-w-6xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Attach Company Documents</CardTitle>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex gap-8">
          <StepIndicator currentStep={2} />
          
          {/* Main Content */}
          <div className="flex-1">
            <h2 className="mb-6 text-xl font-semibold">Attach Company Documents</h2>
            <div className="grid grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="space-y-2"
                >
                  <div className="text-sm font-medium">{doc.title}</div>
                  {!companyDetails.documents[doc.id] ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, doc.id)}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400"
                    >
                      <Upload className="mb-2 h-6 w-6 text-gray-400" />
                      <div className="text-center">
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          Click to upload
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. {doc.maxSize})
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded bg-red-100 px-2 py-1 text-xs text-red-600">
                            {doc.fileType}
                          </div>
                          <span className="text-sm">{companyDetails.documents[doc.id]?.name}</span>
                        </div>
                        {companyDetails.documents[doc.id]?.uploaded && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <Progress
                        value={companyDetails.documents[doc.id]?.progress}
                        className="mt-2"
                      />
                      <div className="mt-1 text-right text-xs text-gray-500">
                        {companyDetails.documents[doc.id]?.progress}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={handlePrevious}>
                Previous Step
              </Button>
              <Button variant="outline" onClick={() => {
                saveProgress();
                router.push('/dashboard');
              }}>
                Save Draft
              </Button>
              <Button 
                onClick={handleNext}
                // disabled={!allDocumentsUploaded}
              >
                Next Step
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}