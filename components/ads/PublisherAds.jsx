"use client";

import Script from "next/script";

const SMARTLINK_URL =
  "https://www.profitableratecpmnetwork.com/fna3cx52sa?key=1a2796ac58369272419096abd4fb0412";

export function PublisherSocialBar() {
  return (
    <Script
      src="https://pl31212889.profitableratecpmnetwork.com/8b/e6/9e/8be69ec60a5fc921a82914cd18504c5f.js"
      strategy="afterInteractive"
    />
  );
}

export function PublisherBanner({ className = "" }) {
  return (
    <div
      className={`w-full overflow-x-auto border-2 border-black bg-white p-2 ${className}`}
      aria-label="Advertisement"
    >
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-black/50">
        Advertisement
      </span>
      <Script id="publisher-banner-options" strategy="afterInteractive">
        {`window.atOptions = {
  key: '26220a97859332ab96b446f1cf59a7aa',
  format: 'iframe',
  height: 60,
  width: 468,
  params: {}
};`}
      </Script>
      <Script
        id="publisher-banner-invoke"
        src="https://www.highrevenueformat.com/26220a97859332ab96b446f1cf59a7aa/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
}

export function PublisherSmartlink({ className = "" }) {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex border-2 border-black bg-pink-500 px-3 py-2 text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-pink-400 active:translate-y-0.5 active:shadow-none ${className}`}
    >
      Sponsored resource
    </a>
  );
}
