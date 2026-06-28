import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { clinic } from "@/clinic.config";

export const metadata = {
  title: `Contact Us — ${clinic.name}`,
  description: `Get in touch with ${clinic.name}, ${clinic.address.full}.`,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  telephone: clinic.phoneTel,
  email: clinic.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: clinic.address.city,
    addressRegion: clinic.address.county,
    postalCode: clinic.address.postcode,
    addressCountry: clinic.address.country,
  },
  url: clinic.siteUrl,
  sameAs: [clinic.social.facebook],
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <main>
        <section style={{ background: "#F2F8FC", padding: "48px 20px 40px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(28px, 5vw, 38px)", marginBottom: 10 }}>
            Contact Us
          </h1>
          <p style={{ color: "#4A6478", fontSize: 15.5, maxWidth: 480, margin: "0 auto" }}>
            We&apos;re in {clinic.address.city} — call, message, or drop in.
          </p>
        </section>

        <section style={{
          maxWidth: 1000, margin: "0 auto", padding: "48px 20px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
        }} className="contact-grid">
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <MapPin size={19} color="#2F7FB3" />
                <span style={{ fontSize: 15, color: "#3D5266" }}>{clinic.address.full}</span>
              </div>
              <a href="tel:+441702231067" style={{ display: "flex", gap: 12, alignItems: "center", textDecoration: "none" }}>
                <Phone size={19} color="#2F7FB3" />
                <span style={{ fontSize: 15, color: "#3D5266" }}>{clinic.phone}</span>
              </a>
              <a href={`mailto:${clinic.email}`} style={{ display: "flex", gap: 12, alignItems: "center", textDecoration: "none" }}>
                <Mail size={19} color="#2F7FB3" />
                <span style={{ fontSize: 15, color: "#3D5266" }}>{clinic.email}</span>
              </a>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <a href={clinic.social.facebook} aria-label="Facebook" className="focus-ring" style={{
                width: 40, height: 40, borderRadius: 999, border: "2px solid #DCEAF3",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#2F7FB3",
              }}>
                <Facebook size={17} />
              </a>
              <a href="#" aria-label="Instagram" className="focus-ring" style={{
                width: 40, height: 40, borderRadius: 999, border: "2px solid #DCEAF3",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#2F7FB3",
              }}>
                <Instagram size={17} />
              </a>
            </div>

            <div style={{ borderRadius: 18, overflow: "hidden", minHeight: 260, background: "#F2F8FC" }}>
              <iframe
                title={`${clinic.name} location`}
                src={clinic.mapsEmbedUrl}
                width="100%" height="100%" style={{ border: 0, minHeight: 260 }} loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </section>
      </main>
      <SiteFooter />

      <style>{`@media (max-width: 760px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
