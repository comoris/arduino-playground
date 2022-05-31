<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/sensors');
		const sensors = await response.json();

		return {
			status: response.status,
			props: { sensors }
		};
	};
</script>

<script lang="ts">
	import type { Sensor } from '$lib/types';

	export let sensors: Sensor[];
</script>

<ul>
	{#if sensors.length}
		{#each Object.entries(sensors) as [value, timeStamp]}
			<li>{value} | {timeStamp}</li>
		{/each}
	{/if}
</ul>
