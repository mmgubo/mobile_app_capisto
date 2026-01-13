import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Phone } from "lucide-react"

export function CtaSection() {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              Book your appointment today and let our banking professionals help you with your financial needs.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book">
              <Button size="lg" variant="secondary" className="gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Appointment
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Phone className="h-5 w-5" />
              Call Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
