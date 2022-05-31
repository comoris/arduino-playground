# Sensors api

## Create Sensor

POST: api/sensors/[id]

e.g. api/sensors/742942jkl4j2l

`{type: 'TEMPERATURE' }`

## Delete Sensor

DELETE:  api/sensors/[id]
e.g. api/sensors/742942jkl4j2l

## Send sensorData

POST: api/sensors/[id]/sensorData

e.g. api/sensors/outsideTemperature/sensorData

`{value: '66', timestamp: '1234564565' }`
