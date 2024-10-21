"use client";
import {
  NewAdd,
  newAddsInitialValuesSchema,
  newAddsInitialValuesType,
} from "@/lib/schemas";
import { error } from "console";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const defaultData: newAddsInitialValuesType = {
  name: "",
  category: "",
};

type addsContextType = {
  newAdd: newAddsInitialValuesType;
  updateNewAdd: (newAddDetails: Partial<NewAdd>) => void;
  dataLoaded: boolean;
  resetLocalStorage: () => void;
};

export const AddsContext = createContext<addsContextType | null>(null);

export const AddsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newAdd, setNewAdd] = useState<newAddsInitialValuesType>(defaultData);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    readFromLocalStorage();
    setDataLoaded(true);
  }, []);

  const writeToLocalStorage = useCallback(() => {
    localStorage.setItem("newDealData", JSON.stringify(newAdd));
  }, [newAdd]);

  useEffect(() => {
    if (dataLoaded) {
      writeToLocalStorage();
    }
  }, [newAdd, dataLoaded, writeToLocalStorage]);

  const updateNewAdd = (newAddDetails: Partial<NewAdd>) => {
    setNewAdd((prevData) => ({ ...prevData, ...newAddDetails }));
  };

  const resetLocalStorage = () => {
    setNewAdd(defaultData);
    localStorage.setItem("newDealData", JSON.stringify(defaultData));
  };

  const readFromLocalStorage = () => {
    const data = localStorage.getItem("newDealData");

    if (!data) {
      return setNewAdd(defaultData);
    }

    const validate = newAddsInitialValuesSchema.safeParse(JSON.parse(data));

    if (validate.success) {
      setNewAdd(validate.data);
    } else {
      setNewAdd(defaultData);
    }
  };

  return (
    <AddsContext.Provider
      value={{ newAdd, updateNewAdd, dataLoaded, resetLocalStorage }}
    >
      {children}
    </AddsContext.Provider>
  );
};

export function useNewAddContext() {
  const context = useContext(AddsContext);
  if (!context) {
    throw new Error("useNewAddContext must be used within an AddDealContext");
  }
  return context;
}
