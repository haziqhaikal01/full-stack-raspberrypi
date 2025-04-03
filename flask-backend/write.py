# # WRITE A DATA EVERY SECOND INTO INFLUXDB & SEND ID ONCE
# import os
# import time
# import numpy as np
# from influxdb_client_3 import InfluxDBClient3, Point

# # InfluxDB 3.0 Cloud Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"  # InfluxDB bucket

# # Ensure the token is available
# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # Initialize InfluxDB Client
# client = InfluxDBClient3(
#     host=INFLUXDB_HOST,
#     token=INFLUXDB_TOKEN,
#     database=INFLUXDB_DATABASE
# )

# # Function to write the "scotland" ID only once
# def write_location_once():
#     try:
#         # Create InfluxDB point with location field
#         point = (
#             Point("location_data")  # Measurement name
#             .field("location", "manchester")  # Field: location ID
#             .time(int(time.time() * 1e9))  # Set timestamp explicitly
#         )

#         # Write to InfluxDB
#         client.write(record=point)
#         print("✅ Successfully inserted location ID: 'manchester' into InfluxDB")
    
#     except Exception as e:
#         print(f"❌ Error writing location to InfluxDB: {e}")

# # Function to generate and write random frequency values continuously
# def write_continuous_frequencies():
#     i = 1  # Counter for records
#     try:
#         while True:  # Infinite loop for continuous writing
#             frequency = round(np.random.uniform(48, 52), 3)  # Generate random frequency
#             timestamp = int(time.time() * 1e9)  # Convert current time to nanoseconds

#             # Create InfluxDB point
#             point = (
#                 Point("frequency_measurements")  # Measurement name
#                 .field("frequency", frequency)   # Field: frequency value
#                 .time(timestamp)                 # Set timestamp explicitly
#             )

#             try:
#                 client.write(record=point)  # Write to InfluxDB
#                 print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz")
#             except Exception as e:
#                 print(f"❌ Error writing to InfluxDB: {e}")

#             i += 1  # Increment counter
#             time.sleep(1)  # Wait 1 second before writing next data point

#     except KeyboardInterrupt:
#         print("\n❌ Interrupted by user. Stopping data writing...")
#     finally:
#         client.close()
#         print("🔌 Connection to InfluxDB closed.")

# # Run the function to write location ID only once
# write_location_once()

# # Start continuous frequency writing
# write_continuous_frequencies()


# # WRITE CONSTANT DATA
# import os
# import time
# from influxdb_client_3 import InfluxDBClient3, Point

# # InfluxDB 3.0 Cloud Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"  # InfluxDB bucket

# # Ensure the token is available
# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # Initialize InfluxDB Client
# client = InfluxDBClient3(
#     host=INFLUXDB_HOST,
#     token=INFLUXDB_TOKEN,
#     database=INFLUXDB_DATABASE
# )

# # Function to write the "manchester" ID only once
# def write_location_once():
#     try:
#         point = (
#             Point("location_data")
#             .field("location", "manchester")
#             .time(int(time.time() * 1e9))
#         )
#         client.write(record=point)
#         print("✅ Successfully inserted location ID: 'manchester' into InfluxDB")
#     except Exception as e:
#         print(f"❌ Error writing location to InfluxDB: {e}")

# # Function to write a constant 51 Hz frequency continuously
# def write_constant_frequency():
#     i = 1
#     try:
#         while True:
#             frequency = 51.0  # Constant 51 Hz
#             timestamp = int(time.time() * 1e9)

#             point = (
#                 Point("frequency_measurements")
#                 .field("frequency", frequency)
#                 .time(timestamp)
#             )

#             try:
#                 client.write(record=point)
#                 print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz")
#             except Exception as e:
#                 print(f"❌ Error writing to InfluxDB: {e}")

#             i += 1
#             time.sleep(1)  # Send data every second

#     except KeyboardInterrupt:
#         print("\n❌ Interrupted by user. Stopping data writing...")
#     finally:
#         client.close()
#         print("🔌 Connection to InfluxDB closed.")

# # Run the functions
# write_location_once()
# write_constant_frequency()


# # WRITE A DATA EVERY SECOND INTO INFLUXDB & SEND ONLY POSTCODE & SEND POSTCODE ONCE ONLY
# import os
# import time
# import numpy as np
# from influxdb_client_3 import InfluxDBClient3, Point

# # InfluxDB 3.0 Cloud Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"  # InfluxDB bucket

# # Ensure the token is available
# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # Initialize InfluxDB Client
# client = InfluxDBClient3(
#     host=INFLUXDB_HOST,
#     token=INFLUXDB_TOKEN,
#     database=INFLUXDB_DATABASE
# )

# # Function to continuously write frequency data with only the postcode
# def write_continuous_frequencies():
#     i = 1  # Counter for records
#     location = "M13 9RW"  # ✅ Only send postcode

#     try:
#         while True:  # Infinite loop for continuous writing
#             frequency = round(np.random.uniform(48, 52), 3)  # Generate random frequency
#             timestamp = int(time.time() * 1e9)  # Convert current time to nanoseconds

