import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'angular4-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { JwtService } from './shared/services/jwt.service';
import { ApiService } from './shared/services/api.service';
import { DashboardService } from './shared/services/dashboard.service';
import { AuthGuard } from './shared/services/authgaurd.service';
import { CustomFormsModule } from 'ng2-validation';
// import { NgxTypeaheadModule } from 'ngx-typeahead';
// import { EqualValidator } from '../shared/directives/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    // NgxTypeaheadModule,
  ],
  providers: [
    JwtService,
    ApiService,
    DashboardService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
