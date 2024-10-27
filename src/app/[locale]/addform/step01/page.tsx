import React from "react";

import { getAllCategory } from "../../actions/getCategories";
import StepOneForm from "../../components/Forms/StepOneForm";


import { redirect } from "next/navigation";
import { CheckUserLog } from "../../actions/ChekAuth";

async function page() {
  const GetCategory = await getAllCategory();
  const CheckAuth = await CheckUserLog()

  return (
    <>
      <StepOneForm GetCategory={GetCategory} />
    </>
  );
}

export default page;
