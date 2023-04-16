import { Article } from "../models/article";

export interface GetAllArticlesResponse {
	success: boolean;
	msg: string;
	articles: Article[];
}
