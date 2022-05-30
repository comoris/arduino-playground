import clientPromise from "$lib/db/mongo";
import type { Sensor, SensorData } from "$lib/types";
import type { RequestHandler } from "@sveltejs/kit";

// list temperatures
export const get: RequestHandler<Record<string, string>, SensorData[]> = async ({params}) => {
    console.log('params', params.id);
    
    const dbConnection = await clientPromise;
    const sensorCollection = dbConnection.db('iot').collection<Sensor>('sensors');

    const temperatures = await sensorCollection.findOne<Sensor>({ id: params.id }, { projection: { _id: 0 } });
  
    if (!temperatures) {
      return { status: 404 };
    }

    return {
      status: 200,
      body: temperatures.data,
    };
  };