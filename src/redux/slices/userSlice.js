// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción para obtener el usuario actual
export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const response = await fetch('https://book-a-concert-api.onrender.com/current_user');
    const data = await response.json();
    return data.user || { error: 'User not found' };
  }
);

// Acción para registrar un nuevo usuario
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData) => {
    const response = await fetch('https://book-a-concert-api.onrender.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    });
    const data = await response.json();
    return data;
  }
);

// New action to log in a user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (username) => {
    try {
      const response = await fetch('https://book-a-concert-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });
      const data = await response.json();

      if (response.ok) {
        // Asegúrate de devolver la información relevante del usuario aquí
        return { username: username, ...data }; // Ajusta según la respuesta de tu API
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
    await fetch('https://book-a-concert-api.onrender.com/logout', { method: 'DELETE' });
    return {};
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    details: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
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
          state.details = action.payload;
          state.status = 'succeeded';
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
