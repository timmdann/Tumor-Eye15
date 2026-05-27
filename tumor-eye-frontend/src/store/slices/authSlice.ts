import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase";
import type { UserRole } from "@/types/api";

interface AuthState {
  role: UserRole | null;
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  role: null,
  isAuthenticated: false,
  username: null,
  email: null,
  loading: false,
  error: null,
};

const AUTH_ERROR_MAP: Record<string, string> = {
  "User already registered": "An account with this email already exists.",
  "Invalid login credentials": "Incorrect email or password.",
  "Email not confirmed": "Please confirm your email before logging in.",
  "Password should be at least 6 characters": "Password must be at least 6 characters.",
  "Unable to validate email address: invalid format": "Please enter a valid email address.",
  "signup is disabled": "New registrations are currently disabled.",
};

function translateAuthError(message: string): string {
  return AUTH_ERROR_MAP[message] ?? "Something went wrong. Please try again.";
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      username,
      role,
    }: { email: string; password: string; username: string; role: UserRole },
    { rejectWithValue },
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, role } },
      });
      if (error) return rejectWithValue(translateAuthError(error.message));
      return data;
    } catch {
      return rejectWithValue("Something went wrong. Please try again.");
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return rejectWithValue(translateAuthError(error.message));
      return data;
    } catch {
      return rejectWithValue("Something went wrong. Please try again.");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue("Failed to sign out. Please try again.");
    } catch {
      return rejectWithValue("Failed to sign out. Please try again.");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        role: UserRole;
        username: string;
        email: string;
      }>,
    ) {
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.role = null;
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const meta = action.payload?.user?.user_metadata;
        if (meta) {
          state.role = meta.role as UserRole;
          state.username = meta.username as string;
          state.email = action.payload?.user?.email ?? null;
          state.isAuthenticated = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : "Something went wrong. Please try again.";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const meta = action.payload?.user?.user_metadata;
        if (meta) {
          state.role = meta.role as UserRole;
          state.username = meta.username as string;
          state.email = action.payload?.user?.email ?? null;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : "Something went wrong. Please try again.";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.role = null;
        state.username = null;
        state.email = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearUser, clearError } = authSlice.actions;
export default authSlice.reducer;
