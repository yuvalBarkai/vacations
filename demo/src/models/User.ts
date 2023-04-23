export default class User {
    constructor(
        public first_name: string,
        public last_name: string,
        public token: string,
        public user_id: number,
        public username: string,
    ) { }
}