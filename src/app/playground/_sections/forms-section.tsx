import { ContactForm } from "@/components/contact-form";
import { NewsletterForm } from "@/components/newsletter-form";

import { Section, SubBlock } from "./section";

export function FormsSection() {
  return (
    <Section
      id="forms"
      title="Forms"
      description="Contact and newsletter forms with validation and states."
      className="grid gap-12 lg:grid-cols-2"
    >
      <SubBlock label="Contact form">
        <ContactForm />
      </SubBlock>
      <SubBlock label="Newsletter form">
        <NewsletterForm />
      </SubBlock>
    </Section>
  );
}
