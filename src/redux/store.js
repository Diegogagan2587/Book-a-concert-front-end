import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import reservationReducer from './slices/reservationSlice';
import concertDetailsReducer from './slices/concertDetailsSlice';
import concertReducer from '../redux/slices/concertSlice';

const store = configureStore({
  reducer: {
    //slices here
    user: userReducer,
    reservation: reservationReducer,
    concerts: concertReducer,
  },
});

export default store;
