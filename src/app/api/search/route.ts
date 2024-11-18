import { client } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the search query from the request body
    const { searchText } = await request.json();


    

    if (!searchText || searchText.trim() === "") {
      return NextResponse.json({ error: "Search text is required" }, { status: 400 });
    }

    // Define GROQ query for Sanity
    const query = `
      *[_type == "postAd" && (adName match $searchText || description match $searchText)] {
        _id,
        adName,
        description,
        image,
        price,
        Currency
      }
    `;

    // Fetch data from Sanity
    const results = await client.fetch(query, { searchText: `${searchText}*` });


    console.log(results);
    

    // Respond with search results
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
       return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
