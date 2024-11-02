import { client } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: NextRequest) {
    const id = await request.json();

    try {
        // Patch the document with the specified ID and set payment to true

        const { getAccessToken } = getKindeServerSession();
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const result = await client
            .patch(id.UserID) // The ID of the user document to update
            .setIfMissing({ favoriteAds: [] }) // Create the favoriteAds array if it doesn't exist
            .append('favoriteAds', [{ _key: id.AdID, _ref: id.AdID }]) // Append the new ad reference to the array
            .commit() // Perform the patch and return the document

        return NextResponse.json({
            message: "You've Favorited This Ad!",
            result,
            status: true,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Oops! Something Went Wrong", error },
            { status: 500 }
        );
    }
}

