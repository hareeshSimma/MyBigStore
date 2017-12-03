import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'angular4-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

import { JwtService } from './shared/services/jwt.service';
import { ApiService } from './shared/services/api.service';
import { DashboardService } from './shared/services/dashboard.service';
// import { NotificationBarModule } from 'angular2-notification-bar'

@NgModule({
  declarations: [
    AppComponent,
  
  ],
  
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    // NotificationBarModule
  ],
  providers: [
    JwtService,
    ApiService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
