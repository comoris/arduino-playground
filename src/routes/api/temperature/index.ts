import type { RequestHandler } from '@sveltejs/kit';
import type { TemperatureValue } from '$lib/types';
import clientPromise from '$lib/db/mongo';

// save temperature
export const post: RequestHandler = async ({ request }) => {

    const requestVal = await request.json();
    const dbConnection = await clientPromise;
    const collection = dbConnection.db('sensors').collection('temperature');

    await collection.insertOne(requestVal);

 return { status: 200, body: requestVal };
}


// list temperatures
export const get: RequestHandler<Record<string, string>, TemperatureValue[]> = async () => {
    const dbConnection = await clientPromise;
    const collection = dbConnection.db('sensors').collection('temperature');
    const temperatures = await collection.find<TemperatureValue>({}, { projection: { _id: 0 } }).toArray();
  
    return {
      body: temperatures,
    };
  };
