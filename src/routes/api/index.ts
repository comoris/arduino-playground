import type { RequestHandler } from '@sveltejs/kit';
import clientPromise from '$lib/db/mongo';

export const post: RequestHandler = async ({ request }) => {

    const dbConnection = await clientPromise;
    const db = dbConnection.db();
    const collection = db.collection('devices');
    const requestVal = await request.json();

    await collection.insertOne(requestVal);

 return { status: 200, body: requestVal };
}
