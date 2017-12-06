import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
 public productDetials:any
data:any;
  constructor(
    private dashboardservice:DashboardService,
    private cd:ChangeDetectorRef
    
  ) { 
    
    // this.productDetials = this.dashboardservice.getPath();
    this.productDetials= localStorage.getItem('data');
    this.data=JSON.parse(this.productDetials);
      console.log(this.data)
  }

  ngOnInit() {

     console.log(this.dashboardservice.getCurrentUser());
    
  }
  

}
