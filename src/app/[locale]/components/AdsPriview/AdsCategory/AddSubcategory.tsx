"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function AddSubcategory({ subcatotitle, subcatoId }: any) {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );

  const router = useRouter();

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategories(
      (prev) =>
        prev.includes(subcategoryId)
          ? prev.filter((id) => id !== subcategoryId) // Deselect if already selected
          : [...prev, subcategoryId] // Select if not already selected
    );

    // Construct the new URL
    const currentQuery = new URLSearchParams(window.location.search);
    if (
      currentQuery.has("subcategory") &&
      currentQuery.get("subcategory") === subcategoryId
    ) {
      currentQuery.delete("subcategory"); // Remove the query if it matches
    } else {
      currentQuery.set("subcategory", subcategoryId); // Set the new subcategory ID
    }

    console.log(subcategoryId);

    // Update the URL without reloading the page
    router.push(`${window.location.pathname}?${currentQuery.toString()}`);
  };

  return (
    <div>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={() => handleSubcategorySelect(subcatoId)}
          />
          <span className="ml-2">{subcatotitle}</span>
        </label>
      </li>
    </div>
  );
}

export default AddSubcategory;
