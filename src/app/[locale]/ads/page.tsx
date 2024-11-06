//import AdsCategory from "../components/AdsPriview/AdsCategory/AdsCategory";

import { getCategoryAndSubcategory } from "../actions/getCategories";
import { getSubCategoryOptions } from "../actions/getSubCategories";

//import FilterBySubs from "../components/AdsPriview/GetAds/FilterBySubs";
// import AdsSubOptions from "../components/AdsPriview/AdsCategory/AdsSubOptions";
// import AddPriceFilter from "../components/AdsPriview/AdsCategory/AddPriceFilter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../../components/ui/sheet";
import dynamic from "next/dynamic";

import { ListBullets } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 1;

const FilterBySubs = dynamic(
  () => import("../components/AdsPriview/GetAds/FilterBySubs"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const AdsCategory = dynamic(
  () => import("../components/AdsPriview/AdsCategory/AdsCategory"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const AdsSubOptions = dynamic(
  () => import("../components/AdsPriview/AdsCategory/AdsSubOptions"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const AddPriceFilter = dynamic(
  () => import("../components/AdsPriview/AdsCategory/AddPriceFilter"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default async function Home() {
  const [getSubCategoryAndCategory, getOptions] = await Promise.all([
    getCategoryAndSubcategory(),
    getSubCategoryOptions(),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 sm:p-4 p-1">
      {/* Main container */}
      <div className="inline md:hidden">
        <Sheet>
          <SheetTrigger>
            <ListBullets size={24} className="text-bodymedium" />
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
      <div className="container mx-auto md:flex sm:px-5 rtl:gap-20  lg:px-5 xl:px-20 md:px-5 rtl:gap-x-[100px]">
        {/* Sidebar */}
        <aside className=" w-[210px] lg:w-[312px] hidden md:inline bg-white rounded-lg p-4 shadow ">
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
        <main className="md:w-3/4 sm:ml-4 w-full">
          <FilterBySubs />
        </main>
      </div>
    </div>
  );
}
