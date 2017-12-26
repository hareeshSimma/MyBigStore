import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { PersonalinformationComponent } from './components/myaccount/personalinformation/personalinformation.component';
import { ManageaddressComponent } from './components/myaccount/manageaddress/manageaddress.component';
import { UplodeproductsComponent } from './components/myaccount/uplodeproducts/uplodeproducts.component';


const routes: Routes = [
  { path: '',
    component:DashboardComponent,
    // canActivate : [ AuthGuard ],
    children:[
      { path:'', component: HomeComponent},
      { path:'productdata', component:ProductdetailsComponent },
      { path:'cart', component:CartComponent },
      { path:'orders', component:OrdersComponent },
      
      { path:'myaccount', component: MyaccountComponent,
      children:[
        { path:'', component: OrdersComponent},
        { path:'accountettings', children:[
          { path:'', component:PersonalinformationComponent },
          { path:'personalinformation', component:PersonalinformationComponent },
          
          { path:'manageaddress', component:ManageaddressComponent },
        ] },
      { path:'uplodeproducts', component:UplodeproductsComponent },
        
      ] },
      
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

