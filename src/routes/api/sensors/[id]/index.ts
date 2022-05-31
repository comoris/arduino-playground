import clientPromise from '$lib/db/mongo';
import type { Sensor } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

export const del: RequestHandler<Record<string, string>, Sensor | { error: string }> = async ({ params }) => {
	const dbConnection = await clientPromise;
	const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');

	const deletedSensor = await (await sensorCollection.findOneAndDelete({ id: params.id })).value;

	if (!deletedSensor) {
		return { status: 404, body: { error: 'No sensors found' } };
	}

	return { status: 200, body: deletedSensor };
};
