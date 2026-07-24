import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of jenariusganlary.com, including content ownership, affiliate links, and limitation of liability.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Terms &amp; Conditions</h1>
      <div className="prose-body text-mute">
        <p>
          Welcome to jenariusganlary.com (&quot;this site&quot;). This site is
          operated by Jenarius Ganlary. By accessing or using this site, you
          agree to be bound by the terms below. If you do not agree with any
          part of these terms, please do not use this site.
        </p>

        <h2>Use of Content</h2>
        <p>
          All articles, images, and other content published on this site are
          the intellectual property of Jenarius Ganlary unless otherwise
          credited. You may share links to this content or quote short
          excerpts with proper attribution and a link back to the original
          post. Reproducing full articles or substantial portions of them
          without permission is not allowed.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          Content on this site covers software development, SaaS, and
          finance-for-builders topics for general informational purposes
          only. Nothing here constitutes financial, legal, or professional
          advice. You should do your own research or consult a qualified
          professional before making decisions based on anything you read
          here.
        </p>

        <h2>Affiliate Links and Advertising</h2>
        <p>
          This site may contain affiliate links and may display
          advertisements, including through Google AdSense. See the{" "}
          <a href="/affiliate-disclosure">Affiliate Disclosure</a> and{" "}
          <a href="/privacy-policy">Privacy Policy</a> pages for details on
          how these work.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This site links to third-party websites and tools for reference.
          Jenarius Ganlary is not responsible for the content, accuracy, or
          practices of any third-party site linked from this site.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          This site and its content are provided &quot;as is&quot; without
          warranties of any kind. Jenarius Ganlary is not liable for any
          damages or losses arising from your use of this site or reliance
          on any content published here.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          These terms may be updated from time to time. Continued use of the
          site after changes are posted means you accept the updated terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of India, without regard to
          conflict of law principles.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about these terms, please reach out via the{" "}
          <a href="/contact">Contact</a> page.
        </p>
      </div>
    </div>
  );
}