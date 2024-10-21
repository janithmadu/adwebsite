"use client";
import React from "react";
import { useNewAddContext } from "../../contexts/AddContext";

interface InputProps {
  lable?: string;
  id?: string;
  description?: string;
  required?: boolean;
  type?: string;
  minLength?: number;
  min?: number;
  max?: number;
  errorMsg?: string;
  className?: string;
}

function Input({
  lable,
  id,
  description,
  required,
  type,
  minLength,
  min,
  max,
  errorMsg,
  className,
}: InputProps) {
  const { updateNewAdd, newAdd } = useNewAddContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNewAdd({ ...newAdd, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col">
      <label className="text-grayscale900">{lable}</label>
      <input
        type={type}
        name={id}
        id={id}
        required={required}
        minLength={minLength}
        min={min}
        max={max}
        placeholder={description}
        className={`min-h-[48px] border border-[#EDEFF5] rounded-[5px] px-[18px] py-[12px] ${className}`}
        onChange={handleInputChange}
        defaultValue={newAdd[id]}
      ></input>
    </div>
  );
}

export default Input;
