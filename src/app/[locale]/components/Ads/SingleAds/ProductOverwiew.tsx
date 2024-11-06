import { useTranslations } from "next-intl";
import React from "react";

interface ProductOverwiew {
  Model: string;
  Condition: string;
  Brand: string;
  Authenticity: string;
  State: string;
}

const ProductOverwiew: React.FC<ProductOverwiew> = ({
  Model,
  Condition,
  Brand,
  Authenticity,
  State,
}) => {
  const t = useTranslations("TopNav");
  return (
    <div className="min-w-full border-b px-[32px] py-5">
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Model")}</h1> <span>{Model}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Condition")}:</h1>{" "}
        <span>{Condition}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Brand")}:</h1> <span>{Brand}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("Authenticity")}:</h1>{" "}
        <span>{Authenticity}</span>
      </div>
      <div className="flex gap-x-3">
        <h1 className="text-grayscale400">{t("State")}:</h1> <span>{State}</span>
      </div>
    </div>
  );
};

export default ProductOverwiew;
