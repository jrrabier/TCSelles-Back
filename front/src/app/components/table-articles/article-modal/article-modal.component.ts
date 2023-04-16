import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from "@angular/core";
import {
	AbstractControl,
	ReactiveFormsModule,
	UntypedFormBuilder,
	UntypedFormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ArticleCategory } from "src/app/models/article_category";
import { OutilsService } from "src/app/services/outils.service";
import { ArticlesService } from "../../../services/articles.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { NotificationService } from "src/app/shared/services/notification.service";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CompulsoryComponent } from "src/app/shared/components/compulsory/compulsory.component";
import { CompulsoryModule } from "src/app/shared/components/compulsory/compulsory.module";

@Component({
	standalone: true,
	selector: "app-article-modal",
	templateUrl: "./article-modal.component.html",
	styleUrls: ["./article-modal.component.scss"],
	imports: [CKEditorModule, ReactiveFormsModule, CompulsoryModule],
})
export class ArticleModalComponent implements OnInit, OnDestroy {
	public Editor = ClassicEditor;
	@ViewChild("close") modal: ElementRef;

	@Input() mode: string;
	@Output() refreshArticles: EventEmitter<boolean>;

	articleForm: UntypedFormGroup;

	getArticlesCategories$: Subscription;
	postArticle$: Subscription;

	categoriesList: ArticleCategory[];

	isRequestingCategories: boolean;

	modalTitle: string;
	modalAction: string;
	today: string;

	constructor(
		private fb: UntypedFormBuilder,
		private articleService: ArticlesService,
		private notifService: NotificationService,
		private outilsService: OutilsService,
		private router: Router
	) {
		this.getArticlesCategories$ = new Subscription();
		this.postArticle$ = new Subscription();
		this.refreshArticles = new EventEmitter<boolean>();
	}

	ngOnInit(): void {
		this.today = this.outilsService.getMySqlDate(new Date());
		this.modalTitle =
			this.mode === "update"
				? "Modifier l'article"
				: "Ajouter un article";
		this.modalAction = this.mode === "update" ? "Modifier" : "Ajouter";

		this.getArticlesCategories$ = this.articleService
			.getArticlesCategories()
			.subscribe((data) => {
				if (data.success) {
					this.categoriesList = data.result;
					this.isRequestingCategories = false;
				}
			});

		this.createForm();
	}

	ngOnDestroy() {
		this.getArticlesCategories$.unsubscribe();
		this.postArticle$.unsubscribe();
	}

	createForm() {
		this.articleForm = this.fb.group({
			title: [null, Validators.required],
			content: [null, Validators.required],
			image: null,
			created_at: null,
			updated_at: null,
			users_id: null,
			articles_categories_id: [null, Validators.required],
		});
	}

	onSubmit() {
		this.created_at.setValue(this.today);
		this.users_id.setValue(1);
		this.postArticle$ = this.articleService
			.postArticle(this.articleForm.value)
			.subscribe(
				(result) => {
					if (result.success) {
						this.notifService.showSuccess(result.msg);
						this.closeModal();
						this.refreshArticles.emit(true);
					} else {
						this.notifService.showDanger(result.msg);
					}
				},
				(error) => {
					this.notifService.showDanger(error);
				}
			);
	}

	closeModal() {
		this.modal.nativeElement.click();
	}

	public get title(): AbstractControl {
		return this.articleForm.get("title");
	}

	public get content(): AbstractControl {
		return this.articleForm.get("content");
	}

	public get image(): AbstractControl {
		return this.articleForm.get("image");
	}

	public get created_at(): AbstractControl {
		return this.articleForm.get("created_at");
	}

	public get updated_at(): AbstractControl {
		return this.articleForm.get("updated_at");
	}

	public get users_id(): AbstractControl {
		return this.articleForm.get("users_id");
	}

	public get articles_categories_id(): AbstractControl {
		return this.articleForm.get("articles_categories_id");
	}
}
