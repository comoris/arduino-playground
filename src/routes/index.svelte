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
		{#each sensors as { id, name, type, data }}
			<li>
				{id} | {name} | {type} |
				{#if data.length}
					<ul>
						{#each data as { value, timeStamp }}
							<li>{value} | {timeStamp}</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
