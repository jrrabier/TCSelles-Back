import {
	AsyncPipe,
	CommonModule,
	DecimalPipe,
	NgFor,
	NgIf,
} from "@angular/common";
import { Component, Input, QueryList, ViewChildren } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Article } from "../../models/article";
import {
	NgbdSortableHeader,
	SortEvent,
} from "../../directives/sortable.directive";
import { FormsModule } from "@angular/forms";
import {
	NgbPaginationModule,
	NgbTypeaheadModule,
} from "@ng-bootstrap/ng-bootstrap";
import { ArticlesService } from "src/app/services/articles.service";
import { ArticleModalComponent } from "./article-modal/article-modal.component";
import { AppModule } from "src/app/app.module";
import { TruncateFirstNamePipe } from "src/app/pipes/truncate-first-name.pipe";

@Component({
	selector: "ngbd-table-articles",
	standalone: true,
	imports: [
		DecimalPipe,
		FormsModule,
		AsyncPipe,
		NgbTypeaheadModule,
		NgbdSortableHeader,
		NgbPaginationModule,
		ArticleModalComponent,
		TruncateFirstNamePipe,
		CommonModule,
	],
	templateUrl: "./table-articles.component.html",
	providers: [ArticlesService],
})
export class NgbdTableArticles {
	@Input() article_category_id: number = 1;

	getAllArticles$: Subscription;
	articlesList: Article[];
	mode: string;
	articles$: Observable<Article[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	constructor(public service: ArticlesService) {
		this.articles$ = service.articles$;
		this.total$ = service.total$;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = "";
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}

	onSubmit() {
		this.getAllArticles$ = this.service
			.getAllArticlesByCategory(this.article_category_id)
			.subscribe((data) => {
				if (data.success) {
					this.articlesList = data.articles;
				}
			});
	}
}
