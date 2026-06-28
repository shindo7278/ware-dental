// ============================================================
// clinic.config.js
// ============================================================
// ده الملف الوحيد اللي بتعدله لما تعمل نسخة لعيادة جديدة.
// كل الموقع بيقرأ بياناته من هنا.
// ============================================================

export const clinic = {
  // ── الاسم ────────────────────────────────────────────────
  name: "Hullbridge Dental Clinic",
  shortName: "Hullbridge Dental", // بيتستخدم في أماكن ضيقة

  // ── التواصل ──────────────────────────────────────────────
  phone: "01702 231 067",
  phoneTel: "+441702231067",       // لـ href="tel:..."
  email: "info@hullbridgedentalclinic.co.uk",
  emailFrom: "noreply@hullbridgedentalclinic.co.uk", // بريد الإرسال

  // ── العنوان ──────────────────────────────────────────────
  address: {
    street: "130 Ferry Road",
    city: "Hullbridge",
    county: "Essex",
    postcode: "SS5 6EU",
    country: "GB",
    full: "130 Ferry Road, Hullbridge, Essex, SS5 6EU", // للعرض المختصر
  },

  // ── الموقع الجغرافي ───────────────────────────────────────
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=130%20Ferry%20Road%20Hullbridge%20Essex%20SS5%206EU&t=m&z=15&output=embed",

  // ── السوشيال ميديا ────────────────────────────────────────
  social: {
    facebook: "https://en-gb.facebook.com/hullbridgedentalclinic/",
    instagram: "#", // غير لما يكون عندهم
  },

  // ── الموقع الإلكتروني ─────────────────────────────────────
  siteUrl: "https://www.hullbridgedentalclinic.co.uk",

  // ── التقييمات ─────────────────────────────────────────────
  reviews: {
    rating: "5.0",
    count: 10,
  },

  // ── SEO – وصف الموقع ──────────────────────────────────────
  seo: {
    defaultTitle: "Hullbridge Dental Clinic — Dentist in Hullbridge, Essex",
    defaultDescription:
      "Independent dental surgery on Ferry Road, Hullbridge. Preventative, restorative and cosmetic dentistry for the whole family.",
    tagline: "Independent dental care on Ferry Road, Hullbridge, Essex.",
  },
};
