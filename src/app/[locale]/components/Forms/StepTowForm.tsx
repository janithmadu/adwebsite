import React from "react";
import { useNewAddContext } from "../../contexts/AddContext";

function StepTowForm() {
  const { updateNewAdd, newAdd } = useNewAddContext();

  return (
    <div className="mt-[32px] flex flex-col gap-y-[20px] ">
      <form className="flex flex-col gap-y-[20px] "></form>
    </div>
  );
}

export default StepTowForm;
