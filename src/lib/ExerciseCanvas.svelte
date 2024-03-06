<script lang="ts">
	import { onMount } from 'svelte';
	import TracingCanvas from './TracingCanvas.svelte';
	import SourceCanvas from './SourceCanvas.svelte';
	import type { SourceGraphemeData } from './SourceGraphemeData';
	import type { PenMovedEvent } from './Events';

	const OVERDRAW_PENALTY = 0.1;
	const UNDERDRAW_PENALTY = 0.1;
	const MASSIVE_OVERDRAW_PENALTY = 1;
	const MASSIVE_OVERDRAW_PENALTY_THRESHOLD = 0.1;

	export let text: string;

	let sourceCanvas: SourceCanvas;
	let tracingCanvas: TracingCanvas;
	let outputCanvas: HTMLCanvasElement;
	let outputCanvasCtx: CanvasRenderingContext2D;

	var sourceGraphemeData: SourceGraphemeData[] = [];
	let activeGraphemeIndex: number = -1;

	onMount(() => {
		outputCanvasCtx = outputCanvas.getContext('2d')!;

		let width = outputCanvas.parentElement?.clientWidth!;
		let height = outputCanvas.parentElement?.clientHeight!;
		outputCanvas.width = width;
		outputCanvas.height = height;

		sourceGraphemeData = sourceCanvas.drawText(text);
	});

	function onPenMoved(e: CustomEvent<PenMovedEvent>) {
		let { x, y } = e.detail;

		outputCanvasCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
		var insideAny = false;
		sourceGraphemeData.forEach((sourceGraphemeData, i) => {
			if (
				x >= sourceGraphemeData.position.x &&
				y >= sourceGraphemeData.position.y &&
				x <= sourceGraphemeData.position.x + sourceGraphemeData.width &&
				y <= sourceGraphemeData.position.y + sourceGraphemeData.height
			) {
				activeGraphemeIndex = i;
				insideAny = true;
				outputCanvasCtx.strokeStyle = '#FF0000';
				outputCanvasCtx.strokeRect(
					sourceGraphemeData.position.x,
					sourceGraphemeData.position.y,
					sourceGraphemeData.width,
					sourceGraphemeData.height
				);
			}
		});

		if (!insideAny) {
			activeGraphemeIndex = -1;
		}

		let grade = gradeActiveGrapheme() * 100;
		outputCanvasCtx.font = `102px Calibri`;

		outputCanvasCtx.fillText(
			grade.toFixed(2),
			outputCanvasCtx.canvas.width / 2,
			outputCanvasCtx.canvas.height / 8
		);
	}

	function xorImageData(a: ImageData, b: ImageData, output: ImageData) {
		for (var i = 0; i < a.data.length; i += 4) {
			output.data[i] = a.data[i] ^ b.data[i];
			output.data[i + 1] = a.data[i + 1] ^ b.data[i + 1];
			output.data[i + 2] = a.data[i + 2] ^ b.data[i + 2];
			output.data[i + 3] = 255;
		}
	}

	function gradeActiveGrapheme(): number {
		if (activeGraphemeIndex == -1) return 0;

		let { x, y } = sourceGraphemeData[activeGraphemeIndex].position;
		let { width, height } = sourceGraphemeData[activeGraphemeIndex];

		let tracingImageData = tracingCanvas.getImageData(x, y, width, height);
		let sourceImageData = sourceGraphemeData[activeGraphemeIndex].imageData;

		var expectedPixelCount = 0;
		var overdrawPixelCount = 0;
		var underdrawPixelCount = 0;
		var correctPixelCount = 0;
		const WHITE = 255;
		const BLACK = 0;

		for (var i = 0; i < tracingImageData.data.length; i += 4) {
			if (sourceImageData.data[i] == BLACK) {
				expectedPixelCount++;
			}

			// White && White = Okay, not expected
			// White && Black = Underdraw
			// Black && White = Overdraw
			// Black && Black = Okay, expected
			if (tracingImageData.data[i] == WHITE && sourceImageData.data[i] == WHITE) {
				continue;
			} else if (tracingImageData.data[i] == WHITE && sourceImageData.data[i] == BLACK) {
				underdrawPixelCount++;
			} else if (tracingImageData.data[i] == BLACK && sourceImageData.data[i] == WHITE) {
				overdrawPixelCount++;
			} else if (tracingImageData.data[i] == BLACK && sourceImageData.data[i] == BLACK) {
				correctPixelCount++;
			}
		}

		var score = correctPixelCount;
		score -= underdrawPixelCount * UNDERDRAW_PENALTY;
		if (overdrawPixelCount / expectedPixelCount > MASSIVE_OVERDRAW_PENALTY_THRESHOLD) {
			score -= overdrawPixelCount * MASSIVE_OVERDRAW_PENALTY;
		} else {
			score -= overdrawPixelCount * OVERDRAW_PENALTY;
		}

		let finalScore = score / expectedPixelCount;
		return finalScore > 0 ? finalScore : 0;
	}
</script>

<SourceCanvas bind:this={sourceCanvas} />
<TracingCanvas bind:this={tracingCanvas} on:penmoved={onPenMoved} />
<canvas
	id="output-canvas"
	class="absolute cursor-crosshair pointer-events-none"
	bind:this={outputCanvas}
/>
