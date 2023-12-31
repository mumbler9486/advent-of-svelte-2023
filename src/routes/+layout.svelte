<script lang="ts">
	import '../app.css';
</script>

<main>
	<div class="navbar absolute top-0 z-30 bg-base-100">
		<a href="/" class="btn btn-ghost text-xl"
			><img class="w-10" src="/favicon.png" alt="Home Icon" />Advent of Svelte 2023</a
		>
	</div>
	<div class="bg-base-300 pt-16">
		<slot />
	</div>
</main>
