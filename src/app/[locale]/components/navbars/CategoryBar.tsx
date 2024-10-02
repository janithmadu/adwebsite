import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllCategory,
  getlimitedCategory,
} from "@/app/[locale]/actions/getCategories";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const revalidate = 1;

async function CategoryBar(CurrentLocal: any) {
  const t = useTranslations("TopNav");

  //get category that limit to 7
  const getLimitedCate: any = await getlimitedCategory();
  //get all category
  const getallCategory = await getAllCategory();
  const getCurentLocal = CurrentLocal.CurrentLocal;

  return (
    <div className="min-h-[50px] flex items-center ">
      <div className="flex items-center rtl:gap-[24px]  space-x-[24px]">
        {/* Select category section */}

        <Select>
          <SelectTrigger className="w-[173px] font-bold border-none bg-grayscale20 text-grayscale700">
            <SelectValue placeholder={t("CategoryPlaceHolder")} />
          </SelectTrigger>
          <SelectContent>
            {getallCategory.length === 0 ? (
              <SelectItem value="art">You have no category</SelectItem>
            ) : (
              getallCategory.map((item: any, index: any) => {
                return (
                  <SelectItem key={index} value="art">
                    <Link
                      href={getCurentLocal + "/category/" + item?.slug?.current}
                    >
                      {item.title?.[getCurentLocal]}
                    </Link>
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>

        {/* Select category section End */}

        {/* Category Bar section */}

        <div className="border-l hidden   lg:flex-wrap  rtl:border-r rtl:border-l-0 rtl:gap-[24px]  xl:flex items-center space-x-[24px] px-[24px]">
          {getLimitedCate.length === 0 ? (
            <div className="text-grayscale600  text-heading04 hover:text-grayscale800 hover:font-bold">
              {" "}
              You have no category
            </div>
          ) : (
            getLimitedCate.map((item: any, index: any) => {
              return (
                <Link
                  key={index}
                  href={getCurentLocal + "/category/" + item?.slug?.current}
                  className="text-grayscale600  text-heading04 hover:text-grayscale800 hover:font-bold"
                >
                  {item.title?.[getCurentLocal]}
                </Link>
              );
            })
          )}
        </div>
        {/* Category Bar section End */}
      </div>
    </div>
  );
}

export default CategoryBar;
