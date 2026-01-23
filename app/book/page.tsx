"use client"

import { use, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookingSteps } from "@/components/booking/booking-steps"
import { ServiceSelector } from "@/components/booking/service-selector"
import { BranchSelector } from "@/components/booking/branch-selector"
import { CalendarSelector } from "@/components/booking/calendar-selector"
import { ContactForm } from "@/components/booking/contact-form"
import { BookingSummary } from "@/components/booking/booking-summary"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const steps = [
  { id: 1, name: "Service" },
  { id: 2, name: "Branch" },
  { id: 3, name: "Date & Time" },
  { id: 4, name: "Details" },
  { id: 5, name: "Confirm" },
]

export default function BookingPage() {
  const { user, logout, addAppointment } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [confirmationId, setConfirmationId] = useState("")

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null
      case 2:
        return selectedBranch !== null
      case 3:
        return selectedDate !== null && selectedTime !== null
      case 4:
        return formData.name.trim() !== "" && formData.email.trim() !== ""
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < 5 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)

    const result = await addAppointment({
      userId: user?.id ?? "",
      service: selectedService!,
      branch: selectedBranch!,
      date: selectedDate!,
      time: selectedTime!,
      status: "pending",
      notes: formData.notes,
    })

    if (result.success) {
      const id = `CB-${Date.now().toString(36).toUpperCase()}`
      setConfirmationId(id)
      setIsConfirmed(true)
    } else {
      alert(`Failed to book appointment: ${result.error}`)
    }

    setIsSubmitting(false)
   
  }

  if (isConfirmed) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header user={user} onLogout={logout}  />
        <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <BookingConfirmation
              service={selectedService}
              branch={selectedBranch}
              date={selectedDate}
              time={selectedTime}
              confirmationId={confirmationId}
            />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onLogout={logout } />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Book an Appointment</h1>
            <p className="mt-2 text-muted-foreground">Schedule a meeting with our banking professionals</p>
          </div>

          <div className="mb-8">
            <BookingSteps currentStep={currentStep} steps={steps} />
          </div>

          <div className="mb-8">
            {currentStep === 1 && <ServiceSelector selectedService={selectedService} onSelect={setSelectedService} />}
            {currentStep === 2 && <BranchSelector selectedBranch={selectedBranch} onSelect={setSelectedBranch} />}
            {currentStep === 3 && (
              <CalendarSelector
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectDate={setSelectedDate}
                onSelectTime={setSelectedTime}
              />
            )}
            {currentStep === 4 && <ContactForm formData={formData} onUpdate={setFormData} />}
            {currentStep === 5 && (
              <BookingSummary
                service={selectedService}
                branch={selectedBranch}
                date={selectedDate}
                time={selectedTime}
                formData={formData}
                onConfirm={handleConfirm}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {currentStep < 5 && (
              <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
