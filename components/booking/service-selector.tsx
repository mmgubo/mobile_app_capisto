"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { services } from "@/lib/store"
import { Wallet, Briefcase, HelpCircle, Check, Save, ShieldCheck, CreditCard, CardSim } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "transact": Wallet,
  "save": Save,
  "insure": ShieldCheck,
  "business-enquiry": Briefcase,
  "credit": CreditCard,
  "connect": CardSim,
}

interface ServiceSelectorProps {
  selectedService: string | null
  onSelect: (serviceId: string) => void
}

export function ServiceSelector({ selectedService, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Select a Service</h2>
        <p className="mt-1 text-sm text-muted-foreground">Choose the type of appointment you'd like to book</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => {
          const Icon = iconMap[service.id] || HelpCircle
          const isSelected = selectedService === service.id

          return (
            <Card
              key={service.id}
              className={cn(
                "relative cursor-pointer transition-all hover:shadow-md",
                isSelected && "border-primary ring-2 ring-primary/20",
              )}
              onClick={() => onSelect(service.id)}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-3 text-base">{service.name}</CardTitle>
                <CardDescription className="text-sm">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Duration: {service.duration}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
