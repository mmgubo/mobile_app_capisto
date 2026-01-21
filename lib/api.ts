import { X } from "lucide-react";

// API Service Layer for Bacend Integration
 const API_BASE_URL_CUSTOMER = 'http://localhost:8090/api/v1/customers';
 
// Types maching backend response structure
export interface ApiCustomer {
    id: string
    name: string
    email: string

}
// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<{data: T | null, error: string | null}> {
    try {
        debugger
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
            console.log(`API Fetch Success [<${endpoint}>]:`, data)
        return { data, error: null }
            

    } catch (error) {
        console.error(`API Fetch Error [<${endpoint}>]:`, error)
        return { data: null, error: error instanceof Error? error.message : 'Network error'}
    }
}

// Generic fetch wrapper with error handling
async function apiSave<T>(endpoint: string, options?: RequestInit): Promise<{data: string | null, error: string | null}> {
    try {
        debugger
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