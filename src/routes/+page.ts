import type { PageLoad } from './$types';
import { base } from '$app/paths';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`${base}/localization.json`);

	if (!response.ok) {
		throw new Error('Failed to load localization database');
	}

	return {
		localization: await response.json()
	};
};
