import { ContactForm } from "@/components/contact-form";
import { PageWrapper } from "@/components/page-wrapper";
import { createMetadata } from "@/config";

export const metadata = createMetadata("/contact");

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="mb-10 animate-fade-in">
        <h1 className="font-medium text-2xl">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question or want to work together? Send me a message.
        </p>
      </div>

      <ContactForm />
    </PageWrapper>
  );
}
