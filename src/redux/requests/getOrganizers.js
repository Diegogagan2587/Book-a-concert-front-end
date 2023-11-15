import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL_BASE = "https://book-a-concert-api.onrender.com";
const GET_USERS_URL = `${API_URL_BASE}/users/`;

const getOrganizers = createAsyncThunk("getOrganizers", async () => {
    const response = await fetch(GET_USERS_URL);
    const data = await response.json();
    return data;
});

export default getOrganizers;