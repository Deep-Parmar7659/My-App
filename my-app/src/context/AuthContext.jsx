import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: (() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  })(),
};

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
export default function AuthProvider({ children }) {
  // Load auth state from localStorage
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login
  const login = (userData) => {
    dispatch({
      type: ACTIONS.LOGIN,
      payload: userData,
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const logout = () => {
    dispatch({
      type: ACTIONS.LOGOUT,
    });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuth: !!state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
