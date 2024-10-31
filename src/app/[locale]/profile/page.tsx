import React from "react";
import MainProfile from "../components/ProfileComponets/MainProfile";
import { GetAdByUser } from "../actions/getAds";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const UserAds = await GetAdByUser(user.id);

  return (
    <div>
      <MainProfile UserAds={UserAds} />
    </div>
  );
}

export default page;
