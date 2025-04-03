// milliseconds + 3 dp freq resolution (VERSION 5.1, 5.2)
import React, { useState, useEffect } from "react";
import "../../App.css"; // Import external CSS file

type DownloadProps = {
  selectedLocation: string;
};

const Download: React.FC<DownloadProps> = ({ selectedLocation }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage(""); // Reset error when location changes
  }, [selectedLocation]);

  const fetchDataLongPolling = async () => {
    if (!startDate || !endDate || !selectedLocation) {
      setErrorMessage("Please select a start date, end date, and location.");
      return;
    }

    setIsDownloading(true);
    setErrorMessage("");

    const startFormatted = new Date(startDate).toISOString();
    const endFormatted = new Date(endDate).toISOString();

    const url = `http://127.0.0.1:5050/fetch-data?start=${encodeURIComponent(
      startFormatted
    )}&end=${encodeURIComponent(endFormatted)}&location=${encodeURIComponent(
      selectedLocation.toLowerCase()
    )}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          setErrorMessage("No data found for the selected range and location.");
        } else {
          setErrorMessage("An error occurred while fetching data.");
        }
        setIsDownloading(false);
        return;
      }

      const blob = await response.blob();

      // 🧠 Extract filename from headers
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="(.+)"/);
      const filename = match
        ? match[1]
        : `influx-data-${selectedLocation}.xlsx`;

      // ✅ Trigger download with correct filename and extension
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
    } catch (error) {
      console.error("❌ Fetch failed:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="container">
      <h2>
        Selected Location:{" "}
        {selectedLocation ? selectedLocation.toUpperCase() : "None"}
      </h2>

      <div className="input-container">
        <label htmlFor="start-date">Start date and time:</label>
        <input
          id="start-date"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="end-date">End date and time:</label>
        <input
          id="end-date"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <button
        onClick={fetchDataLongPolling}
        className="download-button"
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download Data"}
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Download;

// // SMOOTHER SCROLLING VERSION (VERSION 4.1 - 4.4)
// import React, { useState, useEffect } from "react";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../app.css";

// type DownloadProps = {
//   selectedLocation: string;
// };

// const Download: React.FC<DownloadProps> = ({ selectedLocation }) => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isDownloading, setIsDownloading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   useEffect(() => {
//     setErrorMessage(""); // Reset error when location changes
//   }, [selectedLocation]);

//   const fetchDataLongPolling = async () => {
//     if (!startDate || !endDate || !selectedLocation) {
//       setErrorMessage("Please select a start date, end date, and location.");
//       return;
//     }

//     setIsDownloading(true);
//     setErrorMessage("");

//     const startFormatted = startDate.toISOString();
//     const endFormatted = endDate.toISOString();

//     const url = `http://127.0.0.1:5000/fetch-data?start=${encodeURIComponent(
//       startFormatted
//     )}&end=${encodeURIComponent(endFormatted)}&location=${encodeURIComponent(
//       selectedLocation
//     )}`;

//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         if (response.status === 404) {
//           setErrorMessage("No data found for the selected range and location.");
//         } else {
//           setErrorMessage("An error occurred while fetching data.");
//         }
//         setIsDownloading(false);
//         return;
//       }

//       const blob = await response.blob();

//       const disposition = response.headers.get("Content-Disposition");
//       const match = disposition?.match(/filename="(.+)"/);
//       const filename = match
//         ? match[1]
//         : `influx-data-${selectedLocation}.xlsx`;

//       const downloadUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       link.setAttribute("download", filename);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setIsDownloading(false);
//     } catch (error) {
//       console.error("❌ Fetch failed:", error);
//       setErrorMessage("Failed to fetch data. Please try again.");
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>
//         Selected Location:{" "}
//         {selectedLocation ? selectedLocation.toUpperCase() : "None"}
//       </h2>

//       <div className="input-container">
//         <label htmlFor="start-date">Start date and time:</label>
//         <ReactDatePicker
//           id="start-date"
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           showTimeSelect
//           timeIntervals={1} // smoother scrolling
//           timeFormat="HH:mm"
//           dateFormat="yyyy-MM-dd h:mm aa"
//           className="input-field"
//           placeholderText="Select start date & time"
//         />
//       </div>

//       <div className="input-container">
//         <label htmlFor="end-date">End date and time:</label>
//         <ReactDatePicker
//           id="end-date"
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           showTimeSelect
//           timeIntervals={1}
//           timeFormat="HH:mm"
//           dateFormat="yyyy-MM-dd h:mm aa"
//           className="input-field"
//           placeholderText="Select end date & time"
//         />
//       </div>

//       <button
//         onClick={fetchDataLongPolling}
//         className="download-button"
//         disabled={isDownloading}
//       >
//         {isDownloading ? "Downloading..." : "Download Data"}
//       </button>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Download;
