import { Component, OnInit,ChangeDetectorRef,NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';
import { JwtService } from '../../../shared/services/jwt.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
 public productDetials:any
data:any;
token:String;
currentUser: any;
subscription: Subscription;
qty:string;
items:any;
errors:String;
length:string;
_dotLoder:boolean;
_isdotLoder:boolean;
// productData:any;
  constructor(
    private dashboardservice:DashboardService,
    private zone:NgZone,
    private router:Router,
    private jwtservice:JwtService,
    
    
  ) { 
    this.token= this.jwtservice.getToken();    
    this.qty="1"
    this.subscription = dashboardservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        // this.initData(this.currentUser)
      }
    );
    // this.productDetials = this.dashboardservice.getPath();
    this.productDetials= localStorage.getItem('data');
    this.data=JSON.parse(this.productDetials);
      console.log(this.data)
  }

  // initData(currentUser: User) {
    
  //   console.log(currentUser)
    
  // }

addcart(data,qty){
  console.log(data)
    data["qty"]=qty;
    data["id"]=this.currentUser.id;
    let id = this.currentUser.id;
    
if(!this.token){
  this.router.navigate(['/login']);
  
}else{
  this._dotLoder=true;
  this.dashboardservice.addCartitems(data).subscribe(items=>{
    console.log(items)
    if(items.Success == true){
      this.dashboardservice.getItems(id)
      .subscribe(
      res => {
        this._dotLoder=false;
        this.items = res.items;
        this.length=this.items.length;
        console.log(this.items)
        this.dashboardservice.sendPath(this.length);
        
      })
setTimeout(() => {
  this.router.navigate(['/cart']);
  
}, 200);
      
    }
    else{
      this.router.navigate(['/']);  
    }
  },
  err => {
    this.errors = err;
    console.log(this.errors)
  }
)
}
   
  }
  buyNow(data,qty){
    data["qty"]=qty;
    data["id"]=this.currentUser.id;
    //  data.cost=data.cost * qty;
     let id = this.currentUser.id;
  //  let productData=data;
  if(!this.token){
    this.router.navigate(['/login']);
    
  }else{
  this.dashboardservice.addCartitems(data).subscribe(items=>{
    console.log(items)
    if(items.Success == true){
      this.dashboardservice.getItems(id)
      .subscribe(
      res => {
        this.items = res.items;
        this.length=this.items.length;
        this.dashboardservice.sendPath(this.length);
        
      })      
    }
  },
  err => {
    this.errors = err;
    console.log(this.errors)
  }
)


    this.router.navigate(['buynow']);  


//     data["qty"]=qty;
//     data["id"]=this.currentUser.id;
//     data.cost=data.cost * qty;
//     this._isdotLoder=true;
    
//     // console.log(data)
//    this.dashboardservice.buyNow(data).subscribe(res=>{
//    console.log(res);
//    this._isdotLoder=false;
   
// })

  }
}
  ngOnInit() {
    
  }
  

}
