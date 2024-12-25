'use client'

import { useEffect } from 'react';
import { create } from 'zustand';
import { v4 } from 'uuid';
// Persistent Zustand Store
const useMyDataStore = create((set) => ({
  data: 'hello', // Default value
  setData: (data) => set({ data }),
}));

const init = ({setData,}) =>{
  setData(v4())
}

const RootPage = () => {

  // Subscribe to the Zustand store
  const { data, setData } = useMyDataStore((state) => state);

  useEffect(()=>{
    init({setData});
  },[]);

  return (
    <>
      <h3>{JSON.stringify(data)}</h3>
      <button
        onClick={() => {

          init({setData});
        }}
      >
        Change state
      </button>
    </>
  );
};

export default RootPage;
