import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>
      <div className="prose-body text-mute">
        <p>This site respects your privacy. This page explains what information is collected when you visit jenariusganlary.com and how it is used.</p>
        <h2>Analytics</h2>
        <p>This site uses Google Analytics to understand how visitors use the site, such as which pages are viewed and how long visitors stay. This data is anonymized and used only to improve the content and experience of the site.</p>
        <h2>Advertising</h2>
        <p>This site may display ads served by Google AdSense. Google may use cookies to serve ads based on a visitor's prior visits to this or other websites. Visitors can opt out of personalized advertising by visiting Google's Ads Settings.</p>
        <h2>Affiliate Links</h2>
        <p>Some posts on this site contain affiliate links. If you click one and make a purchase, this site may earn a commission at no extra cost to you. See the Affiliate Disclosure page for details.</p>
        <h2>Contact</h2>
        <p>If you have questions about this privacy policy, please reach out via the Contact page.</p>
      </div>
    </div>
  );
}