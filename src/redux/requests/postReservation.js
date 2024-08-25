import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL_BASE } from '../../projectConfig';

const POST_RESERVATION_URL = `${API_URL_BASE}/reservations`;

const postReservation = createAsyncThunk(
  'postReservation',
  async ({ user_id, id, date, city }) => {
    const response = await fetch(POST_RESERVATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reservation: {
          user_id: user_id,
          concert_id: id,
          date: date,
          city: city,
        },
      }),
    });
    const data = await response.json();
    return data;
  }
);

export default postReservation;
