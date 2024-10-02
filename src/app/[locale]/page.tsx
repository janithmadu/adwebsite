import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const revalidate = 1;

export default function Home() {
  const t = useTranslations("TopNav");

  return (
    <main className="p-10 md:bg-red-400 sm:bg-black lg:bg-blue-500 xl:bg-violet-300">
      <div>
       
      </div>
    </main>
  );
}
