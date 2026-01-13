import { Suspense } from "react"
import { AdminDashboardContent } from "@/components/admin/admin-dashboard-content"

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={null}>
      <AdminDashboardContent />
    </Suspense>
  )
}