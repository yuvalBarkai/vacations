
class DateService {
    date: Date;
    constructor(date: string) {
        this.date = new Date(date);
    }
    /**Checks if the this.date is in the past */
    isPast() {
        const now = new Date();
        if (this.date < now)
            return true;
        else
            return false;
    }
    /**
     * - checks if start_date is in the past
     * - checks if end_date < start_date (this.date)
     * @param {string} endDate date string 
     * @returns An error message or null
     */
    validateStartEnd(endDate: string) {
        if (this.isPast())
            return "Start Date must be in the future";
        else {
            const end = new Date(endDate);
            if (end < this.date)
                return "End Date must be after Start Date";
            else
                return null
        }
    }
    /**
     * @returns this.date in yyyy-mm-dd format  
     */
    toYYYYMMDD() {
        let year = String(this.date.getFullYear());
        let month = String(this.date.getMonth() + 1);
        let day = String(this.date.getDate());
        month.length < 2 && (month = `0${month}`);
        day.length < 2 && (day = `0${day}`);
        return `${year}-${month}-${day}`;
    }
}

export default DateService