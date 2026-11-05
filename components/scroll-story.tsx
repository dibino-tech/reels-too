"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ReelChrome, ReelFrame } from "@/components/reel-frame";
import { faNum, reels, steps } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ScrollStory() {
  const pinRef = useRef<HTMLDivElement>(null);
  const fileChip = useRef<HTMLDivElement>(null);
  const layoutChip = useRef<HTMLDivElement>(null);
  const calendarChip = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const layers = useRef<Array<HTMLDivElement | null>>([]);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    let run = 0;

    async function setup() {
      const id = ++run;
      ctx?.revert();
      ctx = undefined;
      if (!fine.matches || !pinRef.current || !alive) return;

      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!alive || id !== run || !fine.matches) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const [first, second, third] = layers.current;
        gsap.set(fileChip.current, { x: 150, y: -80, rotation: -8, autoAlpha: 0.25 });
        gsap.set(layoutChip.current, { x: -170, y: 40, rotation: 7, autoAlpha: 0.15 });
        gsap.set(calendarChip.current, { y: 150, rotation: -4, autoAlpha: 0.15 });
        gsap.set([second, third], { autoAlpha: 0 });
        gsap.set(gridRef.current, { autoAlpha: 0 });

        gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.55,
            onUpdate: (self) => {
              const next = Math.min(2, Math.floor(self.progress * 2.999));
              if (next !== stepRef.current) {
                stepRef.current = next;
                setStep(next);
              }
            },
          },
        })
          .to(fileChip.current, { x: 0, y: 0, rotation: -3, autoAlpha: 1, duration: 0.8, ease: "none" }, 0)
          .to(layoutChip.current, { x: 0, y: 0, rotation: 3, autoAlpha: 1, duration: 0.8, ease: "none" }, 1)
          .to(first, { autoAlpha: 0, duration: 0.35, ease: "none" }, 1.05)
          .to(second, { autoAlpha: 1, duration: 0.35, ease: "none" }, 1.05)
          .to(gridRef.current, { autoAlpha: 1, duration: 0.25, ease: "none" }, 1.15)
          .to(gridRef.current, { autoAlpha: 0, duration: 0.25, ease: "none" }, 1.85)
          .to(calendarChip.current, { y: 0, rotation: 0, autoAlpha: 1, duration: 0.8, ease: "none" }, 2)
          .to(second, { autoAlpha: 0, duration: 0.35, ease: "none" }, 2.05)
          .to(third, { autoAlpha: 1, duration: 0.35, ease: "none" }, 2.05);
      }, pinRef);

      ScrollTrigger.refresh();
    }

    void setup();
    fine.addEventListener("change", setup);
    return () => {
      alive = false;
      fine.removeEventListener("change", setup);
      ctx?.revert();
    };
  }, []);

  const active = steps[step];

  return (
    <section id="story" className="relative bg-[#1A0E0A] text-[#FFF8EE] dark:bg-[#2A1014]">
      <div ref={pinRef} className="story-pin relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <p aria-hidden className="pointer-events-none absolute -bottom-10 end-[-4vw] font-display text-[22vw] leading-none text-white/5">
            مونتاژ
          </p>
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm text-signal">
                {active.index} / {faNum(steps.length)} · {active.label}
              </p>
              <h2 className="mt-3 font-display text-5xl leading-tight" aria-live="polite">
                {active.title}
              </h2>
              <p className="mt-4 max-w-sm text-lg leading-8 text-white/75">{active.body}</p>
              <ol className="mt-8 space-y-3">
                {steps.map((item, index) => (
                  <li key={item.label} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full border border-white/25 font-display",
                        index === step && "border-transparent bg-reel text-[#FFF8EE]",
                        index < step && "bg-signal text-[#1A0E0A]",
                      )}
                    >
                      {item.index}
                    </span>
                    <span className={index === step ? "text-white" : "text-white/55"}>{item.label}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative mx-auto h-[min(78vh,760px)] w-full max-w-[560px]">
              <div
                ref={fileChip}
                className="absolute start-0 top-[8%] z-30 w-36 rounded-2xl border border-line bg-paper p-2 shadow-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image src={reels[0].src} alt="" fill sizes="144px" className="object-cover" />
                </div>
                <p className="mt-2 truncate text-xs">{reels[0].fileName}</p>
              </div>
              <div
                ref={layoutChip}
                className="absolute end-0 top-[34%] z-30 w-32 rounded-2xl border border-line bg-signal p-3 text-[#1A0E0A] shadow-lg"
              >
                <p className="text-xs">چیدمان</p>
                <p className="font-display text-2xl leading-none">پوستر</p>
              </div>
              <div
                ref={calendarChip}
                className="absolute bottom-[6%] start-[12%] z-30 rounded-2xl bg-reel px-4 py-3 text-[#FFF8EE] shadow-lg"
              >
                <p className="text-xs">تقویم</p>
                <p className="font-display text-2xl leading-none">{faNum(reels[2].day)} آبان</p>
                <p className="text-xs">{reels[2].time}</p>
              </div>
              <div className="absolute inset-y-0 left-1/2 w-[min(100%,320px)] -translate-x-1/2">
                <ReelChrome activeIndex={step} count={reels.length}>
                  {reels.map((reel, index) => (
                    <div
                      key={reel.id}
                      ref={(node) => {
                        layers.current[index] = node;
                      }}
                      className={cn("absolute inset-0", index > 0 && "opacity-0")}
                    >
                      <Image src={reel.src} alt={reel.alt} fill sizes="320px" className="object-cover" priority={index === 0} />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A0E0A] via-[#1A0E0A]/45 to-transparent px-4 pb-5 pt-20 text-[#FFF8EE]">
                        <p className="text-xs text-signal">{reel.kicker}</p>
                        <p className="font-display text-3xl leading-tight">{reel.title}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={gridRef} className="pointer-events-none absolute inset-5 z-10 border-2 border-signal">
                    <div className="absolute inset-x-0 top-1/3 border-t-2 border-signal" />
                    <div className="absolute inset-y-0 start-1/3 border-s-2 border-signal" />
                  </div>
                </ReelChrome>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="story-stack mx-auto max-w-6xl px-4 py-16 sm:px-5">
        <h2 className="font-display text-4xl">از فایل تا روز تقویم</h2>
        <p className="mt-3 max-w-md text-white/70">هر قاب یک مرحله است. به طرفین بکش.</p>
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {reels.map((reel, index) => (
            <article key={reel.id} className="w-[78vw] max-w-[340px] shrink-0 snap-center">
              <p className="mb-3 text-sm text-reel">
                {steps[index].index} · {steps[index].label}
              </p>
              <ReelFrame items={[reel]} index={0} showActions={false} />
              <h3 className="mt-4 font-display text-2xl">{steps[index].title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">{steps[index].body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
