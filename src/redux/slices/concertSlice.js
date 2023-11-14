// src/redux/slices/concertSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addConcert = createAsyncThunk(
  'concerts/addConcert',
  async (concertData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://book-a-concert-api.onrender.com/concerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concert: concertData }),
      });
      if (!response.ok) {
        throw new Error('Server error!');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const concertSlice = createSlice({
  name: 'concerts',
  initialState: {
    items: [],
    status: null,
    error: null
  },
  extraReducers: {
    [addConcert.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.status = 'succeeded';
    },
    [addConcert.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export default concertSlice.reducer;
