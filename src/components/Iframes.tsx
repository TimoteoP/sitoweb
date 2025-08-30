"use client";

import { useEffect } from "react";
import { mountIframeManager } from "@/lib/iframeManager";

export default function Iframes() {
  useEffect(() => {
    // Handle async function
    mountIframeManager().catch(error => {
      console.error('Failed to mount iframe manager:', error);
    });
  }, []);

  return null;
}