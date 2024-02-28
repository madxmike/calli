<script lang="ts">
	import { onMount } from 'svelte';
	import type { PenSettings } from './PenSettings';

	let penSettings: PenSettings = {
		width: 10,
		color: '#c0392b'
	};

	onMount(() => {
		let canvas: HTMLCanvasElement = document.getElementById(
			'drawable-canvas'
		)! as HTMLCanvasElement;

		canvas?.addEventListener('mousemove', draw);
		canvas?.addEventListener('mousedown', setPosition);
		canvas?.addEventListener('mouseenter', setPosition);

		var ctx = canvas?.getContext('2d')!;
		var pos = { x: 0, y: 0 };
		resize();
		// new position from mouse event
		function setPosition(e: MouseEvent) {
			pos.x = e.clientX;
			pos.y = e.clientY;
		}

		// resize canvas
		function resize() {
			let scale = window.devicePixelRatio;
			canvas.width = canvas.parentElement?.clientWidth ?? 0 * scale;
			canvas.height = canvas.parentElement?.clientHeight ?? 0 * scale;
			ctx.scale(scale, scale);
			ctx.imageSmoothingEnabled = false;
		}

		function draw(e: MouseEvent) {
			// mouse left button must be pressed
			if (e.buttons !== 1) return;

			ctx.beginPath(); // begin

			ctx.lineWidth = penSettings.width;
			ctx.strokeStyle = penSettings.color;
			ctx.lineCap = 'round';

			ctx.moveTo(pos.x, pos.y);
			setPosition(e);
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke();
		}
	});
</script>

<div class="w-1/2 h-1/2">
	<canvas id="drawable-canvas" class="border-blue-400 border-2"> </canvas>
</div>
