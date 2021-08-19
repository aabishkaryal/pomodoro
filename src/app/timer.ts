import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CONFIG, WORK_DEFAULT } from "./constants";

type TimerState = {
	config: CONFIG;
	totalTime: number;
};

const initialState: TimerState = {
	config: CONFIG.WORK,
	totalTime: WORK_DEFAULT,
};

const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		setConfig(state, action: PayloadAction<CONFIG>) {
			state.config = action.payload;
			return state;
		},
		setTotalTime(state, action: PayloadAction<number>) {
			state.totalTime = action.payload;
			return state;
		},
	},
});

export const { setConfig, setTotalTime } = timerSlice.actions;
export default timerSlice.reducer;
