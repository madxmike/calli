import type { PenSettings } from "./PenSettings";
import type { Point } from "./Point";

export class Paper {
    private canvasCtx: CanvasRenderingContext2D

    private penSettings: PenSettings
    private penPosition: Point

    public constructor(canvasCtx: CanvasRenderingContext2D, settings: PenSettings) {
        this.canvasCtx = canvasCtx;
        this.penSettings = settings;
        this.penPosition = {
            x: 0,
            y: 0
        }
    }

    public setPenPosition(x: number, y: number) {
        this.penPosition = {
            x: x,
            y: y,
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
        this.canvasCtx.lineTo(x, y);
        this.canvasCtx.stroke();
    }

    private applyPenSettings() {
        this.canvasCtx.lineWidth = this.penSettings.width;
        this.canvasCtx.strokeStyle = this.penSettings.color;
        this.canvasCtx.lineCap = 'round';
    }
}