import React from 'react';
import { useState,useEffect } from 'react';

export default function useDebounce(delay,value) {
    const [debouncedValue, setDebouncedValue]=useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedValue(value);
        },delay);

        return ()=> {
            clearTimeout(handler);
        };
    },[value,delay]);
  return debouncedValue;
}
