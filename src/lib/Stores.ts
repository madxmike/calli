import { writable } from 'svelte/store';
import type { TracingGrapheme } from './TracingGrapheme';

export const PenSettingsStore = writable({
    width: 8,
    color: "#000000"
})

export interface TextSettings {
    font: string;
    size: number;
}

export const TextSettingsStore = writable<TextSettings>({
    font: "Calibri",
    size: 150
});


export const TracingGraphemesStore = writable<TracingGrapheme[]>([]);