import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Wallet, Home, TrendingUp, Briefcase, PiggyBank, HelpCircle, Clock, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Wallet,
    title: "Transact",
    description:
      "Open a new checking, savings, or business account with personalized guidance from our banking specialists.",
    duration: "10 min",
    details: [
      "Personal checking and savings accounts",
      "Business and commercial accounts",
      "Student and youth accounts",
      "Certificate of Deposits (CDs)",
    ],
  },
  {
    icon: Home,
    title: "Save",
    description: "Discuss mortgage, auto, or personal loan options tailored to your specific financial situation.",
    duration: "15 min",
    details: [
      "Home mortgages and refinancing",
      "Auto loans and leasing",
      "Personal loans and lines of credit",
      "Home equity loans (HELOC)",
    ],
  },
  {
    icon: TrendingUp,
    title: "Insure",
    description: "Meet with our certified wealth management advisors for comprehensive portfolio guidance.",
    duration: "15 min",
    details: [
      "Portfolio analysis and management",
      "Retirement planning (401k, IRA)",
      "Estate planning guidance",
      "Risk assessment and strategy",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Enquiry",
    description: "Commercial banking solutions designed to help your business grow and succeed.",
    duration: "20 min",
    details: [
      "Business account setup",
      "Merchant services",
      "Business loans and credit lines",
      "Cash management solutions",
    ],
  },
  {
    icon: PiggyBank,
    title: "Credit",
    description: "Comprehensive financial planning sessions to help you achieve your long-term goals.",
    duration: "15 min",
    details: [
      "Budgeting and savings strategies",
      "Debt management",
      "Education funding planning",
      "Insurance needs analysis",
    ],
  },
  {
    icon: HelpCircle,
    title: "Connect",
    description: "Have questions about your accounts or our banking services? Our team is here to help.",
    duration: "10 min",
    details: [
      "Account questions and support",
      "Online banking assistance",
      "Card services and support",
      "General banking inquiries",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
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
