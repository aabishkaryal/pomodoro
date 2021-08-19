import { useState } from "react";

type Time = {
	hours?: number;
	minutes?: number;
	seconds?: number;
};

// Converts a given time to milliseconds
export function toMilliseconds({ hours = 0, minutes = 0, seconds = 0 }: Time) {
	return (hours * 3600 + minutes * 60 + seconds) * 1000;
}
