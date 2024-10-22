"use client"
import React, { useEffect } from "react";
import { useNewAddContext } from "../../contexts/AddContext";
import FinalForm from "../../addform/step03/action";
import { NewAdd } from "@/lib/schemas";

const ReviewForm = () => {
  const { newAdd } = useNewAddContext();

    const handledFromSubmit = async (formdata: FormData) => {
        const res = await FinalForm(newAdd as NewAdd);
      };


  return (
    <form action={handledFromSubmit}>
      <p>{newAdd.name}</p>
      <p>{newAdd.Authenticity}</p>
      <button
        className={`min-w-[193px] min-h-[58px] bg-primary500 text-white rounded-[6px] flex justify-center items-center gap-x-[12px]}`}
        type="submit"
      >
        <span>Upload Your Ad</span>
      </button>
    </form>
  );
};

export default ReviewForm;
