import React from "react";

function ProductOverwiew({
  Model,
  Condition,
  Brand,
  Authenticity,
  State,
}: any) {
  return (
    <div className="min-w-full border-b px-[32px] py-5">
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">Model:</h1> <span>{Model}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">Condition:</h1>{" "}
        <span>{Condition}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">Brand:</h1> <span>{Brand}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">Authenticity:</h1>{" "}
        <span>{Authenticity}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">State:</h1> <span>{State}</span>
      </div>
    </div>
  );
}

export default ProductOverwiew;
