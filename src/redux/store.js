import { configureStore } from '@reduxjs/toolkit';
import reservationFormReducer from './reservationForm/reservationFormSlice';
import concertDetailsReducer from './concertDetails/concertDetailsSlice';

const store = configureStore({
  reducer: {
    //slices here
    concertDetails: concertDetailsReducer,
    reservationForm: reservationFormReducer,
  },
});

export default store;
