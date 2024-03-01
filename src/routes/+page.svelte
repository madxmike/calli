<script lang="ts">
	import ExerciseCanvas from '$lib/ExerciseCanvas.svelte';
	import Toolbar from '$lib/Toolbar.svelte';
	import { TracingSettingsStore } from '$lib/Stores';

	TracingSettingsStore.set({
		font: 'Calibri',
		size: 102
	});
</script>

<div class="w-full h-screen flex flex-col justify-center items-center">
	<div class="w-10/12 h-4/6 bg-white shadow-lg rounded-xl items-center relative">
		<ExerciseCanvas />
	</div>
	<div class="mt-4">
		<Toolbar></Toolbar>
	</div>
</div>
