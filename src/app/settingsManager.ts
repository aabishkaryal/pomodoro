import { CONFIG } from "./constants";

export class SettingsManager {
	static get(key: CONFIG) {
		return Number(window.localStorage.getItem(key));
	}

	static set(key: CONFIG, value?: number) {
		window.dispatchEvent(new CustomEvent<number>(key, { detail: value }));
		window.localStorage.setItem(key, value?.toString() || "");
	}

	static subscribe(key: CONFIG, callback: (value: number) => void) {
		const fn = (event: CustomEventInit) => {
			callback(event.detail);
		};
		window.addEventListener(key, fn, false);
		return () => window.removeEventListener(key, fn, false);
	}

	static reset() {
		window.localStorage.clear();
	}
}
