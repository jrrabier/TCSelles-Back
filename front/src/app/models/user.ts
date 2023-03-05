export class User {

  mail: String;
  psw: String;
  lastname: String;
  firstname: String;
  birthdate: Date;
  phone: String;
  avatar: String;
  address: String;
  postalcode: String;
  city: String;
  licence_nb: String;
  role: String;
  created_at: Date;
  updated_at: Date;
  team_id: Number;
  sex_id: String;
  club_id: Number;
  lvl_id: Number;

	constructor($mail: String, $psw: String, $lastname: String, $firstname: String, $birthdate: Date, $phone: String, $avatar: String, $address: String, $postalcode: String, $city: String, $licence_nb: String, $role: String, $created_at: Date, $updated_at: Date, $team_id: Number, $sex_id: String, $club_id: Number, $lvl_id: Number) {
		this.mail = $mail;
		this.psw = $psw;
		this.lastname = $lastname;
		this.firstname = $firstname;
		this.birthdate = $birthdate;
		this.phone = $phone;
		this.avatar = $avatar;
		this.address = $address;
		this.postalcode = $postalcode;
		this.city = $city;
		this.licence_nb = $licence_nb;
		this.role = $role;
		this.created_at = $created_at;
		this.updated_at = $updated_at;
		this.team_id = $team_id;
		this.sex_id = $sex_id;
		this.club_id = $club_id;
		this.lvl_id = $lvl_id;
  }
}
