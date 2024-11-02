import { client } from "@/lib/sanity";

const GetFavoritesOfUsers = async (userId: string, adId: string) => {
  const query = `*[_type == "user" && _id == $Userid && $Adid in favoriteAds[]._ref  ] {
      favoriteAds
    }`;

  const params = {
    Userid: userId,
    Adid: adId,
  };

  try {
    const result = await client.fetch(query, params);




    if (result.length > 0) {

      return true;
    } else {

      return false;
    }
  } catch (error) {
    
    
    return error;
  }
};

export default GetFavoritesOfUsers;
