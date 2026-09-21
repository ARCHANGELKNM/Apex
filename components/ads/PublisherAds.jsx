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
      className={`ad-responsive w-full overflow-hidden border-2 border-black bg-white p-2 ${className}`}
      aria-label="Advertisement"
    >
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-black/50">
        Advertisement
      </span>

      <div className="flex w-full justify-center overflow-hidden">
        <div className="w-full max-w-full">
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

          <Script id="money-tag-zone-277095" strategy="afterInteractive">
            {`(function () {
              if (window.__moneyTagZone277095) return;
              window.__moneyTagZone277095 = true;

              const script = document.createElement('script');
              script.src = 'https://quge5.com/88/tag.min.js';
              script.async = true;
              script.dataset.zone = '277095';
              script.dataset.cfasync = 'false';
              document.body.appendChild(script);
            })();`}
          </Script>

          <Script id="money-tag-zone-11849955" strategy="afterInteractive">
            {`(function () {
              if (window.__moneyTagZone11849955) return;
              window.__moneyTagZone11849955 = true;

              const script = document.createElement('script');
              script.dataset.zone = '11849955';
              script.src = 'https://n6wxm.com/vignette.min.js';
              document.body.appendChild(script);
            })();`}
          </Script>

          <div className="mt-3 w-full">
            <Script id="adstrata-banner-options" strategy="afterInteractive">
              {`window.atOptions = {
  key: '26220a97859332ab96b446f1cf59a7aa',
  format: 'iframe',
  height: 60,
  width: 468,
  params: {}
};`}
            </Script>

            <Script
              id="adstrata-banner-invoke"
              src="https://www.highrevenueformat.com/26220a97859332ab96b446f1cf59a7aa/invoke.js"
              strategy="afterInteractive"
            />
          </div>

          <div className="mt-3 w-full">
            <Script
              id="profitableratecpm-invoke"
              src="https://pl31212887.profitableratecpmnetwork.com/c5b8aedc3b13a8622a44382325abf321/invoke.js"
              strategy="afterInteractive"
              async
              data-cfasync="false"
            />
            <div
              id="container-c5b8aedc3b13a8622a44382325abf321"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublisherSmartlink({ className = "" }) {
  return (
    <div className="w-full">
      <a
        href={SMARTLINK_URL}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className={`inline-flex w-full items-center justify-center border-2 border-black bg-pink-500 px-3 py-3 text-center text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-pink-400 active:translate-y-0.5 active:shadow-none ${className}`}
      >
        Sponsored resource
      </a>
    </div>
  );
}
