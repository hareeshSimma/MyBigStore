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
        // console.log(this.currentUser)
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

      this.router.navigate(['/cart']);
      
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
    console.log(data)
   this.dashboardservice.buyNow(data).subscribe(res=>{
   console.log(res);
})
  }
  ngOnInit() {
    
  }
  

}
