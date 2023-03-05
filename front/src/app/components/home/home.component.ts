import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleCategory } from 'src/app/models/article_category';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    getArticlesCategories$: Subscription;
    getAllArticles$: Subscription;
    isRequestingCategories: boolean = true;
    isRequestingArticles: boolean = true;

    categoriesList: [ArticleCategory];
    articlesList: [Article];

    categoriesForm: FormGroup;
    articleForm: FormGroup;

    mode: string;

    constructor(
        private homeService: HomeService,
        private fb: FormBuilder
    ) {
        this.getArticlesCategories$ = new Subscription();
        this.getAllArticles$ = new Subscription();
    }

    ngOnInit() {

        this.categoriesForm = this.fb.group({
            articleCategory: 1
        });
        
        this.getArticlesCategories$ = this.homeService.getArticlesCategories().subscribe(
            data => {
                if (data.success) {
                    this.categoriesList = data.result;
                    this.isRequestingCategories = false;
                }
            }
        );

        this.categoriesForm.get('articleCategory').valueChanges.subscribe(
            value => {
                this.onSubmit();
            }
        )

        this.onSubmit();
    }

    onSubmit() {
        this.getAllArticles$ = this.homeService.getAllArticlesByCategory(
            this.categoriesForm.get('articleCategory').value
        ).subscribe(
            data => {
                if (data.success) {
                    this.articlesList = data.result;
                    this.isRequestingArticles = false;
                }
            }
        );
    }

}
