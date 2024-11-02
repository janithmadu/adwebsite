"use client";
import React, { useState } from "react";
import MyAds from "./MyAds";
import MyMembership from "./MyMembership";
import Favorites from "./Favorites";
import Settings from "./Settings";
import { PostAd } from "@/lib/categoryInterface";
import {
  ClipboardText,
  Gear,
  Heart,
  Shield,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import DraftAds from "./DraftAds";

interface MainProfileProps {
  UserAds: PostAd[];
  UserAdsPaymentfalse: PostAd[]; // Expecting an array of PostAd objects
  UserFavoriteAds: PostAd[];
}

const MainProfile: React.FC<MainProfileProps> = ({
  UserAds,
  UserAdsPaymentfalse,
  UserFavoriteAds,
}) => {
  const [activeSection, setActiveSection] = useState("MyAds");

 
  
  // Function to render the component based on the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "MyAds":
        return <MyAds UserAds={UserAds} />;
      case "MyMembership":
        return <MyMembership />;
      case "DraftAds":
        return <DraftAds UserAds={UserAdsPaymentfalse} />;
      case "Favorites":
        return <Favorites UserAds={UserFavoriteAds}/>;
      case "Settings":
        return <Settings />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="container mx-auto flex  gap-x-3  px-5  lg:px-5 xl:px-20 md:px-10">
      <aside
        id="cta-button-sidebar"
        className=" w-64 h-auto transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("MyAds")}
              >
                <UserCircle size={24} color="gray" />
                <span className="ms-3">My Ads</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("MyMembership")}
              >
                <Shield size={24} color="gray" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Membership
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("DraftAds")}
              >
                <ClipboardText size={24} color="gray" />
                <span className="flex-1 ms-3 whitespace-nowrap">Draft Ads</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("Favorites")}
              >
                <Heart size={24} color="gray" />
                <span className="flex-1 ms-3 whitespace-nowrap">Favorites</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("Settings")}
              >
                <Gear size={24} color="gray" />
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
            role="alert"
          >
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
                Beta
              </span>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                data-dismiss-target="#dropdown-cta"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
               
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              Preview the new Flowbite dashboard navigation! You can turn the
              new navigation off for a limited time in your profile.
            </p>
            <a
              className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              href="#"
            >
              Turn new navigation off
            </a>
          </div>
        </div>
      </aside>
      <main className="flex-grow ">{renderActiveSection()}</main>
    </div>
  );
};

export default MainProfile;
