import { useTranslations } from "next-intl";
import Hero from "./components/Hero/Hero";

export const revalidate = 1;

export default function Home() {
  const t = useTranslations("TopNav");

  return (
    <main>
      {/* Hero Section */}
      <section>
        <Hero/>
      </section>
    </main>
  );
}
