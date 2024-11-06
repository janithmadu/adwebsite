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
  
      const result = await client.delete(id.id)
     
      return NextResponse.json({
        message: "Ad Delete Successful",
        result,
        status: true,
      });
    } catch (error) {
    
      
      return NextResponse.json(
        { message: "Failed to Delete Ad", error },
        { status: 500 }
      );
    }
  }