<script lang="ts">
	import LineChart from '$lib/components/LineChart.svelte';
	import { onDestroy, onMount } from 'svelte';

	let monitorTimer: ReturnType<typeof setInterval>;

	let heartRateHistory: { x: Date; y: number }[] = [];

	const MonitorMillis = 1000;
	const heartrateUrl = 'https://advent.sveltesociety.dev/data/2023/day-four.json';

	interface HeartRate {
		heartRate: number;
	}

	const startMonitoring = () => {
		if (!!monitorTimer) {
			clearTimeout(monitorTimer);
		}

		monitorTimer = setInterval(() => {
			checkHeartRate();
		}, MonitorMillis);
	};

	const checkHeartRate = async () => {
		const heartrateRequest = await fetch(heartrateUrl);
		const heartRate = ((await heartrateRequest.json()) as HeartRate).heartRate;
		heartRateHistory.push({ x: new Date(), y: heartRate });
		heartRateHistory = heartRateHistory;
	};

	onMount(startMonitoring);
	onDestroy(() => clearTimeout(monitorTimer));
</script>

<div>
	<img class="w-48" src="/images/heart.png" alt="heart" />
	<div class="w-3/5">
		<LineChart data={heartRateHistory} lineLabel="Santa's Heart Rate" min={70} max={190}
		></LineChart>
	</div>
</div>
