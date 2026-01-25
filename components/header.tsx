"use client"

import Link from "next/link"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, LogOut, Calendar, Settings, CalendarClock, Clock, CheckCircle2 } from "lucide-react"
import { demoAppointments } from "@/lib/store"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useAuth, type Appointment} from "@/lib/auth-context"

interface HeaderProps {
  user?: { id: string; name: string; email: string; role: "customer" | "admin" } | null
  onLogout?: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { appointments } = useAuth()


  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const userAppointments = user
    ? appointments.filter((appt) => appt.userId === user.id || user.role === "admin")
    : []

  const activeAppointments = userAppointments.filter((apt) => {
    const aptDate = new Date(apt.date)
    return aptDate >= today && apt.status !== "cancelled" && apt.status !== "completed"
  })

  const pastAppointments = userAppointments.filter((apt) => {
    const aptDate = new Date(apt.date)
    return aptDate < today || apt.status === "completed"
  })

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/logo.png"
                alt="Company Logo"
                width={150} // Desired width in pixels
                height={50} // Desired height in pixels
            />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/book"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </Link>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <CalendarClock className="h-4 w-4" />
                View Appointments
                {activeAppointments.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-xs">
                    {activeAppointments.length}
                  </Badge>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-80">
              {/* Active Appointments */}
              <DropdownMenuLabel className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Upcoming Appointments
              </DropdownMenuLabel>
              {activeAppointments.length > 0 ? (
                activeAppointments.slice(0, 3).map((apt) => (
                  <DropdownMenuItem key={apt.id} asChild>
                    <Link href="/appointments" className="cursor-pointer flex-col items-start gap-1 py-2">
                      <div className="flex w-full items-center justify-between capitalize">
                        <span className="font-medium">{apt.service}</span>
                        <Badge className={`text-xs ${getStatusColor(apt.status)}`}>{apt.status}</Badge>
                      </div>
                      <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
                        <span>{new Date(apt.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{apt.time}</span>
                        <span>•</span>
                        <span>{apt.branch}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-2 py-3 text-center text-sm text-muted-foreground">No upcoming appointments</div>
              )}

              <DropdownMenuSeparator />

              {/* Past Appointments */}
              <DropdownMenuLabel className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                Past Appointments
              </DropdownMenuLabel>
              {pastAppointments.length > 0 ? (
                pastAppointments.slice(0, 2).map((apt) => (
                  <DropdownMenuItem key={apt.id} asChild>
                    <Link href="/appointments" className="cursor-pointer flex-col items-start gap-1 py-2 opacity-70">
                      <div className="flex w-full items-center justify-between capitalize">
                        <span className="font-medium">{apt.service}</span>
                        <Badge className={`text-xs ${getStatusColor(apt.status)}`}>{apt.status}</Badge>
                      </div>
                      <div className="flex w-full items-center gap-2 text-xs text-muted-foreground">
                        <span>{new Date(apt.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{apt.time}</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="px-2 py-3 text-center text-sm text-muted-foreground">No past appointments</div>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/appointments" className="cursor-pointer justify-center font-medium text-primary">
                  View All Appointments
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" />
                    My Appointments
                  </Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/book">
                <Button size="sm">Book Now</Button>
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/book"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Appointment
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
