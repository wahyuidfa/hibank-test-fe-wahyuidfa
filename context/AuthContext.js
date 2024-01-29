// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  const login = newToken => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };
  useEffect(() => {
    if (!token && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [token, router.pathname]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
