<script lang="ts">
	import { onMount } from 'svelte';
	import { Paper } from './Paper';

	let canvas: HTMLCanvasElement;
	let paper: Paper;

	onMount(() => {
		paper = new Paper(canvas.getContext('2d')!, {
			width: 10,
			color: '#000000'
		});

		paper.setSize(canvas.parentElement?.clientWidth!, canvas.parentElement?.clientHeight!);
	});

	function onMouseClick(e: MouseEvent) {
		paper.setPenPosition(e.clientX, e.clientY);
	}

	function onMouseMove(e: MouseEvent) {
		let leftButtonPressed = e.buttons === 1;
		if (!leftButtonPressed) return;

		paper.drawLineTo(e.clientX, e.clientY);
	}

	// TODO (Michael): add support for pens
</script>

<canvas
	class="absolute"
	bind:this={canvas}
	on:mousedown={onMouseClick}
	on:mouseup={onMouseClick}
	on:mousemove={onMouseMove}
/>
