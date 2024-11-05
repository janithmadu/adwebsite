import { Hero } from "./components/Hero/Hero";
import { getHeroImages } from "./actions/getHero";
import HomeCategory from "./components/Category/HomeCategory";
import { getAllCategory } from "./actions/getCategories";
import HomePageAdds from "./components/Ads/HomePageAdds";
import { getPostAds } from "./actions/getAds";
import Details from "./components/Details/Details";
import MobileApp from "./components/MobileApp/MobileApp";
import { UserRegistration } from "./actions/usersAction";

export const revalidate = 1;

interface GetPostD {
  subcategoryId: {
    page: number;
    limit: number;
  };
}

export default async function Home() {
  const HeroImages = await getHeroImages();
  const GetCategory = await getAllCategory();
  await UserRegistration()

  const GetPostData: GetPostD = {
    subcategoryId: {
      page: 1,
      limit: 4,
    },
  };

  const getPost = await getPostAds(GetPostData);

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

      {/* Fresh recommended ads Section */}
      <section>
        <HomePageAdds Ads={getPost.result} />
      </section>

      {/* Details Section */}
      <section>
        <Details />
      </section>

      {/* Mobile App Section */}
      <section>
        <MobileApp />
      </section>
    </main>
  );
}
