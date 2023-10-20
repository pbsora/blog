import { useState } from "react";

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [value, setStoredValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setValue = (newValue: unknown) => {
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setValue };
};

export default useLocalStorage;
