<script lang="ts">
	import elfNames from './day-eleven.json';
	import { cyrb128 } from './hash';
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

		// First determine the lev distances for this name
		const nameInfos = elfNameList.map((elfName) => ({
			levDistance: levenshteinDistance(name, elfName),
			elfName: elfName,
		}));

		// Find the min
		const minLevDistance = nameInfos.reduce((prev, curr) => {
			if (curr.levDistance < prev) {
				return curr.levDistance;
			}
			return prev;
		}, 1000000);

		// Gather the minimums
		const closestElfNames = nameInfos.filter((nameInfo) => nameInfo.levDistance === minLevDistance);
		console.log(closestElfNames);
		// Random select the name based on the original name's hash
		const nameHash = cyrb128(name);
		const closestNameIndex = nameHash[0] % closestElfNames.length;
		return closestElfNames[closestNameIndex].elfName;
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
