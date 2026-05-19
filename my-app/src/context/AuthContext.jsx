import { createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: (() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  })(),

  loading: false,
};

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
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

    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
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

  // Loading
  const setLoading = (value) => {
    dispatch({
      type: ACTIONS.LOADING,
      payload: value,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuth: !!state.user,
        loading: state.loading,
        login,
        logout,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
