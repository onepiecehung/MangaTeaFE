export class Country {
  _id: number;
  name: string;
  alpha2Code: string;
  alpha3code: string;
  flag: string;
  constructor(data) {
    if (data) {
      this._id = data._id;
      this.name = data.name;
      this.alpha2Code = data.alpha2Code;
      this.alpha3code = data.alpha3code;
      this.flag = data.flag;
    }
  }
}