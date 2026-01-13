"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { services, branches } from "@/lib/store"
import { Calendar, MapPin, User, Mail, FileText, CheckCircle2 } from "lucide-react"

interface BookingSummaryProps {
  service: string | null
  branch: string | null
  date: string | null
  time: string | null
  formData: {
    name: string
    email: string
    phone: string
    notes: string
  }
  onConfirm: () => void
  isSubmitting: boolean
}

export function BookingSummary({
  service,
  branch,
  date,
  time,
  formData,
  onConfirm,
  isSubmitting,
}: BookingSummaryProps) {
  const selectedService = services.find((s) => s.id === service)
  const selectedBranch = branches.find((b) => b.id === branch)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Review & Confirm</h2>
        <p className="mt-1 text-sm text-muted-foreground">Please review your appointment details before confirming</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Service</p>
              <p className="font-medium text-foreground">{selectedService?.name}</p>
              <p className="text-sm text-muted-foreground">Duration: {selectedService?.duration}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Branch</p>
              <p className="font-medium text-foreground">{selectedBranch?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedBranch?.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
              <p className="font-medium text-foreground">{date && formatDate(date)}</p>
              <p className="text-sm text-muted-foreground">{time}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium text-foreground">{formData.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">{formData.email}</p>
            </div>
          </div>

          {formData.notes && (
            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-sm font-medium text-muted-foreground">Additional Notes</p>
              <p className="mt-1 text-sm text-foreground">{formData.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Button className="w-full gap-2" size="lg" onClick={onConfirm} disabled={isSubmitting}>
        <CheckCircle2 className="h-5 w-5" />
        {isSubmitting ? "Confirming..." : "Confirm Appointment"}
      </Button>
    </div>
  )
}
