import Hero from "./components/Hero/Hero";
import { getHeroImages } from "./actions/getHero";
import HomeCategory from "./components/Category/HomeCategory";
import { getAllCategory } from "./actions/getCategories";
import HomePageAdds from "./components/Ads/HomePageAdds";
import { getPostAds } from "./actions/getAds";
import Details from "./components/Details/Details";
import MobileApp from "./components/MobileApp/MobileApp";
import { UserRegistration } from "./actions/usersAction";


export const revalidate = 1;

export default async function Home() {
  const HeroImages = await getHeroImages();
  const GetCategory = await getAllCategory();
  const getPost = await getPostAds(1,4);
  const UserReg = await UserRegistration()


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
        <Details/>  
      </section>


       {/* Mobile App Section */}
       <section>
        <MobileApp/>  
      </section>
    </main>
  );
}
