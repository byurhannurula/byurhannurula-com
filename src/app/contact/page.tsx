import { PageWrapper } from "@/components/page-wrapper"
import { ContactForm } from "@/components/contact-form"
import { createMetadata } from "@/config"

export const metadata = createMetadata("/contact")

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="animate-fade-in mb-10">
        <h1 className="text-2xl font-medium">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question or want to work together? Send me a message.
        </p>
      </div>

      <ContactForm />
    </PageWrapper>
  )
}
