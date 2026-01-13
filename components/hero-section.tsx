import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Shield, Clock, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
             <span className="text-primary"> Bank on Better </span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
              Schedule appointments with our expert banking professionals. Whether you need help with accounts, loans,
              investments, or financial planning, we're here to help.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/book">
                <Button size="lg" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  Book an Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View Services
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">20M+</p>
                <p className="mt-1 text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">25+</p>
                <p className="mt-1 text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="mt-1 text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl bg-card p-8 shadow-xl">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Secure & Private</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your information is protected with bank-grade security
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Flexible Scheduling</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Book appointments that fit your schedule</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Advisors</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Meet with certified financial professionals</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
