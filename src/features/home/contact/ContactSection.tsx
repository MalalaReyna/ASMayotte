import { ContactForm } from "./ContactForm";
import { ContactHeader } from "./ContactHeader";
import { ContactInfo } from "./ContactInfo";
import { ContactMap } from "./ContactMap";

export function ContactSection() {
  return (
    <article
      className="py-16 sm:py-20 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto"
      aria-labelledby="contact-heading"
      id="contact"
    >
      <div id="contact-heading" className="sr-only">
        Nous contacter
      </div>
      <ContactHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 bg-surface border border-gray-200 rounded-4xl p-6">
        <div className="lg:col-span-1 border-r border-gray-200">
          <ContactInfo />
        </div>
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>

      <ContactMap />
    </article>
  );
}
