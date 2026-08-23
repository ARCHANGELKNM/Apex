import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "How Apex handles your data, cookies, and advertising.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "When you use Apex, we may collect basic usage information such as pages visited, browser type, device type, and approximate location (derived from IP address). If you create an account, we store the details you provide, such as your email address.",
      "We do not sell your personal information.",
    ],
  },
  {
    title: "2. Cookies",
    body: [
      "Cookies are small files stored on your device. We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the app is used.",
      "You can control or delete cookies through your browser settings. Note that blocking some cookies may affect parts of the app.",
    ],
  },
  {
    title: "3. Advertising & Google AdSense",
    body: [
      "This app is supported by advertising. We use Google AdSense to serve ads.",
      "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.",
      "You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or opt out of a third-party vendor's use of cookies for personalized advertising by visiting aboutads.info (https://www.aboutads.info/choices/).",
      "Where required by law (such as in the EU/UK), we ask for your consent before setting non-essential cookies used for advertising.",
    ],
  },
  {
    title: "4. Analytics",
    body: [
      "We may use analytics tools to understand aggregate usage patterns — for example, which features are most used. This data is aggregated and does not identify you personally.",
    ],
  },
  {
    title: "5. Data Storage & Security",
    body: [
      "Data is stored with reputable hosting providers and transmitted over encrypted connections (HTTPS). No method of transmission or storage is 100% secure, but we take reasonable measures to protect your information.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on where you live, you may have rights to access, correct, or delete personal data we hold about you, and to object to or restrict certain processing. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    title: "7. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated 'Last updated' date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-black/60">
        Last updated: August 2026
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-black/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
          <h2 className="text-lg font-semibold">8. Contact Us</h2>
          <p className="mt-3 text-sm leading-relaxed text-black/70">
            Questions about this policy? Reach out via the support channel in
            the app, or email us at{" "}
            <a
              href="mailto:support@example.com"
              className="font-medium underline underline-offset-2 hover:text-black"
            >
              support@example.com
            </a>
            .
          </p>
        </section>

        <p className="text-center text-sm text-black/50">
          <Link href="/" className="underline underline-offset-2 hover:text-black">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}