import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Article } from "src/app/models/article";
import { ArticleCategory } from "src/app/models/article_category";
import { NotificationService } from "src/app/shared/services/notification.service";
import { ArticlesService } from "../../services/articles.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	getArticlesCategories$: Subscription;
	getAllArticles$: Subscription;
	isRequestingCategories: boolean = true;
	isRequestingArticles: boolean = true;

	categoriesList: ArticleCategory[];
	articlesList: Article[];

	categoriesForm: UntypedFormGroup;
	articleForm: UntypedFormGroup;

	mode: string;
	article_category_id: number;

	constructor(
		private articlesService: ArticlesService,
		private fb: UntypedFormBuilder,
		private notif: NotificationService
	) {
		this.getArticlesCategories$ = new Subscription();
		this.getAllArticles$ = new Subscription();
	}

	ngOnInit() {
		this.categoriesForm = this.fb.group({
			articleCategory: 1,
		});

		this.getArticlesCategories$ = this.articlesService
			.getArticlesCategories()
			.subscribe((data) => {
				if (data.success) {
					this.categoriesList = data.result;
					this.isRequestingCategories = false;
				}
			});

		this.categoriesForm
			.get("articleCategory")
			.valueChanges.subscribe((value) => {
				this.article_category_id = value;
			});
	}
}
