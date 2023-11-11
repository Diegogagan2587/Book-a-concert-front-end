import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice'; 
import concertDetailsReducer from './concertDetails/concertDetailsSlice';

const store = configureStore({
  reducer: {
    //slices here
    user: userReducer,
    concertDetails: concertDetailsReducer,
  },
});

export default store;
