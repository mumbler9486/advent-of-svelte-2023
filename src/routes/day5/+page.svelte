<script lang="ts">
	import HistogramChart from '$lib/components/HistogramChart.svelte';
	import { onMount } from 'svelte';

	// Endpoint is not a live endpoint but it is somewhat supported on this page
	// There is a performance issue as the data grows larger, so need to scope the amount
	// of data to track.

	let elfTasks: Task[] = [];
	let wrapTasksByElf: Record<string, ElfStat> = {};

	const PresentsUrl = 'https://advent.sveltesociety.dev/data/2023/day-five.json';
	const HoursBucketMillis = 1000 * 60 * 60;

	$: toyTasks = elfTasks.filter((w) => w.task === 'CREATED_TOY');
	$: wrappingTasks = elfTasks.filter((w) => w.task === 'WRAPPED_PRESENT');

	$: toysTimeline = Object.entries(
		toyTasks.reduce(
			(prev, curr) => {
				const taskDate = new Date(curr.date).getTime();
				const timeBucket = taskDate - (taskDate % HoursBucketMillis);
				if (!prev[timeBucket]) {
					prev[timeBucket] = 0;
				}

				prev[timeBucket]++;
				return prev;
			},
			{} as Record<number, number>
		)
	).map((t) => ({ x: new Date(parseInt(t[0])), y: t[1] }));

	// Stats
	$: totalTasks = elfTasks.length;
	$: elfStats = Object.values(wrapTasksByElf).sort((e1, e2) =>
		e1.presentsWrapped + e1.toysMade + (e2.presentsWrapped + e2.toysMade) ? 1 : -1
	);

	$: presentsTimeline = Object.entries(
		wrappingTasks.reduce(
			(prev, curr) => {
				const taskDate = new Date(curr.date).getTime();
				const timeBucket = taskDate - (taskDate % HoursBucketMillis);
				if (!prev[timeBucket]) {
					prev[timeBucket] = 0;
				}

				prev[timeBucket]++;
				return prev;
			},
			{} as Record<number, number>
		)
	).map((t) => ({ x: new Date(parseInt(t[0])), y: t[1] }));

	$: averageToysPerHour =
		Object.entries(toysTimeline).reduce((prev, curr) => {
			return prev + curr[1].y;
		}, 0) / Object.values(toysTimeline).length;

	$: averagePresentsPerHour =
		Object.entries(presentsTimeline).reduce((prev, curr) => {
			return prev + curr[1].y;
		}, 0) / Object.values(presentsTimeline).length;

	type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

	interface TaskRaw {
		elf: string;
		task: TaskType;
		minutesTaken: number;
		date: string;
	}

	interface Task {
		elf: string;
		task: TaskType;
		minutesTaken: number;
		date: Date;
	}

	interface ElfStat {
		elf: string;
		presentsWrapped: number;
		toysMade: number;
		averageWrappingSpeed: number;
		averageToySpeed: number;
	}

	const loadTasks = async () => {
		const wrappingRequest = await fetch(PresentsUrl);
		const wrappingTasksRaw = (await wrappingRequest.json()) as TaskRaw[];

		const wrappingTasks = wrappingTasksRaw.map((w) => ({
			...w,
			date: new Date(w.date)
		}));
		elfTasks = elfTasks.concat(wrappingTasks);
		elfTasks = elfTasks;

		ingestStats(wrappingTasks);
	};

	// Appends to the current tracked stats
	const ingestStats = (wrappingTasks: Task[]) => {
		wrappingTasks.forEach((w) => {
			if (!wrapTasksByElf[w.elf]) {
				wrapTasksByElf[w.elf] = {
					elf: w.elf,
					presentsWrapped: 0,
					toysMade: 0,
					averageWrappingSpeed: 0,
					averageToySpeed: 0
				} satisfies ElfStat;
			}

			// Compute stats
			const elfStat = wrapTasksByElf[w.elf];
			if (w.task === 'CREATED_TOY') {
				elfStat.toysMade++;
				elfStat.averageToySpeed += w.minutesTaken;
			}

			if (w.task === 'WRAPPED_PRESENT') {
				elfStat.presentsWrapped++;
				elfStat.averageWrappingSpeed += w.minutesTaken;
			}
		});

		wrapTasksByElf = wrapTasksByElf;
	};

	onMount(loadTasks);
</script>

<div class="flex flex-row p-4">
	<div class="w-1/2">
		<HistogramChart
			data1={presentsTimeline}
			data2={toysTimeline}
			data1Label="Presents Wrapped"
			data2Label="Toys Created"
		></HistogramChart>
		<div>
			<p>Total Tasks: {totalTasks}</p>
			<p>Total Toys: {toyTasks.length}</p>
			<p>Toys per Hour: {averageToysPerHour.toFixed(2)}</p>
			<p>Total Presents: {wrappingTasks.length}</p>
			<p>Presents per Hour: {averagePresentsPerHour.toFixed(2)}</p>
		</div>
	</div>
	<div>
		<div class="overflow-x-auto p-4">
			<table class="table table-xs">
				<thead>
					<tr>
						<th>#</th>
						<th>Elf</th>
						<th>Toys Made</th>
						<th>Avg. Toy Speed</th>
						<th>Presents Wrapped</th>
						<th>Avg. Wrapping Speed</th>
					</tr>
				</thead>
				<tbody>
					{#each elfStats as stat, i}
						<tr>
							<td>{i + 1}</td>
							<td>{stat.elf}</td>
							<td>{stat.toysMade}</td>
							<td>{(stat.averageToySpeed / stat.toysMade).toFixed(2)}/min</td>
							<td>{stat.presentsWrapped}</td>
							<td>{(stat.averageWrappingSpeed / stat.presentsWrapped).toFixed(2)}/min</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
