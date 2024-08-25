import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_BASE } from '../../projectConfig';

const GET_CONCERT_URL = `${API_URL_BASE}/concerts/`;

const getConcert = createAsyncThunk('getConcert', async (concert_id) => {
  const response = await fetch(`${GET_CONCERT_URL}/${concert_id}`);
  const data = await response.json();
  return data;
});

export default getConcert;
