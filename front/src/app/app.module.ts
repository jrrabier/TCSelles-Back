import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidateService } from "./services/validate.service";
import { HttpClientModule } from "@angular/common/http";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./guards/auth.guard";
import { GlobalConstants } from "./common/global-constants";
import { CompulsoryComponent } from "./shared/components/compulsory/compulsory.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordGuard } from "./guards/reset-password.guard";
import {
	FaIconLibrary,
	FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { TextMaskModule } from "angular2-text-mask";
import { InputComponent } from "./shared/components/input/input.component";
import { TruncatePipe } from "./pipes/truncate.pipe";
import { TruncateFirstNamePipe } from "./pipes/truncate-first-name.pipe";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotificationsContainer } from "./shared/components/notification/notifications-container.component";
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { HomeComponent } from "./components/home/home.component";
import { NgbdTableArticles } from "./components/table-articles/table-articles.component";
import { ArticleModalComponent } from "./components/table-articles/article-modal/article-modal.component";
import { CompulsoryModule } from "./shared/components/compulsory/compulsory.module";

export function tokenGetter() {
	return sessionStorage.getItem("id_token");
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		ProfileComponent,
		InputComponent,
		TruncatePipe,
		LoadingComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
			},
		}),
		TextMaskModule,
		FontAwesomeModule,
		NotificationsContainer,
		NavbarComponent,
		NgbdTableArticles,
		CompulsoryModule,
	],
	providers: [
		ValidateService,
		JwtHelperService,
		AuthGuard,
		ResetPasswordGuard,
		GlobalConstants,
		NgbModule,
		NotificationsContainer,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far);
	}
}
