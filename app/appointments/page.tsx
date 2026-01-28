"use client"

import { useState, useEffect, use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, Clock, MapPin, FileText, CalendarPlus, Loader2, Trash2, Pencil } from "lucide-react"
import Link from "next/link"
import { type Appointment, timeSlots, branches} from "@/lib/store"
import { useAuth } from "@/lib/auth-context"

export default function AppointmentsPage() {
  const { user, logout, appointments, isLoading, updateAppointment, deleteAppointment, updateAppointmentStatus } = useAuth()

  const [selectedAppointment, setSelectedAppointment] = useState<Partial<Appointment> | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updateFormData, setUpdateFormData] = useState({
    date: "",
    time: "",
    branch: "",
    notes: "",
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const userAppointments = user
    ? appointments.filter((appt) => appt.userId === user.id || user.role === "admin")
    : []

  const activeAppointments = userAppointments
    .filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate >= today && apt.status !== "cancelled" && apt.status !== "completed"
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastAppointments = userAppointments
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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Unknown date"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleOpenUpdateDialog = (appointment: Partial<Appointment>) => {
    setSelectedAppointment(appointment)
    setUpdateFormData({
      date: appointment.date ?? "",
      time: appointment.time ?? "",
      branch: appointment.branch ?? "",
      notes: appointment.notes || "",
    })
    setIsUpdateDialogOpen(true)
  }

  const handleOpenDeleteDialog = (appointment: Partial<Appointment>) => {
    setSelectedAppointment(appointment)
    setIsDeleteDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!selectedAppointment) return
    setIsSubmitting(true)
    const result = await updateAppointment(selectedAppointment.id as string, updateFormData)
    setIsSubmitting(false)
    if (result.success) {
      setIsUpdateDialogOpen(false)
      setSelectedAppointment(null)
    }
  }
  const handleDelete = async () => {
    if (!selectedAppointment) return
    setIsSubmitting(true)
    const result = await deleteAppointment(selectedAppointment.id as string)
    setIsSubmitting(false)
    if (result.success) {
      setIsDeleteDialogOpen(false)
      setSelectedAppointment(null)
    }
  }


  const isTimeSlotDisabled = (timeValue: string) => {
    const selectedDateObj = new Date(updateFormData.date)
    const now = new Date()
    
    // Only check time if the selected date is today
    if (
      selectedDateObj.getFullYear() === now.getFullYear() &&
      selectedDateObj.getMonth() === now.getMonth() &&
      selectedDateObj.getDate() === now.getDate()
    ) {
      const [hours, minutes] = timeValue.split(":").map(Number)
      const slotTime = new Date()
      slotTime.setHours(hours, minutes, 0, 0)
      return slotTime <= now
    }
    return false
  }


  const AppointmentCard = ({ appointment, isPast = false }: { appointment: Partial<Appointment>; isPast?: boolean }) => (
    <Card className={`transition-shadow hover:shadow-md ${isPast ? "opacity-80" : ""}`}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground capitalize">{appointment.service as string}</h3>
              <Badge className={`${getStatusColor(appointment.status as Appointment["status"])} capitalize`}>{appointment.status as string}</Badge>
            </div>

            <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(appointment.date as string)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{appointment.time as string}</span>
              </div>
              <div className="flex items-center gap-2 capitalize">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{appointment.branch as string}</span>
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
              <Button variant="outline" size="sm" onClick={() => handleOpenUpdateDialog(appointment)}>
                <Pencil className="mr-1 h-3 w-3" />
                Update
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive hover:text-destructive"
                onClick={() => handleOpenDeleteDialog(appointment)}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header user={user} onLogout={logout} />

        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading appointments...</span>
        </main>
        <Footer />
      </div>
    )
  }

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

         {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Update Appointment</DialogTitle>
            <DialogDescription>
              Make changes to your appointment. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={updateFormData.date}
                onChange={(e) => setUpdateFormData({ ...updateFormData, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Select
                value={updateFormData.time}
                onValueChange={(value) => setUpdateFormData({ ...updateFormData, time: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem 
                      key={slot.time} 
                      value={slot.time}
                      disabled={!slot.available || isTimeSlotDisabled(slot.time)}
                    >
                      {slot.time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="branch">Branch</Label>
              <Select
                defaultValue={updateFormData.branch}
                value={updateFormData.branch}
                onValueChange={(value) => setUpdateFormData({ ...updateFormData, branch: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={updateFormData.notes}
                onChange={(e) => setUpdateFormData({ ...updateFormData, notes: e.target.value })}
                placeholder="Add any additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

       {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your appointment
              {selectedAppointment && (
                <span className="font-medium"> for {selectedAppointment.service} on {formatDate(selectedAppointment.date)}</span>
              )}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

