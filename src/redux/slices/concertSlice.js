// src/redux/slices/concertSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line 
const API_URL_BASE = process.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
// addConcert asyncThunk
export const addConcert = createAsyncThunk(
  'concerts/addConcert',
  async (concertData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_BASE}/concerts`, {
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

// deleteConcert asyncThunk
export const deleteConcert = createAsyncThunk(
  'concerts/deleteConcert',
  async (concertId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_BASE}/concerts/${concertId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Server error!');
      }
      return concertId; // Devuelve el ID del concierto eliminado
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// concertSlice
const concertSlice = createSlice({
  name: 'concerts',
  initialState: {
    items: [],
    currentConcert: {},
    created: null,
    status: null,
    error: null
  },
  reducers: {
    setCurrentConcert: (state, action) => {
      state.currentConcert = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addConcert.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addConcert.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(deleteConcert.fulfilled, (state, action) => {
        state.items = state.items.filter(concert => concert.id !== action.payload);
        state.status = 'delete_succeeded';
      })
      .addCase(deleteConcert.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'delete_failed';
      });

      builder.addCase('getConcerts/pending',(state) => {
        const newState = { status: 'loading' };
        return {...state, ...newState};
      })

      builder.addCase('getConcerts/fulfilled', (state, action) => {
        const newState = {
          created: action.payload,
          status: 'fulfilled',
        };
        return { ...state, ...newState };
      });
  },
});

export const { setCurrentConcert } = concertSlice.actions;
export default concertSlice.reducer;
