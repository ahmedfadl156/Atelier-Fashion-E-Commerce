import AboutSection from "@/components/Home/AboutSection";
import AtelierProcess from "@/components/Home/AtelierProcess";
import ExploreSection from "@/components/Home/ExploreSection";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import HeroSection from "@/components/Home/HeroSection";
import TrendingProducts from "@/components/Home/TrendingProducts";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExploreSection />
      <AboutSection />
      <FeaturedProducts />
      <TrendingProducts />
      <AtelierProcess />
    </main>
  );
}
