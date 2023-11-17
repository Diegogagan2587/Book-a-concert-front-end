import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice'; 
import reservationFormReducer from './reservationForm/reservationFormSlice';
import concertDetailsReducer from './concertDetails/concertDetailsSlice';
import concertReducer from '../redux/slices/concertSlice';

const store = configureStore({
  reducer: {
    //slices here
    user: userReducer,
    concertDetails: concertDetailsReducer,
    concerts: concertReducer,
    reservationForm: reservationFormReducer,
  },
});

export default store;
