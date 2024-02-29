<script lang="ts">
	import { PenSettingsStore } from './Stores';

	const colors = [
		'#e81416',
		'#ffa500',
		'#faeb36',
		'#79c314',
		'#487de7',
		'#4b369d',
		'#70369d',
		'#ee82ee',
		'#000000'
	];

	let penSettingsStore = $PenSettingsStore;
	function setPenColor(color: string) {
		penSettingsStore.color = color;
	}
</script>

<div class="flex flex-row justify-between">
	<div class="w-2/12 bg-white shadow-lg rounded-lg"></div>
	<div
		class="w-fit px-8 col-span-6 mx-4 bg-white shadow-lg rounded-lg flex flex-row justify-center"
	>
		{#each colors as color, i}
			<button on:click={() => setPenColor(color)}>
				<svg class="w-16 h-16" style="fill:{color};">
					<circle class="hover:cursor-pointer" cx="32" cy="32" r="20"></circle>
				</svg>
			</button>
		{/each}
	</div>
	<div class="w-2/12 bg-white shadow-lg rounded-lg fill-black"></div>
</div>
