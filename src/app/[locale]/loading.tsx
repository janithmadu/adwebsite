import Image from "next/image";
import LoadingImage from "../../../public/system-regular-715-spinner-horizontal-dashed-circle-loop-jab.gif";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="text-center mb-10">
      <Image alt="Loading" src={LoadingImage} width={70} height={70} />
    </div>
  </div>
  }