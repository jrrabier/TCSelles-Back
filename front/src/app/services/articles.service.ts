import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, PipeTransform } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { GetAllArticlesResponse } from "src/app/interfaces/get-all-articles-response";
import { GetArticleCategoryResponse } from "src/app/interfaces/get-article-category-response";
import { PostResponse } from "src/app/interfaces/post-response";
import { environment } from "src/environments/environment";

import { DecimalPipe } from "@angular/common";
import { debounceTime, delay, switchMap, tap } from "rxjs/operators";
import { SortColumn, SortDirection } from "../directives/sortable.directive";
import { Article } from "../models/article";

interface SearchResult {
	articles: Article[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number | Date, v2: string | number | Date) =>
	v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
	articles: Article[],
	column: SortColumn,
	direction: string
): Article[] {
	if (direction === "" || column === "") {
		return articles;
	} else {
		return [...articles].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === "asc" ? res : -res;
		});
	}
}

function matches(article: Article, term: string) {
	return (
		article.title.toLowerCase().includes(term.toLowerCase()) ||
		article.content.toLowerCase().includes(term.toLowerCase())
	);
}

@Injectable({ providedIn: "root" })
export class ArticlesService {
	private _headers: HttpHeaders;
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _articles$ = new BehaviorSubject<Article[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: "",
		sortColumn: "",
		sortDirection: "",
	};

	private _articles: Article[];

	constructor(private http: HttpClient) {
		this.getAllArticles().subscribe((data) => {
			if (data.success) {
				console.log("data", data);

				this._articles = data.articles;
			}
		});
		this._headers = new HttpHeaders({ "Content-Type": "application/json" });
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false))
			)
			.subscribe((result) => {
				this._articles$.next(result.articles);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get articles$() {
		return this._articles$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } =
			this._state;
		console.log(this._articles);

		// 1. sort
		let articles = sort(this._articles, sortColumn, sortDirection);

		// 2. filter
		articles = articles.filter((article) => matches(article, searchTerm));
		const total = articles.length;

		// 3. paginate
		articles = articles.slice(
			(page - 1) * pageSize,
			(page - 1) * pageSize + pageSize
		);
		return of({ articles, total });
	}

	getArticlesCategories(): Observable<GetArticleCategoryResponse> {
		return this.http.get<GetArticleCategoryResponse>(
			`${environment.url}home`,
			{ headers: this._headers }
		);
	}

	getAllArticles(): Observable<GetAllArticlesResponse> {
		return this.http.get<GetAllArticlesResponse>(
			`${environment.url}articles/show`,
			{
				headers: this._headers,
			}
		);
	}

	getAllArticlesByCategory(
		category_id: number
	): Observable<GetAllArticlesResponse> {
		return this.http.get<GetAllArticlesResponse>(
			`${environment.url}home/${category_id}`,
			{ headers: this._headers }
		);
	}

	postArticle(article: UntypedFormGroup): Observable<PostResponse> {
		return this.http.post<PostResponse>(
			`${environment.url}articles/add`,
			article,
			{ headers: this._headers }
		);
	}
}
