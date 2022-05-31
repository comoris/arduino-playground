import type { RequestHandler } from '@sveltejs/kit';
import type { Sensor, SensorInput } from '$lib/types';
import clientPromise from '$lib/db/mongo';

export const post: RequestHandler<Record<string, string>, Omit<Sensor, 'id'> | { error: string }> = async ({ request }) => {
	const sensorInputReq: SensorInput = await request.json();
	const dbConnection = await clientPromise;
	const sensorCollection = dbConnection.db('iot').collection('sensors');

	if (!sensorCollection) {
		dbConnection.db('iot').createCollection('sensors');
	}

	const sensor = await sensorCollection.findOne<Sensor>({ name: sensorInputReq.name });
	if (sensor) {
		return { status: 404, body: { error: 'SensorName already exists' } };
	}

	const newSensor: Omit<Sensor, 'id'> = { name: sensorInputReq.name, type: sensorInputReq.type, data: [] };

	await sensorCollection.insertOne(newSensor);

	return { status: 200, body: newSensor };
};

export const get: RequestHandler<Record<string, string>, Sensor[]> = async () => {
	const dbConnection = await clientPromise;
	const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');

	const sensors = await sensorCollection.find({}).toArray();

	return { status: 200, body: sensors };
};
