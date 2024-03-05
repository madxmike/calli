<script lang="ts">
	import { onMount } from 'svelte';
	import TracingCanvas from './TracingCanvas.svelte';
	import SourceCanvas from './SourceCanvas.svelte';

	let sourceCanvas: SourceCanvas;
	let tracingCanvas: TracingCanvas;
	let outputCanvas: HTMLCanvasElement;

	onMount(() => {
		let width = outputCanvas.parentElement?.clientWidth!;
		let height = outputCanvas.parentElement?.clientHeight!;
		outputCanvas.width = width;
		outputCanvas.height = height;

		sourceCanvas.drawText('Hello, World!');
	});
</script>

<SourceCanvas bind:this={sourceCanvas} />
<TracingCanvas bind:this={tracingCanvas} />
<canvas
	id="output-canvas"
	class="absolute cursor-crosshair pointer-events-none"
	bind:this={outputCanvas}
/>
