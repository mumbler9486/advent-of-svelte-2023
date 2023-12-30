<script lang="ts">
	import { DateTime } from 'luxon';
	import { computerTimeUtc } from './timerStore';
	import Countdown from './Countdown.svelte';

	const targetDate = DateTime.fromObject(
		{
			year: 2023,
			month: 12,
			day: 25,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
		},
		{ zone: 'UTC' }
	);
	$: remainingTime = targetDate.diff($computerTimeUtc, [
		'months',
		'days',
		'hours',
		'minutes',
		'seconds',
	]);
	$: months = remainingTime.months;
	$: days = remainingTime.days;
	$: hours = remainingTime.hours;
	$: minutes = remainingTime.minutes;
	$: seconds = remainingTime.seconds;

	$: isCountdownDone = targetDate.diff($computerTimeUtc).milliseconds <= 0;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="mb-8 text-5xl font-bold">Countdown to Christmas 2023!</h1>
			<div class="flex justify-center">
				{#if !isCountdownDone}
					<Countdown {months} {days} {hours} {minutes} {seconds} />
				{:else}
					<h1 class="text-5xl text-red-500">Merry Christmas!</h1>
				{/if}
			</div>
		</div>
	</div>
</div>
