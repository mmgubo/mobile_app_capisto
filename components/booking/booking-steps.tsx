"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface BookingStepsProps {
  currentStep: number
  steps: { id: number; name: string }[]
}

export function BookingSteps({ currentStep, steps }: BookingStepsProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center gap-2",
                step.id < currentStep && "text-primary",
                step.id === currentStep && "text-foreground",
                step.id > currentStep && "text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                  step.id < currentStep && "border-primary bg-primary text-primary-foreground",
                  step.id === currentStep && "border-primary text-primary",
                  step.id > currentStep && "border-muted-foreground/30",
                )}
              >
                {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
              </div>
              <span className="hidden text-sm font-medium sm:inline">{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 w-8 sm:w-12",
                  step.id < currentStep ? "bg-primary" : "bg-muted-foreground/30",
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
