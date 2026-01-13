"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Calendar, MapPin, Clock, Plus, FileText } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, appointments, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const userAppointments = appointments.filter((appt) => appt.userId === user.id || user.role === "admin")

  const upcomingAppointments = userAppointments
    .filter((appt) => appt.status !== "cancelled" && appt.status !== "completed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastAppointments = userAppointments
    .filter((appt) => appt.status === "completed" || appt.status === "cancelled")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00")
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onLogout={logout} />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome, {user.name}</h1>
              <p className="mt-1 text-muted-foreground">Manage your banking appointments</p>
            </div>
            <Link href="/book">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Book New Appointment
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{userAppointments.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{upcomingAppointments.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {userAppointments.filter((a) => a.status === "completed").length}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Upcoming Appointments</h2>
            {upcomingAppointments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium text-foreground">No upcoming appointments</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Book an appointment to get started</p>
                  <Link href="/book" className="mt-4">
                    <Button>Book Appointment</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.service}</h3>
                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(appointment.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {appointment.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {appointment.branch}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {pastAppointments.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">Past Appointments</h2>
              <div className="grid gap-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="opacity-75">
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.service}</h3>
                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(appointment.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
