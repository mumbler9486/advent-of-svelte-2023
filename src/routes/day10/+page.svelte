<script lang="ts">
	import { onMount } from 'svelte';

	const popupInterval = 3500;

	let popup: HTMLDialogElement;

	const openModal = () => {
		popup?.show();
	};

	onMount(() => {
		setTimeout(openModal, popupInterval);
	});
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="mb-8 text-5xl font-bold">Surprise</h1>
			<div class="flex justify-center">
				<button class="btn btn-primary" on:click={openModal}>🎁 Surprise</button>
			</div>
		</div>
	</div>
</div>

<dialog id="my_modal_1" class="modal" bind:this={popup}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Merry Christmas from Santa!</h3>
		<img class="w-96" src="/images/santa_greeting.jpg" alt="Santa Greeting" />
		<p class="py-4">
			Merry Chirstmas! I hope you have been a nice this year and hope you have a great 2024! Keep it
			up!
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
