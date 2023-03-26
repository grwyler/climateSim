import React, { useState } from "react";
import { Range } from "react-range";

function TimeSlider() {
  const [months, setMonths] = useState([0]);

  const formatLabel = (value) => {
    return `${value} / 12`;
  };

  return (
    <div className="m-5">
      <Range
        step={1}
        min={0}
        max={11}
        values={months}
        onChange={(values) => setMonths([values])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              display: "flex",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "#999",
            }}
          />
        )}
        renderLabel={({ value }) => (
          <div
            style={{
              color: "#999",
              fontSize: "10px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {formatLabel(value)}
          </div>
        )}
      />
      {getMonthName(months[0])}
    </div>
  );
}

function getMonthName(monthIndex) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthIndex];
}

export default TimeSlider;
