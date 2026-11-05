export type LayoutId = "cover" | "split" | "poster";

export type Reel = {
  id: string;
  src: string;
  alt: string;
  fileName: string;
  kicker: string;
  title: string;
  caption: string;
  layout: LayoutId;
  day: number;
  time: string;
  weekday: string;
};

const faDigits = "۰۱۲۳۴۵۶۷۸۹";

export function faNum(value: number | string) {
  return String(value).replace(/\d/g, (digit) => faDigits[Number(digit)] ?? digit);
}

export const reels: Reel[] = [
  {
    id: "cafe",
    src: "/reels/reel-cafe.jpg",
    alt: "پیشخوان کافه با شیرینی زعفرانی و فنجان اسپرسو در نور پنجره",
    fileName: "صبحانه-زعفرانی.jpg",
    kicker: "کافهٔ نارون",
    title: "صبحانه، قبل از شلوغی",
    caption: "زعفران و نان گرم. فایل مرجع همان عکس پیشخوان است.",
    layout: "cover",
    day: 4,
    time: "۰۹:۳۰",
    weekday: "دوشنبه",
  },
  {
    id: "fashion",
    src: "/reels/reel-fashion.jpg",
    alt: "پارچهٔ ابریشم زعفرانی در نور قرمز استودیو",
    fileName: "ابریشم-پاییز.jpg",
    kicker: "پوشش",
    title: "ابریشم، یک نور",
    caption: "همان پارچه، با چیدمان پوستر. بدون عکس تازه.",
    layout: "poster",
    day: 14,
    time: "۱۸:۰۰",
    weekday: "پنجشنبه",
  },
  {
    id: "class",
    src: "/reels/reel-class.jpg",
    alt: "میز کارگاه با دفتر، مداد زرد و فنجان نارنجی",
    fileName: "جلسه-اول.jpg",
    kicker: "آموزش",
    title: "جلسهٔ اول، بدون مقدمه",
    caption: "چیدمان دو تکه. ساعت روی تقویم نشسته است.",
    layout: "split",
    day: 23,
    time: "۱۲:۱۵",
    weekday: "شنبه",
  },
];

export const layouts: { id: LayoutId; label: string; detail: string }[] = [
  { id: "cover", label: "تمام‌قاب", detail: "عکس تا لبه‌ها، نوشته پایین" },
  { id: "split", label: "دو تکه", detail: "عکس بالا، نوار رنگی پایین" },
  { id: "poster", label: "پوستر", detail: "نوار زرد روی عکس" },
];

export const steps = [
  {
    index: "۱",
    label: "فایل مرجع",
    title: "یک عکس کافی است",
    body: "فایل را مثل یک چاپ روی میز بگذار. ایجنت همان را قاب ریلز می‌کند.",
  },
  {
    index: "۲",
    label: "چیدمان",
    title: "قالب، روی همان جنس عکس",
    body: "تمام‌قاب، دو تکه، یا پوستر. چیدمان عوض می‌شود و لازم نیست دوباره فیلم بگیری.",
  },
  {
    index: "۳",
    label: "تقویم",
    title: "برای یک روز مشخص",
    body: "ریلزی که ساخته شد، روی ساعت و روز خودش در تقویم محتوا می‌نشیند.",
  },
] as const;

export const month = {
  name: "آبان",
  year: "۱۴۰۵",
  days: 30,
  startOffset: 6,
  today: 14,
};

export const weekdays = [
  { id: "sat", label: "ش", name: "شنبه" },
  { id: "sun", label: "ی", name: "یکشنبه" },
  { id: "mon", label: "د", name: "دوشنبه" },
  { id: "tue", label: "س", name: "سه‌شنبه" },
  { id: "wed", label: "چ", name: "چهارشنبه" },
  { id: "thu", label: "پ", name: "پنجشنبه" },
  { id: "fri", label: "ج", name: "جمعه" },
] as const;

export function layoutLabel(id: LayoutId) {
  return layouts.find((layout) => layout.id === id)?.label ?? id;
}
