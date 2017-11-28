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
        ProductdetailsComponent
            ],
    providers :  [
        
    ]
})
export class dashboardModule {}
