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
    id: "transact",
    name: "Transact",
    duration: "10 min",
    description: "Go cashless and find a better way to bank. Simply use our app, pay with your card or tap your phone or watch.",
  },
  {
    id: "save",
    name: "Save",
    duration: "15 min",
    description: "Open up to 10 savings plans on our app and even invest in shares. You can name your plans to match your goals.",
  },
  {
    id: "insure",
    name: "Insure",
    duration: "15 min",
    description: "Get Funeral Cover up to R100 000, Life Cover for your family's needs after the funeral and affordable Credit Insurance.",
  },
  {
    id: "business-enquiry",
    name: "Business Enquiry",
    duration: "20 min",
    description: "We're empowering all businesses, big or small, to turn their bold ideas into real opportunies.",
  },
  {
    id: "credit",
    name: "Credit",
    duration: "15 min",
    description: "Choose from personalised credit solutions that suit your needs. Whether you need a loan now or revolving credit for later - we've got it all.",
  },
  {
    id: "connect",
    name: "Connect",
    duration: "10 min",
    description: "Freedom to connect your way. No contracts or hidden fees, just affordable prepaid prices that don't change from day to day.",
  },
]

export const branches = [
  { id: "Stellenbosch Ikhaya", name: "Stellenbosch Ikhaya Branch", address: "5 Neutron Road, Technopark" },
  { id: "Stellenbosch Die Boord", name: "Stellenbosch Die Boord Branch", address: "Cnr R44 & Saffraan Avenue" },
  { id: "Stellenbosch Eikestad Mall", name: "Stellenbosch Eikestad Mall Branch", address: "43 Andringa Street, Eikestad Mall" },
   { id: "Stellenbosch Stelmark", name: "Stellenbosch Stelmark Branch", address: "Shop 12, Stelmark Centre" },
    { id: "Belhar Airports Centre", name: "Belhar Airports Centre Branch", address: "Belhar Drive, Airport Centre" },
]

export const timeSlots: TimeSlot[] = [
  { time: "09:00 AM", available: true },
  { time: "09:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "01:00 PM", available: true },
  { time: "01:30 PM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "03:30 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "04:30 PM", available: true },
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
