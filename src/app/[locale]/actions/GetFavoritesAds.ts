import { client } from "@/lib/sanity";


const GetFavoritesAds = async (userId: string) => {
    const query = `*[_type == "user" && _id == $Userid ] {
        favoriteAds[]->{
       adName,
       category->{
        _id,
        title
      },
      subcategory->{
        _id,
        title
      },
      brand,
      model,
      condition,
      authenticity,
      tags,
      price,
      negotiable,
      description,
      features,
      photos[] {
        asset->{
          _id,
          url
        }
      },
      phoneNumber,
      backupPhoneNumber,
      email,
      website,
      country,
      city,
      state,
      location,
      mapLocation,
      Currency,
      _createdAt

      }
      }`;

    const params = {
        Userid: userId,
    };

    try {
        const result = await client.fetch(query, params);
       

        return result[0].favoriteAds
    } catch (error) {
        
        
        return error;
    }
}

export default GetFavoritesAds