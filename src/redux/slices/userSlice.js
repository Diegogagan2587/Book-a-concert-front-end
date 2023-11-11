// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (username) => {
    const response = await fetch(`https://book-a-concert-api.onrender.com/users/${username}`);
    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    details: {},
    status: 'loading', 
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
        state.details = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
