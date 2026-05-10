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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, role } },
    });
    if (error) return rejectWithValue(error.message);
    return data;
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return rejectWithValue(error.message);
    return data;
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await supabase.auth.signOut();
});

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
        const meta = action.payload.user?.user_metadata;
        if (meta) {
          state.role = meta.role;
          state.username = meta.username;
          state.email = action.payload.user?.email ?? null;
          state.isAuthenticated = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const meta = action.payload.user?.user_metadata;
        if (meta) {
          state.role = meta.role;
          state.username = meta.username;
          state.email = action.payload.user?.email ?? null;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
