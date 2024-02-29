<script lang="ts">
	import { onMount } from 'svelte';
	import { TracingSettings, TracingText } from './Stores';

	let backgroundCanvas: HTMLCanvasElement;
	let foregroundCanvas: HTMLCanvasElement;

	let backgroundCtx: CanvasRenderingContext2D;
	let foregroundCtx: CanvasRenderingContext2D;

	let tracingSettings = $TracingSettings;
	let tracingText = $TracingText;

	onMount(() => {
		backgroundCtx = backgroundCanvas.getContext('2d')!;
		foregroundCtx = foregroundCanvas.getContext('2d')!;

		backgroundCtx.canvas.width = backgroundCanvas.parentElement?.clientWidth!;
		backgroundCtx.canvas.height = backgroundCanvas.parentElement?.clientHeight!;

		foregroundCtx.canvas.width = foregroundCanvas.parentElement?.clientWidth!;
		foregroundCtx.canvas.height = foregroundCanvas.parentElement?.clientHeight!;

		strokeText(tracingText.text, foregroundCtx.canvas.width / 2, foregroundCtx.canvas.height / 2);
	});

	function strokeText(text: string, x: number, y: number) {
		backgroundCtx.font = `${tracingSettings.size}px ${tracingSettings.font}`;
		backgroundCtx.textAlign = 'center';
		backgroundCtx.fillText(text, x, y);

		foregroundCtx.font = `${tracingSettings.size}px ${tracingSettings.font}`;
		foregroundCtx.textAlign = 'center';
		foregroundCtx.strokeText(text, x, y);
	}
</script>

<canvas class="absolute" hidden bind:this={backgroundCanvas} />
<canvas class="absolute" bind:this={foregroundCanvas} />
