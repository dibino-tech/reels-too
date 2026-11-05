"use client";

import { Bookmark, CalendarDays, ChevronDown, ChevronUp, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { layoutLabel, type LayoutId, type Reel } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ReelChrome({
  children,
  activeIndex,
  count,
  autoplay = false,
  paused = false,
  reducedMotion = false,
  onSelect,
  className,
}: {
  children: React.ReactNode;
  activeIndex: number;
  count: number;
  autoplay?: boolean;
  paused?: boolean;
  reducedMotion?: boolean;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[2rem] bg-[#1A0E0A] p-2 shadow-[0_30px_70px_rgb(26_14_10_/_0.35)]", className)}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.45rem] bg-black">
        <div className="absolute inset-x-3 top-3 z-20 flex gap-1">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`نمایش ریلز ${index + 1} از ${count}`}
              onClick={() => onSelect?.(index)}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/35"
            >
              <span
                className={cn(
                  "block h-full w-full origin-right bg-signal",
                  index < activeIndex && "scale-x-100",
                  index > activeIndex && "scale-x-0",
                  index === activeIndex && autoplay && !reducedMotion && !paused && "reel-progress",
                  index === activeIndex && (reducedMotion || paused || !autoplay) && "scale-x-100",
                )}
              />
            </button>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}

function ReelArt({
  reel,
  layout,
  priority,
}: {
  reel: Reel;
  layout: LayoutId;
  priority?: boolean;
}) {
  const image = (
    <Image
      src={reel.src}
      alt={reel.alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 80vw, 340px"
      className="object-cover"
    />
  );

  if (layout === "split") {
    return (
      <div key={`${reel.id}-${layout}`} className="reel-swap absolute inset-0 grid grid-rows-[58%_42%]">
        <div className="relative">{image}</div>
        <div className="flex flex-col justify-end bg-mango px-4 pb-16 pt-3 text-[#1A0E0A]">
          <p className="text-xs">{reel.kicker}</p>
          <p className="font-display text-[1.7rem] leading-tight">{reel.title}</p>
          <p className="mt-1 text-sm leading-6">{reel.caption}</p>
        </div>
      </div>
    );
  }

  if (layout === "poster") {
    return (
      <div key={`${reel.id}-${layout}`} className="reel-swap absolute inset-0">
        {image}
        <div className="absolute inset-x-0 bottom-16 bg-signal px-4 py-3 text-[#1A0E0A]">
          <p className="text-xs">{reel.kicker}</p>
          <p className="font-display text-[2rem] leading-none">{reel.title}</p>
          <p className="mt-1 text-sm leading-6">{reel.caption}</p>
        </div>
      </div>
    );
  }

  return (
    <div key={`${reel.id}-${layout}`} className="reel-swap absolute inset-0">
      {image}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A0E0A] via-[#1A0E0A]/55 to-transparent px-4 pb-16 pt-24 text-[#FFF8EE]">
        <p className="text-xs text-signal">{reel.kicker}</p>
        <p className="font-display text-[1.85rem] leading-tight">{reel.title}</p>
        <p className="mt-1 text-sm leading-6 text-white/85">{reel.caption}</p>
      </div>
    </div>
  );
}

export function ReelFrame({
  items,
  index,
  onIndexChange,
  autoplay = false,
  reducedMotion = false,
  layoutOverride,
  priority = false,
  showActions = true,
  className,
}: {
  items: Reel[];
  index: number;
  onIndexChange?: (index: number) => void;
  autoplay?: boolean;
  reducedMotion?: boolean;
  layoutOverride?: LayoutId;
  priority?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  const reel = items[index] ?? items[0];
  const layout = layoutOverride ?? reel.layout;
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    if (!autoplay || reducedMotion || paused || !onIndexChange || items.length < 2) return;
    const timer = window.setInterval(() => {
      onIndexChange((index + 1) % items.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [autoplay, reducedMotion, paused, onIndexChange, index, items.length]);

  const go = (direction: 1 | -1) => {
    onIndexChange?.((index + direction + items.length) % items.length);
  };

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ReelChrome
        activeIndex={index}
        count={items.length}
        autoplay={autoplay}
        paused={paused}
        reducedMotion={reducedMotion}
        onSelect={onIndexChange}
      >
        <ReelArt reel={reel} layout={layout} priority={priority && index === 0} />
        {showActions ? (
          <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2">
            <FrameButton
              pressed={liked.includes(reel.id)}
              label={liked.includes(reel.id) ? "پسندیده شد" : "می‌پسندم"}
              onClick={() =>
                setLiked((current) =>
                  current.includes(reel.id) ? current.filter((id) => id !== reel.id) : [...current, reel.id],
                )
              }
            >
              <Heart className={cn("size-4", liked.includes(reel.id) && "fill-reel text-reel")} />
            </FrameButton>
            <FrameButton
              pressed={saved.includes(reel.id)}
              label={saved.includes(reel.id) ? "در قالب‌ها ماند" : "نگه داشتن به‌عنوان قالب"}
              onClick={() =>
                setSaved((current) =>
                  current.includes(reel.id) ? current.filter((id) => id !== reel.id) : [...current, reel.id],
                )
              }
            >
              <Bookmark className={cn("size-4", saved.includes(reel.id) && "fill-signal text-signal")} />
            </FrameButton>
            <a
              href="#calendar"
              aria-label="دیدن این روز در تقویم"
              className="grid size-10 place-items-center rounded-full bg-[#1A0E0A]/55 text-[#FFF8EE] backdrop-blur-sm"
            >
              <CalendarDays className="size-4" />
            </a>
            <span className="ms-auto rounded-full bg-[#1A0E0A]/55 px-2.5 py-1 text-[11px] text-[#FFF8EE] backdrop-blur-sm">
              {layoutLabel(layout)}
            </span>
          </div>
        ) : null}
      </ReelChrome>
      {onIndexChange ? (
        <div className="mt-3 flex justify-center gap-2">
          <Button type="button" variant="outline" size="icon" aria-label="ریلز قبلی" onClick={() => go(-1)}>
            <ChevronUp />
          </Button>
          <Button type="button" variant="outline" size="icon" aria-label="ریلز بعدی" onClick={() => go(1)}>
            <ChevronDown />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function FrameButton({
  children,
  pressed,
  label,
  onClick,
}: {
  children: React.ReactNode;
  pressed: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full bg-[#1A0E0A]/55 text-[#FFF8EE] backdrop-blur-sm transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95"
    >
      {children}
    </button>
  );
}
