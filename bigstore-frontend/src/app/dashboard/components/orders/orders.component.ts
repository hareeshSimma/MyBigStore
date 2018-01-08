import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JwtService } from '../../../shared/services/jwt.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  orders:any;
  ordercount:string;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
  ) { 
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
         this.initData(this.currentUser)
      }
    );
  }

  initData(currentUser: any) {
    
    let id = currentUser.id;
    if(id){
      this.dashboardservice.getOrders().subscribe(
        res=>{
        this.orders=res;
       this.ordercount= this.orders.length;
       console.log(this.ordercount);

      })
    }
  }
  ngOnInit() {
  }

}
