import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { PageHero, Eyebrow, Photo } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
export const metadata = { title: "Contact & Collaborate" };
export default function Contact() {
  return (
    <>
      <PageHero
        label="Contact CEID"
        title="Good work starts with a conversation."
        description="For research collaboration, training, academic engagement or simply a question, we’d be glad to hear from you."
      />
      <section className="section container contact-grid">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h2>
            Let’s find
            <br />
            <em>common ground.</em>
          </h2>
          <p>
            Connect with CEID to explore ideas, partnerships and opportunities
            for inclusive change.
          </p>
          <a className="contact-line" href="mailto:info@ceidbd.com">
            <Mail size={22} />
            <span>
              <small>Email us</small>info@ceidbd.com
            </span>
            <ArrowUpRight size={18} />
          </a>
          <div className="contact-line">
            <MapPin size={22} />
            <span>
              <small>Based in</small>Dhaka, Bangladesh
            </span>
          </div>
          <Photo name="contact-school" alt="Children outside a primary school" />
        </div>
        <ContactForm />
      </section>
    </>
  );
}
