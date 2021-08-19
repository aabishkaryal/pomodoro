import { toMilliseconds } from "app/utils";

export const ICON_SIZE_LG = { base: 5, md: 7 };
export const ICON_SIZE = { base: 4, md: 6 };
export const ICON_SIZE_SM = { base: 3, md: 4 };

export enum CONFIG {
	WORK = "work",
	BREAK_SHORT = "break-short",
	BREAK_LONG = "break-long",
	EXTENSION = "extension",
}
export const CURRENT_CONFIG = "current-config";

export const WORK_DEFAULT = toMilliseconds({ minutes: 25 });
export const BREAK_SHORT_DEFAULT = toMilliseconds({ minutes: 5 });
export const BREAK_LONG_DEFAULT = toMilliseconds({ minutes: 15 });
export const EXTENSION_DEFAULT = toMilliseconds({ minutes: 2 });
