import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    imports : [
        LoginRoutingModule,
        FormsModule,
        CommonModule
    ],
    declarations : [
        LoginComponent,
        SignupComponent,
        SigninComponent,
        
    ],
    providers :  [
        
    ]
})
export class LoginModule {}
