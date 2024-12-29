'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Check, X } from 'lucide-react'

interface FileUpload {
  name: string
  progress: number
  uploaded: boolean
  file?: File
}

interface DocumentSection {
  id: string
  title: string
  fileType: string
  maxSize: string
  upload: FileUpload | null
}

export default function MembershipApplication() {
  const [documents, setDocuments] = useState<DocumentSection[]>([
    {
      id: 'cr12',
      title: 'CR12',
      fileType: 'PDF',
      maxSize: '800KB',
      upload: null
    },
    {
      id: 'cert-inc-1',
      title: 'Certificate of Incorporation',
      fileType: 'PDF',
      maxSize: '800KB',
      upload: null
    },
    {
      id: 'memo',
      title: 'Memorandum and Article of Association',
      fileType: 'PDF',
      maxSize: '800KB',
      upload: null
    },
    {
      id: 'cert-inc-2',
      title: 'Certificate of Incorporation',
      fileType: 'PDF',
      maxSize: '800KB',
      upload: null
    },
    {
      id: 'tcc',
      title: 'TCC',
      fileType: 'PDF',
      maxSize: '800KB',
      upload: null
    },
    {
      id: 'statements',
      title: 'Audited Statements',
      fileType: 'PDF',
      maxSize: '800KB',
      upload: null
    }
  ])

  const steps = [
    { number: 1, title: 'Company Details', completed: true },
    { number: 2, title: 'Attach Company Documents', active: true },
    { number: 3, title: 'Directors\' Details' },
    { number: 4, title: 'Staff\'s Details' },
    { number: 5, title: 'Shareholder/Partner Details' },
    { number: 6, title: 'Referees and Declaration' },
    { number: 7, title: 'Make Payment' }
  ]

  const handleFileUpload = async (documentId: string, file: File) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          upload: {
            name: file.name,
            progress: 0,
            uploaded: false,
            file
          }
        }
      }
      return doc
    }))

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setDocuments(prev => prev.map(doc => {
        if (doc.id === documentId && doc.upload) {
          return {
            ...doc,
            upload: {
              ...doc.upload,
              progress,
              uploaded: progress === 100
            }
          }
        }
        return doc
      }))
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
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-3 rounded-lg p-3 text-sm ${
                    step.active ? 'bg-blue-50 text-blue-600' :
                    step.completed ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    step.completed ? 'bg-blue-600 text-white' :
                    step.active ? 'border-2 border-blue-600 text-blue-600' :
                    'border-2 border-gray-300'
                  }`}>
                    {step.completed ? (
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
            <h2 className="mb-6 text-xl font-semibold">Attach Company Documents</h2>
            <div className="grid grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="space-y-2"
                >
                  <div className="text-sm font-medium">{doc.title}</div>
                  {!doc.upload ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, doc.id)}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400"
                    >
                      <Upload className="mb-2 h-6 w-6 text-gray-400" />
                      <div className="text-center">
                        <button
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = '.pdf'
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                await handleFileUpload(doc.id, file)
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
                          <span className="text-sm">{doc.upload.name}</span>
                        </div>
                        {doc.upload.uploaded && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <Progress
                        value={doc.upload.progress}
                        className="mt-2"
                      />
                      <div className="mt-1 text-right text-xs text-gray-500">
                        {doc.upload.progress}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline">Save Draft</Button>
              <Button>Save and Continue</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

