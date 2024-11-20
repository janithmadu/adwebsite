import { GetUsers } from "@/app/[locale]/actions/usersAction";
import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const user = await GetUsers(userId); // Call your server action


        return NextResponse.json(user);
    } catch (error) {


        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const addata = await req.json();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    console.log(addata.images);
    

    const updateUser = {
        name: addata.data.name,
        email: addata.data.email,
        externalId:user.id,
        avatarUrl: addata?.images,
        bio: addata.data.bio

    }

    console.log(updateUser);
    
    try {
        const response = await client
        .patch(user.id)
        .set(updateUser)
        .commit();
    } catch (error) {
        console.log(error);
        
    }


    return NextResponse.json(addata);



}
