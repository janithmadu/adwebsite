import { PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const MobilePostAd = () => {
  return (
    <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary500 px-7 mb-4 font-bold py-3 rounded-full text-white">
      <Link href="/post-ad" className="flex items-center gap-x-1">
        <PlusCircle size={22} />
        Post Ad
      </Link>
    </div>
  );
};

export default MobilePostAd;
