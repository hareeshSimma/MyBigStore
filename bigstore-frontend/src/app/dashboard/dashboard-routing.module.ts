import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';



const routes: Routes = [
  { path: '',
    component:DashboardComponent,

    children:[
       { path:'', component: HomeComponent},
      { path:'productdata', component:ProductdetailsComponent },
    //   { path:'signup', component:SignupComponent },
      // { path:'forgotpassword', component:ForgotpasswordComponent },
      // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardRoutingModule { }

