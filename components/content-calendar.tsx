"use client";

import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { faNum, layoutLabel, month, reels, weekdays } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ContentCalendar() {
  const [selected, setSelected] = useState(month.today);
  const post = reels.find((reel) => reel.day === selected);
  const days = Array.from({ length: month.days }, (_, index) => index + 1);

  const move = (day: number, key: string) => {
    const delta =
      key === "ArrowLeft" ? 1 : key === "ArrowRight" ? -1 : key === "ArrowDown" ? 7 : key === "ArrowUp" ? -7 : 0;
    if (!delta) return;
    const next = Math.min(month.days, Math.max(1, day + delta));
    setSelected(next);
    document.querySelector<HTMLButtonElement>(`[data-day="${next}"]`)?.focus();
  };

  return (
    <section id="calendar" className="bg-signal px-4 py-20 text-[#1A0E0A] sm:px-5">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="overflow-hidden rounded-[1.6rem] border border-line bg-paper shadow-[0_24px_60px_rgb(26_14_10_/_0.08)]">
          <div className="flex items-end justify-between bg-reel px-5 py-4 text-[#FFF8EE]">
            <div>
              <p className="text-sm">تقویم محتوا</p>
              <h2 className="font-display text-4xl leading-none">
                {month.name} {month.year}
              </h2>
            </div>
            <CalendarDays aria-hidden className="size-8" />
          </div>
          <div className="p-3 sm:p-5">
            <div role="grid" aria-label={`تقویم ${month.name} ${month.year}`} className="grid grid-cols-7 gap-1">
              {weekdays.map((day) => (
                <div key={day.id} role="columnheader" className="py-2 text-center text-xs text-muted">
                  <abbr title={day.name} className="no-underline">
                    {day.label}
                  </abbr>
                </div>
              ))}
              {Array.from({ length: month.startOffset }, (_, index) => (
                <div key={`blank-${index}`} />
              ))}
              {days.map((day) => {
                const scheduled = reels.find((reel) => reel.day === day);
                const isToday = day === month.today;
                return (
                  <button
                    key={day}
                    type="button"
                    role="gridcell"
                    data-day={day}
                    aria-selected={selected === day}
                    aria-label={
                      scheduled
                        ? `${faNum(day)} ${month.name}، ${scheduled.weekday}${isToday ? "، امروز" : ""}، ${scheduled.title}`
                        : `${faNum(day)} ${month.name}${isToday ? "، امروز" : ""}، بدون ریلز`
                    }
                    onClick={() => setSelected(day)}
                    onKeyDown={(event) => {
                      if (event.key.startsWith("Arrow")) {
                        event.preventDefault();
                        move(day, event.key);
                      }
                    }}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reel",
                      selected === day && "bg-signal text-[#1A0E0A]",
                      selected !== day && scheduled && "bg-reel/10 text-ink",
                      selected !== day && !scheduled && "hover:bg-ink/5",
                    )}
                  >
                    <span>{faNum(day)}</span>
                    {scheduled ? (
                      <span className={cn("mt-1 h-1.5 w-1.5 rounded-full", selected === day ? "bg-[#1A0E0A]" : "bg-reel")} aria-hidden />
                    ) : null}
                    {isToday ? <span className="sr-only">امروز</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <aside className="rounded-[1.6rem] border border-line bg-paper p-4">
          {post ? (
            <div key={post.id} className="rise">
              <div className="relative aspect-[9/16] max-h-[420px] overflow-hidden rounded-2xl">
                <Image src={post.src} alt={post.alt} fill sizes="320px" className="object-cover" />
              </div>
              <p className="mt-4 text-sm text-mango">
                {post.weekday} {faNum(post.day)} {month.name} · {post.time}
              </p>
              <h3 className="mt-1 font-display text-3xl leading-tight">{post.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{post.caption}</p>
              <p className="mt-3 text-sm">
                قالب: {layoutLabel(post.layout)} · فایل: {post.fileName}
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-48 flex-col justify-end">
              <p className="font-display text-3xl leading-tight">{faNum(selected)} {month.name}</p>
              <p className="mt-3 text-sm leading-7 text-muted">برای این روز هنوز ریلزی چیده نشده. یک روز نشان‌دار را انتخاب کن.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
