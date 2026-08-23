"use client";

import { useEffect, useRef } from "react";

/**
 * Reusable Google AdSense ad unit.
 *
 * Usage:
 *   <AdUnit slot="1234567890" />                       // responsive display ad
 *   <AdUnit slot="1234567890" format="fluid" />        // in-feed / in-article
 *   <AdUnit slot="1234567890" className="my-8" />      // with spacing
 *
 * Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT and `slot` are set,
 * so it is safe to place in the layout before ad units are created.
 */
export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
  label = true,
}) {
  const pushedRef = useRef(false);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8679808720592276";

  useEffect(() => {
    if (!slot || pushedRef.current) return;
    try {
      // Push into the AdSense queue; the loader script fills the <ins> element.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch (err) {
      // Script blocked or not loaded yet — fail silently, never break the UI.
      console.warn("[AdSense] push failed:", err?.message);
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div className={className}>
      {label && (
        <span className="block text-[10px] uppercase tracking-widest text-black/40 mb-1">
          Advertisement
        </span>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(responsive ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}