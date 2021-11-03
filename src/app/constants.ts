import { toMilliseconds } from "app/utils";

// Keys for various timer settings
export enum CONFIG {
    WORK = "work",
    BREAK = "break",
}
// Key for current config
export const CURRENT_CONFIG = "current-config";
// Key to show/hide notifications
export const SHOW_NOTIFICATIONS = "showNotifications";

// Default time for different settings
const WORK_DEFAULT = toMilliseconds({ minutes: 25 });
const BREAK_DEFAULT = toMilliseconds({ minutes: 5 });

const DEFAULT: { [key: string]: string } = {};
DEFAULT[CONFIG.WORK] = WORK_DEFAULT.toString();
DEFAULT[CONFIG.BREAK] = BREAK_DEFAULT.toString();
DEFAULT[SHOW_NOTIFICATIONS] = "0";

export { DEFAULT };
