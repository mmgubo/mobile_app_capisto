"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { branches } from "@/lib/store"
import { MapPin, Check } from "lucide-react"

interface BranchSelectorProps {
  selectedBranch: string | null
  onSelect: (branchId: string) => void
}

export function BranchSelector({ selectedBranch, onSelect }: BranchSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Select a Branch</h2>
        <p className="mt-1 text-sm text-muted-foreground">Choose your preferred branch location</p>
      </div>

      <div className="grid gap-4">
        {branches.map((branch) => {
          const isSelected = selectedBranch === branch.id

          return (
            <Card
              key={branch.id}
              className={cn(
                "relative cursor-pointer transition-all hover:shadow-md",
                isSelected && "border-primary ring-2 ring-primary/20",
              )}
              onClick={() => onSelect(branch.id)}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{branch.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{branch.address}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
