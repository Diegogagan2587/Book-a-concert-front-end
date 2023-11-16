import { createSlice } from '@reduxjs/toolkit';

//Placeholder State: remove after connecting to backend
const initialState = {
  status: 'idle',
  id: 1,
  title: 'Test - Ariana Grande Live Concert',
  organizer: 'Test - Mr. Satan',
  description:
    'test: Ariana Concert: Ariana Grande is an American singer, songwriter, and actress. A multi-platinum, Grammy Award-winning recording artist, she is known for her wide vocal range, which critics have often compared to that of Mariah Carey.',
  img: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  price: '100.0',
  date: '2021-10-10',
  city: 'Test - New York',
  created_at: '2023-11-08T05:48:47.047Z',
  updated_at: '2023-11-08T05:48:47.047Z',
};

export const concertDetailsSlice = createSlice({
  name: 'concertDetails',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //extraReducers functions here
    builder.addCase('getConcert/fulfilled', (state, action) => {
      const newState = {...action.payload, status: 'success'};
      return { ...state, ...newState };
    });
    builder.addCase('getConcert/rejected', (state) => {
      return { ...state, status: 'error' };
    });
    builder.addCase('getConcert/pending', (state) => {
      return { ...state, status: 'loading' };
    });

    builder.addCase('getOrganizers/fulfilled', (state, action) => {
      console.log('running getOrganizers----->>',action.payload);
      //we find the organizer that matches the concert organizer
      const organizer = action.payload.find((organizer) => organizer.id === state.organizer_id);
      const newState = {
        organizer: organizer,
        organizers : action.payload,
      };
      return { ...state, ...newState };
    });
    builder.addCase('getOrganizers/rejected', (state) => {
      return { ...state, organizer: 'Not found' };
    });
  },
});

export const { fetchedConcert, reservedConcert } = concertDetailsSlice.actions;
export default concertDetailsSlice.reducer;
