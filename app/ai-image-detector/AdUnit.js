"use client";
import { useEffect } from "react";

// A responsive AdSense display unit. Renders NOTHING unless
// NEXT_PUBLIC_ADSENSE_CLIENT is set, so the site works fine before your
// AdSense account is approved.
export default function AdUnit({ slot }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-3168595166500339";
  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [client, slot]);

  if (!client || !slot) return null;
  return (
    <div className="ad-box">
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
