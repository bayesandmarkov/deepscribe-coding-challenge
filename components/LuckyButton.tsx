"use client";

import { Button } from "@/components/ui/button";

export function LuckyButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="text-lg px-8 py-6 border border-white"
    >
      <a
        href="https://www.theedigital.com/blog/what-is-im-feeling-lucky-on-google"
        target="_blank"
      >
        <span>I'm Feeling Lucky</span>
      </a>
    </Button>
  );
} 