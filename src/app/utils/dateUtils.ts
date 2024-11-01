/**
 * Utility class for date-related operations
 */
export class DateUtils {
  private static readonly MINUTES_IN_HOUR = 60;
  private static readonly HOURS_IN_DAY = 24;
  private static readonly DAYS_IN_MONTH = 30;
  private static readonly DAYS_IN_YEAR = 365;

  static timeSince(date: string): string {
    if (!date) throw new Error("Date parameter is required");

    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor(
      (now.getTime() - postDate.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < this.MINUTES_IN_HOUR) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / this.MINUTES_IN_HOUR);
    if (diffInHours < this.HOURS_IN_DAY) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / this.HOURS_IN_DAY);
    if (diffInDays < 1) return "today";
    if (diffInDays === 1) return "yesterday";
    if (diffInDays < this.DAYS_IN_MONTH) return `${diffInDays}d ago`;

    const diffInMonths = Math.floor(diffInDays / this.DAYS_IN_MONTH);
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;

    const diffInYears = Math.floor(diffInDays / this.DAYS_IN_YEAR);
    return `${diffInYears}y ago`;
  }

  static formatDateToLocal(dateISO: string, timeZoneOffset: number): string {
    if (!dateISO) throw new Error("Date ISO string is required");
    if (timeZoneOffset < -12 || timeZoneOffset > 14) {
      throw new Error("Invalid timezone offset. Must be between -12 and +14");
    }

    const date = new Date(dateISO);
    if (isNaN(date.getTime())) throw new Error("Invalid date format");

    date.setHours(date.getUTCHours() + timeZoneOffset);

    return date.toISOString().split("T")[0];
  }
}
