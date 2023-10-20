import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue?: unknown) => {
  const [value, setStoredValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) {
      JSON.parse(item);
      setStoredValue(item);
    }
  }, [key]);

  const setValue = (newValue: unknown) => {
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, setValue };
};

export default useLocalStorage;
