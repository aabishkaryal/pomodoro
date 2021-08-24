import { CONFIG, DEFAULT, SHOW_NOTIFICATIONS } from "app/constants";

// SettingsManager handles the settings of the application.
export class SettingsManager {
	static get(key: string) {
		return window.localStorage.getItem(key);
	}

	static set(key: string, value?: string) {
		window.dispatchEvent(new CustomEvent(key, { detail: value }));
		window.localStorage.setItem(key, value || "");
	}

	static subscribe(key: CONFIG, callback: (value: string) => void) {
		const fn = (event: CustomEventInit) => {
			callback(event.detail);
		};
		window.addEventListener(key, fn, false);
		return () => window.removeEventListener(key, fn, false);
	}

	static default() {
		const workTime = SettingsManager.get(CONFIG.WORK);
		const breakTime = SettingsManager.get(CONFIG.BREAK);
		const showNotifications = SettingsManager.get(SHOW_NOTIFICATIONS);
		if (!workTime) {
			SettingsManager.set(CONFIG.WORK, DEFAULT[CONFIG.WORK]);
		}
		if (!breakTime) {
			SettingsManager.set(CONFIG.BREAK, DEFAULT[CONFIG.BREAK]);
		}
		if (!showNotifications) {
			SettingsManager.set(SHOW_NOTIFICATIONS, DEFAULT[SHOW_NOTIFICATIONS]);
		}
	}
}
