import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  created: null,
  form: {
    concerts: [],
    status: 'idle',
    resetForm: false,
    availableConcerts: ['Select a concert'],
    availableDates: ['Select a date'],
    availableCities: ['Select a city'],
  },
};

export const reservationFormSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    //reducers functions here
    updatedAvailability: (state, action) => {
      //first I filter the concerts that include the action.payload, it might be a city, a date or a concert
      console.log(action.payload);
      if (
        action.payload === 'Select a city' ||
        action.payload === 'Select a date' ||
        action.payload === 'Select a concert'
      )
        return state;
      let updatedConcerts = state.form.concerts.map((concert) => {
        if (
          concert.city === action.payload ||
          concert.date === action.payload ||
          concert.title === action.payload
        ) {
          return concert;
        } else {
          return { ...concert, available: false };
        }
      });
      //then I update the available dates, cities and concerts
      let dates = updatedConcerts
        .filter((concert) => concert.available && concert.date)
        .map((concert) => concert.date);
      let cities = updatedConcerts
        .filter((concert) => concert.available && concert.city)
        .map((concert) => concert.city);
      let concerts = updatedConcerts
        .filter((concert) => concert.available && concert.title)
        .map((concert) => concert.title);
      let form = {
        ...state.form,
        resetForm: false,
        concerts: [...updatedConcerts],
        availableCities: [...cities],
        availableConcerts: [...concerts],
        availableDates: [...dates],
      };
      return { ...state, form };
    },
    resetAvailability: (state) => {
      //we will make all dates an cities available again
      let dates = state.form.concerts.map((concert) => concert.date);
      let cities = state.form.concerts.map((concert) => concert.city);
      let concertsTitles = state.form.concerts.map((concert) => concert.title);
      let concerts = state.form.concerts.map((concert) => ({
        ...concert,
        available: true,
      }));
      let form = {
        ...state.form,
        resetForm: true,
        concerts: [...concerts],
        availableCities: [...cities],
        availableConcerts: [...concertsTitles],
        availableDates: [...dates],
      };
      return { ...state, form };
    },
    filteredUserReservations: (state, action) => {
      //we will filter reservations where user_id === action.payload
      const filteredReservations = state.created.filter(
        (reservation) => reservation.user_id === action.payload
      );
      const newState = {
        created: filteredReservations,
      };
      return { ...state, ...newState };
    },
  },
  extraReducers: (builder) => {
    //extraReducers functions here
    builder.addCase('getConcerts/fulfilled', (state, action) => {
      let dates = action.payload.map((concert) => concert.date);
      let cities = action.payload.map((concert) => concert.city);
      let concertsTitles = action.payload.map((concert) => concert.title);
      let concerts = action.payload.map((concert) => ({
        available: true,
        ...concert,
      }));
      let newState = {
        form: {
          concerts: [...concerts],
          status: 'succeeded',
          availableCities: [...cities],
          availableConcerts: [...concertsTitles],
          availableDates: [...dates],
        }
      };
      return { ...state, ...newState };
    });
    builder.addCase('getConcerts/pending', (state) => {
      return { ...state, status: 'loading' };
    });
    builder.addCase('getConcerts/rejected', (state) => {
      return { ...state, status: 'failed' };
    });
    builder.addCase('getReservations/fulfilled', (state, action) => {
    const newState = {
        created: action.payload,
      };
      return { ...state, ...newState };
    });
  },
});

export const {
  updatedAvailability,
  resetAvailability,
  filteredUserReservations,
} = reservationFormSlice.actions;
export default reservationFormSlice.reducer;
