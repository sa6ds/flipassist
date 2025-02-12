export const DateUtils = {
  // Constants
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  DAYS_IN_MONTH: 30,
  DAYS_IN_YEAR: 365,

  // Date formatting functions
  formatDate: (date: string | Date): string => {
    // Handle empty or invalid dates
    if (!date) return '';
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return '';
      }
      
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const year = dateObj.getFullYear();
      
      return `${month}-${day}-${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  },

  parseAndFormatDate: (dateString: string): string => {
    if (!dateString) return '';

    try {
      // If it's already in MM-DD-YYYY format, return as is
      if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
        return dateString;
      }

      // Handle YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-');
        return `${month}-${day}-${year}`;
      }

      // Handle any other valid date string by converting to MM-DD-YYYY
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }

      return DateUtils.formatDate(date);
    } catch (error) {
      console.error('Error parsing date:', error);
      return '';
    }
  },

  timeSince: (dateString: string | number): string => {
    try {
      // Convert date string to timestamp if it's not already a number
      const timestamp = typeof dateString === 'number' 
        ? dateString 
        : new Date(dateString).getTime();

      const seconds = Math.floor((Date.now() - timestamp) / 1000);
      const minutes = Math.floor(seconds / DateUtils.MINUTES_IN_HOUR);
      const hours = Math.floor(minutes / DateUtils.MINUTES_IN_HOUR);
      const days = Math.floor(hours / DateUtils.HOURS_IN_DAY);
      const months = Math.floor(days / DateUtils.DAYS_IN_MONTH);
      const years = Math.floor(days / DateUtils.DAYS_IN_YEAR);

      if (years > 0) return years + (years === 1 ? " year ago" : " years ago");
      if (months > 0) return months + (months === 1 ? " month ago" : " months ago");
      if (days > 0) return days + (days === 1 ? " day ago" : " days ago");
      if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
      if (minutes > 0) return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
      return "just now";
    } catch (error) {
      console.error('Error calculating time since:', error);
      return 'unknown';
    }
  }
};
