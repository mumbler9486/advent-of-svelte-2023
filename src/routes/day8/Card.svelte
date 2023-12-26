<script lang="ts">
	export let cardNumber: number;
	export let showBack: boolean = false;

	const cardBack = '/images/cards/card_back.png';
	const cardImgs: string[] = [
		'/images/cards/1.png',
		'/images/cards/2.png',
		'/images/cards/3.png',
		'/images/cards/4.png',
		'/images/cards/5.png',
		'/images/cards/6.png',
		'/images/cards/7.png',
		'/images/cards/8.png',
		'/images/cards/9.png',
		'/images/cards/10.png',
		'/images/cards/11.png',
		'/images/cards/12.png',
		'/images/cards/13.png',
		'/images/cards/14.png',
		'/images/cards/15.png',
		'/images/cards/16.png',
		'/images/cards/17.png',
		'/images/cards/18.png',
		'/images/cards/19.png',
		'/images/cards/20.png',
		'/images/cards/21.png',
		'/images/cards/22.png',
		'/images/cards/23.png',
		'/images/cards/24.png',
	];

	$: cardImage = cardImgs[cardNumber - 1] ?? '';
</script>

<svelte:head>
	<link rel="preload" as="image" href={cardBack} />
	{#each cardImgs as cardImg}
		<link rel="preload" as="image" href={cardImg} />
	{/each}
</svelte:head>

{#if showBack}
	<div class="w-28 cursor-pointer" on:click on:keyup role="button" tabindex={cardNumber}>
		<img src={cardBack} alt="cardBack" />
	</div>
{:else}
	<img class="w-28" src={cardImage} alt="Card" />
{/if}
