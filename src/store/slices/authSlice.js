// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/** Mock API helpers (replace with real API calls later) */
const mockDelay = (ms = 700) => new Promise(r => setTimeout(r, ms));

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await mockDelay();
      // pretend success if any non-empty creds
      if (!email || !password) throw new Error("Invalid credentials");
      return {
        user: {
          id: "u1",
          name: "John Doe",
          email,
          role: "student",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, City, State 12345",
          dateOfBirth: "1995-05-15",
          bio: "Student at EduManage University",
          // optional role toggles:
          // studentId: "S123456",
          // department: "Computer Science",
        },
        token: "mock-jwt-token",
      };
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await mockDelay();
      if (!name || !email || !password) throw new Error("Missing fields");
      return {
        user: { id: Date.now().toString(), name, email, role: "student" },
        token: "mock-jwt-token",
      };
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

/** Restore from localStorage on app boot */
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");
    if (token && userRaw) {
      return { token, user: JSON.parse(userRaw) };
    }
    return { token: null, user: null };
  }
);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token || "");
      localStorage.setItem("user", JSON.stringify(user || null));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateProfile(state, action) {
      state.user = { ...(state.user || {}), ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload.user;
        s.token = payload.token;
        s.isAuthenticated = true;
        localStorage.setItem("token", payload.token || "");
        localStorage.setItem("user", JSON.stringify(payload.user || null));
      })
      .addCase(login.rejected, (s, { payload }) => {
        s.loading = false; s.error = payload || "Login failed";
      })
      // register
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.user = payload.user;
        s.token = payload.token;
        s.isAuthenticated = true;
        localStorage.setItem("token", payload.token || "");
        localStorage.setItem("user", JSON.stringify(payload.user || null));
      })
      .addCase(register.rejected, (s, { payload }) => {
        s.loading = false; s.error = payload || "Registration failed";
      })
      // restore
      .addCase(restoreSession.fulfilled, (s, { payload }) => {
        s.user = payload.user;
        s.token = payload.token;
        s.isAuthenticated = Boolean(payload.user && payload.token);
      });
  },
});

export const { loginSuccess, logout, updateProfile } = slice.actions;
export default slice.reducer;
