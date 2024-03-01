import { get } from "svelte/store";
import type { PenSettings } from "./PenSettings";
import type { Point } from "./Point";
import { PenSettingsStore } from "./Stores";

export class DrawingPaper {
    private canvasCtx: CanvasRenderingContext2D

    private penPosition: Point
    private penSettings: PenSettings

    public constructor(canvasCtx: CanvasRenderingContext2D) {
        this.canvasCtx = canvasCtx;
        this.penPosition = {
            x: 0,
            y: 0
        }

        this.penSettings = get(PenSettingsStore)
        PenSettingsStore.subscribe((settings) => {
            this.penSettings = settings;
        })
    }

    public setPenPosition(x: number, y: number) {
        var { left, top } = this.canvasCtx.canvas.getBoundingClientRect();  // absolute position of canvas
        this.penPosition = {
            x: x - left,
            y: y - top
        }
    }

    public setScale(x: number, y: number) {
        this.canvasCtx.scale(x, y);
    }

    public setSize(width: number, height: number) {
        this.canvasCtx.canvas.width = width;
        this.canvasCtx.canvas.height = height;
    }

    public drawLineTo(x: number, y: number) {
        this.applyPenSettings();
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(this.penPosition.x, this.penPosition.y);
        this.setPenPosition(x, y)
        this.canvasCtx.lineTo(this.penPosition.x, this.penPosition.y);
        this.canvasCtx.stroke();
    }

    private applyPenSettings() {
        this.canvasCtx.lineWidth = this.penSettings.width;
        this.canvasCtx.strokeStyle = this.penSettings.color;
        this.canvasCtx.lineCap = 'round';
    }
}