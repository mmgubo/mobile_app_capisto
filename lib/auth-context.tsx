"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/store"
import { customerApi, bookingApi, type ApiBooking, type ApiCustomer } from "./api"

export interface Appointment{
  id: string
  userId: string
  userName: string
  userEmail: string
  service: string
  date: string
  time: string
  branch: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  appointments: Appointment[]
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => void
  updateAppointmentStatus: (appointmentId: string, status: Appointment["status"]) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function apiBookingToAppointment(booking: ApiBooking, customerName?: string, customerEmail?: string): Appointment {
  return {
    id: booking.id,
    userId: booking.customerId,
    userName: customerName || "Unknown",
    userEmail: customerEmail || "",
    date: booking.date,
    time: booking.time,
    service: booking.service,
    branch: booking.branch,
    notes: booking.notes,
    status: booking.status,
    createdAt: booking.createdAt || new Date().toISOString().split("T")[0],
  }
} 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [customerCache, setCustomerCache] = useState<Map<string, ApiCustomer>>(new Map())

  const fetchAppointments = async () => {
    debugger
    try {
      const { data: bookings, error } = await bookingApi.getAll()
      if (error || !bookings) {
        console.error("Failed to fetch bookings:", error)
        return
     }

     // Fetch customer details for each booking and cache them
     const customerIds = [...new Set(bookings.map((b) => b.customerId))]
     const newCustomerCache = new Map(customerCache)

     for (const customerId of customerIds) {
        if (!newCustomerCache.has(customerId)) {
          const { data: customer } = await customerApi.getById(customerId)
          if (customer) {
            newCustomerCache.set(customerId, customer)
          }
        }
      }
      setCustomerCache(newCustomerCache)

      // Map bookings to appointments using cached customer details
      const mappedAppointments = bookings.map((booking) => {
        const customer = newCustomerCache.get(booking.customerId)
        return apiBookingToAppointment(booking, customer?.name, customer?.email)
      })

      setAppointments(mappedAppointments)

    } catch (err) {
      console.error("Error fetching appointments:", err)

    }
  }

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("capitecbank-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    debugger
    try{
      const { data: customers, error } = await customerApi.getAll()
      if (error) {
        return { success: false, error: "Unable to connect to the server" }
      }

      const foundCustomer = customers?.find((c) => c.email === email)
      if (foundCustomer) {
        const loggedInUser: User = {
          id: foundCustomer.id,
          email: foundCustomer.email,
          name: foundCustomer.name,
          role: email.includes("admin") ? "admin" : "customer",
        }
        setUser(loggedInUser)
        sessionStorage.setItem("capitecbank-user", JSON.stringify(loggedInUser))
        await fetchAppointments()
        return { success: true }
      }
      // Fallbaack to demo users if not found in API
      if (email === "john@example.com" && password === "password") {
        const adminUser: User = {
          id: "test-1",
          email: "john@example.com",
          name: "John Smith",
          role: "customer",
        }
        setUser(adminUser)
        sessionStorage.setItem("capitecbank-user", JSON.stringify(adminUser))
        await fetchAppointments()
        return { success: true }
      }

      return { success: false, error: "Invalid email or password" }

    } catch {
      return { success: false, error: "Network error" }
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    debugger
    try {
      const { data: existingCustomers } = await customerApi.getAll()
      if (existingCustomers?.some((c) => c.email === email)) {
        return { success: false, error: "An account with this email already exists" }
      }

      const { data: customerIdentity, error: createError } = await customerApi.create({ name, email })
      if (createError || !customerIdentity) {
        return { success: false, error: createError || "Failed to create account" }
      }

      const { data: newCustomer, error: err } = await customerApi.getById(customerIdentity)
      if (err || !newCustomer) {
        return { success: false, error: err || "Failed to get the client details" }
      }

      const loggedInUser: User = {
        id: newCustomer.id,
        email: newCustomer.email,
        name: newCustomer.name,
        role: "customer",
      }
      setUser(loggedInUser)
      sessionStorage.setItem("capitecbank-user", JSON.stringify(loggedInUser))
      return { success: true  }
    } catch {
      return { success: false, error: "Network error" }
    }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem("capitecbank-user")
  }

  const addAppointment = (appointment: Omit<Appointment, "id" | "createdAt">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appt-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setAppointments([...appointments, newAppointment])
  }

  const updateAppointmentStatus = (appointmentId: string, status: Appointment["status"]) => {
    setAppointments(appointments.map((appt) => (appt.id === appointmentId ? { ...appt, status } : appt)))
  }

  return (
    <AuthContext.Provider
      value={{ user, appointments, login, register, logout, addAppointment, updateAppointmentStatus }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
