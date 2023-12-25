<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { translateToMorse } from './morseCode';

	let text: string = '';
	$: translatedText = translateToMorse(text);

	let audioContext: AudioContext;
	let oscillator: OscillatorNode;
	let gain: GainNode;
	let cancelToken: boolean = false;

	onMount(() => {
		audioContext = new AudioContext();
		cancelToken = false;
	});

	const playbackMorse = async () => {
		stopPlayback();
		await sleep(300);

		if (!translatedText || translatedText.length <= 0) {
			return;
		}

		cancelToken = false;

		for (let i = 0; i < translatedText.length; i++) {
			const morseChar = translatedText.charAt(i);

			if (cancelToken) {
				return;
			}

			if (morseChar === '.') {
				playShort();
				await sleep(300);
			} else if (morseChar === '-') {
				playLong();
				await sleep(700);
			} else {
				await sleep(300);
			}
		}
	};

	const playShort = () => {
		oscillator = audioContext.createOscillator();
		gain = audioContext.createGain();
		oscillator.connect(gain);
		gain.connect(audioContext.destination);
		oscillator.type = 'square';
		oscillator.frequency.value = 523.3;
		oscillator.start();
		gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
	};

	const playLong = () => {
		oscillator = audioContext.createOscillator();
		gain = audioContext.createGain();
		oscillator.connect(gain);
		gain.connect(audioContext.destination);
		oscillator.type = 'square';
		oscillator.frequency.value = 523.3;
		oscillator.start();
		gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 3);
	};

	const stopPlayback = () => {
		cancelToken = true;
		oscillator?.stop();
	};

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	onDestroy(stopPlayback);
</script>

<div class="flex flex-col gap-4 lg:w-96">
	<img src="/images/telegraph_elf.jpg" alt="AI Generated Santa's Elf on a Telegraph" />
	<Input label="Text to Translate" bind:value={text} />
	<p class="p-4 bg-base-300">{translatedText}</p>
	<Button on:click={playbackMorse}>▶</Button>
	<Button on:click={stopPlayback}>⏹</Button>
</div>
