<script lang="ts">
	import { onMount } from 'svelte';
	import TracingCanvas from './TracingCanvas.svelte';
	import SourceCanvas from './SourceCanvas.svelte';
	import type { SourceGraphemeData } from './SourceGraphemeData';
	import type { PenMovedEvent } from './Events';

	export let text: string;

	let sourceCanvas: SourceCanvas;
	let tracingCanvas: TracingCanvas;
	let outputCanvas: HTMLCanvasElement;

	var sourceGraphemeData: SourceGraphemeData[] = [];

	onMount(() => {
		let width = outputCanvas.parentElement?.clientWidth!;
		let height = outputCanvas.parentElement?.clientHeight!;
		outputCanvas.width = width;
		outputCanvas.height = height;

		sourceGraphemeData = sourceCanvas.drawText(text);
	});

	function onPenMoved(e: CustomEvent<PenMovedEvent>) {
		let { x, y } = e.detail;

		let s = sourceGraphemeData[0];
		console.log(s.position.x, s.position.y, s.width, s.height);
		console.log(x, y);

		if (
			x >= s.position.x &&
			y >= s.position.y &&
			x <= s.position.x + s.width &&
			y <= s.position.y + s.height
		) {
			console.log('inside');
		}
	}
</script>

<SourceCanvas bind:this={sourceCanvas} />
<TracingCanvas bind:this={tracingCanvas} on:penmoved={onPenMoved} />
<canvas
	id="output-canvas"
	class="absolute cursor-crosshair pointer-events-none"
	bind:this={outputCanvas}
/>
