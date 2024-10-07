import AdsCategory from "../components/AdsPriview/AdsCategory/AdsCategory";

import {
  getAllCategory,
  getCategoryAndSubcategory,
} from "../actions/getCategories";
import { getAllSubCategories } from "../actions/getSubCategories";

export default async function Home({ searchParams }:any) {
  const AllCategories = await getAllCategory();
  const subCategory = await getAllSubCategories();
  const getSubCategoryAndCategory = await getCategoryAndSubcategory();
  const { subcategory } = searchParams;
  console.log("Subcate"+subcategory);
  

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Main container */}
      <div className="container mx-auto flex px-5  lg:px-5 xl:px-20 md:px-10">
        {/* Sidebar */}
        <aside className="w-[312px] bg-white rounded-lg p-4 shadow">
          {/* Category Section */}
          <div className="mb-6">
            <AdsCategory Categories={getSubCategoryAndCategory} />
          </div>

          {/* Seller Type */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4">Seller Type</h2>
            <ul className="space-y-2">
              <li>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Member</span>
                </label>
              </li>
              <li>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Non-Member</span>
                </label>
              </li>
              <li>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Urgents</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content - Grid */}
        <main className="w-3/4 ml-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/car.jpg"
                alt="Toyota Fielder"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Toyota Fielder G HYBRID</h3>
                <p className="text-sm text-gray-500">Brazil</p>
                <p className="text-red-500 font-bold">$1200.00</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/camera.jpg"
                alt="Canon EOS Rebel"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Canon EOS Rebel SL3</h3>
                <p className="text-sm text-gray-500">New Mexico</p>
                <p className="text-red-500 font-bold">$1500.00</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/iphone.jpg"
                alt="iPhone 7 Plus"
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">Apple iPhone 7 Plus</h3>
                <p className="text-sm text-gray-500">USA</p>
                <p className="text-red-500 font-bold">$2300.00</p>
              </div>
            </div>

            {/* Add more cards */}
          </div>
        </main>
      </div>
    </div>
  );
}
