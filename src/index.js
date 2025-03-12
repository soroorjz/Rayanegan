import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // تغییر به اینجا

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 ساعت
      cacheTime: 1000 * 60 * 60 * 24, // 24 ساعت
      retry: 1,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
