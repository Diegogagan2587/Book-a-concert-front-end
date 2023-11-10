import { configureStore } from '@reduxjs/toolkit';
import reservationFormReducer from './reservationForm/reservationFormSlice';

const store = configureStore({
  reducer: {
    //slices here
    reservationForm: reservationFormReducer,
  },
});

export default store;
