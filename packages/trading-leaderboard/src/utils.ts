import { format, subDays } from "date-fns";

export const getDateRange = (offsetDay: number) => {
  return {
    from: subDays(new Date(), offsetDay - 1)!,
    to: new Date()!,
  };
};

/**
 * Format a date to "yyyy-MM-dd" format (e.g., "2025-03-10")
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDateRange = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

function getUTCDateInfo(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return { year, month, day, hours, minutes };
}

export function formatCampaignDate(date: Date | string): string {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (typeof date === "string") {
    date = new Date(date);
  }
  const { year, month, day, hours, minutes } = getUTCDateInfo(date);
  return `${monthNames[month]} ${day}, ${year} ${hours}:${minutes}`;
}

export function formatUpdateDate(timestamp: number) {
  const time = new Date(timestamp);
  try {
    return format(time, "yyyy-MM-dd HH:mm 'UTC'");
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
}
