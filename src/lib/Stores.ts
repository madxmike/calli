import { writable } from 'svelte/store';

const TracingSettings = writable({
    font: "Calibri",
    size: 102
});

export default TracingSettings;
