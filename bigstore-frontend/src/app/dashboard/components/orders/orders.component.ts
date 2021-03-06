import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JwtService } from '../../../shared/services/jwt.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  orders:any;
  ordercount:number;
  orderItems:any;
  url=environment.img_url;

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
      //  console.log(this.orders);

      })
    }
  }

  orderDetials(order){
    console.log(order)
    sessionStorage.setItem('viewOrder', JSON.stringify(order));
  }

  cancelItem(oId){
    // console.log(oId)
  this.dashboardservice.cancelItem(oId).subscribe(res=>{
  console.log(res)
  if(res.Success){
    this.dashboardservice.getOrders().subscribe(
      res=>{
      this.orders=res;
    })
  }
})
  }
  ngOnInit() {
  }

}
