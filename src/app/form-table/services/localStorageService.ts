import { FormData } from "../store/types";

export const loadDataFromLocalStorage = (): FormData[] => {
  const storedData = localStorage.getItem("formData");
  if (storedData) {
    return JSON.parse(storedData) as FormData[];
  }
  return [];
};

export const saveDataToLocalStorage = (data: FormData[]): void => {
  localStorage.setItem("formData", JSON.stringify(data));
};

export const clearDataFromLocalStorage = (): void => {
  localStorage.removeItem("formData");
};
