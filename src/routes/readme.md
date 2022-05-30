# Sensors api

## Create Sensor

POST: api/sensors/[id]

e.g. api/sensors/outsideTemperature

``` {type: 'TEMPERATURE' } ```


## Send sensorData

POST: api/sensors/[id]/sensorData

e.g. api/sensors/outsideTemperature/sensorData

``` {value: '66', timestamp: '1234564565' } ```