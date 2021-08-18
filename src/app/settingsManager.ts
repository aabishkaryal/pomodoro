import { CONFIG } from "./constants";

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
}
