<script lang="ts">
	import { onMount } from 'svelte';
	import { DrawingPaper } from './DrawingPaper';
	import { TracingPaper } from './TracingPaper';
	import { TracingTextStore } from './Stores';

	let tracingBackgroundCanvas: HTMLCanvasElement;
	let tracingForegroundCanvas: HTMLCanvasElement;
	let drawingCanvas: HTMLCanvasElement;

	let drawingPaper: DrawingPaper;
	let tracingPaper: TracingPaper;

	onMount(() => {
		drawingPaper = new DrawingPaper(drawingCanvas.getContext('2d')!);
		tracingPaper = new TracingPaper(
			tracingBackgroundCanvas.getContext('2d')!,
			tracingForegroundCanvas.getContext('2d')!
		);

		let width = drawingCanvas.parentElement?.clientWidth!;
		let height = drawingCanvas.parentElement?.clientHeight!;

		drawingPaper.setSize(width, height);
		tracingPaper.setSize(width, height);

		TracingTextStore.set({
			text: 'Hello, World'
		});
	});

	function onMouseClick(e: MouseEvent) {
		drawingPaper.setPenPosition(e.clientX, e.clientY);
	}

	function onMouseMove(e: MouseEvent) {
		let leftButtonPressed = e.buttons === 1;
		if (!leftButtonPressed) return;

		drawingPaper.drawLineTo(e.clientX, e.clientY);
	}

	// TODO (Michael): add support for pens
</script>

<canvas
	hidden
	id="tracing-background-canvas"
	class="absolute traci-crosshair"
	bind:this={tracingBackgroundCanvas}
/>
<canvas
	id="tracing-foreground-canvas"
	class="absolute cursor-crosshair"
	bind:this={tracingForegroundCanvas}
/>
<canvas
	id="drawing-canvas"
	class="absolute cursor-crosshair"
	bind:this={drawingCanvas}
	on:mousedown={onMouseClick}
	on:mouseup={onMouseClick}
	on:mousemove={onMouseMove}
/>
