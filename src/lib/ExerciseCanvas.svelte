<script lang="ts">
	import { onMount } from 'svelte';
	import type { PenSettings } from './PenSettings';
	import { Paper } from './Paper';
	import { TracingPaper } from './TracingPaper';

	let penSettings: PenSettings = {
		width: 10,
		color: '#c0392b'
	};

	onMount(() => {
		let backgroundCanvas: HTMLCanvasElement = document.getElementById(
			'background-canvas'
		)! as HTMLCanvasElement;

		let foregroundCanvas: HTMLCanvasElement = document.getElementById(
			'foreground-canvas'
		)! as HTMLCanvasElement;

		let drawableCanvas: HTMLCanvasElement = document.getElementById(
			'drawable-canvas'
		)! as HTMLCanvasElement;

		let tracingPaper = new TracingPaper(
			backgroundCanvas.getContext('2d')!,
			foregroundCanvas.getContext('2d')!
		);

		tracingPaper.setSize(
			backgroundCanvas.parentElement?.clientWidth ?? 0,
			backgroundCanvas.parentElement?.clientHeight ?? 0
		);

		let paper = new Paper(drawableCanvas?.getContext('2d')!, {
			width: 10,
			color: '#f2d24a'
		});

		paper.setSize(
			drawableCanvas.parentElement?.clientWidth ?? 0,
			drawableCanvas.parentElement?.clientHeight ?? 0
		);
		document?.addEventListener('mousemove', onMouseMove);
		document?.addEventListener('mousedown', onMouseClick);
		drawableCanvas?.addEventListener('mouseenter', onMouseClick);

		function onMouseClick(e: MouseEvent) {
			paper.setPenPosition(e.clientX, e.clientY);
		}

		function onMouseMove(e: MouseEvent) {
			let leftButtonPressed = e.buttons === 1;
			if (!leftButtonPressed) return;

			paper.drawLineTo(e.clientX, e.clientY);
			paper.setPenPosition(e.clientX, e.clientY);
		}

		tracingPaper.strokeText('Hello, World', 10, 100);
	});
</script>

<canvas id="background-canvas" class="border-blue-400 border-2 absolute" hidden> </canvas>
<canvas id="foreground-canvas" class="border-blue-400 border-2 absolute"> </canvas>
<canvas id="drawable-canvas" class="border-blue-400 border-2 absolute"> </canvas>
