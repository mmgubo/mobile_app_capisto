"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/store"
import { customerApi, bookingApi, type ApiBooking, type ApiCustomer } from "./api"

export interface Appointment{
  id: string
  userId: string
  service: string
  date: string
  time: string
  branch: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes?: string
}

interface AuthContextType {
  user: User | null
  appointments: Appointment[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt">) => Promise<{ success: boolean; error?: string }>
  updateAppointmentStatus: (appointmentId: string, status: Appointment["status"]) => Promise<{ success: boolean; error?: string }>
  refreshAppointments: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function apiBookingToAppointment(booking: ApiBooking): Appointment {
  return {
    id: booking.id,
    userId: booking.customerId,
    date: booking.date,
    time: booking.time,
    service: booking.service,
    branch: booking.branch,
    notes: booking.notes,
    status: booking.status
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
        return apiBookingToAppointment(booking)
      })

      setAppointments(mappedAppointments)

    } catch (err) {
      console.error("Error fetching appointments:", err)

    }
  }

  // Check for stored session on mount
  useEffect(() => {
    const init = async () => {
      const storedUser = sessionStorage.getItem("capitecbank-user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      await fetchAppointments()
      setIsLoading(false)
    }
    init()
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

  const addAppointment = async (appointment: Omit<Appointment, "id">,
  ): Promise<{ success: boolean; error?: string }> => {
    const storedUser = sessionStorage.getItem("capitecbank-user")
    try {
      debugger
      const bookingData = {
        customerId: appointment.userId,
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
        branch: appointment.branch,
        notes: appointment.notes,
        status: appointment.status
      }

      const { data: newBooking, error } = await bookingApi.create(bookingData)
      if (error || !newBooking) {
        console.error("API error creating appointment:", error)
        return { success: false, error: error || "Failed to create appointment" }
      }

      await fetchAppointments()
      return { success: true }

      // Local fallback if API not used 

      // const newAppointment: Appointment = {
      //   ...appointment,
      //   id: `appt-${Date.now()}`,
      //   createdAt: new Date().toISOString().split("T")[0],
      // }
      // setAppointments((prev) => [...prev, newAppointment])
      // return { success: true }
    } catch (err) {
      console.error("Failed to add appointment:", err)
      return { success: false, error: "Failed to add appointment" }
    }
  }

  const updateAppointmentStatus = async (appointmentId: string, status: Appointment["status"]): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await bookingApi.updateStatus(appointmentId, status)
      if (error) {
        console.error("API error updating appointment status:", error)
        return { success: false, error }
      }

      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, status } : a)))
     
      return { success: true }
    } catch (err) {
      console.error("Failed to update appointment status:", err)
      return { success: false, error: "Failed to update appointment status" }
    }
  }
  const refreshAppointments = async () => {
    await fetchAppointments()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        appointments,
        isLoading,
        login,
        register,
        logout,
        addAppointment,
        updateAppointmentStatus,
        refreshAppointments,
      }}
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
