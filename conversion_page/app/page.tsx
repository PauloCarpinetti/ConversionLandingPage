import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Differentials } from "@/components/sections/differentials";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Services />
      <Differentials />
      <Testimonials />
      <Faq />
    </main>
  );
}
