import AboutSection from "@/components/Home/AboutSection";
import ExploreSection from "@/components/Home/ExploreSection";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import HeroSection from "@/components/Home/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExploreSection />
      <AboutSection />
      <FeaturedProducts />
    </main>
  );
}
