import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Home, TrendingUp, Briefcase, PiggyBank, HelpCircle, ArrowRight, Save, ShieldCheck, CreditCard, CardSim } from "lucide-react"

const services = [
  {
    icon: Wallet,
    title: "Transact",
    description: "Go cashless and find a better way to bank. Simply use our app, pay with your card or tap your phone or watch.",
    duration: "10 min",
  },
  {
    icon: Save,
    title: "Save",
    description: "Open up to 10 savings plans on our app and even invest in shares. You can name your plans to match your goals.",
    duration: "15 min",
  },
  {
    icon: ShieldCheck,
    title: "Insure",
    description: "Get Funeral Cover up to R100 000, Life Cover for your family's needs after the funeral and affordable Credit Insurance.",
    duration: "15 min",
  },
  {
    icon: Briefcase,
    title: "Business Enquiry",
    description: "We're empowering all businesses, big or small, to turn their bold ideas into real opportunies.",
    duration: "20 min",
  },
  {
    icon: CreditCard,
    title: "Credit",
    description: "Choose from personalised credit solutions that suit your needs. Whether you need a loan now or revolving credit for later - we've got it all.",
    duration: "15 min",
  },
  {
    icon: CardSim,
    title: "Connect",
    description: "Freedom to connect your way. No contracts or hidden fees, just affordable prepaid prices that don't change from day to day.",
    duration: "10 min",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Book an appointment for any of our banking services. Our expert advisors are ready to help you achieve your
            financial goals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="group transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="mt-4">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{service.duration}</span>
                  <Link href="/book">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Book Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
