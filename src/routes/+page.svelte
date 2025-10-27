<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	type LocalizationEntry = {
		FSA: string;
		Ville: string;
		'Region Espoir': string;
	};

	const normalize = (code: string) => code.replace(/\s+/g, '').toUpperCase();

	let { data } = $props<{ data: { localization: LocalizationEntry[] } }>();

	const database = data.localization;
	const lookupTable = new Map<string, LocalizationEntry>(
		database.map((entry: LocalizationEntry) => [normalize(entry.FSA), entry])
	);

	let postalCode = $state('');
	let result: LocalizationEntry | null = $state(null);
	let errorMessage = $state('');

	const handleSubmit = () => {
		const key = normalize(postalCode);

		result = lookupTable.get(key) ?? null;

		if (!result && key.length > 3) {
			result = lookupTable.get(key.slice(0, 3)) ?? null;
		}

		errorMessage = result ? '' : 'Aucun résultat trouvé.';
	};
</script>

<div class="absolute left-[5px] top-[5px]">
	<img src="/logo.png" alt="VBQ Lookup" class="h-12 w-auto" />
</div>

<div class="flex min-h-screen items-start justify-center pt-[calc(33vh)]">
	<form class="flex w-full max-w-2xl flex-col items-center space-y-6" onsubmit={handleSubmit}>
		<div class="flex w-full items-center justify-center space-x-3">
			<Input
				type="text"
				placeholder="Code Postal"
				required
				bind:value={postalCode}
				autocomplete="postal-code"
				class="h-12 text-lg"
			/>
			<Button type="submit" class="h-12 text-lg">Rechercher</Button>
		</div>

		{#if result}
			<div class="w-full rounded-lg bg-white/10 p-4 text-center">
				<p class="text-lg font-semibold">{result['Region Espoir']}</p>
				<p class="text-sm text-gray-500">{result.Ville}</p>
			</div>
		{:else if errorMessage}
			<p class="text-sm text-red-500">{errorMessage}</p>
		{/if}
	</form>
</div>
