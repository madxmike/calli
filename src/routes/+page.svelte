<script lang="ts">
	import ExerciseCanvas from '$lib/ExerciseCanvas.svelte';
	import { EXERCISE_DIFFICULTY_BEGINNER } from '$lib/ExerciseDifficulty';
	import Toolbar from '$lib/Toolbar.svelte';
</script>

<div class="w-full h-screen flex flex-col justify-center items-center">
	<div class="w-10/12 h-4/6 bg-white shadow-lg rounded-xl items-center relative">
		<ExerciseCanvas text="Hello, World!" difficulty={EXERCISE_DIFFICULTY_BEGINNER} />
	</div>
	<div class="mt-4">
		<Toolbar></Toolbar>
	</div>
</div>
