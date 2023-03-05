import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetAllArticlesResponse } from 'src/app/interfaces/get-all-articles-response';
import { GetArticleCategoryResponse } from 'src/app/interfaces/get-article-category-response';
import { PostResponse } from 'src/app/interfaces/post-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

    headers: HttpHeaders;

    constructor(
        private http: HttpClient
    ) { 
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    
    getArticlesCategories(): Observable<GetArticleCategoryResponse> {
        return this.http.get<GetArticleCategoryResponse>(`${environment.url}home`, {headers: this.headers});
    }

    getAllArticlesByCategory(category_id: number): Observable<GetAllArticlesResponse> {
        return this.http.get<GetAllArticlesResponse>(`${environment.url}home/${category_id}`, {headers: this.headers});
    }
    
    postArticle(article: FormGroup): Observable<PostResponse> {
        return this.http.post<PostResponse>(`${environment.url}articles/add`, article, {headers: this.headers});
    }
}
