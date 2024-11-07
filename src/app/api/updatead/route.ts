import { client } from '@/lib/sanity';
import { NextResponse } from 'next/server';


// Define the request handler for updating an ad
export async function PATCH(request: Request) {
    console.log(request);

      try {
        // Parse the incoming request body (ad data)
        const { adId, adName, price, description, category, subcategory,user,brand,model,condition,Currency,authenticity,options,negotiable,features,photos,phoneNumber,country,state,payment} = await request.json();

        if (!adId || !adName || !price || !description) {
          return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
          );
        }

        // Prepare the updated data
        const updatedData = {
          adName,
          price,
          description,
          category,
          subcategory,
          user,
          brand,
          model,
          condition,
          Currency,
          authenticity,
          options,
          negotiable,
          features,
          photos,
          phoneNumber,
          country,
          state,
          payment
        };

        // Update the ad in Sanity
        const updatedAd = await client
          .patch(adId)
          .set(updatedData)
          .commit();

          console.log(updatedAd);
          

        // Return the updated document
        return NextResponse.json(
          { message: 'Ad updated successfully', updatedAd },
          { status: 200 }
        );
      } catch (error) {
        console.error('Error updating ad:', error);
        return NextResponse.json(
          { status: 500 }
        );
      }
}
