export class TracingPaper {
    private backgroundCanvasCtx: CanvasRenderingContext2D
    private foregroundCanvasCtx: CanvasRenderingContext2D

    private font: string
    private size: number

    constructor(backgroundCanvasCtx: CanvasRenderingContext2D, foregroundCanvasCtx: CanvasRenderingContext2D) {
        this.backgroundCanvasCtx = backgroundCanvasCtx;
        this.foregroundCanvasCtx = foregroundCanvasCtx;

        this.font = "Calibri";
        this.size = 10;
    }

    public setScale(x: number, y: number) {
        this.backgroundCanvasCtx.scale(x, y);
        this.foregroundCanvasCtx.scale(x, y);
    }

    public setSize(width: number, height: number) {
        this.backgroundCanvasCtx.canvas.width = width;
        this.backgroundCanvasCtx.canvas.height = height;
        this.foregroundCanvasCtx.canvas.width = width;
        this.foregroundCanvasCtx.canvas.height = height;
    }

    public strokeText(text: string, x: number, y: number,) {
        this.backgroundCanvasCtx.font = "102pt Calibri"
        this.backgroundCanvasCtx.fillText(text, x, y);

        this.foregroundCanvasCtx.font = "102pt Calibri"
        this.foregroundCanvasCtx.fillText(text, x, y);
    }
}