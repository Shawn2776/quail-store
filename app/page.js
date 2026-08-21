import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HatchCamPanel } from "@/components/HatchCamPanel";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { Story } from "@/components/Story";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <Hero hatchCamSlot={<HatchCamPanel />} />
      <FeaturedProduct />
      <Story />
      <Footer />
    </>
  );
}
