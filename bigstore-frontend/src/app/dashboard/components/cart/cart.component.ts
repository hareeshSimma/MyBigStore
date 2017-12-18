import { Component, OnInit,NgZone } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { JwtService } from '../../../shared/services/jwt.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  subscription: Subscription;
  items:any;
  length:string;
  token:String;
  constructor(
    private dashboardservice:DashboardService,
    private router:Router,
    private jwtservice:JwtService,
    private zone:NgZone,
    
    
  ) { 
    this.token= this.jwtservice.getToken();
    
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
    this.dashboardservice.getItems(id)
      .subscribe(
      res => {
        this.items = res.items;
        this.length=this.items.length;
        console.log("hello",this.items)

      })
    }
  }
  deleteCart(item,i){
   console.log(item+"............."+i)

  }


  ngOnInit() {
  }

}
