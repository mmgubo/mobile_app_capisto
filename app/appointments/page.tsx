"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, FileText, CalendarPlus } from "lucide-react"
import Link from "next/link"
import { type Appointment, demoAppointments } from "@/lib/store"
import { useAuth } from "@/lib/auth-context"

export default function AppointmentsPage() {
  const { user, logout } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("appointments")
    if (stored) {
      setAppointments(JSON.parse(stored))
    } else {
      setAppointments(demoAppointments)
    }
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const activeAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate >= today && apt.status !== "cancelled" && apt.status !== "completed"
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate < today || apt.status === "completed"
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const AppointmentCard = ({ appointment, isPast = false }: { appointment: Appointment; isPast?: boolean }) => (
    <Card className={`transition-shadow hover:shadow-md ${isPast ? "opacity-80" : ""}`}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">{appointment.service}</h3>
              <Badge className={`${getStatusColor(appointment.status)} capitalize`}>{appointment.status}</Badge>
            </div>

            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{appointment.branch}</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="flex items-start gap-2 text-sm">
                <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{appointment.notes}</span>
              </div>
            )}
          </div>

          {!isPast && appointment.status !== "cancelled" && (
            <div className="flex gap-2 sm:flex-col">
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const EmptyState = ({ message, showBookButton = true }: { message: string; showBookButton?: boolean }) => (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-12">
      <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
      <p className="mb-4 text-center text-muted-foreground">{message}</p>
      {showBookButton && (
        <Link href="/book">
          <Button>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Book an Appointment
          </Button>
        </Link>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header user={user} onLogout={logout} />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Appointments</h1>
              <p className="mt-1 text-muted-foreground">View and manage your upcoming and past appointments</p>
            </div>
            <Link href="/book">
              <Button>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Book New
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming" className="gap-2">
                Upcoming
                {activeAppointments.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeAppointments.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-2">
                Past
                {pastAppointments.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {pastAppointments.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {activeAppointments.length > 0 ? (
                activeAppointments.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
              ) : (
                <EmptyState message="You have no upcoming appointments scheduled." />
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastAppointments.length > 0 ? (
                pastAppointments.map((apt) => <AppointmentCard key={apt.id} appointment={apt} isPast />)
              ) : (
                <EmptyState message="You have no past appointments." showBookButton={false} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

