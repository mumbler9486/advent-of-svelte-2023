<script lang="ts">
	export let months: number;
	export let days: number;
	export let hours: number;
	export let minutes: number;
	export let seconds: number;

	$: formattedMonths = Math.max(0, months);
	$: formattedDays = Math.max(0, days);
	$: formattedHours = Math.max(0, hours);
	$: formattedMinutes = Math.max(0, minutes);
	$: formattedSeconds = Math.max(0, seconds);
</script>

<div class="grid auto-cols-max grid-flow-col gap-5 text-center">
	{#if months > 0}
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{formattedMonths};"></span>
			</span>
			months
		</div>
	{/if}
	<div class="flex flex-col">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{formattedDays};"></span>
		</span>
		days
	</div>
	<div class="flex flex-col">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{formattedHours};"></span>
		</span>
		hours
	</div>
	<div class="flex flex-col">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{formattedMinutes};"></span>
		</span>
		min
	</div>
	<div class="flex flex-col">
		<span class="countdown font-mono text-5xl">
			<span style="--value:{formattedSeconds};"></span>
		</span>
		sec
	</div>
</div>
