import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Wallet, Home, TrendingUp, Briefcase, PiggyBank, HelpCircle, Clock, ArrowRight, Save, CardSim, ShieldCheck, CreditCard } from "lucide-react"
import { Header } from "@/components/header"
import { HeaderWithAuth } from "@/components/header-with-auth"

const services = [
  {
    icon: Wallet,
    title: "Transact",
    description:
      "Go cashless and find a better way to bank. Simply use our app, pay with your card or tap your phone or watch.",
    duration: "10 min",
    details: [
      "Make a payment",
      "Get paid",
      "Buy on our app",
      "Manage your money",
    ],
  },
  {
    icon: Save,
    title: "Save",
    description: "Open up to 10 savings plans on our app and even invest in shares. You can name your plans to match your goals.",
    duration: "15 min",
    details: [
      "Main Account",
      "Notice Deposit",
      "Access Anytime",
      "Fixed-Term Savings",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Insure",
    description: "Get Funeral Cover up to R100 000, Life Cover for your family's needs after the funeral and affordable Credit Insurance.",
    duration: "15 min",
    details: [
      "Funeral Cover",
      "Life Cover",
      "Credit Insurance",
      "How to submit claims",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Enquiry",
    description: "We're empowering all businesses, big or small, to turn their bold ideas into real opportunies.",
    duration: "20 min",
    details: [
      "Business account setup",
      "Merchant services",
      "Business loans and credit lines",
      "Cash management solutions",
    ],
  },
  {
    icon: CreditCard,
    title: "Credit",
    description: "Choose from personalised credit solutions that suit your needs. Whether you need a loan now or revolving credit for later - we've got it all.",
    duration: "15 min",
    details: [
      "Access Facility",
      "Personal Loan",
      "Credit Card",
      "Home Loan",
    ],
  },
  {
    icon: CardSim,
    title: "Connect",
    description: "Freedom to connect your way. No contracts or hidden fees, just affordable prepaid prices that don't change from day to day.",
    duration: "10 min",
    details: [
      "See your bundles",
      "Get a Connect advance",
      "Get a connect SIM",
      "Buy a phone for less",
    ],
  },
]

export default function ServicesPage() {

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithAuth />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Our Services</h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Comprehensive banking services tailored to your personal and business needs. Book an appointment with
                our expert advisors today.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8">
              {services.map((service) => (
                <Card key={service.title} className="overflow-hidden">
                  <div className="grid md:grid-cols-3">
                    <CardHeader className="md:col-span-1">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between py-6 md:col-span-2">
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex justify-end">
                        <Link href="/book">
                          <Button className="gap-2">
                            Book Appointment
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
