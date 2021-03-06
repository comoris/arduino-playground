import clientPromise, { mapMongoDbId } from '$lib/db/mongo';
import type { Sensor, SensorData } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const get: RequestHandler<Record<string, string>, SensorData[] | { error: string }> = async ({ params }) => {
	const dbConnection = await clientPromise;
	const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');
	console.log('params', params.id);
	const sensor = await sensorCollection.findOne<Sensor>({ _id: new ObjectId(params.id) });

	if (!sensor) {
		return { status: 404, body: { error: `No sensor with id ${params.id} found` } };
	}

	return {
		status: 200,
		body: sensor.data
	};
};

export const post: RequestHandler<Record<string, string>, Sensor | { error: string }> = async ({ params, request }) => {
	const sensorInputReq: SensorData = await request.json();
	const dbConnection = await clientPromise;
	const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');

	const sensor = await sensorCollection.findOne({ _id: new ObjectId(params.id) });

	if (!sensor) {
		return { status: 404, body: { error: 'No sensors found' } };
	}

	const updatedSensor: Sensor = {
		...mapMongoDbId<Sensor>(sensor),
		data: [...(sensor.data ?? []), sensorInputReq]
	};

	await sensorCollection.replaceOne({ _id: new ObjectId(params.id) }, updatedSensor);

	return { status: 200, body: updatedSensor };
};
