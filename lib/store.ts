// Shared state management for the booking app
export interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
}

export interface Appointment {
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

export interface TimeSlot {
  time: string
  available: boolean
}

export const services = [
  {
    id: "account-opening",
    name: "Account Opening",
    duration: "30 min",
    description: "Open a new checking, savings, or business account",
  },
  {
    id: "loan-consultation",
    name: "Loan Consultation",
    duration: "45 min",
    description: "Discuss mortgage, auto, or personal loan options",
  },
  {
    id: "investment-advisory",
    name: "Investment Advisory",
    duration: "60 min",
    description: "Meet with our wealth management advisors",
  },
  {
    id: "business-banking",
    name: "Business Banking",
    duration: "45 min",
    description: "Commercial banking and business account services",
  },
  {
    id: "financial-planning",
    name: "Financial Planning",
    duration: "60 min",
    description: "Comprehensive financial planning session",
  },
  {
    id: "general-inquiry",
    name: "General Inquiry",
    duration: "20 min",
    description: "Questions about accounts or banking services",
  },
]

export const branches = [
  { id: "downtown", name: "Downtown Branch", address: "123 Main Street, Suite 100" },
  { id: "westside", name: "Westside Branch", address: "456 Oak Avenue" },
  { id: "northgate", name: "Northgate Branch", address: "789 Pine Boulevard" },
]

export const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: true },
]

// Demo data for appointments
export const demoAppointments: Appointment[] = [
  {
    id: "1",
    userId: "user-1",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    service: "Loan Consultation",
    date: "2026-01-15",
    time: "10:00 AM",
    branch: "Downtown Branch",
    status: "confirmed",
    createdAt: "2026-01-09",
  },
  {
    id: "2",
    userId: "user-2",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@email.com",
    service: "Investment Advisory",
    date: "2026-01-15",
    time: "2:00 PM",
    branch: "Westside Branch",
    status: "pending",
    createdAt: "2026-01-08",
  },
  {
    id: "3",
    userId: "user-1",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    service: "Account Opening",
    date: "2026-01-10",
    time: "11:00 AM",
    branch: "Downtown Branch",
    status: "completed",
    createdAt: "2026-01-05",
  },
]
