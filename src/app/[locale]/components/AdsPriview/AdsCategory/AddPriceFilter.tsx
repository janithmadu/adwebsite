"use client";
// components/PriceSlider.tsx
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range, getTrackBackground } from "react-range";

const STEP = 1;
const MIN = 0;
const MAX = 1000;

const AddPriceFilter = () => {
  const [values, setValues] = useState([100, 500]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update query params for price range when Apply Filter is clicked
  const applyFilter = () => {
    const currentParams = new URLSearchParams(searchParams.toString());

    // Set the new price range parameters
    currentParams.set("minPrice", values[0].toString());
    currentParams.set("maxPrice", values[1].toString());

    // Push the updated query params without replacing the existing ones
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="text-xl font-semibold mb-2">Price Range</div>

      {/* Display current price range */}
      <div className="flex justify-between mb-4">
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>

      {/* Slider */}
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            dir="ltr"
            {...props}
            className="w-full h-1 bg-gray-300 rounded "
            style={{
              background: getTrackBackground({
                values,
                colors: ["#ccc", "#0ea5e9", "#ccc"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            className={`w-5 h-5 bg-blue-500 rounded-full shadow-md cursor-pointer ${
              isDragged ? "shadow-lg" : ""
            }`}
          />
        )}
      />

      {/* Apply Filter Button */}
      <div className="mt-6">
        <button
          onClick={applyFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default AddPriceFilter;
