export type Typify<T> = { [K in keyof T]: Typify<T[K]> };

export interface TemperatureValue {
    temperature: number;
    timeStamp: number;
}
