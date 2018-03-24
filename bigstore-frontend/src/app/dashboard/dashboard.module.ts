import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dashboardRoutingModule } from './dashboard-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselModule } from 'angular4-carousel';
//  import { NgxTypeaheadModule } from 'ngx-typeahead';
//  import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

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
import { ChangepasswordComponent } from './components/myaccount/changepassword/changepassword.component';
//import { EqualValidator } from '../shared/directives/equal-validator.directive';
import {validatorModule} from '../validator.module';
import { BuynowComponent } from './components/buynow/buynow.component';
import { FileUploadModule } from 'ng2-file-upload';
import { OrdereditemsComponent } from './components/myaccount/ordereditems/ordereditems.component';
import { CanceleditemsComponent } from './components/myaccount/canceleditems/canceleditems.component';
import { TotalitemslistComponent } from './components/myaccount/totalitemslist/totalitemslist.component';
import { OrderdetialsComponent } from './components/orderdetials/orderdetials.component';

@NgModule({
    imports : [
        dashboardRoutingModule,
        FormsModule, 
        CarouselModule,
        CommonModule,
        validatorModule,
        FileUploadModule,
        //  NgxTypeaheadModule,
        // HttpClientModule,
        // HttpClientJsonpModule
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
        ChangepasswordComponent,
        BuynowComponent,
        OrdereditemsComponent,
        CanceleditemsComponent,
        TotalitemslistComponent,
        OrderdetialsComponent,
        //EqualValidator
            ],
       exports:   [],
       providers :  [
        
    ]
})
export class dashboardModule {}
