<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let src: string;
	export let label: string;
	export let playbackKey: string;
	export let sfxOverlapCount: number = 10;

	const dispatcher = createEventDispatcher();

	let players: HTMLAudioElement[] = Array(sfxOverlapCount);
	let playbackIndex = 0;

	const playSfx = () => {
		players[playbackIndex].play();
		playbackIndex = (playbackIndex + 1) % sfxOverlapCount;

		dispatcher('played');
	};

	const keyUp = (e: KeyboardEvent) => {
		if (e.code === playbackKey) {
			playSfx();
		}
	};

	export const play = playSfx;
</script>

<svelte:window on:keyup={keyUp} />

<Button wide on:click={() => playSfx()}>{label}</Button>
{#each Array(sfxOverlapCount) as x, i}
	<audio {src} bind:this={players[i]} />
{/each}
