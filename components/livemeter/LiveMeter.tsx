// TESTING reactd3speedometer (VERSION 5.1, 5.2)
import React, { useMemo, useRef } from "react";
import { useLiveFrequency } from "../../dataquery/LongPolling";
import ReactSpeedometer from "react-d3-speedometer";
import "../../App.css";

type LiveMeterProps = {
  location?: string;
};

const LiveMeter: React.FC<LiveMeterProps> = ({ location = "manchester" }) => {
  const { latestData, loading } = useLiveFrequency(location, 1);

  const minFreq = 49.8;
  const maxFreq = 50.2;
  const defaultValue = (minFreq + maxFreq) / 2;

  const lastValueRef = useRef<number>(defaultValue);

  const frequency =
    latestData.length > 0 &&
    typeof latestData[latestData.length - 1].frequency === "number"
      ? latestData[latestData.length - 1].frequency
      : null;

  // Always update frequency every second regardless of how small the change is
  const clampedValue = useMemo(() => {
    const newValue =
      frequency !== null
        ? Math.min(Math.max(frequency, minFreq), maxFreq)
        : defaultValue;

    lastValueRef.current = newValue; // Always update

    return lastValueRef.current;
  }, [frequency]);

  const displayText = `${clampedValue.toFixed(3)} Hz`;

  return (
    <div className="live-meter-container">
      <h2 className="meter-title">Live Frequency – {location.toUpperCase()}</h2>

      {loading ? (
        <div className="loading-message">⏳ Loading...</div>
      ) : (
        <ReactSpeedometer
          minValue={minFreq}
          maxValue={maxFreq}
          value={clampedValue}
          segments={30}
          width={300}
          height={180}
          needleColor="#000"
          textColor="#fff"
          ringWidth={25}
          currentValueText={displayText}
          needleTransitionDuration={0}
        />
      )}
    </div>
  );
};

export default LiveMeter;
