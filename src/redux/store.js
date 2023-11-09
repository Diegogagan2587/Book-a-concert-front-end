import { configureStore } from '@reduxjs/toolkit';
import concertDetailsReducer from './concertDetails/concertDetailsSlice';

const store = configureStore({
  reducer: {
    //slices here
    concertDetails: concertDetailsReducer,
  },
});

export default store;
