export class User {

  first_name: String;
  last_name: String;
  email: String;
  password: String;
  avatar: String;
  rank: String;
  address: String;
  postal_code: String;
  city: String;
  birth_date: Date;
  mobile: String;
  sex: String;

  constructor(element) {
    this.first_name = element ? element.first_name : "";
    this.last_name = element ? element.last_name : "";
    this.email = element ? element.email : "";
    this.password = element ? element.password : "";
    this.avatar = element ? element.avatar : "";
    this.rank = element ? element.rank : "";
    this.address = element ? element.address : "";
    this.postal_code = element ? element.postal_code : "";
    this.city = element ? element.city : "";
    this.birth_date = element ? element.birth_date : Date();
    this.mobile = element ? element.mobile : "";
    this.sex = element ? element.sex : "";
  }
}
