// function to convert date in the format for the calendar start date and end date
export function formatDateForCalendar(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export function combineDueDateTime(dueDate, dueTime) {
  // forcing timezone to UTC
  const utcDate = new Date(dueDate);
  const dateObj = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
  // splitting due time in hours and minutes
  const [hours, minutes] = dueTime.split(":").map(Number);
  dateObj.setHours(hours, minutes, 0, 0); // replace time
  return dateObj.toISOString(); // return ISO for calendar
}

export function getStartTime(dueDate, dueTime = "00:00", minutesBefore = 30) {
  if (!dueDate) return null;
  const [hours, minutes] = dueTime.split(":").map(Number);
  const dateObj = new Date(dueDate);
  dateObj.setHours(hours || 0, minutes || 0, 0, 0);
  dateObj.setMinutes(dateObj.getMinutes() - minutesBefore);
  return dateObj.toISOString();
}

// get time from timesstamp (2025-09-21T22:24:08.148Z) in HH:MM format
export function getTimeFromDate(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}