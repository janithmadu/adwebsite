"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PaginationComponent({ TotoleCount, PageSisze }: any) {
  const totalPages = Math.ceil(TotoleCount / PageSisze);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    // Sync the state with the current query parameter from the URL
    setPage(currentPage);
  }, [currentPage]);

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); // Keep existing params
    params.set("page", newPage.toString()); // Update page number

    // Use router.push to update the URL without refreshing the page
    router.push(`?${params.toString()}`);
  };

  const handlePageClick = (pageNumber: any) => {
    setPage(pageNumber);
    const params = new URLSearchParams(searchParams.toString()); // Keep existing params

    params.set("page", pageNumber.toString()); // Update page number
    router.push(`?${params.toString()}`);
    // Here, you can fetch the new data based on the selected page (e.g., API call)
    console.log(`Navigating to page: ${pageNumber}`);
  };

  return (
    <div className="min-w-full flex justify-center  items-center py-10" dir="ltr">
      <div className="flex items-center  gap-5">
      <button className="min-w-[48px] min-h-[48px]  bg-primary100 flex justify-center items-center rounded-[4px]" onClick={() => changePage(page - 1)} disabled={page <= 1}>
        <ArrowLeft width={24} height={24} className="text-primary500" />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <div
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={` ${currentPage === pageNumber ? "bg-primary500 text-white" : "bg-grayscale50 text-grayscale900"}  min-w-[48px] min-h-[48px] rounded-[4px] flex justify-center items-center cursor-pointer`}
           
          >
            <span className="flex justify-center">{pageNumber}</span>
          </div>
        );
      })}

      <button
        disabled={totalPages <= currentPage}
        onClick={() => changePage(page + 1)}
        className="min-w-[48px] min-h-[48px]  bg-primary100 flex justify-center items-center rounded-[4px]"
      >
         <ArrowRight width={24} height={24} className="text-primary500" />
      </button>
      </div>
    </div>
  );
}

export default PaginationComponent;
