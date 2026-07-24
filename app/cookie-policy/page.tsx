import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "How jenariusganlary.com uses cookies for analytics and advertising, and how to manage your preferences.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Cookie Policy</h1>
      <div className="prose-body text-mute">
        <p>
          This page explains what cookies are, which ones this site uses, and
          how you can control them. It should be read alongside the{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They&apos;re used to remember preferences, measure traffic,
          and, on some sites, personalize advertising.
        </p>

        <h2>Cookies Used on This Site</h2>
        <p>
          <strong>Analytics cookies (Google Analytics):</strong> used to
          understand aggregate visitor behavior, such as which pages are
          viewed. These only load after you accept cookies via the banner
          shown on your first visit.
        </p>
        <p>
          <strong>Advertising cookies (Google AdSense):</strong> where ads are
          enabled on this site, Google may set cookies to serve ads and limit
          how many times you see the same ad. You can opt out of personalized
          ads at any time through Google&apos;s Ads Settings.
        </p>
        <p>
          <strong>Preference cookies:</strong> a small local storage entry
          remembers whether you accepted or rejected cookies, so you
          aren&apos;t asked again on every visit.
        </p>

        <h2>Managing Your Preference</h2>
        <p>
          You can change your cookie choice at any time using the cookie
          settings link in the site footer, or by clearing your
          browser&apos;s local storage for this site.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent via the{" "}
          <a href="/contact">Contact</a> page.
        </p>
      </div>
    </div>
  );
}