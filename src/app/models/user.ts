export class User {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    nickName: string;

    getName() {
        return this.nickName || this.firstName + ' ' + this.lastName;
    }
}
