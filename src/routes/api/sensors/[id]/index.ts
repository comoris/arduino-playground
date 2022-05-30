import type { RequestHandler } from '@sveltejs/kit';
import type { Sensor, SensorData } from '$lib/types';
import clientPromise from '$lib/db/mongo';


// save temperature
export const post: RequestHandler<Record<string, string>, SensorData> = async ({ params, request }) => {

    const requestVal = await request.json() as SensorData;
    const dbConnection = await clientPromise;
    
    const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');

    if(!sensorCollection) {
      dbConnection.db('iot').createCollection('sensors');
    }

    const tempSensorDocA = await sensorCollection.findOne<Sensor>({ id: params.id }, { projection: { _id: 0 } });

    if (!tempSensorDocA) {
      await sensorCollection.insertOne({id: params.id, type: 'temperature', data: [requestVal]});
      return { status: 200, body: requestVal };
    }

    const upDatedTempSensorA: Sensor = {
      id: params.id, 
      type: tempSensorDocA.type,
      data: [...(tempSensorDocA?.data ?? []), requestVal]};

    await sensorCollection.replaceOne({ id: 'tempSensorA' }, upDatedTempSensorA);

    return { status: 200, body: requestVal };
}
