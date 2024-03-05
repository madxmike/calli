<script lang="ts">
	import { onMount } from 'svelte';
	import type { SourceGraphemeData } from './SourceGraphemeData';
	import { TextSettingsStore, type TextSettings } from './Stores';

	let backgroundCanvas: HTMLCanvasElement;
	let foregroundCanvas: HTMLCanvasElement;

	let backgroundCanvasCtx: CanvasRenderingContext2D;
	let foregroundCanvasCtx: CanvasRenderingContext2D;

	let textSettings: TextSettings = $TextSettingsStore;

	onMount(() => {
		backgroundCanvasCtx = backgroundCanvas.getContext('2d')!;
		foregroundCanvasCtx = foregroundCanvas.getContext('2d')!;

		let { clientWidth, clientHeight } = backgroundCanvas.parentElement!;
		backgroundCanvas.width = clientWidth;
		backgroundCanvas.height = clientHeight;
		backgroundCanvasCtx.scale(clientWidth, clientHeight);

		foregroundCanvas.width = clientWidth;
		foregroundCanvas.height = clientHeight;
		foregroundCanvasCtx.scale(clientWidth, clientHeight);

		clear();
	});

	function clear() {
		backgroundCanvasCtx.reset();
		foregroundCanvasCtx.reset();

		const imageData = backgroundCanvasCtx.getImageData(
			0,
			0,
			backgroundCanvasCtx.canvas.width,
			backgroundCanvasCtx.canvas.height
		);
		for (var i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i] = 255;
			imageData.data[i + 1] = 255;
			imageData.data[i + 2] = 255;
			imageData.data[i + 3] = 255;
		}

		backgroundCanvasCtx.putImageData(imageData, 0, 0);
	}

	export function drawText(text: string): SourceGraphemeData[] {
		let x = backgroundCanvasCtx.canvas.width / 2;
		let y = backgroundCanvasCtx.canvas.height / 2;

		foregroundCanvasCtx.font = `${textSettings.size}px ${textSettings.font}`;
		backgroundCanvasCtx.font = `${textSettings.size}px ${textSettings.font}`;

		// TODO (Michael): Properly split this text into graphemes by using itnl
		const graphemes = text.split('');
		const tracingGraphemes: SourceGraphemeData[] = [];

		let fullTextMetrics = backgroundCanvasCtx.measureText(text);
		let xOffset = -fullTextMetrics.width / 2;
		for (const grapheme of graphemes) {
			let textMextrics = backgroundCanvasCtx.measureText(grapheme);
			let width = textMextrics.width;
			let height = textMextrics.fontBoundingBoxAscent + textMextrics.fontBoundingBoxDescent;
			let baseline = (textMextrics as any).ideographicBaseline;

			backgroundCanvasCtx.fillText(grapheme, x + xOffset, y);
			foregroundCanvasCtx.strokeText(grapheme, x + xOffset, y);

			let tracingGrapheme: SourceGraphemeData = {
				position: {
					x: x + xOffset,
					y: y + baseline
				},
				width: width,
				height: height,
				imageData: backgroundCanvasCtx.getImageData(
					x + xOffset - width,
					y - height * 0.8,
					width,
					height
				)
			};

			xOffset += width;

			tracingGraphemes.push(tracingGrapheme);

			backgroundCanvasCtx.strokeRect(x + xOffset - width, y - height * 0.8, width, height);
		}

		return tracingGraphemes;
	}
</script>

<canvas
	id="source-background-canvas"
	class="absolute cursor-crosshair"
	bind:this={backgroundCanvas}
/>
<canvas
	id="source-foreground-canvas"
	class="absolute cursor-crosshair"
	bind:this={foregroundCanvas}
/>
