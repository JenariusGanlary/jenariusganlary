export interface Product {
  name: string;
  tagline: string;
  description: string;
  price: string;
  url: string;
  thumbnail: string;
}

// Exported separately so other parts of the site (e.g. the homepage hero's
// lead-magnet CTA) can link straight to it without duplicating the URL.
export const STARTER_KIT_URL = "https://jenariusganlary.gumroad.com/l/epafl";

export const PRODUCTS: Product[] = [
  {
    name: "The Solopreneur's Era — Kick Starter",
    tagline: "Build a personal brand on social media",
    description:
      "An eBook on turning your skills into a one-person business — mindset, niche selection, monetizing what you know, and scaling toward consistent monthly income.",
    price: "Free",
    url: STARTER_KIT_URL,
    thumbnail: "https://public-files.gumroad.com/38d1a3t2auuhxcz602h2cl30dvvf",
  },
];