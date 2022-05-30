<script context="module" lang="ts">
	import type { sensorData } from '$lib/types';
	import type { Load } from '@sveltejs/kit';

	let temperatures: SensorData[];

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/sensors/temperature/');
		const temperatureValues = await response.json();

		return {
			status: response.status,
			props: { temperatureValues }
		};
	};
</script>

<script lang="ts">
	export let temperatureValues: SensorData[];
</script>

<ul>
	{#each temperatureValues as temp}
		<li>{temp.value}</li>
	{/each}
</ul>
