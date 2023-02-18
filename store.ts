import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import cityReducer from './slices/citySlice';
import historyReducer from './slices/historySlice';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        city: cityReducer,
        historyList: historyReducer,
        loading: loadingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
