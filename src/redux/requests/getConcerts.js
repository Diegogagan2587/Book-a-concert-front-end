import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_BASE } from '../../projectConfig';

const GET_CONCERTS_URL = `${API_URL_BASE}/concerts/`;

const getConcerts = createAsyncThunk('getConcerts', async () => {
  const response = await fetch(GET_CONCERTS_URL);
  const data = await response.json();
  return data;
});

export default getConcerts;