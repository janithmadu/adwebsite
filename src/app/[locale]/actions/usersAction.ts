import { client } from "@/lib/sanity";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const UserRegistration = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userID = user?.id;

  if (!userID) {
    return null;
  }

  const query = `*[_type == "user" && externalId == $externalId][0]{
        _id,
        name,
        email,
        externalId,
        avatarUrl
      }`;

  const params = { externalId: userID }; // Pass externalId to the query

  try {
    const userCheck = await client.fetch(query, params);

    if (userCheck) {
      return null;
    } else {
      const userData = {
        _type: "user", // Define the schema in Sanity for a 'user' type
        name: user?.given_name,
        email: user?.email,
        externalId: user?.id, // You can use this to track the user via Clerk ID
        avatarUrl: user?.picture,
      };

      const CreateUser = await client.createOrReplace({
        ...userData,
        _id: user.id,
      });
      return CreateUser;
    }
  } catch (err) {
    return null;
  }
};

export const GetFavoritesOfUsers = async (userId: string, adId: string) => {
  const query = `*[_type == "user" && _id == $userId && favoriteAds[]._ref == $adId] {
    favoriteAds
  }`;

  const params = {
    userId,
    adId,
  };

  try {
    const result = await client.fetch(query, params);

    if (result.length > 0) {
      return true; // Indicate that the ad is a favorite
    } else {
      return false; // Indicate that the ad is not a favorite
    }
  } catch (error) {
    return error; // Return null in case of error
  }
};

export const GetUsers = async (userId: string) => {
  const query = `*[_type == "user" && _id == $userId]{
  verifiedSeller,
  member,
  name,
  email,
  avatarUrl,
  _createdAt,
  bio
  

  }`;

  const params = {
    userId,
  };

  try {
    const result = await client.fetch(query, params);
 

    return result;  
  } catch (error) {
    return error;
  }
};
