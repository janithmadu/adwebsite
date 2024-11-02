import { Category } from "@/lib/categoryInterface";
import { useTranslations } from "next-intl";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const revalidate = 1;

interface getCategory{
  getCategory:Category[]
}

const HomeCategory:React.FC<getCategory> = ({getCategory})=>{
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
        {getCategory.map((data: Category, index: number) => {
          return (
            <Link
              key={index}
              href={`${locale}/ads?page=1&category=${data?.slug?.current}`}
            >
              <div className="min-w-[170px] min-h-[170px] bg-[#f7f8fa] rounded-lg flex justify-center items-center flex-col space-y-3 ">
                <Image
                  width={80}
                  height={80}
                  alt={data.title?.[locale as "en" | "ar"]}
                  src={data.imageUrl || "/defultimage.png"}
                  className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-150"
                />
                <h1 className="text-heading04 font-semibold ">
                  {data.title?.[locale as "en" | "ar"]}
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
