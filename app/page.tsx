import { ContentCalendar } from "@/components/content-calendar";
import { FilmMarquee } from "@/components/film-marquee";
import { Hero } from "@/components/hero";
import { ScrollStory } from "@/components/scroll-story";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TemplateLab } from "@/components/template-lab";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FilmMarquee />
        <ScrollStory />
        <TemplateLab />
        <ContentCalendar />
      </main>
      <SiteFooter />
    </>
  );
}
