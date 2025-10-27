//@ts-expect-error tets
export const load = async ({ fetch }) => {
	const response = await fetch('/localization.json');

	if (!response.ok) {
		throw new Error('Failed to load localization database');
	}

	return {
		localization: await response.json()
	};
};
