import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./context/SocketContext.jsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketProvider>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </SocketProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
