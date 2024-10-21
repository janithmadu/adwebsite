import AdsCategory from "../components/AdsPriview/AdsCategory/AdsCategory";

import {
  getAllCategory,
  getCategoryAndSubcategory,
} from "../actions/getCategories";
import {
  getAllSubCategories,
  getSubCategoryOptions,
} from "../actions/getSubCategories";
import { getAdsBySub } from "../actions/getAds";
import FilterBySubs from "../components/AdsPriview/GetAds/FilterBySubs";
import AdsSubOptions from "../components/AdsPriview/AdsCategory/AdsSubOptions";
import AddPriceFilter from "../components/AdsPriview/AdsCategory/AddPriceFilter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Hamburger } from "@phosphor-icons/react/dist/ssr";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default async function Home({ searchParams }: any) {
  const AllCategories = await getAllCategory();
  const subCategory = await getAllSubCategories();
  const getSubCategoryAndCategory = await getCategoryAndSubcategory();
  const { subcategory } = searchParams;
  const getOptions = await getSubCategoryOptions();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Main container */}
      <div className="inline lg:hidden">
        <Sheet>
          <SheetTrigger>
            <HamburgerMenuIcon />
          </SheetTrigger>
          <SheetContent className="overflow-scroll flex min-w-[300px] ">
            <SheetHeader className=" min-w-full">
              <div className="mb-6 ">
                <AdsCategory Categories={getSubCategoryAndCategory} />
              </div>
              <div className="mb-6">
                <AdsSubOptions Options={getOptions} />
              </div>

              <div className="mb-6">
                <AddPriceFilter />
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="container mx-auto flex px-5 rtl:gap-20  lg:px-5 xl:px-20 md:px-10">
        {/* Sidebar */}
        <aside className="w-[312px] hidden lg:inline bg-white rounded-lg p-4 shadow">
          {/* Category Section */}
          <div className="mb-6">
            <AdsCategory Categories={getSubCategoryAndCategory} />
          </div>
          <div className="mb-6">
            <AdsSubOptions Options={getOptions} />
          </div>

          <div className="mb-6">
            <AddPriceFilter />
          </div>
        </aside>

        {/* Main Content - Grid */}
        <main className="w-3/4 ml-4">
          <FilterBySubs />
        </main>
      </div>
    </div>
  );
}
