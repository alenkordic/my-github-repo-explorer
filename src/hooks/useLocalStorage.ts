import { useState } from "react";
import StorageService from "./../services/storage";

const useLocalStorage = (key: string, initialValue: any) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return StorageService.getItem(key, initialValue);
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that...
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      StorageService.setItem(key, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const removeValue = () => {
    try {
      // Save state
      setStoredValue("");
      // Remove from local storage
      StorageService.removeItem(key);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