#             # Create InfluxDB point with frequency and postcode
#             point = (
#                 Point("frequency_measurements")  # Measurement name
#                 .field("frequency", frequency)   # Field: frequency value
#                 .field("location", location)     # ✅ Send only postcode
#                 .time(timestamp)                 # Set timestamp explicitly
#             )

#             try:
#                 client.write(record=point)  # Write to InfluxDB
#                 print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz, Location = {location}")
#             except Exception as e:
#                 print(f"❌ Error writing to InfluxDB: {e}")

#             i += 1  # Increment counter
#             time.sleep(1)  # Wait 1 second before writing next data point

#     except KeyboardInterrupt:
#         print("\n❌ Interrupted by user. Stopping data writing...")
#     finally:
#         client.close()
#         print("🔌 Connection to InfluxDB closed.")

# # Start continuous frequency writing
# write_continuous_frequencies()



# SEND DATA EVERY SEC AND LOCATION TAG KEYS (VERSION 2.1, 2.2)
import os
import time
import numpy as np
from influxdb_client_3 import InfluxDBClient3, Point

# InfluxDB 3.0 Cloud Configuration
INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_DATABASE = "FrequencyMeas"

# Ensure the token is available
if not INFLUXDB_TOKEN:
    raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# Initialize InfluxDB Client
client = InfluxDBClient3(
    host=INFLUXDB_HOST,
    token=INFLUXDB_TOKEN,
    database=INFLUXDB_DATABASE
)

# Define available locations
LOCATIONS = ["M13 9PL", "S23 9RW"]

# Function to write random frequency data with 3 decimal places
def write_continuous_frequencies():
    i = 1  # Record counter

    try:
        while True:
            for location in LOCATIONS:
                # Generate frequency with exactly 3 decimal places
                frequency = round(np.random.uniform(49.700, 50.300), 3)
                timestamp = int(time.time() * 1e9)  # Current time in nanoseconds

                # Create InfluxDB point
                point = (
                    Point("FrequencyTest")
                    .tag("location", location)
                    .field("frequency", frequency)
                    .time(timestamp)
                )

                try:
                    client.write(record=point)
                    print(
                        f"✅ {i} Inserted → Time: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())}, "
                        f"Frequency: {frequency:.3f} Hz, Location: {location}"
                    )
                except Exception as e:
                    print(f"❌ Error writing to InfluxDB: {e}")

                i += 1

            time.sleep(1)  # Wait before next batch

    except KeyboardInterrupt:
        print("\n❌ Interrupted by user. Stopping...")
    finally:
        client.close()
        print("🔌 InfluxDB connection closed.")

# Run the writer
write_continuous_frequencies()



# # SEND CONSTANT DATA EVERY SEC AND LOCATION TAG KEYS (VERSION 2.1, 2.2)
# import os
# import time
# from influxdb_client_3 import InfluxDBClient3, Point

# # InfluxDB 3.0 Cloud Configuration
# INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
# INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
# INFLUXDB_DATABASE = "FrequencyMeas"  # InfluxDB bucket

# # Ensure the token is available
# if not INFLUXDB_TOKEN:
#     raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# # Initialize InfluxDB Client
# client = InfluxDBClient3(
#     host=INFLUXDB_HOST,
#     token=INFLUXDB_TOKEN,
#     database=INFLUXDB_DATABASE
# )

# # Define locations and fixed frequency values
# LOCATION_FREQUENCIES = {
#     "M13 9PL": 51.000,  # ✅ Manchester
#     "S23 9RW": 49.000   # ✅ Scotland
# }

# # Function to continuously write fixed frequency data
# def write_fixed_frequencies():
#     i = 1  # Counter for records

#     try:
#         while True:  # Infinite loop for continuous writing
#             timestamp = int(time.time() * 1e9)  # Convert current time to nanoseconds

#             for location, frequency in LOCATION_FREQUENCIES.items():  
#                 # Create InfluxDB point with fixed frequency
#                 point = (
#                     Point("FrequencyTest")   # ✅ Measurement name
#                     .tag("location", location)  # ✅ Store location as a tag (not field)
#                     .field("frequency", frequency)   # ✅ Store frequency as a field
#                     .time(timestamp)  # Set timestamp explicitly
#                 )

#                 try:
#                     client.write(record=point)  # Write to InfluxDB
#                     print(f"✅ {i} Inserted: Time = {timestamp}, Frequency = {frequency} Hz, Location = {location}")
#                 except Exception as e:
#                     print(f"❌ Error writing {location} to InfluxDB: {e}")

#                 i += 0.1  # Increment counter

#             time.sleep(0.1)  # ✅ Wait 1 second before writing next batch

#     except KeyboardInterrupt:
#         print("\n❌ Interrupted by user. Stopping data writing...")
#     finally:
#         client.close()
#         print("🔌 Connection to InfluxDB closed.")

# # Start continuous frequency writing
# write_fixed_frequencies()
