import { X } from "lucide-react";

// API Service Layer for Bacend Integration
 const API_BASE_URL_CUSTOMER = 'http://localhost:8090/api/v1/customers';
 const API_BASE_URL_BOOKING = 'http://localhost:8070/api/v1/bookings';
 
// Types maching backend response structure
export interface ApiCustomer {
    id: string
    name: string
    email: string

}

export interface ApiBooking {
    id: string
    customerId: string
    service: string
    date: string
    time: string
    branch: string
    notes?: string
    status: "pending" | "confirmed" | "cancelled" | "completed"

}

// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<{data: T | null, error: string | null}> {
    try {
        const response = await fetch(`${API_BASE_URL_CUSTOMER}${endpoint}`, {
            headers: { 
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return { data: null, error: errorData.message || `Error: ${response.status}` }
        }
   
        const data = await response.json()
        return { data, error: null }
            

    } catch (error) {
        return { data: null, error: error instanceof Error? error.message : 'Network error'}
    }
}

// Generic fetch wrapper with error handling
async function apiGet<T>(endpoint: string, options?: RequestInit): Promise<{data: T | null, error: string | null}> {
    try {
        const response = await fetch(`${API_BASE_URL_BOOKING}${endpoint}`, {
            headers: { 
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return { data: null, error: errorData.message || `Error: ${response.status}` }
        }
   
        const data = await response.json()
        return { data, error: null }
            

    } catch (error) {
        return { data: null, error: error instanceof Error? error.message : 'Network error'}
    }
}


// Generic fetch wrapper with error handling
async function apiSave<T>(endpoint: string, options?: RequestInit): Promise<{data: string | null, error: string | null}> {
    try {
        const response = await fetch(`${API_BASE_URL_CUSTOMER}${endpoint}`, {
            headers: { 
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return { data: null, error: errorData.message || `Error: ${response.status}` }
        }

        const data = await response.text()
        return { data, error: null }
            

    } catch (error) {
        return { data: null, error: error instanceof Error? error.message : 'Network error'}
    }
}

// Generic fetch wrapper with error handling
async function apiAdd<T>(endpoint: string, options?: RequestInit): Promise<{data: string | null, error: string | null}> {
    try {
        const response = await fetch(`${API_BASE_URL_BOOKING}${endpoint}`, {
            headers: { 
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        })
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            return { data: null, error: errorData.message || `Error: ${response.status}` }
        }

        const data = await response.text()
            console.log(`API Fetch Success [<${endpoint}>]:`, data)
        return { data, error: null }
            

    } catch (error) {
        console.error(`API Fetch Error [<${endpoint}>]:`, error)
        return { data: null, error: error instanceof Error? error.message : 'Network error'}
    }
}

// Cusotomer Endpoints
export const customerApi = {
    getAll: () => apiFetch<ApiCustomer[]>("/getAllCustomers"), 
    getById: (id: string) => apiFetch<ApiCustomer>(`/getCustomer/${id}`),
    create: (data: Omit<ApiCustomer, "id">) => 
        apiSave<ApiCustomer>("/registerCustomer", {
            method: "POST",
            body: JSON.stringify(data),
        }),
    update: (id: string, data: Partial<ApiCustomer>) => 
        apiFetch<ApiCustomer>(`/updateCustomer/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),
    delete: (id: string) =>
        apiFetch<{ success: boolean }>(`/${id}`, {
            method: "DELETE",
        }),
}

// Booking Endpoints
export const bookingApi = {
    getAll: () => apiGet<ApiBooking[]>("/findAllBookings"),
    getById: (id: string) => apiGet<ApiBooking>(`/getBooking/${id}`),
    create: (data: Omit<ApiBooking, "id">) => 
        apiAdd<ApiBooking>("/createBooking", {
            method: "POST",
            body: JSON.stringify(data),
        }),
    update: (id: string, data: Partial<ApiBooking>) => 
        apiAdd<ApiBooking>(`/updateBooking/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),
    updateStatus: (id: string, status: ApiBooking["status"]) => 
        apiAdd<ApiBooking>(`/updateBookingStatus/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        }),
    delete: (id: string) =>
        apiAdd<{ success: boolean }>(`/deleteBooking/${id}`, {
            method: "DELETE",
        }),
}