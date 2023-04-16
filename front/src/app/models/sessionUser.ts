export class SessionUser {
	mail: string;
	lastname: string;
	firstname: string;
	avatar: string;
	role: string;
	sex_id: string;

	constructor(
		$mail: string,
		$lastname: string,
		$firstname: string,
		$avatar: string,
		$role: string,
		$sex_id: string
	) {
		this.$mail = $mail;
		this.lastname = $lastname;
		this.firstname = $firstname;
		this.avatar = $avatar;
		this.role = $role;
		this.sex_id = $sex_id;
	}

	/**
	 * Getter $mail
	 * @return {string}
	 */
	public get $mail(): string {
		return this.mail;
	}

	/**
	 * Setter $mail
	 * @param {string} value
	 */
	public set $mail(value: string) {
		this.mail = value;
	}

	/**
	 * Getter $lastname
	 * @return {string}
	 */
	public get $lastname(): string {
		return this.lastname;
	}

	/**
	 * Setter $lastname
	 * @param {string} value
	 */
	public set $lastname(value: string) {
		this.lastname = value;
	}

	/**
	 * Getter $firstname
	 * @return {string}
	 */
	public get $firstname(): string {
		return this.firstname;
	}

	/**
	 * Setter $firstname
	 * @param {string} value
	 */
	public set $firstname(value: string) {
		this.firstname = value;
	}

	/**
	 * Getter $avatar
	 * @return {string}
	 */
	public get $avatar(): string {
		return this.avatar;
	}

	/**
	 * Setter $avatar
	 * @param {string} value
	 */
	public set $avatar(value: string) {
		this.avatar = value;
	}

	/**
	 * Getter $role
	 * @return {string}
	 */
	public get $role(): string {
		return this.role;
	}

	/**
	 * Setter $role
	 * @param {string} value
	 */
	public set $role(value: string) {
		this.role = value;
	}

	/**
	 * Getter $sex_id
	 * @return {string}
	 */
	public get $sex_id(): string {
		return this.sex_id;
	}

	/**
	 * Setter $sex_id
	 * @param {string} value
	 */
	public set $sex_id(value: string) {
		this.sex_id = value;
	}
}
