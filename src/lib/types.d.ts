export type Typify<T> = { [K in keyof T]: Typify<T[K]> };

export enum SensorType {
	TEMPERATURE = 'TEMPERATURE'
}
export interface Sensor {
	_id: string;
	name: string;
	type: SensorType.TEMPERATURE;
	data: SensorData[];
}

export interface SensorData {
	value: number;
	timeStamp: number;
}

export interface SensorInput {
	type: SensorType.TEMPERATURE;
	name: string;
}
