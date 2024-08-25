import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_BASE } from '../../projectConfig';

const getCurrentUser = createAsyncThunk(
  'getCurrentUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_BASE}/current_user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch current_user data');
      }
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export default getCurrentUser;
