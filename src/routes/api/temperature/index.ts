import type { RequestHandler } from '@sveltejs/kit';
import clientPromise from '$lib/db/mongo';

export type Typify<T> = { [K in keyof T]: Typify<T[K]> };
export interface TemperatureValue {
    temperature: number;
    timeStamp: number;
}

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
