import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // Load auth state from localStorage
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true",
  );

  // Login
  const login = () => {
    setIsAuth(true);

    localStorage.setItem("isAuth", "true");
  };

  // Logout
  const logout = () => {
    setIsAuth(false);

    localStorage.removeItem("isAuth");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
