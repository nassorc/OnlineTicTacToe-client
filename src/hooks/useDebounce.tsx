import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebounceValue] = useState(value);
  useEffect(() => {
    let timer;
    if(value) {
      timer = setTimeout(() => {
        console.log('setting debounce')
        setDebounceValue(debouncedValue);
      }, delay);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}