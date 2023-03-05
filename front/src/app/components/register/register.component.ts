import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalConstants } from "src/app/common/global-constants";
import sexesList from '../../../assets/lists/sexesList.json'
import { ListInput } from 'src/app/interfaces/list-input';
import { RegisterService } from 'src/app/services/register.service';
import { Subscription } from 'rxjs';
import resources from "../../../assets/resources.json";
import { MasksService } from 'src/app/services/masks.service';
import { Level } from 'src/app/interfaces/level';
import { OutilsService } from 'src/app/services/outils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    getLevels$: Subscription;

    /* Default avatar */
    imgSrc: string;

    sexesList: ListInput[];

    levels: Level[];
    rsc: any;

    maskMobile;
    maskLicenceNb;

    registerForm: FormGroup;
    showPassword: boolean = false;
    showconfirmPassword: boolean = false;

    isLocalhost: boolean = false;

    // inputFile: HTMLInputElement = new HTMLInputElement();

    constructor(
        private validateService: ValidateService,
        private flashMessages: FlashMessagesService,
        private registerService: RegisterService,
        private maskService: MasksService,
        private router: Router,
        private GLOBAL: GlobalConstants,
        private fb: FormBuilder,
        private outilsService: OutilsService
    ) { }

    ngOnInit() {
        this.getLevels$ = this.registerService.getLevels().subscribe(
        res => {
            if (res.success) {
            this.levels = res.levels;
            } else {
            this.flashMessages.show(res.msg, {cssClass: 'alert-danger', timeout: 2000});
            }
        }
        );
        
        this.isLocalhost = this.outilsService.isLocalhost();
        this.sexesList = sexesList;
        this.imgSrc = this.GLOBAL.DEFAULT_AVATAR;
        this.rsc = resources;
        this.createForm();
        this.maskMobile = this.maskService.GetMobile;
        this.maskLicenceNb = this.maskService.GetLicenceNb;
    }

    ngOnDestroy() {
        this.getLevels$.unsubscribe();
    }

    
    public get validator() : ValidateService {
        return this.validateService;
    }
    

    onRegisterSubmit() {
        // Ne pas envoyer la confirmation de mot de passe
        this.registerForm.get('confirmpassword').disable();
        console.log(this.registerForm.value);

        // Required fields
        if (!this.registerForm.valid) {
            this.flashMessages.show('Veuillez renseigner tous les champs obligatoires !', {cssClass: 'alert-danger', timeout: 3000});
            this.registerForm.invalid;
            return;
        }

        // Validate email
        if(!this.validateService.isMailValid(this.registerForm.value.mail)) {
            this.flashMessages.show('Veuillez renseigner un email valide !', {cssClass: 'alert-danger', timeout: 3000});
            return;
        }

        // Register user
        this.registerService.registerUser(this.registerForm.value)
        .subscribe(data => {
            if (data.success) {
                this.flashMessages.show('Votre compte est bien créé !', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/login']);
            } else {
                this.flashMessages.show('Une erreur est survenue !', {cssClass: 'alert-danger', timeout: 3000});
                this.router.navigate(['/register']);
            }
        });

    }

    createForm() {
        this.registerForm = this.fb.group({
        lastname: [this.isLocalhost ? 'Rabier' : '', Validators.required],
        firstname: [this.isLocalhost ? 'Julien' : '', Validators.required],
        avatar: [''],
        mail: [this.isLocalhost ? 'julien@domain.com' : '', [Validators.required, Validators.pattern(this.validateService.MAILREGEX)]],
        psw: [this.isLocalhost ? 'test' : '', Validators.required],
        confirmpassword: [this.isLocalhost ? 'test' : '', Validators.required],
        levels_id: [this.isLocalhost ? 10 : null, Validators.required],
        licence_nb: [this.isLocalhost ? '2340404S' : '', [Validators.required, Validators.pattern(this.validateService.LICENCENBREGEX)]],
        birthdate: [this.isLocalhost ? '1988-08-26' : '', Validators.required],
        phone: ['', Validators.pattern(this.validateService.MOBILEREGEX)],
        sex: [this.isLocalhost ? 'M' : '', Validators.required]
        });
    }

    // triggerFileInput() {
    //   this.inputFile
    // }

}
