export class Article {

    title: String;
    content: String;
    image: String;
    created_at: Date;
    updated_at: Date;
    users_id: Number;
    articles_categories_id: Number;
  
      constructor($title: String, $content: String, $image: String, $created_at: Date, $updated_at: Date, $users_id: Number, $articles_categories_id: Number) {
          this.title = $title;
          this.content = $content;
          this.image = $image;
          this.created_at = $created_at;
          this.updated_at = $updated_at;
          this.users_id = $users_id;
          this.articles_categories_id = $articles_categories_id;
    }
  }
  