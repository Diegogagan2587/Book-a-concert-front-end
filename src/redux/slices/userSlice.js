const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción para obtener el usuario actual
export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const response = await fetch(`${API_URL_BASE}/current_user`);
    const data = await response.json();
    return data.user || { error: 'User not found' };
  }
);

// Acción para registrar un nuevo usuario
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_BASE}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),        
      });

      const data = await response.json();
      
      if (response.ok) {
        return data.status.message;
      } else {
        if (response.status === 422) {
          // Handle the case where the user already exists
          return rejectWithValue({ error: data.status.message });
        } else {
          return rejectWithValue({ error: 'An error occurred' });
        }
      }
    } catch (error) {
      // Handle other errors, if any
      return rejectWithValue({ error: 'An error occurred' });
    }
  }
);


// New action to log in a user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData) => {
    try {
      const response = await fetch(`${API_URL_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      });
      const data = await response.json();
      const token = await data.status.token;
      
      if (response.ok) {
        //1. we get the token
        if(token) {
          return {...data.status};
        } else {
          return { error: "Token not found in response data"}
        }
      } else {
        return { error: data.error || 'Login failed' };
      }
    } catch (error) {
      return { error: 'Login failed' };
    }
  }
);

// Acción para cerrar sesión
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    await fetch(`${API_URL_BASE}/logout`, { method: 'DELETE' });
    return {};
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    details: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    setUsername: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
  .addCase(logoutUser.fulfilled, (state) => {
    state.details = {};
    state.status = 'idle';
  })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'failed';
        } else {
          state.details = action.payload;
          state.status = 'succeeded';
        }
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.details = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.status = 'failed';
        } else {
          const newState = {
            name: action.payload.data.user.name,
            details: action.payload,
            status: 'succeeded',
          };
          return { ...state, ...newState };
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.details = { error: action.error.message || 'Login failed' };
      });
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
