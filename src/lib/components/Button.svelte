<script lang="ts">
	export let disabled: boolean = false;
</script>

<button class="btn btn-active btn-primary" {disabled} on:click>
	<slot />
</button>
