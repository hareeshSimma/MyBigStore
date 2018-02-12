import { Component, OnInit,ChangeDetectorRef,NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../../shared/models/user.model';
import { Router,NavigationEnd } from '@angular/router';
import { JwtService } from '../../../shared/services/jwt.service';
import { environment } from '../../../../environments/environment';

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
//url="https://mybigcart.herokuapp.com/images/";
// url="http://localhost:3000/images/";
url=environment.img_url;
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
        this.initData(this.currentUser)
      }
    );
    // this.productDetials = this.dashboardservice.getPath();
    this.productDetials= localStorage.getItem('data');
    this.data=JSON.parse(this.productDetials);
      console.log(this.data)
  }

  initData(currentUser: any) {
    
    let id = currentUser.id;
    if(id){
    this.dashboardservice.getItems(id)
      .subscribe(
      res => {
        this.items = res.items;
       // console.log(this.items);
(this.items).forEach(element => {
  console.log(element.productId)
});

      })
    }
  }

addcart(data,qty){
  console.log(qty)
    data["qty"]=qty;
    data["id"]=this.currentUser.id;
    data["subtotal"]=data.cost * qty;
    
    let id = this.currentUser.id;

if(qty==0 || qty==null){
  window.alert("Please select Quantity...! minimum 1 Bag")
}
    else{
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
  
}, 100);
      
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
  }


  buyNow(data,qty){
    data["qty"]=qty;
    data["id"]=this.currentUser.id;
    this._isdotLoder=true;
    data["subtotal"]=data.cost * qty;
     let id = this.currentUser.id;

  if(!this.token){
    this.router.navigate(['/login']);
    
  }else{
  this.dashboardservice.addCartitems(data).subscribe(items=>{
    console.log(items)
    if(items.Success == true){
      this._isdotLoder=false;
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
setTimeout(() => {
  this.router.navigate(['buynow']);  
  
}, 1000);

  }
}
  ngOnInit() {
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }
  

}
