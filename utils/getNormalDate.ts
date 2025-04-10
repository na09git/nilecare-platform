export function getNormalDate(dateString: string): string {
  // Parse the date string to a Date object
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  // Get the day suffix
  const daySuffix = getDaySuffix(day);

  return `${day}${daySuffix} ${month} ${year}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
