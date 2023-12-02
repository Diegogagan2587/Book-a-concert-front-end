import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
const GET_CONCERT_URL = `${API_URL_BASE}/concerts/`;

const getConcert = createAsyncThunk('getConcert', async (concert_id) => {
  const response = await fetch(`${GET_CONCERT_URL}/${concert_id}`);
  const data = await response.json();
  return data;
});

export default getConcert;
