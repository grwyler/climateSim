import React, { useState } from "react";
import { Range } from "react-range";
import { valuesToDates, dateToValue, getMinMaxDates } from "./utils";

function TimeSlider({
  timeArray,
  values,
  setValues,
  dateString,
  setDateString,
}) {
  const { minDate, maxDate } = getMinMaxDates(timeArray);

  return (
    <div className="m-5">
      <Range
        step={1 / (timeArray.length - 1)}
        min={0}
        max={1}
        values={values.map((value) => dateToValue(value, minDate, maxDate))}
        onChange={(values) => {
          setValues(valuesToDates(values, minDate, maxDate));
          setDateString(
            valuesToDates(values, minDate, maxDate)[0].toLocaleDateString()
          );
        }}
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
              cursor: "pointer",
            }}
          />
        )}
      />
      <div className="text-center pt-3">{dateString}</div>
    </div>
  );
}

export default TimeSlider;
