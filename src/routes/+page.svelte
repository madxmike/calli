<script lang="ts">
	import DrawingCanvas from '$lib/DrawingCanvas.svelte';
	import TracingCanvas from '$lib/TracingCanvas.svelte';
</script>

<div class="w-full h-screen flex justify-center items-center">
	<div class="w-1/2 h-[900px] bg-white shadow-lg rounded-xl items-center relative">
		<TracingCanvas></TracingCanvas>
		<DrawingCanvas></DrawingCanvas>
	</div>
</div>
