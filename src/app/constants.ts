import { toMilliseconds } from "app/utils";

export const ICON_SIZE_LG = { base: 5, md: 7 };
export const ICON_SIZE = { base: 4, md: 6 };
export const ICON_SIZE_SM = { base: 3, md: 4 };

export enum CONFIG {
	WORK = "work",
	BREAK = "break",
}
export const CURRENT_CONFIG = "current-config";

const WORK_DEFAULT = toMilliseconds({ minutes: 25 });
const BREAK_DEFAULT = toMilliseconds({ minutes: 5 });

const DEFAULT: { [key: string]: number } = {};
DEFAULT[CONFIG.WORK] = WORK_DEFAULT;
DEFAULT[CONFIG.BREAK] = BREAK_DEFAULT;

export { DEFAULT };
