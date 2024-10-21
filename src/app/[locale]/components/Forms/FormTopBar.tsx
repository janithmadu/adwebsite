import { StackSimple } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import FormTopBarIcon from "./FormTopBarIcon";
import Link from "next/link";

function FormTopBar() {
  return (
    <div className="flex items-center justify-between py-[23px] border-b">
      <Link href="step01">
        <FormTopBarIcon Link="/" Titile="Ads Information" Step="Steps 01" />
      </Link>

      <Link href="step02">
        <FormTopBarIcon
          Link="/"
          Titile="Description, Features & Images"
          Step="Steps 02"
        />
      </Link>

      <Link href="step03">
        <FormTopBarIcon Link="/" Titile="Post Ads" Step="Steps 03" />
      </Link>
    </div>
  );
}

export default FormTopBar;
