import { derived, readable } from 'svelte/store';
import { DateTime } from 'luxon';

const generateUtcNow = () => {
	// return DateTime.fromObject({
	// 	year: 2022,
	// 	month: 12,
	// 	day: 23,
	// 	hour: 13,
	// 	minute: 34,
	// 	second: 32,
	// 	millisecond: 876,
	// }).toUTC(); // For Debugging, UTC
	return DateTime.utc();
};

const UpdateResolution = 100;
export const computerTimeUtc = readable<DateTime>(generateUtcNow(), function start(set) {
	let initDelay = 1000 - DateTime.utc().millisecond;
	let interval: ReturnType<typeof setInterval>;

	let lastSecond = -1;
	const intervalFunc = () => {
		interval = setInterval(() => {
			let nextTime = DateTime.utc();
			const currentSeconds = nextTime.second.valueOf();
			if (lastSecond == currentSeconds) {
				return;
			}

			lastSecond = currentSeconds;
			set(generateUtcNow());
		}, UpdateResolution);
	};
	setTimeout(intervalFunc, initDelay);

	return function stop() {
		if (interval) clearInterval(interval);
	};
});

export const computerTime = derived(computerTimeUtc, (t) => t.toJSDate());
