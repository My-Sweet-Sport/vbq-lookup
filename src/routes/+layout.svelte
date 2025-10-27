<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="flex min-w-screen justify-center bg-gradient-to-br from-[#e8ebf1] to-[#9aa8c0]">
	{@render children?.()}
</div>
