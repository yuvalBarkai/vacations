export default class Vacation {
    constructor(
        public vacation_id: number,
        public vacation_description: string,
        public vacation_destination: string,
        public image_location: string,
        public start_date: string,
        public end_date: string,
        public price: number,
        public followers: number,
    ) { }
}