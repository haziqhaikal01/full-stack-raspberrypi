// 5.1 version + working with microcontroller (VERSION 5.2)
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLiveFrequency } from "../../dataquery/LongPolling";
import "../../App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphPlot = ({
  location,
  setTotalReadings,
}: {
  location: string;
  setTotalReadings: (count: number) => void;
}) => {
  const [timeRange, setTimeRange] = useState(1);
  const { latestData, loading } = useLiveFrequency(location, timeRange);

  useEffect(() => {
    setTotalReadings(latestData.length); // ✅ Update totalReadings when data changes
  }, [latestData, setTotalReadings]);

  if (loading) return <p>⏳ Loading data...</p>;
  if (!latestData || latestData.length === 0)
    return <p>⚠️ No data available...</p>;

  // ✅ Correctly defining chart data
  const labels = latestData.map((entry) =>
    new Date(entry.time).toLocaleTimeString("en-GB", { hour12: false })
  );
  const values = latestData.map((entry) => entry.frequency);

  const chartData: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: `Live Frequency (Hz) - ${location.toUpperCase()}`,
        data: values,
        borderColor: "#00FFCC",
        backgroundColor: "rgba(0, 255, 204, 0.4)", // ✅ Smoother gradient effect
        borderWidth: 3,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: "#FFCC00",
        pointBorderColor: "#FFFFFF",
        tension: 0.35, // ✅ Even smoother line movement
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    animation: {
      duration: 0,
      easing: "easeInOutQuad",
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0.35 } },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "#00FFCC",
        padding: 10,
        borderColor: "#00FFCC",
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const index = context.dataIndex;
            return `Time: ${labels[index]}, Frequency: ${values[index]} Hz`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        title: {
          display: true,
          text: "Frequency (Hz)",
          color: "#00FFCC",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        suggestedMin: 49.8,
        suggestedMax: 50.2,
      },
    },
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">
        Live Frequency Graph for {location.toUpperCase()}
      </h2>

      <label htmlFor="time-range-selector">Time Range: </label>
      <select
        id="time-range-selector"
        value={timeRange}
        onChange={(e) => setTimeRange(Number(e.target.value))}
        aria-label="Select time range for the graph"
      >
        {[1, 5, 10, 15, 30, 60].map((min) => (
          <option key={min} value={min}>
            Last {min} minutes
          </option>
        ))}
      </select>

      <div className="graph-wrapper">
        <Line data={chartData} options={chartOptions} />{" "}
        {/* ✅ Fixed options */}
      </div>
    </div>
  );
};

export default GraphPlot;
