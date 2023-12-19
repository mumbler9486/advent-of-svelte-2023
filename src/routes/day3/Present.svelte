<script lang="ts">
	export let name: string;
	export let weight: number;
	export let title: string;
	export let tabindex: number;

	const colors = [
		'#312E81',
		'#4C1D95',
		'#831843',
		'#EC4899',
		'#1D4ED8',
		'#065F46',
		'#D97706',
		'#78350F',
		'#7F1D1D',
		'#991B1B'
	];

	$: color = colors[Math.abs(hashifyName(name)) % colors.length];
	$: presentWidth = Math.min(50, Math.max(5, weight * 1.5));

	const hashifyName = (s: string) =>
		s.split('').reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0);
</script>

<div
	class="flex flex-col p-2 text-sm rounded-md border-white border-2 select-none text-white"
	style="background-color: {color}; width: {presentWidth}rem"
	on:click
	on:keyup
	{tabindex}
	role="button"
	{title}
>
	<p>{name}</p>
	<p>{weight} KG</p>
</div>
