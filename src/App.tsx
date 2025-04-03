// milliseconds + 3 dp freq resolution (VERSION 5.1, 5.2)
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import GBMap from "./components/map/Map";
import LiveMeter from "./components/livemeter/LiveMeter";
import GraphPlot from "./components/graph/GraphPlot"; // Renamed to match file name
import ButtonServer from "./components/download/Download";
import Events from "./components/events/Events";
import "./App.css";

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<string>("manchester");
  const [totalReadings, setTotalReadings] = useState<number>(0); // ✅ Store totalReadings

  return (
    <Router>
      <div className="react-app">
        <Sidebar />

        {/* ✅ Two-Column Layout for Left (Map + LiveMeter) and Right (Graph, Events, Downloads) */}
        <div className="main-content">
          {/* ✅ Left Column: Map + LiveMeter */}
          <div className="left-column">
            <GBMap setSelectedLocation={setSelectedLocation} />
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/location/manchester" />}
              />
              <Route
                path="/location/:id"
                element={<LiveMeter location={selectedLocation} />}
              />
            </Routes>
          </div>

          {/* ✅ Right Column: Graph + Events + Download */}
          <div className="right-column">
            {/* ✅ Pass setTotalReadings to Graph so it can update the value */}

            <GraphPlot
              location={selectedLocation}
              setTotalReadings={setTotalReadings}
            />

            <div className="download-button-container">
              <h1>Download InfluxDB Data</h1>
              <ButtonServer selectedLocation={selectedLocation} />
            </div>

            {/* ✅ Pass totalReadings as a prop */}
            <Events
              selectedLocation={selectedLocation}
              totalReadings={totalReadings}
            />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
