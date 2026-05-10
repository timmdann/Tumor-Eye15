import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";
import { setUser, clearUser } from "@/store/slices/authSlice";
import type { UserRole } from "@/types/api";
import App from "./App";
import "./index.css";

supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    const meta = session.user.user_metadata;
    store.dispatch(
      setUser({
        role: meta.role as UserRole,
        username: meta.username,
        email: session.user.email ?? "",
      }),
    );
  }
});

supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    const meta = session.user.user_metadata;
    store.dispatch(
      setUser({
        role: meta.role as UserRole,
        username: meta.username,
        email: session.user.email ?? "",
      }),
    );
  } else {
    store.dispatch(clearUser());
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
