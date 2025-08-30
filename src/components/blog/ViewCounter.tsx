"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    const now = Date.now();
    const key = `vc:last:${slug}`;
    const last = parseInt(localStorage.getItem(key) || "0", 10);

    // Throttle increments per user per slug (once per 30s)
    if (now - last > 30_000) {
      fetch('/api/view-count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      }).catch(() => {});
      localStorage.setItem(key, String(now));
    }

    // Always try to read latest count
    fetch(`/api/view-count?slug=${encodeURIComponent(slug)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (typeof data?.count === 'number') setCount(data.count);
      })
      .catch(() => setCount(null));
  }, [slug]);

  return (
    <span>{count === null ? '' : `${count} visualizzazioni`}</span>
  );
}

