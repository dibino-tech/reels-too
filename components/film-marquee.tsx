const phrases = ["فایل مرجع", "قالب پوستر", "تقویم آبان", "ریلز هفته", "تمام‌قاب", "دو تکه", "چیدمان"];

export function FilmMarquee() {
  const loop = [...phrases, ...phrases];

  return (
    <div className="overflow-hidden border-y-4 border-[#1A0E0A] bg-signal text-[#1A0E0A]" dir="ltr">
      <div className="marquee-track flex w-max items-center gap-8 py-3">
        {loop.map((phrase, index) => (
          <span key={`${phrase}-${index}`} className="flex items-center gap-8 font-display text-3xl leading-none sm:text-4xl">
            {phrase}
            <span className="text-reel" aria-hidden>
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
