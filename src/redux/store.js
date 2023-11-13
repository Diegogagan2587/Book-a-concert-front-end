import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice'; 
import reservationFormReducer from './reservationForm/reservationFormSlice';
import concertDetailsReducer from './concertDetails/concertDetailsSlice';

const store = configureStore({
  reducer: {
    //slices here
    user: userReducer,
    concertDetails: concertDetailsReducer,
    reservationForm: reservationFormReducer,
  },
});

export default store;
