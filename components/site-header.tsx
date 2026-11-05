"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const links = [
  { href: "#story", label: "مونتاژ" },
  { href: "#templates", label: "قالب‌ها" },
  { href: "#calendar", label: "تقویم" },
];

export function SiteHeader() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <a href="#reel" className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reel">
          <span className="inline-block h-6 w-3.5 rounded-[3px] bg-signal ring-2 ring-reel" aria-hidden />
          <span className="font-display text-[1.7rem] leading-none">ریلزساز</span>
        </a>
        <nav className="hidden items-center gap-5 text-sm sm:flex" aria-label="بخش‌های صفحه">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-ink/80 transition-colors duration-200 hover:text-reel">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="تغییر حالت روشن و تیره"
            onClick={() => {
              const isDark = document.documentElement.classList.contains("dark");
              setTheme(isDark ? "light" : "dark");
            }}
          >
            <Sun className="hidden dark:block" />
            <Moon className="block dark:hidden" />
          </Button>
          <Button asChild size="default">
            <a href="#reel">شروع ساخت ریلز</a>
          </Button>
        </div>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 pb-3 text-sm sm:hidden" aria-label="بخش‌های صفحه">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="shrink-0 text-ink/80">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
