import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    concerts:[],
    availableConcerts: [],
    availableDates: [],
    availableCities: [],
}

export const reservationFormSlice = createSlice({
    name: 'reservationForm',
    initialState,
    reducers: {
        //reducers functions here
    },

})

//export redcuers below:
//export const { reducersHere } = reservationFormSlice.actions;
export default reservationFormSlice.reducer;