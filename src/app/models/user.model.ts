export class User {
  email: string;
  password: string;
  username: string;
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    if (data.username) {
      this.username = data.username;
    }
  }
}