import { FormType, SchemaAdPostForm } from "@/lib/schemas";
import { NextResponse } from "next/server";

export async function POST(reqest:Request) {

    const addata = await reqest.json()
   
    
    const {name,category,subcategory,brands,conditions,Currency,price,authenticity,mobileNumbe,description,country,state,options,images,featurs,model} = addata

    const SchemaData:FormType={
         name:name,
         category:category,
         country:country,
         Currency:Currency,
         description:description,
         price:price,
         state:state,
         mobileNumbe:mobileNumbe,
         subcategory:subcategory,
         authenticity:authenticity,
         brands:brands,
         conditions:conditions,
         options:options,
         model:model,
         negotiable:true


    }
    
    const resulet = SchemaAdPostForm.parse((SchemaData))

    console.log(JSON.parse(category).id);
    
    

    return NextResponse.json({status:"Done"})
    
}