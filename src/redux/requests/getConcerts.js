import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
const GET_CONCERTS_URL = `${API_URL_BASE}/concerts/`;

const getConcerts = createAsyncThunk('getConcerts', async () => {
  const response = await fetch(GET_CONCERTS_URL);
  const data = await response.json();
  return data;
});

export default getConcerts;