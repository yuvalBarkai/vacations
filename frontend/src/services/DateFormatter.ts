
class DateFormatter{
    constructor(public date:string){}

    toDate(){
        return new Date(this.date);
    }
    toYYYYMMDD(){
        const date = new Date(this.date);
        let year = String(date.getFullYear());
        let month = String(date.getMonth() + 1);
        let day = String(date.getDate());
        month.length < 2 && (month = `0${month}`);
        day.length < 2 && (day = `0${day}`);
        return `${year}-${month}-${day}`;
    }
}

export default DateFormatter