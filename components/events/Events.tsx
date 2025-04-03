// // frequency field (VERSION 5.1)
// import React, { useEffect, useState } from "react";
// import { useLiveFrequency } from "../../dataquery/LongPolling";
// import "../../App.css";

// interface EventData {
//   time: string;
//   frequency: number;
//   durationText: string;
// }

// // Format full datetime with milliseconds
// const formatDateTime = (isoTime: string): string => {
//   const date = new Date(isoTime);
//   const dateStr = date.toLocaleDateString();
//   const timeStr =
//     date.toLocaleTimeString("en-GB", { hour12: false }) +
//     `.${date.getMilliseconds().toString().padStart(3, "0")}`;
//   return `${dateStr} ${timeStr}`;
// };

// // Dynamically format duration
// const getSmartDuration = (eventTime: string): string => {
//   const now = new Date().getTime();
//   const then = new Date(eventTime).getTime();
//   const diffMs = now - then;
//   const diffSec = Math.floor(diffMs / 1000);

//   if (diffSec < 60) {
//     return `${diffSec} second${diffSec === 1 ? "" : "s"} ago`;
//   }

//   const diffMin = Math.floor(diffSec / 60);
//   if (diffMin < 60) {
//     return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
//   }

//   const diffHr = Math.floor(diffMin / 60);
//   if (diffHr < 24) {
//     return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
//   }

//   const diffDay = Math.floor(diffHr / 24);
//   return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
// };

// const Events: React.FC<{ selectedLocation: string }> = ({
//   selectedLocation,
// }) => {
//   const { latestData, loading } = useLiveFrequency(selectedLocation, 10);
//   const [triggeredEvents, setTriggeredEvents] = useState<EventData[]>([]);

//   useEffect(() => {
//     if (!loading && latestData.length > 0) {
//       const filtered = latestData
//         .filter((item) => item.frequency > 50.2 || item.frequency < 49.8)
//         .map((item) => ({
//           ...item,
//           durationText: getSmartDuration(item.time),
//         }))
//         .slice(-10)
//         .reverse();
//       setTriggeredEvents(filtered);
//     }
//   }, [latestData, loading]);

//   return (
//     <div className="events-container">
//       <h1>Triggered Frequency Events</h1>
//       <p className="selected-location">Location: {selectedLocation}</p>

//       {loading ? (
//         <p className="loading-message">⏳ Loading data...</p>
//       ) : triggeredEvents.length === 0 ? (
//         <p>✅ No out-of-range frequency events detected.</p>
//       ) : (
//         <ul className="frequency-list">
//           {triggeredEvents.map((event, index) => (
//             <li key={index} className="frequency-item">
//               <strong>#{index + 1}</strong> → {formatDateTime(event.time)} –{" "}
//               {event.frequency} Hz – Last occurred: {event.durationText}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Events;

// VERSION 5.1 + FIX BOX + DISPLAY TOTAL DATA PLOTTED (VERSION 5.2)
import React, { useEffect, useState } from "react";
import { useLiveFrequency } from "../../dataquery/LongPolling";
import "../../App.css";

interface EventData {
  time: string;
  frequency: number;
  durationText: string;
}

const formatDateTime = (isoTime: string): string => {
  const date = new Date(isoTime);
  const dateStr = date.toLocaleDateString();
  const timeStr =
    date.toLocaleTimeString("en-GB", { hour12: false }) +
    `.${date.getMilliseconds().toString().padStart(3, "0")}`;
  return `${dateStr} ${timeStr}`;
};

const getSmartDuration = (eventTime: string): string => {
  const now = new Date().getTime();
  const then = new Date(eventTime).getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return `${diffSec} second${diffSec === 1 ? "" : "s"} ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
};

const Events: React.FC<{ selectedLocation: string; totalReadings: number }> = ({
  selectedLocation,
  totalReadings,
}) => {
  const { latestData, loading } = useLiveFrequency(selectedLocation, 10);
  const [triggeredEvents, setTriggeredEvents] = useState<EventData[]>([]);

  useEffect(() => {
    if (!loading && latestData.length > 0) {
      const filtered = latestData
        .filter((item) => item.frequency > 50.2 || item.frequency < 49.8)
        .map((item) => ({
          ...item,
          durationText: getSmartDuration(item.time),
        }))
        .slice(-10)
        .reverse();
      setTriggeredEvents(filtered);
    }
  }, [latestData, loading]);

  return (
    <div className="events-container">
      <h1>Triggered Frequency Events</h1>
      <p className="selected-location">Location: {selectedLocation}</p>
      <p className="data-count">📊 Total Readings Plotted: {totalReadings}</p>

      <div className="event-box">
        {loading ? (
          <p className="loading-message">⏳ Loading data...</p>
        ) : triggeredEvents.length === 0 ? (
          <p>✅ No out-of-range frequency events detected.</p>
        ) : (
          <ul className="frequency-list">
            {triggeredEvents.map((event, index) => (
              <li key={index} className="frequency-item">
                <strong>#{index + 1}</strong> → {formatDateTime(event.time)} –{" "}
                {event.frequency} Hz – Last occurred: {event.durationText}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events;
