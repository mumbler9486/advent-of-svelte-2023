<script lang="ts">
	import elfNames from './day-eleven.json';
	import { levenshteinDistance } from './levenshteinDistance';

	let inputName: string = '';

	const elfFirstNames = elfNames.firstNames;
	const elfLastNames = elfNames.lastNames;

	$: nameSplit = inputName.split(' ');
	$: firstName = nameSplit[0] ?? '';
	$: lastName = nameSplit[1] ?? '';

	$: elfFirstName = findClosestElfName(firstName, elfFirstNames);
	$: elfLastName = findClosestElfName(lastName, elfLastNames);
	$: elfName = `${elfFirstName} ${elfLastName}`.trim();

	const findClosestElfName = (name: string, elfNameList: string[]) => {
		if (!name || name.length === 0) {
			return '';
		}

		let minLevDistance = 1000000;
		let minName = '';
		for (let elfName of elfNameList) {
			const levDistance = levenshteinDistance(name, elfName);
			if (levDistance < minLevDistance) {
				minLevDistance = levDistance;
				minName = elfName;
			}
		}

		return minName;
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="mb-8 text-5xl font-bold">Tinsel Transformer</h1>
			<p>Enter your name and get an elf name!</p>
			<div class="flex justify-center">
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text">What is your name?</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs"
						bind:value={inputName}
					/>
				</label>
			</div>
			<div class="mt-4 text-xl">
				<p>Your Elf Name is:</p>
				<p class="text-4xl text-red-500">{elfName}</p>
			</div>
		</div>
	</div>
</div>
