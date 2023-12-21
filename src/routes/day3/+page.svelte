<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Present from './Present.svelte';
	import { onMount } from 'svelte';

	let sleighPresents: Present[] = [];
	let presents: Present[] = [];
	let sleighLoads: Present[][] = [];

	$: sleighWeight = sleighPresents.reduce((prev, curr) => prev + curr.weight, 0);
	$: sortedPresents = presents.sort((x1, x2) => (x1.weight > x2.weight ? -1 : 1));

	//Present Source, didn't want to deal with CORS
	//https://advent.sveltesociety.dev/data/2023/day-three.json
	interface Present {
		name: string;
		weight: number;
	}

	const loadPresents = async () => {
		sleighLoads = [];
		sleighPresents = [];
		let presentsRequest = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json');
		presents = await presentsRequest.json();
	};

	onMount(loadPresents);

	const loadPresent = (present: Present) => {
		presents = presents.filter((p) => p.name !== present.name);
		sleighPresents.push(present);
		sleighPresents = sleighPresents;
	};

	const removePresent = (present: Present) => {
		sleighPresents = sleighPresents.filter((p) => p.name !== present.name);
		presents.push(present);
		presents = presents;
	};

	const loadSleigh = () => {
		if (sleighPresents.length <= 0 || sleighWeight > 100.0) {
			return;
		}
		sleighLoads.push(sleighPresents);
		sleighPresents = [];
		sleighLoads = sleighLoads;
	};
</script>

<div>
	<div class="flex flex-row my-4">
		<img src="/images/sleigh.png" alt="Santa's Sleigh" />
		<div class="flex-col overflow-x-auto">
			<h1 class="text-xl mb-2">Sleigh Loads</h1>
			<table class="table">
				<thead>
					<tr>
						<th> Recipients </th>
						<th> Load Weight (KG) </th>
					</tr>
				</thead>
				<tbody>
					{#each sleighLoads as load}
						<tr>
							<td class="flex flex-row flex-wrap gap-4">
								{#each load as present}
									<p>
										{present.name}
									</p>
								{/each}
							</td>
							<td>
								{load.reduce((prev, curr) => prev + curr.weight, 0).toFixed(2)} KG
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<div class="flex flex-row items-center my-4 gap-4 select-none">
		<div class="mr-4">
			Sleigh Weight: <span class:text-error={sleighWeight > 100}>{sleighWeight.toFixed(2)} KG</span>
			/ 100.0 KG
		</div>
		<Button on:click={loadSleigh} disabled={sleighWeight > 100 || sleighPresents.length == 0}
			>Load Sleigh</Button
		>
		<Button on:click={loadPresents}>Reset Sleigh Presents</Button>
	</div>

	<div
		class="flex flex-row flex-wrap gap-2 bg-base-200 rounded-md p-4 border-primary border-2 select-none"
	>
		{#if sleighPresents.length > 0}
			{#each sleighPresents as present, i}
				<Present
					name={present.name}
					weight={present.weight}
					tabindex={i}
					on:click={() => removePresent(present)}
					on:keyup={() => removePresent(present)}
					title="Remove {present.name}'s present"
				/>
			{/each}
		{:else}
			<p class="select-none">Click on the presents to load them into the sleigh!</p>
		{/if}
	</div>
	<div class="flex flex-row flex-wrap gap-2 mt-16">
		{#each sortedPresents as present, i}
			<Present
				name={present.name}
				weight={present.weight}
				tabindex={i}
				title="Add {present.name}'s present"
				on:click={() => loadPresent(present)}
				on:keyup={() => loadPresent(present)}
			/>
		{/each}
	</div>
</div>
