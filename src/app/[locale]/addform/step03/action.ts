import { NewAdd, stepOneSChema } from "@/lib/schemas";
import { AddDealRoutes } from "@/lib/types";
import { redirect } from "next/dist/server/api-utils";

export default function FinalForm(add: NewAdd) {
   
    console.log(add);
    

    const StepOneValidation = stepOneSChema.safeParse(add)
    if (!StepOneValidation.success) {
        return {
            redirect: AddDealRoutes.AddInformation,
            errorMsg: "Pleace Validate Ad info"
        }
    }


}