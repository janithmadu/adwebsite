import GetVerified from "./GetVerified";

type Membership = {
  verifiedSeller: boolean;
  member: boolean;
};

function MyMembership({ verifiedSeller, member }: Membership) {
  return (
    <div className="flex min-w-full min-h-full justify-center items-center">
      {verifiedSeller && member ? (
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-bodylarge font-semibold text-green-600">
            Verified Member
          </h1>
          <p className="text-sm text-gray-600">
            Your account is verified and trusted. Enjoy the benefits of being a
            verified member.
          </p>
         
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-bodylarge font-semibold">
            You are not verified yet!
          </h1>
          <p className="text-sm">
            Get verified to boost your trust and gain priority in search
            results.
          </p>

          <GetVerified />
        </div>
      )}
    </div>
  );
}

export default MyMembership;
