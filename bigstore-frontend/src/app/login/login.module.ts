import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation'
//import { EqualValidator } from '../shared/directives/equal-validator.directive';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {validatorModule} from '../validator.module';
@NgModule({
    imports : [
        LoginRoutingModule,
        FormsModule,
        CommonModule,
        CustomFormsModule,
        validatorModule
    ],
    declarations : [
        LoginComponent,
        SignupComponent,
        SigninComponent,
       // EqualValidator,
        ForgotpasswordComponent,
    ],
    exports:   [ ],

    providers :  [
    ]
})
export class LoginModule {}
