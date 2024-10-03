import Hero from "./components/Hero/Hero";
import { getHeroImages } from "./actions/getHero";
import HomeCategory from "./components/Category/HomeCategory";
import { getAllCategory } from "./actions/getCategories";

export const revalidate = 1;

export default async function Home() {
  const HeroImages = await getHeroImages();
  const GetCategory = await getAllCategory();

  return (
    <main className="flex flex-col space-y-[40px]">
      {/* Hero Section */}
      <section>
        <Hero HeroImages={HeroImages} />
      </section>
      {/* Category Section */}
      <section>
        <HomeCategory getCategory={GetCategory} />
      </section>
    </main>
  );
}
