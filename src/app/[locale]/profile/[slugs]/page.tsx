import React from "react";
import ClientProfile from "../../components/ProfileComponets/ClientProfile";
import { GetAdByUser } from "../../actions/getAds";
import { GetUsers } from "../../actions/usersAction";

async function page({
  params,
  searchParams,
}: {
  params: { slugs: string };
  searchParams: any;
}) {
  const Page = parseInt(searchParams.page);
  const Limit = 5;
  const UserAds = await GetAdByUser(params.slugs, Page, Limit);
  const Users = await GetUsers(params.slugs);

  const date = new Date(Users[0]._createdAt);
  const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

  const fulldate = year + "-" + month + "-" + day;

  return (
    <div>
      <ClientProfile
        createdAt={fulldate}
        email={Users[0].email}
        verifiedSeller={Users[0].verifiedSeller}
        member={Users[0].member}
        name={Users[0].name}
        avatarUrl={Users[0].avatarUrl}
        UserAds={UserAds}
        ResultCount={UserAds.resultCount}
      />
    </div>
  );
}

export default page;
