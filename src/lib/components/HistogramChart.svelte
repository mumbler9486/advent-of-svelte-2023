<script lang="ts">
	import Chart, { type ChartItem, type Point } from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	import { onMount } from 'svelte';

	export let data1: DataPoint[] = [];
	export let data2: DataPoint[] = [];
	export let data1Label: string = 'Data 1';
	export let data2Label: string = 'Data 2';
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;

	interface DataPoint {
		x: string | Date;
		y: number;
	}

	let canvas: HTMLElement;
	let chart: Chart | undefined;

	$: {
		if (!!chart) {
			chart.data.datasets[0].data = data1 as unknown as Point[];
			chart.data.datasets[1].data = data2 as unknown as Point[];
			chart.update();
		}
	}

	const initChart = () => {
		const ctx = canvas as ChartItem;
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				datasets: [
					{
						label: data1Label,
						data: data1 as unknown as Point[],
						backgroundColor: '#bc0000',
						borderColor: '#bc0000'
					},
					{
						label: data2Label,
						data: data2 as unknown as Point[],
						backgroundColor: '#00c413',
						borderColor: '#00c413'
					}
				]
			},
			options: {
				scales: {
					x: {
						type: 'time',
						stacked: true
					},
					y: {
						min: min,
						max: max,
						stacked: true
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
