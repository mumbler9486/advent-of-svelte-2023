<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Card from './Card.svelte';
	import Button from '$lib/components/Button.svelte';

	// To fix the flashing I might want to consider handling the card flip
	// inside the Card component instead of the forloop here

	let gameCards: { cardId: number; cardNum: number }[] = [];
	let foundPairs: number[] = [];
	let selectedCards: number[] = [];
	let guesses: number = 0;

	$: isGameOver = foundPairs.length === CardNumMax * 2;

	const CardNumMax = 24;
	const ResetSelectionTimeout = 2000;

	const resetGame = () => {
		const cards = [];
		foundPairs = [];
		selectedCards = [];
		guesses = 0;

		//Adds Pairs of cards
		for (let i = 0; i < CardNumMax * 2; i++) {
			const card = {
				cardId: i + 1,
				cardNum: Math.floor((i - (i % 2)) / 2) + 1
			};
			cards.push(card);
		}
		gameCards = shuffle(cards);
		gameCards = cards;
	};

	const pickCard = (cardId: number) => {
		if (isGameOver) {
			return;
		}

		if (selectedCards.length >= 2) {
			return;
		}

		if (selectedCards.includes(cardId)) {
			return;
		}

		selectedCards.push(cardId);
		selectedCards = selectedCards;

		const card1 = Math.min(selectedCards[0], selectedCards[1]);
		const card2 = Math.max(selectedCards[1], selectedCards[0]);
		const cardMatch = card1 % 2 === 1 ? card1 + 1 === card2 : false;
		if (cardMatch) {
			//Match
			guesses++;
			console.log('Match!', selectedCards);
			foundPairs.push(selectedCards[0]);
			foundPairs.push(selectedCards[1]);
			foundPairs = foundPairs;
			selectedCards = [];
			gameCards = gameCards;
			playCorrect();
			return;
		}

		if (selectedCards.length >= 2) {
			//Wrong
			guesses++;
			resetCardSelection();
			playWrong();
			return;
		}
	};

	const resetCardSelection = () => {
		setTimeout(() => {
			selectedCards = [];
			gameCards = gameCards;
		}, ResetSelectionTimeout);
	};

	const shuffle = <T,>(cardNums: T[]) => {
		for (let i = cardNums.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[cardNums[i], cardNums[j]] = [cardNums[j], cardNums[i]];
		}
		return cardNums;
	};

	onMount(resetGame);

	// Sound
	let audioContext: AudioContext;
	let oscillator: OscillatorNode;
	let gain: GainNode;

	onMount(() => {
		audioContext = new AudioContext();
	});

	const playCorrect = () => {
		oscillator = audioContext.createOscillator();
		gain = audioContext.createGain();
		oscillator.connect(gain);
		gain.connect(audioContext.destination);
		oscillator.type = 'square';
		oscillator.frequency.value = 880.0;
		oscillator.start();
		gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1.5);
	};

	const playWrong = () => {
		oscillator = audioContext.createOscillator();
		gain = audioContext.createGain();
		oscillator.connect(gain);
		gain.connect(audioContext.destination);
		oscillator.type = 'square';
		oscillator.frequency.value = 65.41;
		oscillator.start();
		gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1.5);
	};

	onDestroy(() => audioContext?.close());
</script>

<div class="flex flex-col gap-4">
	<div>
		<h1 class="text-xl">Card Matching</h1>
		<p>Matched Pairs: {foundPairs.length / 2}</p>
		<p>Guesses: {guesses}</p>
		{#if isGameOver}
			<h1 class="text-success text-6xl">YOU WIN!</h1>
		{/if}
		<Button on:click={resetGame}>Reset Game?</Button>
	</div>
	<div class="flex flex-wrap gap-2">
		{#each gameCards as card}
			{#key foundPairs}
				{#key selectedCards}
					<Card
						cardNumber={card.cardNum}
						showBack={!foundPairs.includes(card.cardId) && !selectedCards.includes(card.cardId)}
						on:click={() => pickCard(card.cardId)}
					/>
				{/key}
			{/key}
		{/each}
	</div>
</div>
