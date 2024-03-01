
import { get, type Writable } from 'svelte/store';
import { TracingSettingsStore, TracingTextStore } from './Stores';

export interface TracingSettings {
    font: string
    size: number
}

export interface TracingText {
    text: string
}

export class TracingPaper {

    private backgroundCanvasCtx: CanvasRenderingContext2D
    private foregroundCanvasCtx: CanvasRenderingContext2D

    private settings: TracingSettings
    private text: TracingText

    constructor(backgroundCanvasCtx: CanvasRenderingContext2D, foregroundCanvasCtx: CanvasRenderingContext2D) {
        this.backgroundCanvasCtx = backgroundCanvasCtx;
        this.foregroundCanvasCtx = foregroundCanvasCtx;

        this.settings = get(TracingSettingsStore);
        TracingSettingsStore.subscribe((settings) => this.settings = settings);

        this.text = get(TracingTextStore);
        TracingTextStore.subscribe((text) => {
            this.text = text;
            this.clear();
            this.strokeText(this.text.text, this.foregroundCanvasCtx.canvas.width / 2, this.foregroundCanvasCtx.canvas.height / 2);
        });
    }

    public setSize(width: number, height: number) {
        this.backgroundCanvasCtx.canvas.width = width;
        this.backgroundCanvasCtx.canvas.height = height;
        this.foregroundCanvasCtx.canvas.width = width;
        this.foregroundCanvasCtx.canvas.height = height;
    }

    public strokeText(text: string, x: number, y: number) {
        this.backgroundCanvasCtx.font = `${this.settings.size}px ${this.settings.font}`;
        this.backgroundCanvasCtx.textAlign = 'center';
        this.backgroundCanvasCtx.fillText(text, x, y);

        this.foregroundCanvasCtx.font = `${this.settings.size}px ${this.settings.font}`;
        this.foregroundCanvasCtx.textAlign = 'center';
        this.foregroundCanvasCtx.strokeText(text, x, y);
    }

    public clear() {
        this.backgroundCanvasCtx.reset();
        this.foregroundCanvasCtx.reset();
    }
}