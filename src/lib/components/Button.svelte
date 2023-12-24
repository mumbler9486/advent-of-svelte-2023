<script lang="ts">
	export let disabled: boolean = false;
	export let wide: boolean = false;
</script>

<button class="btn btn-active btn-primary" class:btn-wide={wide} {disabled} on:click>
	<slot />
</button>
