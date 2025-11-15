<script lang="ts">
	import { base } from '$app/paths';
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

<main class="flex min-h-screen items-center justify-center px-4 py-16">
	<section
		class="w-full max-w-2xl space-y-8 rounded-2xl border border-white/50 bg-white/90 p-10 shadow-2xl backdrop-blur-sm"
	>
		<header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
			<img src={`${base}/logo.png`} alt="VBQ Lookup" class="w-16 drop-shadow-md" />
			<div>
				<h1 class="text-3xl font-semibold text-[#0b3466]">Trouve ton centre Espoir</h1>
				<p class="text-sm text-[#0b3466]/70">
					Trouve rapidement la région Espoir associée à ton code postal.
				</p>
			</div>
		</header>

		<form class="flex w-full flex-col items-center space-y-6" onsubmit={handleSubmit}>
			<div
				class="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:space-x-3"
			>
				<Input
					type="text"
					placeholder="Code Postal"
					required
					bind:value={postalCode}
					autocomplete="postal-code"
					class="h-12 w-full rounded-lg border border-[#0b3466]/30 bg-white/70 text-[#0b3466] placeholder:text-[#0b3466]/50 focus-visible:border-[#047ED6] focus-visible:ring-[#047ED6] sm:max-w-xs"
				/>
				<Button
					type="submit"
					class="h-12 w-full  px-8 text-lg font-semibold text-white shadow-lg transition hover:shadow-xl sm:w-auto"
				>
					Rechercher
				</Button>
			</div>

			{#if result}
				<div
					class="w-full rounded-xl border border-[#0b3466]/15 bg-[#0b3466]/5 p-6 text-center text-[#0b3466] shadow-sm"
				>
					<p class="text-lg font-semibold tracking-wide uppercase">
						{result['Region Espoir']}
					</p>
					<p class="mt-1 text-sm text-[#0b3466]/70 uppercase">{result.Ville}</p>
				</div>
			{:else if errorMessage}
				<p class="text-sm font-medium text-red-600">{errorMessage}</p>
			{/if}
		</form>
	</section>
</main>
