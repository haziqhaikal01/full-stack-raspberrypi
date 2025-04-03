// // frequency field (VERSION 5.1)
// import { useEffect, useState } from "react";

// const locationMapping: { [key: string]: string } = {
//   manchester: "M13 9PL",
//   scotland: "S23 9RW",
// };

// export const useLiveFrequency = (
//   location: string = "manchester",
//   minutes: number = 1
// ) => {
//   const [latestData, setLatestData] = useState<
//     { time: string; frequency: number }[]
//   >([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isActive = true;
//     setLoading(true);

//     const fetchFrequency = async () => {
//       try {
//         const influxLocation = locationMapping[location.toLowerCase().trim()];
//         if (!influxLocation) return;

//         const encodedLocation = encodeURIComponent(influxLocation);
// const baseUrl =
// import.meta.env.MODE === "development"
//   ? "http://127.0.0.1:5000"
//   : import.meta.env.VITE_API_URL;

// const apiUrl = `${baseUrl}/frequency/${safeLocation}?minutes=${minutes}`;

//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           console.warn(`⚠️ API returned ${response.status}`);
//           setLatestData([]);
//           setLoading(false);
//           return;
//         }

//         const data = await response.json();

//         if (!Array.isArray(data)) {
//           console.error("❌ Received invalid JSON data", data);
//           setLatestData([]);
//           setLoading(false);
//           return;
//         }

//         const validatedData = data
//           .filter(
//             (item) =>
//               typeof item.frequency === "number" && !isNaN(item.frequency)
//           )
//           .map((item) => ({
//             time: item.time, // Preserve formatted time from backend
//             frequency: parseFloat(item.frequency.toFixed(3)),
//           }));

//         if (isActive) {
//           setLatestData(validatedData);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error(`❌ Error fetching frequency data:`, error);
//         setLatestData([]);
//         setLoading(false);
//       }
//     };

//     fetchFrequency();
//     const interval = setInterval(fetchFrequency, 1000);

//     return () => {
//       isActive = false;
//       clearInterval(interval);
//     };
//   }, [location, minutes]);

//   return { latestData, loading };
// };

// Frequency field (VERSION 5.2)
import { useEffect, useState } from "react";

// You can still use this mapping if needed for labels
const locationMapping: { [key: string]: string } = {
  manchester: "M13 9PL",
  scotland: "S23 9RW",
};

export const useLiveFrequency = (
  location: string = "manchester",
  minutes: number = 1
) => {
  const [latestData, setLatestData] = useState<
    { time: string; frequency: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setLoading(true);

    const fetchFrequency = async () => {
      try {
        // 👇 Send key (e.g. "manchester") directly
        const safeLocation = location.toLowerCase().trim();
        const baseUrl =
          import.meta.env.MODE === "development"
            ? "http://127.0.0.1:5050"
            : import.meta.env.VITE_API_URL;

        const apiUrl = `${baseUrl}/frequency/${safeLocation}?minutes=${minutes}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.warn(`⚠️ API returned ${response.status}`);
          setLatestData([]);
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("❌ Received invalid JSON data", data);
          setLatestData([]);
          setLoading(false);
          return;
        }

        const validatedData = data
          .filter(
            (item) =>
              typeof item.frequency === "number" && !isNaN(item.frequency)
          )
          .map((item) => ({
            time: item.time,
            frequency: parseFloat(item.frequency.toFixed(3)),
          }));

        if (isActive) {
          setLatestData(validatedData);
          setLoading(false);
        }
      } catch (error) {
        console.error(`❌ Error fetching frequency data:`, error);
        setLatestData([]);
        setLoading(false);
      }
    };

    fetchFrequency();
    const interval = setInterval(fetchFrequency, 1000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [location, minutes]);

  return { latestData, loading };
};
