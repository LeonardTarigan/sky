import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';

interface HistoryState {
    history: Array<string>;
}

const initialState: HistoryState = {
    history: ['Tokyo', 'Berlin', 'Paris', 'Boston', 'Seoul'],
};

export const historySlice = createSlice({
    name: 'historyList',
    initialState,
    reducers: {
        setHistory: (state, action: PayloadAction<string[]>) => {
            state.history = action.payload;
        },
    },
});

export const { setHistory } = historySlice.actions;

export default historySlice.reducer;
