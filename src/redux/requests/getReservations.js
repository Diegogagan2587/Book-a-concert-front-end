import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL_BASE } from "../../projectConfig";

const GET_RESERVATIONS_URL = `${API_URL_BASE}/reservations`;

const getReservations = createAsyncThunk("getReservations", async () => {
    const response = await fetch(GET_RESERVATIONS_URL);
    const data = await response.json()
    await ('getReservations request response', data )
    return data;
});

export default getReservations;
