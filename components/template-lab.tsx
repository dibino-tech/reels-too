"use client";

import Image from "next/image";
import { useState } from "react";

import { ReelFrame } from "@/components/reel-frame";
import { layouts, reels, type LayoutId } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TemplateLab() {
  const [reelIndex, setReelIndex] = useState(0);
  const [layout, setLayout] = useState<LayoutId>(reels[0].layout);
  const reel = reels[reelIndex];

  return (
    <section id="templates" className="bg-mango text-[#1A0E0A]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-5">
      <div className="max-w-xl">
        <h2 className="font-display text-5xl leading-tight sm:text-6xl">فایل مرجع، قالب ریلز</h2>
        <p className="mt-4 text-lg leading-8">
          یکی از چاپ‌ها را بردار. چیدمان پیشنهادی‌اش می‌آید وسط، و می‌توانی قالب را عوض کنی بدون اینکه عکس عوض شود.
        </p>
      </div>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 sm:grid-cols-3">
          {reels.map((item, index) => {
            const active = index === reelIndex;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setReelIndex(index);
                  setLayout(item.layout);
                }}
                className={cn(
                  "rounded-2xl border border-line bg-paper p-3 text-start shadow-[0_16px_40px_rgb(26_14_10_/_0.08)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active ? "rotate-0 ring-2 ring-reel" : index === 1 ? "-rotate-2" : "rotate-1",
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image src={item.src} alt={item.alt} fill sizes="240px" className="object-cover" />
                </div>
                <p className="mt-3 truncate text-sm">{item.fileName}</p>
                <p className="text-xs text-muted">{item.kicker}</p>
              </button>
            );
          })}
          <div className="sm:col-span-3 flex flex-wrap gap-2">
            {layouts.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={layout === item.id}
                onClick={() => setLayout(item.id)}
                className={cn(
                  "rounded-full border border-line px-4 py-2 text-sm transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]",
                  layout === item.id ? "bg-signal text-[#1A0E0A]" : "bg-paper text-ink",
                )}
              >
                <span className="font-medium">{item.label}</span>
                <span className="ms-2 text-xs opacity-70">{item.detail}</span>
              </button>
            ))}
          </div>
        </div>
        <ReelFrame items={[reel]} index={0} layoutOverride={layout} showActions={false} />
      </div>
      </div>
    </section>
  );
}
