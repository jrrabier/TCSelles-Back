export class User {
	mail: string;
	psw: string;
	lastname: string;
	firstname: string;
	birthdate: Date;
	phone: string;
	avatar: string;
	address: string;
	postalcode: string;
	city: string;
	licence_nb: string;
	role: string;
	created_at: Date;
	updated_at: Date;
	team_id: number;
	sex_id: string;
	club_id: number;
	lvl_id: number;

	constructor(
		$mail: string,
		$psw: string,
		$lastname: string,
		$firstname: string,
		$birthdate: Date,
		$phone: string,
		$avatar: string,
		$address: string,
		$postalcode: string,
		$city: string,
		$licence_nb: string,
		$role: string,
		$created_at: Date,
		$updated_at: Date,
		$team_id: number,
		$sex_id: string,
		$club_id: number,
		$lvl_id: number
	) {
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
