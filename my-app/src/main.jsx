import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1f2937",
                color: "#fff",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "14px",
              },

              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#fff",
                },
              },

              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />

          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
