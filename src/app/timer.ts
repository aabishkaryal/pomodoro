import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CONFIG, WORK_DEFAULT } from "./constants";

type TimerState = {
	config: CONFIG;
	currentTotalTime: number;
};

const initialState: TimerState = {
	config: CONFIG.WORK,
	currentTotalTime: WORK_DEFAULT,
};

const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		setConfig(state, action: PayloadAction<CONFIG>) {
			state.config = action.payload;
			return state;
		},
		setCurrentTotalTime(state, action: PayloadAction<number>) {
			state.currentTotalTime = action.payload;
			return state;
		},
	},
});

export const { setConfig, setCurrentTotalTime } = timerSlice.actions;
export default timerSlice.reducer;
