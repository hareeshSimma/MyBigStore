import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'angular4-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

import { JwtService } from './shared/services/jwt.service';
import { ApiService } from './shared/services/api.service';
import { DashboardService } from './shared/services/dashboard.service';


@NgModule({
  declarations: [
    AppComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    JwtService,
    ApiService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
