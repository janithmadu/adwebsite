import React from "react";
import MainProfile from "../components/ProfileComponets/MainProfile";
import { GetAdByUser, GetAdByUserPayementFalse } from "../actions/getAds";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GetFavoritesAds from "../actions/GetFavoritesAds";

async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const UserAds = await GetAdByUser(user.id);
  const UserAdsPaymentFalse = await GetAdByUserPayementFalse(user.id);
  const UserFavoriteAds = await GetFavoritesAds(user.id);

  

  return (
    <div>
      <MainProfile
        UserAds={UserAds}
        UserAdsPaymentfalse={UserAdsPaymentFalse}
        UserFavoriteAds={UserFavoriteAds}
      />
    </div>
  );
}

export default page;
