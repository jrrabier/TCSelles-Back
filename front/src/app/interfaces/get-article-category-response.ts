import { ArticleCategory } from "../models/article_category";

export interface GetArticleCategoryResponse {
    success: boolean;
    msg: string;
    result: [ArticleCategory];
}
