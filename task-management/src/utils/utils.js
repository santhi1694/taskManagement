// converting epoch time stamp to date string, if not return default value
export const covertTime = (timestamp) =>
  timestamp ? new Date(timestamp).toDateString() : "N/A";

// get start time of the given timestamp date
// parameters: timestamp: epoch time
export const getStartStamp = (timestamp) => {
  const start = new Date(timestamp);
  start.setUTCHours(0, 0, 0, 0);

  return start.valueOf();
};
// check given dates are same
// parameters: day1, day2 : epoch time
export const isSameDate = (day1, day2) => covertTime(day1) === covertTime(day2)