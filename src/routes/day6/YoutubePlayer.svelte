<script lang="ts">
	export let youtubeUrl: string | undefined = '';
	export let loop: boolean = false;
	export let autoplay: boolean = false;

	$: youtubeEmbedUrl = !youtubeUrl || youtubeUrl.length === 0 ? '' : youtubeUrl;
	$: embedOptions = `?loop=${loop ? 1 : 0}&autoplay=${autoplay ? 1 : 0}`;
	$: youtubeEmbedUrlWithOptions =
		!youtubeEmbedUrl || youtubeEmbedUrl.length === 0 ? '' : youtubeEmbedUrl + embedOptions;
</script>

<iframe
	class="aspect-video w-full bg-base-100"
	src={youtubeEmbedUrlWithOptions}
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
/>
