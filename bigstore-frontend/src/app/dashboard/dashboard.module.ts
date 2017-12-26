import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dashboardRoutingModule } from './dashboard-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselModule } from 'angular4-carousel';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { PersonalinformationComponent } from './components/myaccount/personalinformation/personalinformation.component';
import { ManageaddressComponent } from './components/myaccount/manageaddress/manageaddress.component';
import { UplodeproductsComponent } from './components/myaccount/uplodeproducts/uplodeproducts.component';

@NgModule({
    imports : [
        dashboardRoutingModule,
        FormsModule, 
        CarouselModule,
        CommonModule
    ],
    declarations : [
        DashboardComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        ProductdetailsComponent,
        CartComponent,
        OrdersComponent,
        MyaccountComponent,
        PersonalinformationComponent,
        ManageaddressComponent,
        UplodeproductsComponent,
        
            ],
    providers :  [
        
    ]
})
export class dashboardModule {}
