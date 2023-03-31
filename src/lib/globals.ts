import { writable } from "svelte/store";

const browser = typeof window !== 'undefined';
export const app = {
	browser,
	pathname: writable(browser?window.location?.pathname:'')
}