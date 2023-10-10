export function formatTime(timeString) {
  // Create a new Date object from the ISO 8601 formatted string
  const date = new Date(timeString);

  // Extract the hours and minutes in UTC
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Format the time as "HH:mm"
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}`;
  return formattedTime;
}

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export function formatDate(jsonDate) {
  const date = new Date(jsonDate);

  // Set the date to UTC by setting the hours, minutes, and seconds to 0
  date.setUTCHours(0, 0, 0);

  const year = date.getUTCFullYear();
  const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(date);
  const day = date.getUTCDate();

  return `${month} ${day}, ${year}`;
}
