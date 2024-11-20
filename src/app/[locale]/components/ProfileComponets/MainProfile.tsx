"use client";
import React, { useEffect, useState } from "react";
import MyAds from "./MyAds";
import MyMembership from "./MyMembership";
import Favorites from "./Favorites";
// import Settings from "./Settings";
import { PostAd } from "@/lib/categoryInterface";
import {
  ClipboardText,
  Gear,
  Heart,
  Shield,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import DraftAds from "./DraftAds";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListBullets } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Settings from "./Settings";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GetUsers } from "../../actions/usersAction";

interface MainProfileProps {
  UserAds: PostAd[];
  UserAdsPaymentfalse: PostAd[]; // Expecting an array of PostAd objects
  UserFavoriteAds: PostAd[];
  resultCount: number;
  verifiedSeller: boolean;
  member: boolean;
}

const MainProfile: React.FC<MainProfileProps> = ({
  UserAds,
  UserAdsPaymentfalse,
  UserFavoriteAds,
  resultCount,
  verifiedSeller,
  member,
}) => {
  const [activeSection, setActiveSection] = useState("MyAds");
  const t = useTranslations("TopNav");

  const { user, getUser } = useKindeBrowserClient();
  const currentUser = getUser();

  // Function to render the component based on the active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "MyAds":
        return (
          <MyAds
            colcount={2}
            delteActive={true}
            updateMount={true}
            UserAds={UserAds}
            resultCount={resultCount}
            title={true}
            timedate={true}
          />
        );
      case "MyMembership":
        return <MyMembership member={member} verifiedSeller={verifiedSeller} />;
      case "DraftAds":
        return (
          <DraftAds UserAds={UserAdsPaymentfalse} resultCount={resultCount} />
        );
      case "Favorites":
        return <Favorites UserAds={UserFavoriteAds} />;
      case "Settings":
        return <Settings />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="container mx-auto md:flex  md:gap-x-3  px-5  lg:px-5 xl:px-20 md:px-10 ">
      <div className=" flex items-center justify-end md:hidden min-w-full ">
        <Sheet>
          <SheetTrigger>
            <ListBullets size={24} className="text-bodymedium" />
          </SheetTrigger>
          <SheetContent className="overflow-scroll flex min-w-[300px] ">
            <SheetHeader className=" min-w-full">
              <aside
                id="cta-button-sidebar"
                className=" md:w-64 h-auto  md:inline "
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
                        <span className=" md:inline ms-3">{t("MyAds")}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => setActiveSection("MyMembership")}
                      >
                        <Shield size={24} color="gray" />
                        <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                          {t("MyMembership")}
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
                        <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                          {t("DraftAds")}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => setActiveSection("Favorites")}
                      >
                        <Heart size={24} color="gray" />
                        <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                          {t("Favorites")}
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        onClick={() => setActiveSection("Settings")}
                      >
                        <Gear size={24} color="gray" />
                        <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                          {t("Settings")}
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div
                    id="dropdown-cta"
                    className="   p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
                    role="alert"
                  >
                    <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                      {t("profilenavdis")}
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
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <aside
        id="cta-button-sidebar"
        className=" md:w-64 h-auto hidden md:inline "
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
                <span className=" md:inline ms-3">{t("MyAds")}</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("MyMembership")}
              >
                <Shield size={24} color="gray" />
                <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                  {t("MyMembership")}
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
                <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                  {t("DraftAds")}
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("Favorites")}
              >
                <Heart size={24} color="gray" />
                <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                  {t("Favorites")}
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={() => setActiveSection("Settings")}
              >
                <Gear size={24} color="gray" />
                <span className=" md:inline flex-1 ms-3 whitespace-nowrap">
                  {t("Settings")}
                </span>
              </a>
            </li>
          </ul>
          <div
            id="dropdown-cta"
            className=" hidden md:inline p-4 mt-6 rounded-lg  dark:bg-blue-900"
            role="alert"
          >
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              {t("profilenavdis")}
            </p>
          </div>
        </div>
      </aside>
      <main className="flex-grow ">{renderActiveSection()}</main>
    </div>
  );
};

export default MainProfile;
