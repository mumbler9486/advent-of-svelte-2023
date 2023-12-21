<script lang="ts">
	import Chart, { type ChartItem, type Point } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	export let data: DataPoint[] = [];

	interface DataPoint {
		x: number | Date;
		y: number;
	}

	let canvas: HTMLElement;
	let chart: Chart | undefined;

	$: {
		if (!!chart) {
			chart.data.datasets[0].data = data as unknown as Point[];
			chart.update();
		}
	}

	const initChart = () => {
		const ctx = canvas as ChartItem;
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: "Santa's Heart Rate",
						data: data as unknown as Point[],
						borderWidth: 1,
						backgroundColor: '#e80000',
						borderColor: '#e80000',
						pointRadius: 0
					}
				]
			},
			options: {
				scales: {
					x: {
						type: 'time'
					},
					y: {
						min: 70,
						max: 190
					}
				}
			}
		});
	};
	onMount(initChart);
</script>

<div>
	<canvas bind:this={canvas}></canvas>
</div>
