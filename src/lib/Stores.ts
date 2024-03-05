import { writable } from 'svelte/store';
import type { SourceGraphemeData } from './SourceGraphemeData';

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


export const SourceGraphemeDataStore = writable<SourceGraphemeData[]>([]);