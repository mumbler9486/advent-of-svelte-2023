<script lang="ts">
	export let placeholder: string = '';
	export let value: string = '';
	export let label: string = '';
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for="input">
		<span class="label-text">{label}</span>
	</label>
	<input type="text" {placeholder} class="input input-bordered w-full max-w-xs" bind:value />
</div>
