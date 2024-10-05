import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const revalidate = 1;

function HomeCategory(getCategory: any) {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const t = useTranslations("TopNav");

  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5  lg:px-5 xl:px-20 md:px-10">
      {/* Heading */}
      <div>
        <h1 className=" text-heading03 md:text-heading01 font-bold text-center">
          {" "}
          {t("HomePageCategortSectionHeading")}
        </h1>
      </div>
      {/* Heading End*/}

      {/* Main Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-6  gap-3 ">
        {getCategory.getCategory.map((data: any, index: any) => {
          return (
            <Link
              key={index}
              href={locale + "/category/" + data?.slug?.current}
            >
              <div className="min-w-[170px] min-h-[170px] bg-[#f7f8fa] rounded-lg flex justify-center items-center flex-col space-y-3 ">
                <Image
                  width={80}
                  height={80}
                  alt={data.title?.[locale]}
                  src={data.imageUrl}
                  className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-150"
                />
                <h1 className="text-heading04 font-semibold ">
                  {data.title?.[locale]}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Main Grid End */}
    </div>
  );
}

export default HomeCategory;
