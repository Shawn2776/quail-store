import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { Story } from "@/components/Story";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CategoryStrip />
      <FeaturedProduct />
      <Story />
      <Footer />
    </>
  );
}
