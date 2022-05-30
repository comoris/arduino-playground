export type Typify<T> = { [K in keyof T]: Typify<T[K]> };

export interface Sensor {
    id: string,
    type: "temperature",
    data: SensorData[]
}

export interface SensorData {
    value: number;
    timeStamp: number;
}

export interface SensorInput {
    type: "temperature",
}
