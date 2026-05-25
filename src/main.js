import App from './App.svelte';
import { mount } from "svelte";

var app = mount(App, {
	target: document.body
});

export default app;