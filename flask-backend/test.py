from influxdb_client_3 import InfluxDBClient3, Point
import os

client = InfluxDBClient3(
    host="https://eu-central-1-1.aws.cloud2.influxdata.com",
    token=os.getenv("INFLUXDB_TOKEN"),
    database="FrequencyMeas"
)

point = (
    Point("FrequencyTest")
    .tag("location", "M13 9PL")
    .field("Frequency", 50.123)
)

client.write(record=point)
client.close()
print("✅ Test point with capital 'Frequency' written")