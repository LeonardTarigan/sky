import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';

interface WeatherState {
    city: string;
    country: string;
    iconCode: string;
    description: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    feelLike: number;
    timeShift: number;
}

const initialState: WeatherState = {
    city: '-',
    country: '-',
    iconCode: '-',
    description: '-',
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    feelLike: 0,
    timeShift: 0,
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<WeatherState>) => {
            state.city = action.payload.city;
            state.country = action.payload.country;
            state.iconCode = action.payload.iconCode;
            state.description = action.payload.description;
            state.temperature = action.payload.temperature;
            state.humidity = action.payload.humidity;
            state.windSpeed = action.payload.windSpeed;
            state.feelLike = action.payload.feelLike;
            state.timeShift = action.payload.timeShift;
        },
    },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
