import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE ||'https://book-a-concert-api.onrender.com'; 
const GET_RESERVATIONS_URL = `${API_URL_BASE}/reservations`;

const getReservations = createAsyncThunk("getReservations", async () => {
    const response = await fetch(GET_RESERVATIONS_URL);
    const data = await response.json()
    await ('getReservations request response', data )
    return data;
});

export default getReservations;
