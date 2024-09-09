"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context
interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
}

// Create the context with default values
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Custom hook for accessing token context
export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

// Provider component to wrap the app or part of the app
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  // Function to get the token from cookies
  const fetchTokenFromCookies = () => {
    const getCookieValue = (name: string) => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
      return cookie ? cookie.split("=")[1] : null;
    };

    const tokenCookie = getCookieValue("token");
    if (tokenCookie) {
      setTokenState(tokenCookie);
    }
  };

  // Function to set token in both state and cookies
  const setToken = (newToken: string) => {
    document.cookie = `token=${newToken}; path=/;`;
    setTokenState(newToken);
  };

  // Fetch the token on mount
  useEffect(() => {
    fetchTokenFromCookies();
  }, []);

  // Provide the token and setter function to children
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
