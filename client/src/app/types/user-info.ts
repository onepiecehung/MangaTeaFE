export class UserInfo {
  _id: number;
  about: string;
  address: string;
  appellation: [];
  createdAt: string;
  email: string;
  linkSocial: [];
  loginCount: number;
  online: boolean;
  permission: [];
  point: number;
  role: string;
  sex: string;
  status: string;
  updatedAt: string;
  username: string;
  verifyEmail: boolean;
  verifyPhone: boolean;
  avatar: string;
  constructor(data) {
    if (data !== null) {
      this._id = data._id;
      this.about = data.about;
      this.address = data.address;
      this.appellation = data.appellation;
      this.createdAt = data.createdAt;
      this.email = data.email;
      this.linkSocial = data.linkSocial;
      this.loginCount = data.loginCount;
      this.online = data.online;
      this.permission = data.permission;
      this.point = data.point;
      this.role = data.role;
      this.sex = data.sex;
      this.status = data.status;
      this.updatedAt = data.updatedAt;
      this.username = data.username;
      this.verifyEmail = data.verifyEmail;
      this.verifyPhone = data.verifyPhone;
    }
  }
}