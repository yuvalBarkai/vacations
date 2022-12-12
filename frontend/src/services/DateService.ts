
class DateService {
    date: Date;
    constructor(date: string) {
        this.date = new Date(date);
    }

    isPast() {
        const now = new Date();
        if (this.date < now)
            return true;
        else
            return false;
    }

    validateStartEnd(endDate: string) {
        if (this.isPast())
            return "Start Date must be in the future";
        else {
            const end = new Date(endDate);
            if (end <= this.date)
                return "End Date must be after Start Date";
            else
                return null
        }
    }

    toYYYYMMDD() {
        let year = String(this.date.getFullYear());
        let month = String(this.date.getMonth() + 1);
        let day = String(this.date.getDate());
        month.length < 2 && (month = `0${month}`);
        day.length < 2 && (day = `0${day}`);
        return `${year}-${month}-${day}`;
    }
    // date.toLocalString("en-GB").substring(0,10)
}

export default DateService