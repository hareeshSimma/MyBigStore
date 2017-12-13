import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
 public productDetials:any
data:any;
currentUser: User;
subscription: Subscription;

  constructor(
    private dashboardservice:DashboardService,
    private cd:ChangeDetectorRef
    
  ) { 
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user
        this.initData(this.currentUser)
      }
    );
    // this.productDetials = this.dashboardservice.getPath();
    this.productDetials= localStorage.getItem('data');
    this.data=JSON.parse(this.productDetials);
      console.log(this.data)
  }

  initData(currentUser: User) {
    setTimeout(() => {
    console.log(currentUser)
    
    }, 1000);
  }
  ngOnInit() {
    
  }
  

}
