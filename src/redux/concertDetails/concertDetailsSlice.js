import { createSlice } from '@reduxjs/toolkit';

export const concertDetailsSlice = createSlice({
  name: 'concertDetails',
  initialState: {
    concertDetails: {},
  },
  reducers: {
    //reducers functions here
    fetchConcert: (state, action) => {
      //logic here example:
      //state.concertDetails = action.payload;
    },
    reserveConcert: (state, action) => {
      //logic here example:
      //state.concertDetails = action.payload;
    },
  },
});

export const { fetchConcert, reserveConcert } = concertDetailsSlice.actions;
export default concertDetailsSlice.reducer;
