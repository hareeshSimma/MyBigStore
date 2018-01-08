import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  { path: '',
    component:LoginComponent,

    children:[
      { path:'', component:SigninComponent },
      { path:'signin', component:SigninComponent },
      { path:'signup', component:SignupComponent },
      { path:'forgotpassword', component:ForgotpasswordComponent },
      
      // otherwise redirect to home
      //{ path: '**', redirectTo: '' }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

