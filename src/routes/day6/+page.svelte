<script lang="ts">
	import SoundEffect from './SoundEffect.svelte';
	import YoutubePlayer from './YoutubePlayer.svelte';

	const musicList: Song[] = [
		{
			name: 'Last Christmas - Wham!',
			youtubeEmbedUrl: 'https://www.youtube.com/embed/E8gmARGvPlI'
		},
		{
			name: 'Toad Sings All I want for Chirstmas is you',
			youtubeEmbedUrl: 'https://www.youtube.com/embed/2RtI5UEZlzU'
		},
		{
			name: 'PSO2 Christmas Lobby (©SEGA)',
			youtubeEmbedUrl: 'https://www.youtube.com/embed/-uf9G388rpE'
		},
		{
			name: 'Last Christmas - Vintage Andrews Sisters Style',
			youtubeEmbedUrl: 'https://www.youtube.com/embed/a3Hrn2_LxDs'
		},
		{
			name: 'Have Yourself A Merry Little Christmas - Frank Sinatra',
			youtubeEmbedUrl: 'https://www.youtube.com/embed/-tJtsKngXJU'
		}
	];
	const soundEffects: SoundEffect[] = [
		{ label: '🥁(D)', uri: '/sounds/drum_sfx.wav', playbackKey: 'KeyD' },
		{ label: '🎄🔔(W)', uri: '/sounds/jingle_bells_sfx.wav', playbackKey: 'KeyW' },
		{ label: '🎩🥁(A)', uri: '/sounds/high_hat_sfx.wav', playbackKey: 'KeyA' }
	];

	interface SoundEffect {
		label: string;
		uri: string;
		playbackKey: string;
	}

	interface Song {
		name: string;
		youtubeEmbedUrl: string;
	}

	let currentSong: Song = musicList[0];

	const playSong = (youtubeUrl: string) => {
		const song = musicList.find((x) => x.youtubeEmbedUrl === youtubeUrl);
		if (!song) {
			throw Error('Unknown Song:' + youtubeUrl);
		}
		currentSong = song;
	};

	let sfxBpm = 0;
	let sfxClickHistory: Date[] = [];
	const bpmMeasureWindow = 1000 * 10;
	const countBpm = () => {
		const currentTime = new Date();
		sfxClickHistory.push(currentTime);
		sfxClickHistory = sfxClickHistory.filter(
			(c) => c.getTime() > currentTime.getTime() - bpmMeasureWindow
		);

		sfxBpm = sfxClickHistory.length * (60000 / bpmMeasureWindow);
	};
</script>

<div class="grid grid-cols-1 lg:grid-cols-3">
	<div>
		<p class="text-center select-none" style="font-size: 12rem;">🎶</p>
		<p class="text-xl text-center">BPM: {sfxBpm}</p>
	</div>
	<table class="table table-sm">
		<thead>
			<tr>
				<th>🎵</th>
				<th>Song</th>
				<th>🔗</th>
			</tr>
		</thead>
		<tbody>
			{#each musicList as song, i}
				<tr>
					<td>
						<button on:click={() => playSong(song.youtubeEmbedUrl)}>▶</button>
					</td>
					<td>{song.name}</td>
					<td>
						<a
							class="text-xs link"
							href={song.youtubeEmbedUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Youtube
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="lg:row-start-2 flex flex-col items-center gap-2 p-4">
		{#each soundEffects as sfx}
			<SoundEffect
				label={sfx.label}
				src={sfx.uri}
				playbackKey={sfx.playbackKey}
				on:played={countBpm}
			></SoundEffect>
		{/each}
	</div>
	<div class="lg:row-start-2 lg:col-start-2">
		<YoutubePlayer youtubeUrl={currentSong.youtubeEmbedUrl} autoplay loop />
	</div>
</div>
