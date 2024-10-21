import React from "react";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";
import { getAllCategory } from "../../actions/getCategories";
import StepOneForm from "../../components/Forms/StepOneForm";

async function page() {
  const GetCategory = await getAllCategory();
 
  
  return (
    <>
      <StepOneForm GetCategory={GetCategory} />
    </>
  );
}

export default page;
