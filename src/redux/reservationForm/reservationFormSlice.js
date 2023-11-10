import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  concerts: [],
  availableConcerts: ['Select a concert'],
  availableDates: ['Select a date'],
  availableCities: ['Select a city'],
};

export const reservationFormSlice = createSlice({
  name: 'reservationForm',
  initialState,
  reducers: {
    //reducers functions here
    updatedAvailability: (state, action) => {
      //first I filter the concerts that include the action.payload, it might be a city, a date or a concert
      let filteredConcerts = state.concerts.filter((concert) => {
        return (
          concert.city === action.payload ||
          concert.date === action.payload ||
          concert.title === action.payload
        );
      });
      //then I update the available dates, cities and concerts
      let dates = filteredConcerts.map((concert) => concert.date);
      let cities = filteredConcerts.map((concert) => concert.city);
      let concerts = filteredConcerts.map((concert) => concert.title);
      let newState = {
        availableCities: cities,
        availableConcerts: concerts,
        availableDates: dates,
      };
      return { ...state, ...newState };
    },
    resetAvailability: (state) => {
      //we will make all dates an cities available again
      let dates = state.concerts.map((concert) => concert.date);
      let cities = state.concerts.map((concert) => concert.city);
      let concerts = state.concerts.map((concert) => concert.title);
      let newState = {
        availableCities: cities,
        availableConcerts: concerts,
        availableDates: dates,
      };
      return { ...state, ...newState };
    },
  },
  extraReducers: (builder) => {
    //extraReducers functions here
    builder.addCase('getConcerts/fulfilled', (state, action) => {
      let dates = action.payload.map((concert) => concert.date);
      let cities = action.payload.map((concert) => concert.city);
      let concerts = action.payload.map((concert) => concert.title);
      let newState = {
        concerts: [...action.payload],
        availableCities: ['Select a city', ...cities],
        availableConcerts: ['Select a concert', ...concerts],
        availableDates: ['Select a date', ...dates],
      };
      return { ...state, ...newState };
    });
  },
});

export const { updatedAvailability, resetAvailability } =
  reservationFormSlice.actions;
export default reservationFormSlice.reducer;
