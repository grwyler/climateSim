import { scaleLinear } from "d3-scale";

export const dateToValue = (date, min, max) => {
  if (date instanceof Date) {
    return scaleLinear([min, max], [0, 1])(date.getTime());
  }
  return null;
};
export const valuesToDates = (values, min, max) => {
  return values.map((value) => {
    const date = new Date(scaleLinear([0, 1], [min, max])(value));
    return date;
  });
};

export const getMinMaxDates = (timeArray) => {
  const minDate = timeArray[0].getTime();
  const maxDate = timeArray[timeArray.length - 1].getTime();
  return { minDate, maxDate };
};

export const getYearWithFractionalMonth = (dateString) => {
  const [month, day, year] = dateString.split("/");
  // Calculate the fractional month by dividing the day by the number of days in the month
  const fractionalMonth = (day - 1) / new Date(year, month, 0).getDate();
  // Combine the year and fractional month into a single value
  const yearWithFractionalMonth = (Number(year) + fractionalMonth)
    .toFixed(2)
    .toString();
  return yearWithFractionalMonth === "NaN" ? "" : yearWithFractionalMonth;
};
