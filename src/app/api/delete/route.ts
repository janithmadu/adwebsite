import { client } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  try {
    const query = `
      *[references($adId)] {
        _id
      }
    `;
    const params = { adId: id };
    const referencingDocs = await client.fetch(query, params);

    const fevdata = await Promise.all(
      referencingDocs.map((doc: any) =>
        client
          .patch(doc._id)
          .unset([`favoriteAds[_ref=="${id}"]`])
          .commit()
      )
    );

    if (fevdata) {
      const result = await client.delete(id);
      return NextResponse.json({
        message: "Ad deleted and references removed successfully",
        result,
        status: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete ad", error: error },
      { status: 500 }
    );
  }
}
