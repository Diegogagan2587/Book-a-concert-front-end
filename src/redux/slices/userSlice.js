// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (username) => {
    const response = await fetch('http://127.0.0.1:3000/users');
    const users = await response.json();
    const user = users.find(user => user.name === username);
    return user || { error: 'User not found' };
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData) => {
    const response = await fetch('http://127.0.0.1:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
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
        // Actualiza el estado con la información del usuario registrado
        state.details = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
