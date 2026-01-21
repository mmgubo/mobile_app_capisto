"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Appointment } from "@/lib/store"
import { demoAppointments } from "@/lib/store"
import { customerApi, type ApiCustomer } from "./api"

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

// Demo users for testing
const demoUsers: Array<User & { password: string }> = [
  { id: "user-1", email: "john@example.com", name: "John Smith", role: "customer", password: "password" },
  { id: "admin-1", email: "admin@capitecbank.com", name: "Admin User", role: "admin", password: "admin123" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>(demoAppointments)
  const [users, setUsers] = useState(demoUsers)

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("capitecbank-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const foundUser = users.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      sessionStorage.setItem("capitecbank-user", JSON.stringify(userWithoutPassword))
      return { success: true }
    }
    return { success: false, error: "Invalid email or password" }
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
