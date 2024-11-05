"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SubCategory {
  subcatotitle:string
  subcatoId:string
}

const  AddSubcategory:React.FC<SubCategory> = ({ subcatotitle, subcatoId }) => {
  
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  // Update state when URL query changes
  useEffect(() => {
    const subcategoryQuery = searchParams.get("subcategories");
    if (subcategoryQuery) {
      setSelectedSubcategories(subcategoryQuery.split(","));
    } else {
      setSelectedSubcategories([]); // Reset when no query found
    }
  }, [searchParams]);

  const handleSubcategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subcategoryId: string
  ) => {
    const isChecked = e.target.checked;
    let updatedSubcategories = [...selectedSubcategories];

    if (isChecked) {
      updatedSubcategories.push(subcategoryId);
    } else {
      updatedSubcategories = updatedSubcategories.filter(
        (id) => id !== subcategoryId
      );
    }

    setSelectedSubcategories(updatedSubcategories);

    // Create a new URLSearchParams object to handle existing queries
    const params = new URLSearchParams(window.location.search);

    // Update or set the subcategories parameter
    if (updatedSubcategories.length > 0) {
      params.set("subcategories", updatedSubcategories.join(","));
    } else {
      params.delete("subcategories");
    }

    // Update the URL with the new query while preserving existing queries
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div>
      <li>
        <label className="inline-flex items-center mx-2 ">
          <input
            type="checkbox"
            className="form-checkbox bg-primary500 peer"
            checked={selectedSubcategories.includes(subcatoId)}
            onChange={(e) => handleSubcategoryChange(e, subcatoId)}
          />
          <span className="ml-2 text-">{subcatotitle}</span>
        </label>
      </li>
    </div>
  );
}

export default AddSubcategory;
