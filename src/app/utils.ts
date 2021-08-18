import { useState } from "react";

type Time = {
	hours?: number;
	minutes?: number;
	seconds?: number;
};

export function toMilliseconds({ hours = 0, minutes = 0, seconds = 0 }: Time) {
	return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

export function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue(value + 1); // update the state to force render
}
