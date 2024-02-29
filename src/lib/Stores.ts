import { writable } from 'svelte/store';

export const TracingSettings = writable({
    font: "Calibri",
    size: 102
});

export const TracingText = writable({
    text: "Hello, World"
})
