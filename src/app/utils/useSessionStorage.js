'use client'
//custom hooks for getting the user info from localstorage
import { useState, useEffect } from 'react';

export function useSessionStorage(key = 'webloginData') { // Use default key 'loginResponse'
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = window.localStorage.getItem(key);
      setValue(storedValue == 'undefined' ? null : JSON.parse(storedValue)); // Handle potential errors
    }
  }, [key]);
  // console.log(value)
  return value; //returning the user object 
}