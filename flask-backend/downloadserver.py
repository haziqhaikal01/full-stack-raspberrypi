import os
import ssl
import certifi
import pandas as pd
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from influxdb_client_3 import InfluxDBClient3

# Flask app setup
app = Flask(__name__)
CORS(app)

# InfluxDB Configuration
INFLUXDB_HOST = "https://eu-central-1-1.aws.cloud2.influxdata.com"
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_DATABASE = "FrequencyMeas"

if not INFLUXDB_TOKEN:
    raise ValueError("❌ INFLUXDB_TOKEN is not set! Set it in your environment.")

# SSL Setup
os.environ["GRPC_DEFAULT_SSL_ROOTS_FILE_PATH"] = certifi.where()
ssl_context = ssl.create_default_context(cafile=certifi.where())

# Initialize InfluxDB Client
client = InfluxDBClient3(
    host=INFLUXDB_HOST,
    token=INFLUXDB_TOKEN,
    database=INFLUXDB_DATABASE,
    ssl_context=ssl_context
)

@app.route("/fetch-data", methods=["GET"])
def fetch_data():
    """API endpoint to fetch InfluxDB data for a given date range and location (tag key)."""
    start = request.args.get("start")
    end = request.args.get("end")
    location = request.args.get("location")  # Get location from request

    if not start or not end or not location:
        return jsonify({"error": "Start date, end date, and location are required"}), 400

    try:
        print(f"📡 Fetching data for location: {location} from {start} to {end}...")

        # ✅ Corrected query to use location as a tag key
        query = f"""
        from(bucket: "FrequencyMeas")
        |> range(start: {start}, stop: {end})
        |> filter(fn: (r) => r["location"] == "{location}")
        |> yield(name: "filtered_data")
        """
        
        # Execute query
        result = client.query(query)
        df = result.to_pandas()

        if df.empty:
            print(f"⚠️ No data found for location {location} in the given range.")
            return jsonify({"error": "No data found for the selected range and location"}), 404

        # Save to CSV
        file_path = f"output_{location}.csv"
        df.to_csv(file_path, index=False)

        print(f"✅ Data successfully retrieved and saved for location {location}.")
        return send_file(file_path, as_attachment=True, download_name=f"influx-data-{location}.csv")

    except Exception as e:
        print(f"❌ Error fetching data: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)  # ✅ Ensure correct port
