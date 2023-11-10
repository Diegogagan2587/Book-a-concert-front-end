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
    extraReducers: (builder) => {
        //extraReducers functions here
        builder.addCase('getConcerts/fulfilled', (state, action) => {
            let dates = action.payload.map(concert => concert.date);
            let cities = action.payload.map(concert => concert.city);
            let concerts = action.payload.map(concert => concert.title);
            let newState = { 
                concerts: [...action.payload],
                availableCities: cities,
                availableConcerts: concerts,
                availableDates: dates,
             };
            return { ...state, ...newState};
        });
    }
})

//export redcuers below:
//export const { reducersHere } = reservationFormSlice.actions;
export default reservationFormSlice.reducer;