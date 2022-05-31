import type { RequestHandler } from '@sveltejs/kit';
import type { Sensor, SensorInput } from '$lib/types';
import clientPromise, { mapMongoDbId } from '$lib/db/mongo';

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
	console.log('newSensor', newSensor);

	const insertedSensor = await sensorCollection.insertOne({ ...newSensor }); // newSensor gest _id if not spread

	return { status: 200, body: { id: insertedSensor.insertedId, ...newSensor } };
};

export const get: RequestHandler<Record<string, string>, Sensor[]> = async () => {
	const dbConnection = await clientPromise;
	const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');

	const sensors: Sensor[] = await (await sensorCollection.find({}).toArray()).map((s) => mapMongoDbId<Sensor>(s));

	return { status: 200, body: sensors };
};
