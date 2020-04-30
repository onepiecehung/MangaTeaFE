export class User {
    email: string;
    password: string;
    username: string;
    constructor(email, password, username?) {
        this.email = email;
        this.password = password;
        if (username) {
            this.username = username;
        }
    }
}