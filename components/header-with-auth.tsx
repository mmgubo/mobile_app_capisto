"use client"

import { Header } from "@/components/header"
import { useAuth } from "@/lib/auth-context"

export function HeaderWithAuth() {
  const { user, logout } = useAuth()
  return <Header user={user} onLogout={logout} />
}