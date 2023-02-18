import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';

interface CityState {
    currentCity?: string;
    isValid?: boolean;
}

const initialState: CityState = {
    currentCity: 'Tokyo',
    isValid: true,
};

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.currentCity = action.payload;
        },
        setValid: (state, action: PayloadAction<boolean>) => {
            state.isValid = action.payload;
        },
    },
});

export const { setCity, setValid } = citySlice.actions;

export default citySlice.reducer;
