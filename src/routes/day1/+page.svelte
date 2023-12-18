<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import dayOneTallies from './day-one.json';
	import { onMount } from 'svelte';

	let name: string = '';
	let tally: string = '';
	let deeds: Record<string, DeedTally> = {};

	$: sortedDeeds = Object.values(deeds).sort((x1, x2) => (x1.name > x2.name ? 1 : -1));

	//Tally Source, didn't want to deal with CORS
	//https://advent.sveltesociety.dev/data/2023/day-one.json
	interface DeedTally {
		name: string;
		tally: number;
	}

	const addDeed = async () => {
		if (!deeds[name]) {
			deeds[name] = {
				name: name,
				tally: 0
			} satisfies DeedTally;
		}

		deeds[name].tally += parseInt(tally);

		name = '';
		tally = '0';
		deeds = deeds;
	};

	const loadTallyDb = async () => {
		const tallies = dayOneTallies as DeedTally[];

		deeds = tallies.reduce(
			(prev, curr) => {
				prev[curr.name] = curr;
				return prev;
			},
			{} as Record<string, DeedTally>
		);
	};

	onMount(loadTallyDb);
</script>

<Input label="Name" bind:value={name}></Input>
<Input label="Tally" bind:value={tally}></Input>
<Button on:click={addDeed}>Add Deed</Button>

<div>
	<table class="table">
		<!-- head -->
		<thead>
			<tr>
				<th>Name</th>
				<th>Tally</th>
				<th>Naughty/Nice</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedDeeds as deed}
				<tr>
					<td>{deed.name}</td>
					<td>{deed.tally}</td>
					<td class:text-error={deed.tally <= 0} class:text-success={deed.tally > 0}>
						{deed.tally > 0 ? 'Nice' : 'Naughty'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
