<script lang="ts">
	import Chart, { type ChartItem, type Point } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	export let data: DataPoint[] = [];
	export let lineLabel: string = '';
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let lineColor: string = '#e80000';
	export let showPoints: boolean = false;

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
						label: lineLabel,
						data: data as unknown as Point[],
						borderWidth: 1,
						backgroundColor: lineColor,
						borderColor: lineColor,
						pointRadius: showPoints ? undefined : 0
					}
				]
			},
			options: {
				scales: {
					x: {
						type: 'time'
					},
					y: {
						min: min,
						max: max
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
