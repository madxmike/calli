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
		let o = outputCanvas.getContext('2d')!;
		o.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
		
		sourceGraphemeData.forEach((sourceGraphemeData) => {
			if (
				x >= sourceGraphemeData.position.x &&
				y >= sourceGraphemeData.position.y &&
				x <= sourceGraphemeData.position.x + sourceGraphemeData.width &&
				y <= sourceGraphemeData.position.y + sourceGraphemeData.height
			) {
				o.strokeStyle = '#FF0000';
				o.strokeRect(
					sourceGraphemeData.position.x,
					sourceGraphemeData.position.y,
					sourceGraphemeData.width,
					sourceGraphemeData.height
				);
			}
		});
	}
</script>

<SourceCanvas bind:this={sourceCanvas} />
<TracingCanvas bind:this={tracingCanvas} on:penmoved={onPenMoved} />
<canvas
	id="output-canvas"
	class="absolute cursor-crosshair pointer-events-none"
	bind:this={outputCanvas}
/>
