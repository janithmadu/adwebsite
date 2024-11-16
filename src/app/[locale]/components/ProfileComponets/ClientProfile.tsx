"use client";
import React from "react";
import { useState } from "react";
import MyAds from "./MyAds";
import Image from "next/image";
interface ClientUserAds {
  ResultCount: number;
  UserAds: any;
  verifiedSeller: boolean;
  member: boolean;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
}
const ClientProfile: React.FC<ClientUserAds> = ({
  UserAds,
  ResultCount,
  verifiedSeller,
  member,
  name,
  email,
  avatarUrl,
  createdAt,
}) => {
  const [seller] = useState({
    name: name,
    email: email,
    avatarUrl: avatarUrl,
    storeName: "Doe’s Electronics",
    storeDescription: "The best electronics store in town.",
  });

  return (
    <div className=" container mx-auto flex flex-col px-5  lg:px-5 xl:px-20 md:px-10 gap-y-4  ">
      <div className=" bg-white p-6 rounded-lg shadow-md flex justify-between items-center gap-y-3 ">
        <div className="flex items-center space-x-6">
          <Image
            width={300}
            height={300}
            className=" w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-200"
            src={seller.avatarUrl || "/"}
            alt={seller.name}
          />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-3xl font-bold text-gray-800">{seller.name}</h1>
            <p className="text-gray-500">{seller.email}</p>
            <p className=" text-gray-700 text-bodysmall">
              Member since {createdAt}
            </p>
          </div>
        </div>

        <div className="flex gap-x-3">
          <div className="px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-danger100 flex justify-center items-center text-danger800 text-[13px]">
            {member ? <>Member</> : <>Not a Member</>}
          </div>
          <div className=" px-[12px] min-w-[76px] min-h-[24px] rounded-[100px] bg-success50 flex justify-center items-center text-success800 text-[13px]">
            {verifiedSeller ? <>Verified Seller</> : <>Not Verified Seller</>}
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className=" min-w-full">
        <h2 className="text-2xl font-semibold text-gray-800">Ads</h2>
        <MyAds
          delteActive={false}
          updateMount={false}
          UserAds={UserAds?.result}
          resultCount={UserAds?.resultCount}
          colcount={3}
        />
      </div>
    </div>
  );
};

export default ClientProfile;
