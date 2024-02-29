import { writable } from 'svelte/store';

export const PenSettingsStore = writable({
    width: 10,
    color: "#000000"
})

export const TracingSettingsStore = writable({
    font: "Calibri",
    size: 102
});

export const TracingTextStore = writable({
    text: "Hello, World"
})
