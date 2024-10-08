"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function AddSubcategory({ subcatotitle, subcatoId }: any) {

  return (
    <div>
      <li>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
          />
          <span className="ml-2">{subcatotitle}</span>
        </label>
      </li>
    </div>
  );
}

export default AddSubcategory;
