import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How affiliate links work on jenariusganlary.com — only personally used tools are recommended, and commissions never influence the honesty of reviews.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Affiliate Disclosure</h1>
      <div className="prose-body text-mute">
        <p>Some posts on jenariusganlary.com contain affiliate links. This means that if you click a link and make a purchase, I may earn a small commission — at no extra cost to you.</p>
        <p>I only recommend tools and products I&apos;ve personally used or genuinely believe would be useful to readers. Affiliate relationships never influence the honesty of my reviews or recommendations.</p>
        <p>This disclosure is provided in accordance with the FTC&apos;s guidelines on endorsements and testimonials.</p>
      </div>
    </div>
  );
}