"use client"
import React, { useEffect } from "react";
import { useNewAddContext } from "../../contexts/AddContext";
import { FromErrors } from "@/lib/types";
import { getOptionsByID } from "../../actions/getOptions";

const initiateState: FromErrors = {};






function StepTowForm() {
  const { updateNewAdd, newAdd } = useNewAddContext();

  console.log(newAdd.subcategory);

  useEffect(()=>{

    const getOptions =  async ()=>{
      const  response = await getOptionsByID(newAdd?.subcategory as string)

      console.log(response);
      

    }

  },[newAdd])
  
  
  return (
    <div className="mt-[32px] flex flex-col gap-y-[20px] ">
      <form className="flex flex-col gap-y-[20px] ">
        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="50"
            placeholder="Ad description"
            className="border border-grayscale50 px-[18px] py-[12px] rounded-[5px]"
          />
        </div>

        <div className="flex flex-col gap-y-[8px]">
          <label className="text-grayscale900">Options</label>
         
        </div>
      </form>
    </div>
  );
}

export default StepTowForm;
