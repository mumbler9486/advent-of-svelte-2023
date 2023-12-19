<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	let cookies = 0;

	const addCookies = () => {
		cookies++;
	};

	const removeCookies = () => {
		cookies = Math.max(--cookies, 0);
	};

	const resetCookies = () => {
		cookies = 0;
	};
</script>

<div>
	<img src="/images/cookie.png" alt="cookie" />
	<p class="text-6xl">
		{cookies}
	</p>
	<Button on:click={addCookies}>Add Cookie</Button>
	<Button on:click={removeCookies}>Remove Cookie</Button>
	<Button on:click={resetCookies}>Reset</Button>
</div>
