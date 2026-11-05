"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { ReelFrame } from "@/components/reel-frame";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { faNum, reels } from "@/lib/content";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const onIndexChange = useCallback((next: number) => setIndex(next), []);

  return (
    <section id="reel" className="relative overflow-hidden">
      <Image
        src="/reels/bg-light-leak.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-70 mix-blend-multiply dark:opacity-35 dark:mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-paper/72 to-paper" />
      <p
        aria-hidden
        className="pointer-events-none absolute -top-6 start-[-6vw] select-none font-display text-[28vw] leading-none text-reel/[0.12] dark:text-signal/10"
      >
        ریلز
      </p>
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-8 sm:px-5 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-10">
        <div className="rise max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-reel px-3 py-1 text-sm text-[#FFF8EE]">
            ایجنت ریلز، برای هفتهٔ محتوا
          </p>
          <h1 className="font-display text-6xl leading-[1.02] sm:text-7xl lg:text-8xl">
            ریلز هفته
            <span className="mt-3 block w-fit bg-signal px-3 text-[#1A0E0A]">از روی تقویم</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8">
            فایل مرجع را بگذار، چیدمان را انتخاب کن، و ریلز را برای همان روز روی تقویم ببین.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {reels.map((reel) => (
              <li key={reel.id}>
                <a
                  href="#calendar"
                  className="flex items-center gap-3 rounded-full border border-line bg-paper/80 px-3 py-1.5 text-sm transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-ink font-display text-signal">
                    {faNum(reel.day)}
                  </span>
                  <span>{reel.title}</span>
                  <span className="ms-auto text-xs text-muted">{reel.time}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#templates">انتخاب قالب</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#story">ببین چطور جمع می‌شود</a>
            </Button>
          </div>
        </div>
        <div className="rise rise-late relative mx-auto w-full max-w-[420px] py-6">
          <GhostReel className="float-a -start-8 top-16 hidden w-[68%] sm:block" src={reels[1].src} alt="" />
          <GhostReel className="float-b -end-6 top-24 hidden w-[62%] sm:block" src={reels[0].src} alt="" />
          <Sprockets className="absolute start-0 top-16 z-20 hidden h-[70%] w-6 text-[#1A0E0A] sm:block" />
          <Sprockets className="absolute end-0 top-16 z-20 hidden h-[70%] w-6 text-[#1A0E0A] sm:block" />
          <div className="relative z-10 mx-8 sm:mx-10">
            <ReelFrame
              items={reels}
              index={index}
              onIndexChange={onIndexChange}
              autoplay
              reducedMotion={reducedMotion}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GhostReel({ className, src, alt }: { className: string; src: string; alt: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute overflow-hidden rounded-[1.8rem] shadow-[0_24px_50px_rgb(26_14_10_/_0.28)] ring-4 ring-[#1A0E0A] ${className}`}>
      <div className="relative aspect-[9/16]">
        <Image src={src} alt={alt} fill sizes="280px" className="object-cover" />
      </div>
    </div>
  );
}

function Sprockets({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 320" fill="currentColor" aria-hidden>
      {Array.from({ length: 11 }, (_, index) => (
        <rect key={index} x="4" y={6 + index * 29} width="20" height="16" rx="3" />
      ))}
    </svg>
  );
}
