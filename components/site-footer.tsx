import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="bg-reel text-[#FFF8EE]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-5">
        <p className="font-display text-6xl leading-[0.95] sm:text-8xl">هفته را پر کن.</p>
        <p className="max-w-md text-base leading-8 text-white/85">
          نمونهٔ همین صفحه است: تقویم، فایل مرجع و قالب. چیزی از اینجا فرستاده نمی‌شود.
        </p>
        <Button asChild variant="signal" size="lg">
          <a href="#reel">شروع ساخت ریلز</a>
        </Button>
      </div>
    </footer>
  );
}
