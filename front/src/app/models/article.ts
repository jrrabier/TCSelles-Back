export class Article {
	title: string;
	content: string;
	image: string;
	created_at: Date;
	updated_at: Date;
	lastname: string;
	firstname: string;
	avatar: string;
	label: string;

	constructor(
		$title: string,
		$content: string,
		$image: string,
		$created_at: Date,
		$updated_at: Date,
		$lastname: string,
		$firstname: string,
		$avatar: string,
		$label: string
	) {
		this.title = $title;
		this.content = $content;
		this.image = $image;
		this.created_at = $created_at;
		this.updated_at = $updated_at;
		this.lastname = $lastname;
		this.firstname = $firstname;
		this.avatar = $avatar;
		this.label = $label;
	}
}
