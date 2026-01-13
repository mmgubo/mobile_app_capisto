"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { services, branches } from "@/lib/store"
import { CheckCircle2, Calendar, MapPin, Clock, ArrowRight } from "lucide-react"

interface BookingConfirmationProps {
  service: string | null
  branch: string | null
  date: string | null
  time: string | null
  confirmationId: string
}

export function BookingConfirmation({ service, branch, date, time, confirmationId }: BookingConfirmationProps) {
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mt-6 text-3xl font-bold text-foreground">Appointment Confirmed!</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Your appointment has been successfully booked. A confirmation email has been sent to your email address.
      </p>

      <Card className="mt-8 w-full max-w-md">
        <CardContent className="p-6">
          <div className="mb-4 rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-sm text-muted-foreground">Confirmation Number</p>
            <p className="text-lg font-bold text-primary">{confirmationId}</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium text-foreground">
                  {date && formatDate(date)} at {time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{selectedBranch?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedBranch?.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium text-foreground">{selectedService?.name}</p>
                <p className="text-sm text-muted-foreground">Duration: {selectedService?.duration}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
        <Link href="/dashboard">
          <Button className="gap-2">
            View My Appointments
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
