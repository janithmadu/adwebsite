import React from "react";

import { getAllCategory } from "../../actions/getCategories";
import StepOneForm from "../../components/Forms/StepOneForm";

import { CheckUserLog } from "../../actions/ChekAuth";

async function page() {
  const GetCategory = await getAllCategory();
  await CheckUserLog();

  return (
    <>
      <StepOneForm categories={GetCategory} />
    </>
  );
}

export default page;
