import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  }, [key, storedValue]);

  const setValue = (path, value) => {
    setStoredValue(prevValue => {
      if (!path || !path.length) return prevValue || {};

      const updatedValue = { ...prevValue };
      let current = updatedValue;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      current[path[path.length - 1]] = value;

      return updatedValue;
    });
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
