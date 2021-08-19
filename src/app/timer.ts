import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CONFIG, DEFAULT, WORK_DEFAULT } from "app/constants";

type TimerState = {
	config: CONFIG;
	totalTime: number;
};

const initialState: TimerState = {
	config: CONFIG.WORK,
	totalTime: DEFAULT[CONFIG.WORK],
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
