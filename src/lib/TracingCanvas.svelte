<script lang="ts">
	import { onMount } from 'svelte';
	import type { Point } from './Point';
	import type { PenSettings } from './PenSettings';
	import { PenSettingsStore } from './Stores';

	let canvas: HTMLCanvasElement;
	let canvasCtx: CanvasRenderingContext2D;

	let penSettings: PenSettings = $PenSettingsStore;
	let penPosition: Point;

	onMount(() => {
		canvasCtx = canvas.getContext('2d')!;

		penPosition = { x: 0, y: 0 };

		let { clientWidth, clientHeight } = canvas.parentElement!;
		canvasCtx.canvas.width = clientWidth;
		canvasCtx.canvas.height = clientHeight;
		canvasCtx.scale(clientWidth, clientHeight);

		clear();
	});

	export function clear() {
		const imageData = canvasCtx.getImageData(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
		for (var i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i] = 255;
			imageData.data[i + 1] = 255;
			imageData.data[i + 2] = 255;
			imageData.data[i + 3] = 1;
		}

		canvasCtx.putImageData(imageData, 0, 0);
	}

	function drawLineTo(x: number, y: number) {
		canvasCtx.lineWidth = penSettings.width;
		canvasCtx.strokeStyle = penSettings.color;
		canvasCtx.lineCap = 'round';
		canvasCtx.beginPath();
		canvasCtx.moveTo(penPosition.x, penPosition.y);
		setPenPosition(x, y);
		canvasCtx.lineTo(penPosition.x, penPosition.y);
		canvasCtx.stroke();
	}

	function setPenPosition(x: number, y: number) {
		var { left, top } = canvasCtx.canvas.getBoundingClientRect(); // absolute position of canvas
		penPosition = {
			x: x - left,
			y: y - top
		};
	}

	function onMouseClick(e: MouseEvent) {
		setPenPosition(e.clientX, e.clientY);
	}

	function onMouseMove(e: MouseEvent) {
		let leftButtonPressed = e.buttons === 1;
		if (!leftButtonPressed) return;

		drawLineTo(e.clientX, e.clientY);
	}
</script>

<canvas
	id="drawing-canvas"
	class="absolute cursor-crosshair"
	bind:this={canvas}
	on:mousedown={onMouseClick}
	on:mouseup={onMouseClick}
	on:mousemove={onMouseMove}
/>
