<script context="module" lang="ts">
	import type { TemperatureValue } from '$lib/types';
	import type { Load } from '@sveltejs/kit';

	let temperatures: TemperatureValue[];

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('/api/temperature/');
		const temperatureValues = await response.json();

		return {
			status: response.status,
			props: { temperatureValues }
		};
	};
</script>

<script lang="ts">
	export let temperatureValues: TemperatureValue[];
</script>

<ul>
	{#each temperatureValues as temp}
		<li>{temp.temperature}</li>
	{/each}
</ul>
