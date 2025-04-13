'use client'

import { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext();

// Custom Hook to use Search Context
export const useSearch = () => {
  return useContext(SearchContext);
};

// Provider Component
export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
